import { Entity } from '../core/entities/entity';

export interface IGrassUser {
  id: string;
}

export class GrassUserEntity extends Entity<IGrassUser> {
  constructor(props: IGrassUser) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }
}
