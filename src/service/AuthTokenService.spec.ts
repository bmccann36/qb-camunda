import dotenv from 'dotenv';

dotenv.config();
import { Connection } from 'typeorm';
import NewDataService from './NewDataService';
import initTypeOrm from '../initTypeOrm';
import AuthTokenService from './AuthTokenService';


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
});
