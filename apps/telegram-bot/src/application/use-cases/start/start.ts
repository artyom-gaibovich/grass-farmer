import { AddStep, Ctx, Scene, SceneEnter, Use } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { StepContext } from '@puregram/scenes';
import { GrassAccountService } from '../../services/grass-account.service';

export interface StartInterface extends Record<string, any> {
	activateCode: string;
	activated: boolean;
}

export type StartContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.Start)
export class StartUseCase {
  constructor(private grassAccountService: GrassAccountService) {

  }

  @SceneEnter()
  async sceneEnter() {
    console.log()
  }



  @AddStep(0)
  async zeroStep(@Ctx() telegramContext: StartContext) {
    const {activated} = telegramContext.scene.state
    if (telegramContext.scene.step.firstTime) {
      return await telegramContext.send(!activated ? UseCasesEnum.HelloMsg : UseCasesEnum.Choose , {
        reply_markup: {
          resize_keyboard: true,
          remove_keyboard: true,
          keyboard: [
            [{text: UseCasesEnum.ActivateProxy}, {text: UseCasesEnum.DeleteProxy}],
            [{text: UseCasesEnum.CheckProxy}, {text: UseCasesEnum.CheckAllProxies}],
          ],
        },
      });
    }
    if (telegramContext.text === UseCasesEnum.ActivateProxy) {
      return await telegramContext.scene.enter(UseCasesEnum.ActivateProxy);
    }
    if (telegramContext.text === UseCasesEnum.DeleteProxy) {
      return await  telegramContext.scene.enter(UseCasesEnum.DeleteProxy);
    }
    if (telegramContext.text === UseCasesEnum.CheckProxy) {
      return await  telegramContext.scene.enter(UseCasesEnum.CheckProxy);
    }
    if (telegramContext.text === UseCasesEnum.CheckAllProxies) {
      return await telegramContext.send(await this.grassAccountService.findProxies(telegramContext.from.id))
    }

  }




}
