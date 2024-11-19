import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GrassUserRepository } from '../../../../../application/repository/grass-user.repository';
import { GrassUserEntity } from '../../../../../domain/grass-user';

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
      if (grasses.length === 0) {
        return null;
      }
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

}
