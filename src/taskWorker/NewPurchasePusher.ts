import { Client, HandlerArgs, Variables } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from '../model/enums';
import QbService from '../service/QbService';
import { AxiosResponse } from 'axios';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';
import { SyncStatusMap } from '../model/SyncStatusMap';
import SyncFailReporter from '../utility/SyncFailReporter';


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

      let qbPushRes: AxiosResponse<InboundTicketEntity>;
      try {
        qbPushRes = await qbService.pushNewPurchase(
          ibtToPush,
          '4625319964620848278', // todo fix hard coded QB company ID
          <any>process.env.QB_AUTH_TOKEN, // todo actually get token
        );
      } //? unhappy path
      catch (e: any) {
        if (e.isAxiosError) {
          return failReporter.addSyncFailureToReport(
            handlerArgs,
            <never>ibtToPush.id,
            e
          );
        } // todo notify engine of failure if its an error but not axios
      }
      //? happy path
      let syncedEntities: SyncStatusMap = task.variables.get(PROCESS_VAR.SYNCED_ENTITIES);
      // if syncedEntities is undefined create it
      if (syncedEntities == undefined) {
        syncedEntities = { inboundTickets: [] };
      }
      // record that this entity was synced successfully
      if (ibtToPush.id != null) {
        syncedEntities.inboundTickets.push(ibtToPush.id);
      }
      const updatedVars = new Variables().set(PROCESS_VAR.SYNCED_ENTITIES, syncedEntities);
      await taskService.complete(task, updatedVars);
    });
  }

}

