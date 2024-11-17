import { Module } from '@nestjs/common';
import { GrassAccountController } from './infra/http/grass-account/grass-account.controller';
import { HttpModule } from './infra/http/http.module';
import { WsModule } from './infra/ws/ws.module';
import { ServiceModule } from './application/service/service.module';
import { RepositoryModule } from './application/repository/repository.module';

@Module({
  imports: [HttpModule, WsModule, ServiceModule, RepositoryModule],
  controllers: [GrassAccountController],
  providers: [],
})
export class AppModule {}
