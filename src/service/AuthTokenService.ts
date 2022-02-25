import { Connection, getRepository } from 'typeorm';
import { ErpToolCredsEntity } from '../entity/ErpToolCredsEntity';
import QBToken from 'intuit-oauth';
import OAuthClient from 'intuit-oauth';
import QBResponse from 'intuit-oauth';
import { YardQbAuthInfo } from '../model/YardQbAuthInfo';

export default class AuthTokenService {
  oauthClient = new OAuthClient({
    clientId: process.env.QB_CLIENT_ID,
    clientSecret: process.env.QB_CLIENT_SECRET,
    environment: process.env.QB_ENVIRONMENT,
  });

  constructor(private dbConn: Connection) {

  }

  async updateToken(yardId: string): Promise<YardQbAuthInfo> {
    const yardToken: ErpToolCredsEntity = await this.getQbTokenForYard(yardId);
    const refreshRes: QBResponse = await this.oauthClient
      .refreshUsingToken(yardToken?.qbRefreshToken);
    await this.saveQbTokenForYard(refreshRes.token, yardId, <string>yardToken.qbCompanyId);
    return {
      accessToken: refreshRes.token.access_token,
      qbCompanyId: <string>yardToken.qbCompanyId
    };
  }

  async getQbTokenForYard(yardId: string): Promise<ErpToolCredsEntity> {
    const tokenRepo = getRepository(ErpToolCredsEntity);
    const res = await tokenRepo.findOne({ where: { yardId } });
    if (res) return res;
    else throw Error('error fetching yard credentials');
  }

  async saveQbTokenForYard(qbTkn: QBToken, yardId: string, qbCompanyId: string): Promise<ErpToolCredsEntity> {
    // map QB format token response to db Entity
    const tkn = new ErpToolCredsEntity();
    tkn.yardId = yardId;
    tkn.qbAccessToken = qbTkn.access_token;
    tkn.qbRefreshToken = qbTkn.refresh_token;
    tkn.qbCompanyId = qbCompanyId;
    tkn.qbRefreshTokenEpiresIn = qbTkn.x_refresh_token_expires_in;
    tkn.qbCreatedAt = new Date(qbTkn.createdAt);

    const repo = getRepository(ErpToolCredsEntity);
    return repo.save(tkn);

  }
}
