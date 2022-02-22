import path from 'path';
import dotenv from 'dotenv';

if (process.env.IS_LOCAL) {
  const envFilePath = path.join(__dirname, '..', '.env');
  console.log('loading env vars from path: ', envFilePath);
  dotenv.config({ path: envFilePath });
}
import 'reflect-metadata';
import { Client, logger } from 'camunda-external-task-client-js';
import { TOPIC } from './model/enums';
import initTypeOrm from './initTypeOrm';
import YardSyncTrigger from './taskWorker/YardSyncTrigger';
import SyncStatusRecorder from './taskWorker/SyncStatusRecorder';
import NewDataFinder from './taskWorker/NewDataFinder';
import OauthHelper from './taskWorker/OauthHelper';
import NewPurchasePusher from './taskWorker/NewPurchasePusher';
import NewCustomerPusher from './taskWorker/NewCustomerPusher';


(async () => {
  await initTypeOrm();
  // create a Client instance with custom configuration
  const client = new Client({
    baseUrl: `${process.env.CAMUNDA_ENGINE_ADDR}/engine-rest`,
    lockDuration: process.env.TASK_LOCK_DURATION ? +process.env.TASK_LOCK_DURATION : 5000,
    use: logger
  });
  // new up the listener classes
  const yardSyncTrigger = new YardSyncTrigger(TOPIC.START_PROCESS_FOR_YARD);
  const setOauthHelper = new OauthHelper(TOPIC.SET_OAUTH_FOR_ORG);
  const newCustomerPusher = new NewCustomerPusher(TOPIC.PUSH_NEW_CUSTOMERS);
  const newInvoicePusher = new NewPurchasePusher(TOPIC.PUSH_NEW_IBT);
  const syncStatusRecorder = new SyncStatusRecorder(TOPIC.MARK_AS_SYNCED);
  const newDataFinder = new NewDataFinder(TOPIC.FIND_NEW_DATA);

  // set client listening on worker topics
  yardSyncTrigger.listen(client);
  setOauthHelper.listen(client);
  newDataFinder.listen(client);
  newCustomerPusher.listen(client);
  newInvoicePusher.listen(client);
  syncStatusRecorder.listen(client);

  //! dummy topic for clearing out process executions
  // client.subscribe('NOT_EXISTS', async function ({ task, taskService }) {
  //   return taskService.complete(task);
  // });

  console.log('CAMUNDA_ENGINE_ADDR is set to: ', process.env.CAMUNDA_ENGINE_ADDR);
})();









