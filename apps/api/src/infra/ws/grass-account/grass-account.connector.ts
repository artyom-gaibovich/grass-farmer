import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, v3 as uuidv3} from "uuid"
import {WebSocket} from 'ws';
import {SocksProxyAgent} from 'socks-proxy-agent'
import { logger } from 'nx/src/utils/logger';
import { configGrassAccount } from './config/grass-account.config';

@Injectable()
export class GrassAccountConnector {

  async connect(userId: string, socks5Proxy: string): Promise<any> {
    const deviceId = uuidv3(socks5Proxy, uuidv3.DNS);
    logger.info(`Connecting user: ${userId} with deviceId: ${deviceId} via proxy: ${socks5Proxy}`);

    const customHeaders = {
      "User-Agent": configGrassAccount["User-Agent"]
    };
    const uri = "wss://proxy2.wynd.network:4444/";
    const agent = new SocksProxyAgent(socks5Proxy);
    const ws = new WebSocket(uri, {
      agent: agent,
      headers: {
        "Origin": configGrassAccount["Origin"],
        "User-Agent": customHeaders["User-Agent"]
      },
      rejectUnauthorized: false
    });
    ws.on('open', () => {
      logger.info(`WebSocket opened for user: ${userId} with proxy: ${socks5Proxy}`);
      const sendPing = () => {
        const sendMessage = JSON.stringify({
          id: uuidv4(),
          version: "1.0.0",
          action: "PING",
          data: {}
        });
        logger.debug(`Sending PING: ${sendMessage}`);
        ws.send(sendMessage);
        setTimeout(sendPing, 110000);
      };
      sendPing();
    });
    ws.on('message', (data: string) => {
      const message = JSON.parse(data);
      logger.info(`Message received for user: ${userId}:${message}`);

      if (message.action === "AUTH") {
        const authResponse = {
          id: message.id,
          origin_action: "AUTH",
          result: {
            browser_id: deviceId,
            user_id: userId,
            user_agent: customHeaders['User-Agent'],
            timestamp: Math.floor(Date.now() / 1000),
            device_type: "extension",
            version: "4.26.2",
            extension_id: configGrassAccount.extension_id
          }
        };
        logger.debug(`Sending AUTH response: ${JSON.stringify(authResponse)}`);
        ws.send(JSON.stringify(authResponse));
      } else if (message.action === "PONG") {
        const pongResponse = { id: message.id, origin_action: "PONG" };
        logger.debug(`Sending PONG response: ${JSON.stringify(pongResponse)}`);
        ws.send(JSON.stringify(pongResponse));
      }
    });
    ws.on('close', () => {
      logger.warn(`WebSocket closed for user: ${userId}`);
    });
    ws.on('error', (error) => {
      logger.error(`Error for user: ${userId} - ${error.message}`);
    });
    return ws;
  }
}
