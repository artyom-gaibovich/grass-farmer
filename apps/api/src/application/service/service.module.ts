import { Module } from '@nestjs/common';
import { GrassUserService } from './grass-user.service';
import { WsModule } from '../../infra/ws/ws.module';

@Module({
	imports: [WsModule],
	providers: [GrassUserService],
	exports: [GrassUserService],
})
export class ServiceModule {}
