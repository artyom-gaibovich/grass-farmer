import { Module } from '@nestjs/common';
import { GrassAccountConnector } from './grass-account/grass-account.connector';

@Module({
  providers: [GrassAccountConnector],
  exports: [GrassAccountConnector]
})
export class WsModule {}
