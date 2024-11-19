import { GrassUserEntity } from '../../domain/grass-user';

export abstract class GrassUserRepository {
  abstract findMany(telegramId: number): Promise<GrassUserEntity[]>
}
