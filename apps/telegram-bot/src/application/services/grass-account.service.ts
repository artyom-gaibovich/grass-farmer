import { Injectable } from '@nestjs/common';
import { GrassAccountApi } from '../../infra/api/grass-account.api';
import { GrassAccountErrors } from './grass-account.service.enum';
import { GrassUserRepository } from '../repository/grass-user.repository';
import { GrassUserEntity } from '../../domain/grass-user';
import { TelegramUser } from '@prisma/client';
import { TelegramUserRepository } from '../repository/telegram-user-repository';

@Injectable()
export class GrassAccountService {
	constructor(
		private readonly grassAccountApi: GrassAccountApi,
		private readonly grassUserRepository: GrassUserRepository,
		private readonly telegramUserRepository: TelegramUserRepository,
	) {}

	async create(inputUserId: string, inputProxies: string, telegramId: number): Promise<string> {
		const { userId, proxies, errorParse } = await this.grassAccountApi.format({
			userId: inputUserId,
			proxies: inputProxies,
		});
		if (errorParse) {
			return errorParse;
		}
		const { id, message, error } = await this.grassAccountApi.create({ userId, proxies });
		if (error) {
			return GrassAccountErrors.ErrorCreate;
		}
		const grassId = await this.grassUserRepository.create(telegramId, id);
		if (!grassId) {
			return GrassAccountErrors.ErrorCreate;
		}
		return message;
	}

	async delete(inputUserId: string): Promise<string> {
		const { message, error } = await this.grassAccountApi.delete({
			userId: inputUserId,
		});
		if (error) {
			return 'Произошла ошибка при удалении на API Proxy';
		}
		return `У пользователя ${inputUserId} были удалены все прокси`;
	}

	async check(inputUserId: string): Promise<string> {
		const { validProxies, invalidProxies, error } = await this.grassAccountApi.check({
			userId: inputUserId,
		});
		if (error) {
			return error;
		}
		const validMsg = `Количество валидных: ${validProxies}`;
		const invalidMsg = `Количество невалидных: ${invalidProxies}`;
		return `${validMsg}\n${invalidMsg}`;
	}

	async findProxies(telegramId: number): Promise<string> {
		const proxies = await this.grassUserRepository.findMany(telegramId);

		if (!proxies || proxies.length === 0) {
			return 'Не найдено ни одного прокси:(.';
		}

		const msg = proxies.map((el, index) => `${index + 1}. Userid ID: ${el.id}`).join('\n');
		return msg;
	}

	async findProxyLim(telegramId: number): Promise<{
    currentProxyLength: number;
    limit: number;
  }> {
    const userLimit = await this.telegramUserRepository.find(telegramId);
    if (!userLimit) {
      return null;
    }
		const proxies = await this.grassUserRepository.findMany(telegramId);
		if (!proxies) {
			return null;
		}

		return {
      currentProxyLength: proxies.length,
      limit: userLimit.limit,
    }
	}
}
