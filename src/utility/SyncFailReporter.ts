import { SyncFailDetailMap, SyncFailDetails, FailedEntityProcessVar } from '../model/SyncFailDetailMap';
import { PROCESS_VAR } from '../model/enums';
import { AxiosError } from 'axios';
import { logger, Variables, HandlerArgs } from 'camunda-external-task-client-js';


export default class SyncFailReporter {
  async addSyncFailureToReport(
    handlerArgs: HandlerArgs,
    failedEntity: Object,
    processVarName: keyof SyncFailDetailMap,
    error: AxiosError,
  ) {
    const { task, taskService } = handlerArgs;

    let notSyncedOfType: FailedEntityProcessVar<typeof failedEntity> =
      task.variables.get(processVarName);

    const axiosErr: AxiosError = error;
    console.log(logger.error('http request threw error. ' + axiosErr.message));

    // create object recording details of failure
    const syncFailDetails: SyncFailDetails<typeof failedEntity> = {
      failedEntity: failedEntity,
      errorDetails: axiosErr.response?.data,
      errorMessage: axiosErr.message
    };
    // if undefined create it
    // if (notSyncedEntities == undefined) {
    //   notSyncedEntities = {
    //     inboundTickets: [syncFailDetails]
    //   };
    // } else {
    //   notSyncedEntities.inboundTickets.push(syncFailDetails);
    // }
    // const errVars = new Variables()
    //   .set(PROCESS_VAR.NOT_SYNCED_ENTITIES, notSyncedEntities);
    // return taskService.complete(task, errVars);
  }
}
