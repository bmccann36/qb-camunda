import axios, { AxiosResponse } from 'axios';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';

export default class QbService {

  async pushNewPurchase(ibt: InboundTicketEntity, qbCompanyId: string, authToken: string):
    Promise<AxiosResponse> {
    const data = {
      PaymentType: 'Check',
      AccountRef: {
        name: 'Checking', //todo make dynamic
        value: '35'
      },
      DocNumber: ibt.externalId,
      PrivateNote: 'auto-synced by Greenspark application',
      Line: [
        {
          DetailType: 'AccountBasedExpenseLineDetail',
          Amount: String(ibt.netCost),
          AccountBasedExpenseLineDetail: {
            AccountRef: {
              name: 'Purchases', // todo make dynamic
              value: '78'
            }
          }
        }
      ]
    };
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };
    const url = `${process.env.QB_HOST}/${qbCompanyId}/purchase`;
    return axios.post(url, data, config);
  }
}
