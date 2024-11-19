import { Entity } from '../core/entities/entity';

export interface ITelegramUser {
	id: number;
}

export class TelegramUserEntity extends Entity<ITelegramUser> {
	constructor(props: ITelegramUser) {
		super(props);
	}

	get id(): number {
		return this.props.id;
	}
}
