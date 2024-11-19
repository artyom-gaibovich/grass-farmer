import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { TelegramModule } from 'nestjs-puregram';
import { TelegramBotModule } from './infra/http/telegram-bot/telegram-bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConstants } from './infra/constants/env.constants';
import { UseCasesModule } from './application/use-cases/use-cases.module';
import { ApiModule } from './infra/api/api.module';
import { ServicesModule } from './application/services/services.module';

@Module({
	imports: [
    HttpModule,
    ConfigModule.forRoot({isGlobal: true}),
    ApiModule,
    ServicesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
