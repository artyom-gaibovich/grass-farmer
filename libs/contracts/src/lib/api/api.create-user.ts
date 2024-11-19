import { ArrayMinSize, IsArray, IsOptional, IsString, Matches } from 'class-validator';

export namespace ApiCreateUser {
	export class Request {
		@IsString()
		userId: string;

		@IsArray()
		@ArrayMinSize(1)
		@IsString({ each: true })
		@Matches(/^socks5:\/\/[^:]+:[^@]+@[^:]+:\d+$/, {
			each: true,
			message: 'Each proxy must be a valid socks5 URL',
		})
		proxies: string[];
	}

	export class Response {

    @IsString()
    id? : string;

		@IsString()
		@IsOptional()
		message?: string;

		@IsString()
		@IsOptional()
		error?: string;
	}
}
