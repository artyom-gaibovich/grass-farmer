import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './infra/api/api.module';
import { ServicesModule } from './application/services/services.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
	imports: [
		HttpModule,
		PersistenceModule.register({
			type: 'prisma',
			global: true,
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		ApiModule,
		ServicesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
