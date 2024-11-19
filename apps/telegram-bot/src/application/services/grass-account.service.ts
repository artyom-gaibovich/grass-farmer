import { Injectable } from '@nestjs/common';
import { GrassAccountApi } from '../../infra/api/grass-account.api';

@Injectable()
export class GrassAccountService {
	constructor(private readonly grassAccountApi: GrassAccountApi) {}
	async create(inputUserId: string, inputProxies: string): Promise<string> {
		const { userId, proxies, errorParse } = await this.grassAccountApi.format({
			userId: inputUserId,
			proxies: inputProxies,
		});
		if (errorParse) {
			return 'Произошла ошибка при форматировании';
		}
		const { message, error } = await this.grassAccountApi.create({ userId, proxies });
		if (error) {
			return 'Произошла ошибка при создании';
		}
		return message;
	}

	async delete(inputUserId: string): Promise<string> {
		const { message, error } = await this.grassAccountApi.delete({
			userId: inputUserId,
		});
		if (error) {
			return 'Произошла ошибка при удалении';
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
}
