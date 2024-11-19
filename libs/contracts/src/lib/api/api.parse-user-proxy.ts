export namespace ApiParseUserProxy {
	export class Request {
    userId?: string;
    proxies?: string;
  }

	export class Response {
		userId?: string;

    proxies?: string[];

    errorParse?: string
	}
}
