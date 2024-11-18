import { Injectable } from '@nestjs/common';
import { Ctx, Hears, Update } from 'nestjs-puregram';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { UseCasesEnum } from '../../../application/use-cases/use-cases.enum';

@Update()
@Injectable()
export class TelegramBotController {
	@Hears('/start')
	async start(@Ctx() telegramContext: TelegramContextModel): Promise<void> {
		await telegramContext.scene.enter(UseCasesEnum.Start);
	}
}

