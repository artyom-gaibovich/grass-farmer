import { Injectable } from '@nestjs/common';
import { TelegramBotCreateTelegramUser } from '@dynastic-import-monorepository/contracts';
import { TelegramUserRepository } from '../../repository/telegram-user-repository';
import { TelegramUserEntity } from '../../../domain/telegram-user';
import { CreateTelegramUserEnum } from './create-telegram-user.enum';

@Injectable()
export class CreateTelegramUserUseCase {
	constructor(private telegramUserRepository: TelegramUserRepository) {}

	async create(
		request: TelegramBotCreateTelegramUser.Request,
	): Promise<TelegramBotCreateTelegramUser.Response> {
		const existedUser = await this.telegramUserRepository.find(request.id);
		if (existedUser) {
			return {
				msg: CreateTelegramUserEnum.AlreadyExisted,
			};
		}
		const telegramUser = await this.telegramUserRepository.create(
			new TelegramUserEntity({
				id: request.id,
        limit: request.limit,
			}),
		);
		if (!telegramUser) {
			return {
				msg: CreateTelegramUserEnum.ErrorRegister,
			};
		}
		return {
			msg: CreateTelegramUserEnum.SuccessfullyRegister,
		};
	}
}
