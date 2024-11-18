import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GrassAccountConnector } from '../../infra/ws/grass-account/grass-account.connector';
import { logger } from 'nx/src/utils/logger';
import { ApiCreateUser, ApiParseUserProxy } from '@dynastic-import-monorepository/contracts';
import { ApiFindAllUser } from '../../../../../libs/contracts/src/lib/api.find-all-user';
import { PrismaService } from '../../infra/persistance/prisma/prisma.service';

@Injectable()
export class GrassUserService {
	private activeUsers: Map<any, any>;

	constructor(
		private readonly prisma: PrismaService,
		readonly grassConnector: GrassAccountConnector,
	) {
		this.activeUsers = new Map();
	}

	public async create(userId: string, proxies: string[]): Promise<ApiCreateUser.Response> {
		if (!userId || !proxies || !Array.isArray(proxies)) {
			throw new BadRequestException({
				error: 'Invalid input. Provide userId and an array of proxiex.',
			});
		}
		if (this.activeUsers.has(userId)) {
			throw new BadRequestException({
				error: 'User already exists. Use another endpoint to modify proxies.',
			});
		}
		const connections = [];

		for (const proxy of proxies) {
			try {
				const wsConnection = await this.grassConnector.connect(userId, proxy);
				connections.push({ proxy, ws: wsConnection });
			} catch (err) {
				logger.error(`Failed to connect via proxy: ${proxy} for user: ${userId}`);
			}
		}
		if (connections.length > 0) {
			this.activeUsers.set(userId, connections);
			await this.prisma.grassUser.upsert({
				where: { id: userId },
				update: { proxies },
				create: { id: userId, proxies },
			});
			return { message: `User ${userId} added with ${connections.length} proxies.` };
		} else {
			throw new BadRequestException({
				error: 'Failed to connect with provided proxies.',
			});
		}
	}

	public async parseProxies(body: string, userId: string): Promise<ApiParseUserProxy.Response> {
		const proxyList = body
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
		if (proxyList.length === 0) {
			throw new BadRequestException({
				error: 'Empty proxy list',
			});
		}
		const formattedProxies = proxyList.map((proxy) => `socks5://${proxy}`);
		return {
			userId,
			proxies: formattedProxies,
		};
	}

	public findAll(): ApiFindAllUser.Response {
		return {
			message: Array.from(this.activeUsers.keys()),
		};
	}

	public async checkConnections(
		userId: string,
	): Promise<{ validProxies: string[]; invalidProxies: string[] }> {
		const userSessions = this.activeUsers.get(userId);
		if (!userSessions) {
			throw new NotFoundException({ error: 'User not found' });
		}

		const validProxies: string[] = [];
		const invalidProxies: string[] = [];

		const checkPromises = userSessions.map(({ proxy, ws }) => {
			return new Promise<void>((resolve) => {
				const timeout = setTimeout(() => {
					logger.warn(`Proxy ${proxy} for user ${userId} is invalid (no PONG received)`);
					invalidProxies.push(proxy);
					resolve();
				}, 5000);

				ws.once('pong', () => {
					clearTimeout(timeout);
					logger.info(`Proxy ${proxy} for user ${userId} is valid`);
					validProxies.push(proxy);
					resolve();
				});

				try {
					ws.ping();
				} catch (err) {
					clearTimeout(timeout);
					invalidProxies.push(proxy);
					resolve();
				}
			});
		});

		await Promise.all(checkPromises);

		return { validProxies, invalidProxies };
	}

	public async delete(userId: string): Promise<{ message: string }> {
		const userSessions = this.activeUsers.get(userId);
		if (!userSessions) {
			throw new NotFoundException({ error: 'User not found' });
		}
		userSessions.forEach((session) => session.ws.close());
		this.activeUsers.delete(userId);
		await this.prisma.grassUser.delete({ where: { id: userId } });
		return {
			message: `User ${userId} and all their proxies removed`,
		};
	}

	public async initializeUsers() {
		const users = (await this.prisma.grassUser.findMany()).filter(el=>el.id === '2ohcOFSabTU04uKbavf9a40i3IJ');
		for (const user of users) {
			const connections = [];
			for (const proxy of user.proxies as string[]) {
				try {
					const wsConnection = await this.grassConnector.connect(user.id, proxy);
					connections.push({ proxy, ws: wsConnection });
				} catch (err) {
					logger.error(`Failed to reconnect via proxy: ${proxy} for user: ${user.id}`);
				}
			}
			if (connections.length > 0) {
				this.activeUsers.set(user.id, connections);
			}
		}
	}
}
