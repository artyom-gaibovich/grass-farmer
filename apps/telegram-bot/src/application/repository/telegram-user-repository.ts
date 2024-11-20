import { TelegramUserEntity } from '../../domain/telegram-user';

export abstract class TelegramUserRepository {
  abstract create(buffMT: TelegramUserEntity): Promise<TelegramUserEntity>;
  abstract find(id: number): Promise<TelegramUserEntity>;
}
