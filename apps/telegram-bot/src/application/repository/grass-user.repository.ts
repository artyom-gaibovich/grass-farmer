import { GrassUserEntity } from '../../domain/grass-user';

export abstract class GrassUserRepository {
  abstract findMany(telegramId: number): Promise<GrassUserEntity[]>
  abstract create(telegramId: number, grassId: string): Promise<string>
}
