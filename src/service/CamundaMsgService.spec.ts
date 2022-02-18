process.env.CAMUNDA_ENGINE_ADDR = 'http://localhost:8080'
import CamundaMsgService from './CamundaMsgService';
let msgSvc: CamundaMsgService;


beforeAll(() => {
    msgSvc = new CamundaMsgService();
})

describe('#CamundaMessageService', () => {
    it('triggers camunda', async () => {
        const res = await msgSvc.initSyncForYard('yard01')
        console.log(res)
    })
})
