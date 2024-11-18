import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot/telegram-bot.controller';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { TelegramModule } from 'nestjs-puregram';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConstants } from '../constants/env.constants';

@Module({
	controllers: [],
	imports: [
		TelegramBotModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				token: configService.get(EnvConstants.BotToken),
			}),
		}),
	],
})
export class HttpModule {}
