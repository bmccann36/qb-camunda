import { SyncFailDetailMap, SyncFailDetails } from '../model/SyncFailDetailMap';
import { PROCESS_VAR } from '../model/enums';
import { AxiosError } from 'axios';
import { logger, Variables, HandlerArgs } from 'camunda-external-task-client-js';


export default class SyncFailReporter {
  async addSyncFailureToReport(
    handlerArgs: HandlerArgs,
    failedEntityId: string,
    error: AxiosError,
  ) {
    const { task, taskService } = handlerArgs;

    let notSyncedEntities: SyncFailDetailMap = task.variables.get(PROCESS_VAR.NOT_SYNCED_ENTITIES);

    const axiosErr: AxiosError = error;
    console.log(logger.error('http request threw error. ' + axiosErr.message));

    // create object recording details of failure
    const syncFailDetails: SyncFailDetails = {
      id: <never>failedEntityId,
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
