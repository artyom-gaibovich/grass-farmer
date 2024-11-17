import { Module } from '@nestjs/common';
import { GrassAccountController } from './grass-account/grass-account.controller';
import { ServiceModule } from '../../application/service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [GrassAccountController]
})
export class HttpModule {}
