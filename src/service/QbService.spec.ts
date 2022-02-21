// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import QbService from './QbService';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';

let target: QbService;

beforeAll(async () => {
  target = new QbService();
});

describe('#QbService', () => {
  it('pushes a purchase to quickbooks', async () => {
    const testIbt: Partial<InboundTicketEntity> = {
      netCost: '200',
      id: 'testIBT'
    };
    const companyId = '4625319964620848278';
    const res = await target.pushNewPurchase(
      testIbt as InboundTicketEntity,
      companyId,
      getAuthToken()
    );
    console.log(res.status);
  });
});


function getAuthToken() {
  return 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..62wT_7PJ2egjlOqppFlYqQ.0zAqswqsL-b33ZLz7CZ3oq1fuhmOqok0gdJ2fTtgb6EIS1DQTyfrPhyYr2kwu1jljojI9pCqG-I8-kzv3QyEajTe46rucrEWu9A1EdaRExxX-hFjwro6YyR3EG1KIcXkLOs_-uhAkQkF0X3d4CcYS9QBEGUt2NHvZcolETFemgkDqcsH_sD609m29WZme4hOaWWQNnwSlMQ1uAZEg5VXUFtXq3tkgw8109WyVfHDLrE8gT4WVMdAFJrU7k4fvjsxRLped7fWrBaMz0318GTB3ZlC2ZtrOB1giLXAgRxtqctYzzlVO6PoC5aJIwmnfAShb9vdx_bZv16HRMohG4I-URJAYfH0gFgCxjbqlRyZW_zLsivvTnE5p12cMBKETyZ-kTpK5KOwirrfh4TCY3enCBOpLa7iYnF0uLpDcLjfwEfzFIfGYHaWIgJHGsLzOw5j7U_fA3PR19b3MPd4goZYpRZs0GlMZGxDw6pRRb7DBSYg785uZNyScnWVaHve-oOC-aoQBeG9J_iiI8pKaz-BgVvwch9JZ1vwQi5mDFekGGgVQ2UvjSf6zMH-IL3KpKb0AjnuoVJIJxznpK6w60OHTYUD9GqG4OkyF5s0syQli_LEKYY0VAuBwsRt8_90UcRn15xYWhFku8YppHBYoSme3RmVhZRqyo268vkuEC_UrwO5y-XTe8iHS7mutIi9sjrcfdmHjyEGcUHASf-IpwaTz8jJ03JtpnN2j7vzJzA-bjSDyhDGpT9v5EVjIHXFt0tv.3gX6W2vOPxtF5N5RfwwxyQ';
}
