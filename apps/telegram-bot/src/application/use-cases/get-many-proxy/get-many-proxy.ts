import { Injectable } from '@nestjs/common';
import { GrassAccountService } from '../../services/grass-account.service';

@Injectable()
export class GetManyProxyUseCase {
  constructor(private grassService: GrassAccountService) {
  }
  async get(telegramId: number) {
    return await this.grassService.findProxies(telegramId)
  }
}
