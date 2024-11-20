import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GrassUserRepository } from '../../../../../application/repository/grass-user.repository';
import { GrassUserEntity } from '../../../../../domain/grass-user';
import { TelegramUserEntity } from '../../../../../domain/telegram-user';

@Injectable()
export class PrismaGrassUserRepository implements GrassUserRepository {
	constructor(private prismaService: PrismaService) {}


	async findMany(telegramId: number): Promise<GrassUserEntity[]> {
    try {
      const grasses = await this.prismaService.telegramUsersToGrassAccounts.findMany({
        where: {
          telegram_user_id: telegramId,
        },
      });
      return grasses.map(
        (el) =>
          new GrassUserEntity({
            id: el.grass_user_id,
          }),
      );

    }
    catch (error) {
      return null;
    }

	}

  async findOne(telegramId: number): Promise<TelegramUserEntity> {
    try {
      const user = await this.prismaService.telegramUser.findUnique({
        where: {
          id: telegramId,
        }
      })
      if (!user) {
        return null;
      }
      return new TelegramUserEntity({
        limit: user.limit,
        id: user.id as unknown as number,
      })
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(telegramId: number, grassId: string): Promise<string> {
    try {
      const result = await this.prismaService.telegramUsersToGrassAccounts.create({
        data: {
          telegram_user_id: telegramId,
          grass_user_id: grassId,
        }
      })
      if (!result) {
        return null;
      }
      return grassId
    }
    catch (error) {

    }
  }

}
