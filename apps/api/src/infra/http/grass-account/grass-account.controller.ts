import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiCreateUser, ApiDeleteUser, ApiParseUserProxy } from '@dynastic-import-monorepository/contracts';
import { GrassUserService } from '../../../application/service/grass-user.service';
import { ApiFindAllUser } from '../../../../../../libs/contracts/src/lib/api.find-all-user';

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
	async checkUserConnections(@Param('userId') userId: string) {
		return await this.grassUserService.checkConnections(userId);
	}
}
