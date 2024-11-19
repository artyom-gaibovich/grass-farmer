import { UseCasesEnum } from '../use-cases.enum';
import { AddStep, Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-puregram';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { ActivateProxyEnum } from './activate-proxy.enum';
import { StepContext } from '@puregram/scenes';
import { GrassAccountService } from '../../services/grass-account.service';

export interface StartInterface extends Record<string, any> {
  userId: string;
  proxies: string;
}

export type ActivateProxyContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.ActivateProxy)
export class ActivateProxyUseCase {

  constructor(private grassService: GrassAccountService) {
  }

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
    console.log()
  }

  @SceneLeave()
  async leave(@Ctx() context: ActivateProxyContext): Promise<unknown> {
    return await context.scene.enter(UseCasesEnum.Start, {
      state: {
        activated: true,
      }
    });
  }


  @AddStep()
  async zeroStep(@Ctx() telegramContext: ActivateProxyContext) {
    if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
      return telegramContext.send('Отправь свой userId', {
        reply_markup: {
          remove_keyboard: true,
        }
      });
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
    const { userId, proxies } = telegramContext.scene.state;
    const msg = await this.grassService.create(userId, proxies, telegramContext.from.id)
    await telegramContext.send(`${msg}`);
    return telegramContext.scene.step.next();
  }

}
