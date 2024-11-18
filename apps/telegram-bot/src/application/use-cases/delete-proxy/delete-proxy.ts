import { Scene, SceneEnter } from 'nestjs-puregram';
import { UseCasesEnum } from '../use-cases.enum';


@Scene(UseCasesEnum.DeleteProxy)
export class DeleteProxyUseCase {
  @SceneEnter()
  async sceneEnter() {
  }

}
