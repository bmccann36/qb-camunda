import { Client, HandlerArgs, Variables } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from '../model/enums';
import QbService from '../service/QbService';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';
import SyncFailReporter from '../utility/SyncFailReporter';
import { YardQbAuthInfo } from '../model/YardQbAuthInfo';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_IBT> {
  qbService: QbService = new QbService();
  syncFailReporter: SyncFailReporter = new SyncFailReporter();

  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {
    const qbService = this.qbService;
    const failReporter = this.syncFailReporter;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      const ibtToPush: InboundTicketEntity = task.variables.get(PROCESS_VAR.INBOUND_TICKET);

      console.log(`pushing ticket ${ibtToPush.id} as QB purchase`);
      console.log('current loop iter: ', task.variables.get('loopCounter'));

      const yardQbAuthInfo: YardQbAuthInfo = task.variables.get(PROCESS_VAR.QB_CREDENTIALS);

      try {
        await qbService.pushNewPurchase(
          ibtToPush,
          yardQbAuthInfo.qbCompanyId,
          yardQbAuthInfo.accessToken,
        );
      } //? unhappy path
      catch (syncIbtError: any) {
        if (syncIbtError.isAxiosError) {
          return failReporter.addSyncFailureToReport<InboundTicketEntity>(
            handlerArgs,
            ibtToPush,
            PROCESS_VAR.NOT_SYNCED_IBTS,
            syncIbtError
          );
        } // todo notify engine of failure if its an error but not axios
      }
      //? happy path
      const updatedVars = new Variables();
      const syncedIBTids: string[] = task.variables.get(PROCESS_VAR.SYNCED_IBT_IDS);
      // if syncedEntities is undefined create it
      if (syncedIBTids == undefined) {
        updatedVars.set(PROCESS_VAR.SYNCED_IBT_IDS, [ibtToPush.id]);
      } else { // push to array if exists
        syncedIBTids.push(<any>ibtToPush.id);
        updatedVars.set(PROCESS_VAR.SYNCED_IBT_IDS, syncedIBTids);
      }
      await taskService.complete(task, updatedVars);
    });
  }

}

