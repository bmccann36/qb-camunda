import type {Connection} from 'typeorm';
import {getRepository} from 'typeorm';
import {InboundTicketEntity} from '../entity/InboundTicketEntity';


export default class NewDataService {

    constructor(private dbConn: Connection) {
    }

    async getNewData(yardId: string) {
        const ibtRepo = getRepository(InboundTicketEntity);
        const res = await ibtRepo.find(
            {where: {yardId: yardId}}
        );
        console.log(res.length);
    }
}
