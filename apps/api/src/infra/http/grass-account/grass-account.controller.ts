import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  ApiCheckProxy,
  ApiCreateUser,
  ApiDeleteUser,
  ApiParseUserProxy,
} from '@dynastic-import-monorepository/contracts';
import { GrassUserService } from '../../../application/service/grass-user.service';
import { ApiFindAllUser } from '../../../../../../libs/contracts/src/lib/api/api.find-all-user';
import { ApiParseAndCreateProxy } from '../../../../../../libs/contracts/src/lib/api/api.parse-and-create-proxy';

@Controller('grass-account')
export class GrassAccountController {
	constructor(private grassUserService: GrassUserService) {}


  @Get('init')
  public async initUser() {
    return await this.grassUserService.initializeUsers()
  }

	@Post('parse-proxies/:userId')
	public async parseUserProxies(@Param('userId') userId: string, @Body() body: string, @Req() req: any): Promise<ApiParseUserProxy.Response> {
		return await this.grassUserService.parseProxies(body, userId);
	}


  @Post('parse-and-create/:userId')
  public async sendProxies(@Param('userId') id: string, @Body() body: string, @Req() req: any): Promise<ApiParseAndCreateProxy.Response> {
    const {proxies, userId} = await this.grassUserService.parseProxies(body, id);
    return await this.grassUserService.create(userId, proxies);
  }


  @Post()
	public async create(
		@Body() { userId, proxies }: ApiCreateUser.Request,
	): Promise<ApiCreateUser.Response> {
		return await this.grassUserService.create(userId, proxies);
	}

	@Delete(':userId')
	public async delete(@Param('userId') userId: string): Promise<ApiDeleteUser.Response> {
		return await this.grassUserService.delete(userId);
	}

	@Get()
	public async findAll(): Promise<ApiFindAllUser.Response> {
		return this.grassUserService.findAll();
	}

	@Get(':userId/check-proxy')
	async checkUserConnections(@Param('userId') userId: string): Promise<ApiCheckProxy.Response> {
		return await this.grassUserService.checkConnections(userId);
	}
}
