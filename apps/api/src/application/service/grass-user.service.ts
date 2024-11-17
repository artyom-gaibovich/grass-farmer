import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GrassAccountConnector } from '../../infra/ws/grass-account/grass-account.connector';
import { logger } from 'nx/src/utils/logger';
import { ApiCreateUser } from '@dynastic-import-monorepository/contracts';
import { ApiFindAllUser } from '../../../../../libs/contracts/src/lib/api.find-all-user';

@Injectable()
export class GrassUserService {
	private activeUsers: Map<any, any>;

	constructor(private readonly grassConnector: GrassAccountConnector) {
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
			return { message: `User ${userId} added with ${connections.length} proxies.` };
		} else {
			throw new BadRequestException({
				error: 'Failed to connect with provided proxies.',
			});
		}
	}

	public findAll(): ApiFindAllUser.Response {
		return {
			message: Array.from(this.activeUsers.keys()),
		};
	}

  public async checkConnections(userId: string): Promise<{ validProxies: string[]; invalidProxies: string[] }> {
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
        }, 5000); // 5 секунд на ожидание PONG

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
		return {
			message: `User ${userId} and all their proxies removed`,
		};
	}
}
