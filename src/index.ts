import path from 'path';
import dotenv from 'dotenv';
if (process.env.IS_LOCAL) {
    const envFilePath = path.join(__dirname, '..', '.env')
    console.log('loading env vars from path: ', envFilePath)
    dotenv.config({path: path.join(__dirname, '..', '.env')})
}
import {Client, logger} from 'camunda-external-task-client-js';
import {TOPIC} from './Interface';
import OauthHelper from './OauthHelper';
import NewCustomerPusher from './NewCustomerPusher';
import NewPurchasePusher from './NewPurchasePusher';
import SyncStatusRecorder from './SyncStatusRecorder';
import YardSyncTrigger from './YardSyncTrigger';


// create a Client instance with custom configuration
const client = new Client({baseUrl: `${process.env.CAMUNDA_ENGINE_ADDR}/engine-rest`, use: logger});

// new up the listener classes
const yardSyncTrigger = new YardSyncTrigger(TOPIC.START_PROCESS_FOR_YARD)
const setOauthHelper = new OauthHelper(TOPIC.SET_OAUTH_FOR_ORG)
const newCustomerPusher = new NewCustomerPusher(TOPIC.PUSH_NEW_CUSTOMERS)
const newInvoicePusher = new NewPurchasePusher(TOPIC.PUSH_NEW_PURCHASES)
const syncStatusRecorder = new SyncStatusRecorder(TOPIC.MARK_AS_SYNCED)

// set client listening on worker topics
yardSyncTrigger.listen(client);
setOauthHelper.listen(client);
newCustomerPusher.listen(client);
newInvoicePusher.listen(client);
syncStatusRecorder.listen(client);


console.log('CAMUNDA_ENGINE_ADDR is set to: ', process.env.CAMUNDA_ENGINE_ADDR)
