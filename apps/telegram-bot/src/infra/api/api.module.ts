import { Module } from '@nestjs/common';
import { GrassAccountApi } from './grass-account.api';

@Module({
  providers: [GrassAccountApi],
  exports: [GrassAccountApi],
})
export class ApiModule {}
