import { Entity } from '../../core/entities/entity';

export interface GrassUser {
	userId: string;
	proxies: string[];
}

export class GrassUserEntity extends Entity<GrassUser> {
	constructor(props: GrassUser) {
		super(props);
	}

	get userId(): string {
		return this.props.userId;
	}

	get proxies(): string[] {
		return this.props.proxies;
	}
}
