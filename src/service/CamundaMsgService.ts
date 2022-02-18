import axios from 'axios';
import {MSG} from '../Interface';


export default class CamundaMsgService {
    async initSyncForYard(yardId: string) {

        const msgPayload = {
            messageName: MSG.SYNC_YARD_MSG,
            processVariables: {
                yardId: {
                    value: yardId,
                    type: 'String'
                }
            }
        }
        console.log(JSON.stringify(msgPayload))
        const msgRes = await axios.post(
            `${process.env.CAMUNDA_ENGINE_ADDR}/engine-rest/message`,
            msgPayload
        );
        console.log('msg response status: ', msgRes.status)

    }
}

