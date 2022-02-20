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
  return 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..KvGZ90GNad2ZgnT9ORssjg.HfYkTjVd0W9pqb2mIkH3tflPpsDq6BOdP6xDAk9paiEmv1TvcAlteNjXZkjA04-QLzPwONZQgkJsgGcgGtECF0ysG7zaSJx5RlQGwuMjM5O5UJAIX87G0ry0261JuNF19OdAY_Q7Djvhcdc5KzFxvEjygyO0grr7k0O2ssWOl6NVBmC8cFe4WRAcHYaSxghypsso77A8oJpUxIkyWns1TwC3uex0INU1NOg468fmrznh7shexx6rzNtVrN-B2yTa6pnjSTnZ9Oebg4dSSu5Aq7Gx9IpKoH0I1C_49HhlJh23Ae1xgYoC6TnBHHATrUZ-bRQi0yfVIJlYmLycm6yIvXaFaBVOQq5M31LSd6d9XbxjdiAjJhXuiX1lsO0DxbLcPmZ7XW0jE9XT9WPQI-BCVMXYu9WZ9WCdo7xoBEW7qbrq-dWZjtiERdfqcaQnLBeiWl4qFqZFWpYAMA0Brc-WLe8qCn9uT_cbjWwICAo4w-hKsDkTso8zYvy6El3ijtk0J92ILUSf3mFfXhJOj4sCOiRfYv1iQfjF5gg2zzc9WTGNBoaxbIwApSL9DvfsCJF6EXAtbLMF4yxXjlVkUSLH5k9riRNj5z-fe8GJqj60NsVEbQ6Y7wvmIJ5OQPjfIhvoOZ5viIJ_-wKyp_EICHxp07M_ALUCpOs26XTrmHTJCaH0d1fL6tTaUgt5Mtm1KAB8gQbJ2ZWlf1jo2qBeaPlGR_LlOff63bW61u4xl5T9yExR-9MZgfyRLyXMGm278DyU.oT0Xr9VJafJVzxpVxSShDQ';
}
