import { IsOptional, IsString } from 'class-validator';

export namespace ApiParseAndCreateProxy {
	export class Request {
		userId: string;
	}

	export class Response {
		@IsString()
		id?: string;

		@IsString()
		@IsOptional()
		message?: string;

		@IsString()
		@IsOptional()
		error?: string;
	}
}
