import { AddStep, Ctx, Scene, SceneEnter } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import {StepContext} from "@puregram/scenes";



export interface StartInterface extends Record<string, any> {
  activateCode: string;
}

export type StartContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.Start)
export class StartUseCase {

  @SceneEnter()
  async sceneEnter() {

  }

  @AddStep(0)
  async zeroStep(@Ctx() telegramContext: StartContext) {
    if (telegramContext.scene.step.firstTime) {
      return await telegramContext.send(UseCasesEnum.HelloMsg, {
        reply_markup: {
          resize_keyboard: true,
          remove_keyboard: true,
          keyboard: [
            [{text: UseCasesEnum.ActivateProxy}, {text: UseCasesEnum.DeleteProxy}],
            [{text: UseCasesEnum.CheckProxy}],
          ],
        },
      });
    }
    if (telegramContext.text === UseCasesEnum.ActivateProxy) {
      return await telegramContext.scene.enter(UseCasesEnum.ActivateProxy);
    }
    if (telegramContext.text === UseCasesEnum.DeleteProxy) {
      return await telegramContext.scene.enter(UseCasesEnum.DeleteProxy);
    }
    if (telegramContext.text === UseCasesEnum.CheckProxy) {
      return await telegramContext.scene.enter(UseCasesEnum.CheckProxy);
    }
  }




}
