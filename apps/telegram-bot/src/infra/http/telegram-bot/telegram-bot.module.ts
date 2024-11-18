import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { UseCasesModule } from '../../../application/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  providers: [TelegramBotController]
})
export class TelegramBotModule {}
