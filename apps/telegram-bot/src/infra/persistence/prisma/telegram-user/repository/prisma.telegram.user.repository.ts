import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { TelegramUserRepository } from '../../../../../application/repository/telegram-user-repository';
import { TelegramUserEntity } from '../../../../../domain/telegram-user';
import * as inspector from 'node:inspector';

@Injectable()
export class PrismaTelegramUserRepository implements TelegramUserRepository  {
	constructor(
    private prismaService: PrismaService) {}

  async create(buffMT: TelegramUserEntity): Promise<TelegramUserEntity> {
    try {
      const {id} = buffMT;
      const user = await this.prismaService.telegramUser.create({
        data: {
          id: id,
        }
      })
      return new TelegramUserEntity({
        id: id,
        limit: buffMT.limit,
      })
    }
    catch (error) {
      return null
    }
  }

  async find(id: number): Promise<TelegramUserEntity> {
    try {
      const user = await this.prismaService.telegramUser.findUnique({ where: { id: id } });
      if (user) {
        return new TelegramUserEntity({
          id: user.id as unknown as number,
          limit: user.limit
        });
      }
      return null
    }
    catch (error) {
      return null
    }
  }
}
