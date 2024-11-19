import {
  CreateTelegramUserEnum
} from '../../../../../apps/telegram-bot/src/application/use-cases/create-telegram-user/create-telegram-user.enum';

export namespace TelegramBotCreateTelegramUser {
	export class Request {
		id: number;
	}

	export class Response {
    msg: CreateTelegramUserEnum;
	}
}
