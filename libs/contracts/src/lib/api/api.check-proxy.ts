export namespace ApiCheckProxy {
	export class Request {
    userId: string;
	}

	export class Response {
    validProxies?: string[]
    invalidProxies?: string[]
    error?: string
	}
}
