import { Module } from '@nestjs/common';
import { GrassAccountService } from './grass-account.service';
import { ApiModule } from '../../infra/api/api.module';

@Module({
	imports: [ApiModule],
	providers: [GrassAccountService],
	exports: [GrassAccountService],
})
export class ServicesModule {}
