import { Injectable } from '@nestjs/common';
import {
  ApiCheckProxy,
  ApiCreateUser,
  ApiDeleteUser,
  ApiParseUserProxy,
} from '@dynastic-import-monorepository/contracts';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GrassAccountApi {
  private apiUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('API_URL');
    console.log()
  }

	async format(req: ApiParseUserProxy.Request): Promise<ApiParseUserProxy.Response> {
		try {
      const url = `${this.apiUrl}/api/grass-account/parse-proxies/${req.userId}`
      const response = await axios.post<ApiParseUserProxy.Response>(url, req.proxies, {
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'application/json',
        },
      })
      return response.data
    }
    catch (error) {
      return {
        userId: '',
        proxies: [],
        errorParse: 'Ошибка на стороне сервера(ручка форматирования)'
      };
    }
	}

  async check(req: ApiCheckProxy.Request): Promise<ApiCheckProxy.Response> {
    try {
      const url = `${this.apiUrl}/api/grass-account/${req.userId}/check-proxy`
      const response = await axios.get<ApiCheckProxy.Response>(url)
      return response.data
    }
    catch (error) {
      if (error.status === 404) {
        return {
          error: 'Пользователь не найден'
        }
      }
      return {
        error: 'Произошла ошибка при проверке прокси'
      }
    }
	}

  async create(req: ApiCreateUser.Request): Promise<ApiCreateUser.Response> {
    try {
      const url = `${this.apiUrl}/api/grass-account`;
      const response = await axios.post<ApiCreateUser.Response>(url, req)
      return response.data
    }
    catch (error) {
      return null;
    }
	}

  async delete(req: ApiDeleteUser.Request): Promise<ApiDeleteUser.Response> {
    try {
      const url = `${this.apiUrl}/api/grass-account/${req.userId}`;
      const response = await axios.delete<ApiDeleteUser.Response>(url)
      return response.data
    }
    catch (error) {
      return {
        message: '',
        error: 'Произошла ошибка при удалении'
      }
    }
	}
}
