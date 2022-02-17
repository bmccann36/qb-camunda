import {Client, logger} from "camunda-external-task-client-js";
import NotSyncedFetcher from "./NotSyncedFetcher";
import {TOPIC} from "./Interface";
import OauthHelper from "./OauthHelper";
import NewCustomerPusher from "./NewCustomerPusher";
import NewInvoicePusher from "./NewInvoicePusher";
import SyncStatusRecorder from "./SyncStatusRecorder";
import YardSyncTrigger from "./YardSyncTrigger";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {baseUrl: "http://localhost:8080/engine-rest", use: logger};

// create a Client instance with custom configuration
const client = new Client(config);

// new up the listener classes
const yardSyncTrigger = new YardSyncTrigger(TOPIC.START_PROCESS_FOR_YARD)
const notSyncedFetcher = new NotSyncedFetcher(TOPIC.GET_NOT_SYNCED_ENTITIES)
const setOauthHelper = new OauthHelper(TOPIC.SET_OAUTH_FOR_ORG)
const newCustomerPusher = new NewCustomerPusher(TOPIC.PUSH_NEW_CUSTOMERS)
const newInvoicePusher = new NewInvoicePusher(TOPIC.PUSH_NEW_INVOICES)
const syncStatusRecorder = new SyncStatusRecorder(TOPIC.MARK_AS_SYNCED)


// set client listening on worker topics
yardSyncTrigger.listen(client);
// notSyncedFetcher.listen(client);
setOauthHelper.listen(client);
newCustomerPusher.listen(client);
newInvoicePusher.listen(client);
syncStatusRecorder.listen(client);
