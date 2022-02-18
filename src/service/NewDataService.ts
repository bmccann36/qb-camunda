import type {Connection} from 'typeorm'
import {getRepository} from 'typeorm';
import {InboundTicketEntity} from '../entity/InboundTicketEntity';


export default class NewDataService {

    constructor(private dbConn: Connection) {
    }

    async getNewData() {
        const ibtRepo = getRepository(InboundTicketEntity);
        // todo -- actually find the right stuff
        const res = await ibtRepo.findOne({
                where: {
                    id: 'a96c2728-7471-4263-99e8-8ac32d580167',
                }
            }
        )
        console.log(res)
    }
}
