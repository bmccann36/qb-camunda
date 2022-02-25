import dotenv from 'dotenv';

dotenv.config();
import { Connection } from 'typeorm';
import NewDataService from './NewDataService';
import initTypeOrm from '../initTypeOrm';
import AuthTokenService from './AuthTokenService';
import QBToken from 'intuit-oauth';


let target: AuthTokenService;
let conn: Connection;

beforeAll(async () => {
  conn = await initTypeOrm();
  target = new AuthTokenService(conn);
});

describe('#AuthTokenService', () => {
  it('gets auth token data for yard', async () => {
    const res = await target.getQbTokenForYard('00000000-0000-0000-0000-000000000000');
    console.log(res);
  });

  it('saves a yard\'s token', async () => {
    const token: Partial<QBToken> = {
      realmId: 'company123',
      token_type: 'bearer',
      access_token: 'xyz',
      refresh_token: 'refresh',
      expires_in: 3600,
      x_refresh_token_expires_in: 8675771,
      latency: 60000,
      createdAt: 1645753056440
    };
    const saveRes = await target.saveQbTokenForYard(token as any, '00000000-0000-0000-0000-000000000000', 'companyId');
    console.log(saveRes);

  });

  it('updates a yard credentials',  async() => {
    const refreshToken = '00000000-0000-0000-0000-000000000000';
    await target.updateToken(refreshToken)
  });

});
