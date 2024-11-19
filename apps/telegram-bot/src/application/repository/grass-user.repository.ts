import { GrassUserEntity } from '../../domain/grass-account/grass-user';

export abstract class GrassUserRepository {
	abstract delete(id: string): void;
	abstract findOne(id: string): Promise<GrassUserEntity>;
	abstract findManyGrassIds(telegramId: number): Promise<GrassUserEntity[]>;
}
