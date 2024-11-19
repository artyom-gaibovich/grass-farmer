import { AddStep, Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { StepContext } from '@puregram/scenes';
import { GrassAccountService } from '../../services/grass-account.service';

export interface StartInterface extends Record<string, any> {
	userId: string;
}

export type CheckProxyContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.CheckProxy)
export class CheckProxyUseCase {

  constructor(private grassService: GrassAccountService) {
  }

  @SceneEnter()
  async sceneEnter() {
  }

  @SceneLeave()
  async leave(@Ctx() context: CheckProxyContext): Promise<unknown> {
    return await context.scene.enter(UseCasesEnum.Start, {
      state: {
        activated: true,
      }
    });
  }

  @AddStep()
  async firstStep(@Ctx() telegramContext: CheckProxyContext) {
    if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
      return telegramContext.send('Отправь свой userId для проверки', {
        reply_markup: {
          remove_keyboard: true
        }
      });
    }
    telegramContext.scene.state.userId = telegramContext.text;
    return telegramContext.scene.step.next();
  }

  @AddStep()
  async echo(@Ctx() telegramContext: CheckProxyContext): Promise<unknown> {
    const { userId } = telegramContext.scene.state;

    const msg = await this.grassService.check(userId)
    await telegramContext.send(`${msg}`);
    return telegramContext.scene.step.next();
  }


}
