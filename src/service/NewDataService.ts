import type { Connection } from 'typeorm';
import { getRepository } from 'typeorm';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';
import { NewData } from '../model/NewData';

export default class NewDataService {
  constructor(private dbConn: Connection) {
  }

  async getNewData(yardId: string): Promise<NewData> {
    const newIbts = await this.getNewIbts(yardId);
    return {
      inboundTickets: newIbts,
    };
  }

  private async getNewIbts(yardId: string): Promise<InboundTicketEntity[]> {
    const ibtQuery = getRepository(InboundTicketEntity)
      .createQueryBuilder('t')
      .where({ yardId: yardId })
      .select(['t.id', 't.externalId', 't.netCost', 't.customerId', 't.averageCostPerUnit']);

    return ibtQuery.getMany();
  }
}
