import axios from 'axios';

const ENGINE_URL = 'http://localhost:8080/engine-rest/message';

export default class CamundaMsgService {

    async sendMsg() {
        console.log('inside msg service')
        const msgRes = await axios.post(ENGINE_URL,
            {
                "messageName": "SYNC_YARD_MSG",
                "processVariables": {
                    "aVariable": {
                        "value": "aNewValue",
                        "type": "String"
                    }
                }
            });
        console.log(msgRes.status)
        console.log(msgRes.data)

    }
}


// const svc = new CamundaMsgService()
// svc.sendMsg()
