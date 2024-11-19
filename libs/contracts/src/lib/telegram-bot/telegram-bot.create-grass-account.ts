export namespace TelegramBotCreateTelegramUser {
	export class Request {
		id: bigint;
	}

	export class Response {
		id: number;
		createdAt?: Date;
		updatedAt?: Date;
	}
}
