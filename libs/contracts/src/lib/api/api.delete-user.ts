export namespace ApiDeleteUser {
	export class Request {
    userId: string;
  }

	export class Response {
    message?: string;
    error?: string;
	}
}
