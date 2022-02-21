import { Client, HandlerArgs, Variables, logger, Task } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR, BPM_ERR_CODE } from '../model/enums';
import QbService from '../service/QbService';
import { AxiosResponse } from 'axios';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';
import { AxiosError } from 'axios';
import { SyncStatusMap } from '../model/SyncStatusMap';
import { SyncFailDetails, SyncFailDetailMap } from '../model/SyncFailDetailMap';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_IBT> {
  qbService: QbService = new QbService();

  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {

    const qbService = this.qbService;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      const ibtToPush: InboundTicketEntity = task.variables.get(PROCESS_VAR.INBOUND_TICKET);

      console.log(`pushing ticket ${ibtToPush.id} as QB purchase`);
      console.log(task.variables.get('loopCounter'));
      // console.log(ibtToPush);
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
          let notSyncedEntities: SyncFailDetailMap = task.variables.get(PROCESS_VAR.NOT_SYNCED_ENTITIES);

          const axiosErr: AxiosError = e;
          console.log(logger.error('http request threw error. ' + axiosErr.message));

          // create object recording details of failure
          const syncFailDetails: SyncFailDetails = {
            id: <never>ibtToPush.id,
            errorDetails: axiosErr.response?.data,
            errorMessage: axiosErr.message
          };
          // if undefined create it
          if (notSyncedEntities == undefined) {
            notSyncedEntities = {
              inboundTickets: [syncFailDetails]
            };
          } else {
            notSyncedEntities.inboundTickets.push(syncFailDetails);
          }
          const errVars = new Variables()
            .set(PROCESS_VAR.NOT_SYNCED_ENTITIES, notSyncedEntities);
          return taskService.complete(task, errVars);
        }
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

