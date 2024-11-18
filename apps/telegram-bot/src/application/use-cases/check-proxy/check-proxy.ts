import { Scene, SceneEnter } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';

@Scene(UseCasesEnum.CheckProxy)
export class CheckProxyUseCase {
  @SceneEnter()
  async sceneEnter() {
  }

}
