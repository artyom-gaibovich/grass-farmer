import { UseCasesEnum } from '../use-cases.enum';
import { AddStep, Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-puregram';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { ActivateProxyEnum } from './activate-proxy.enum';
import { StepContext } from '@puregram/scenes';

export interface StartInterface extends Record<string, any> {
  userId: string;
  proxies: string;
}

export type ActivateProxyContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.ActivateProxy)
export class ActivateProxyUseCase {
  private async initialMsg(telegramContext: TelegramContextModel) {
    return await telegramContext.send(ActivateProxyEnum.HelloMsg, {
      reply_markup: {
        resize_keyboard: true,
        remove_keyboard: true,
        keyboard: [
          [{text: ActivateProxyEnum.FirstMsg}],
          [{text: ActivateProxyEnum.Exit}]
        ],
      },
    });
  }

  @SceneEnter()
  async sceneEnter() {
  }

  @SceneLeave()
  leave(@Ctx() context: ActivateProxyContext): Promise<unknown> {
    return context.send('Goobye!');
  }


  @AddStep()
  async zeroStep(@Ctx() telegramContext: ActivateProxyContext) {
    if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
      return telegramContext.send('Отправь свой userId');
    }
    telegramContext.scene.state.userId = telegramContext.text;
    return telegramContext.scene.step.next();
  }

  @AddStep()
  async firstStep(@Ctx() telegramContext: ActivateProxyContext) {
    if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
      return telegramContext.send('Отправь свои Proxies');
    }
    telegramContext.scene.state.proxies = telegramContext.text;
    return telegramContext.scene.step.next();
  }

  @AddStep()
  async echo(@Ctx() telegramContext: ActivateProxyContext): Promise<unknown> {
    const { firstName, age } = telegramContext.scene.state;

    await telegramContext.send(`You are ${firstName} ${age} years old!`);

    return telegramContext.scene.step.next();
  }

}
