import { Injectable } from '@nestjs/common';
import { Ctx, Hears, Update } from 'nestjs-puregram';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { UseCasesEnum } from '../../../application/use-cases/use-cases.enum';
import { CreateTelegramUserUseCase } from '../../../application/use-cases/create-telegram-user/create-telegram-user';
import { CreateTelegramUserEnum } from '../../../application/use-cases/create-telegram-user/create-telegram-user.enum';

@Update()
@Injectable()
export class TelegramBotController {
  constructor(private createTelegramUserUseCase:  CreateTelegramUserUseCase) {
  }
	@Hears('/start')
	async start(@Ctx() telegramContext: TelegramContextModel): Promise<unknown> {
    const id = telegramContext.from.id;
    const {msg} = await this.createTelegramUserUseCase.create({
      id: id
    })
/*    if (msg === CreateTelegramUserEnum.AlreadyExisted) {
      return telegramContext.send(msg)
    }*/
    if (msg === CreateTelegramUserEnum.ErrorRegister) {
      return telegramContext.send(msg)
    }
		await telegramContext.scene.enter(UseCasesEnum.Start);
	}
}

