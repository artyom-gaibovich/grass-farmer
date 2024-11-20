import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { GrassAccountController } from './infra/http/grass-account/grass-account.controller';
import { HttpModule } from './infra/http/http.module';
import { WsModule } from './infra/ws/ws.module';
import { ServiceModule } from './application/service/service.module';
import { RepositoryModule } from './application/repository/repository.module';
import { PersistenceModule } from './infra/persistance/persistence.module';
import { GrassUserService } from './application/service/grass-user.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
    ScheduleModule.forRoot(),
		HttpModule,
		WsModule,
		ServiceModule,
		RepositoryModule,
		PersistenceModule.register({
			type: 'prisma',
			global: true,
		}),
	],
	controllers: [GrassAccountController],
	providers: [],
})
export class AppModule {}
