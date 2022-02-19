import {getConnection} from 'typeorm';

process.env.CAMUNDA_ENGINE_ADDR = 'http://localhost:8080';
import CamundaMsgService from './CamundaMsgService';

let msgSvc: CamundaMsgService;


beforeAll(() => {
    msgSvc = new CamundaMsgService();
});
afterAll(() => {
    const dbConn = getConnection();
    dbConn.close();
});

describe('#CamundaMessageService', () => {
    it('triggers camunda', async () => {
        const res = await msgSvc.initSyncForYard('yard01');
        console.log(res);
    });
});
