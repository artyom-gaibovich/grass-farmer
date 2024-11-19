import { Module } from '@nestjs/common';
import { UseCasesEnum } from './use-cases.enum';
import { StartUseCase } from './start/start';
import { DeleteProxyUseCase } from './delete-proxy/delete-proxy';
import { CheckProxyUseCase } from './check-proxy/check-proxy';
import { ActivateProxyUseCase } from './activate-proxy/activate-proxy';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
	providers: [
		{
			provide: UseCasesEnum.Start,
			useClass: StartUseCase,
		},
		{
			provide: UseCasesEnum.ActivateProxy,
			useClass: ActivateProxyUseCase,
		},

		{
			provide: UseCasesEnum.DeleteProxy,
			useClass: DeleteProxyUseCase,
		},
		{
			provide: UseCasesEnum.CheckProxy,
			useClass: CheckProxyUseCase,
		},
	],
})
export class UseCasesModule {}
