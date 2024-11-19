import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TelegramUserRepository } from '../../../application/repository/telegram-user-repository';
import { PrismaTelegramUserRepository } from './telegram-user/repository/prisma.telegram.user.repository';
import { GrassUserRepository } from '../../../application/repository/grass-user.repository';
import { PrismaGrassUserRepository } from './telegram-user/repository/prisma.grass.user.repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: TelegramUserRepository,
			useClass: PrismaTelegramUserRepository,
		},
    {
      provide: GrassUserRepository,
      useClass: PrismaGrassUserRepository,
    },
	],
	exports: [PrismaService, TelegramUserRepository, GrassUserRepository],
})
export class PrismaModule {}
