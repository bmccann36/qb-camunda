import dotenv from 'dotenv';

dotenv.config();
import { Connection } from 'typeorm';
import NewDataService from './NewDataService';
import initTypeOrm from '../initTypeOrm';


let target: NewDataService;
let conn: Connection;

beforeAll(async () => {
  conn = await initTypeOrm();
  target = new NewDataService(conn);
});

describe('#NewDataService', () => {
  it('gets new data to be synced from DB', async () => {
    const res = await target.getNewData('00000000-0000-0000-0000-000000000000');
    console.log(res);
  });
});
