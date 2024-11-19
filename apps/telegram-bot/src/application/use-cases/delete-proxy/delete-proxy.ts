import { AddStep, Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';
import { TelegramContextModel } from '@grass-farmer/interfaces';
import { StepContext } from '@puregram/scenes';
import { GrassAccountService } from '../../services/grass-account.service';

export interface StartInterface extends Record<string, any> {
	userId: string;
}

export type DeleteProxyContext = TelegramContextModel & StepContext<StartInterface>;


@Scene(UseCasesEnum.DeleteProxy)
export class DeleteProxyUseCase {

  constructor(private grassService: GrassAccountService) {
  }

  @SceneEnter()
  async sceneEnter() {

  }
  @SceneLeave()
  async leave(@Ctx() context: DeleteProxyContext): Promise<unknown> {
    return await context.scene.enter(UseCasesEnum.Start, {
      state: {
        activated: true,
      }
    });
  }
  @AddStep()
  async firstStep(@Ctx() telegramContext: DeleteProxyContext) {
    if (telegramContext.scene.step.firstTime || !telegramContext.hasText) {
      return telegramContext.send('Отправь свой userId', {
        reply_markup: {
          remove_keyboard: true
        }
      });
    }
    telegramContext.scene.state.userId = telegramContext.text;
    return telegramContext.scene.step.next();
  }
  @AddStep()
  async echo(@Ctx() telegramContext: DeleteProxyContext): Promise<unknown> {
    const { userId } = telegramContext.scene.state;
    const msg = await this.grassService.delete(userId)
    await telegramContext.send(`${msg}`);
    return telegramContext.scene.step.next();
  }


}
