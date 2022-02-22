import { SyncFailDetails } from '../model/SyncFailDetailMap';
import { AxiosError } from 'axios';
import { logger, Variables, HandlerArgs } from 'camunda-external-task-client-js';
import { PROCESS_VAR } from '../model/enums';


export default class SyncFailReporter {
  async addSyncFailureToReport<T>(
    handlerArgs: HandlerArgs,
    failedEntity: T,
    processVarName: PROCESS_VAR,
    axiosError: AxiosError,
  ) {
    const { task, taskService } = handlerArgs;
    console.log(logger.error('http request threw error. ' + axiosError.message));

    // create object recording details of failure
    const syncFailDetails: SyncFailDetails<T> = {
      failedEntity: failedEntity,
      errorDetails: axiosError.response?.data,
      errorMessage: axiosError.message
    };

    // temporary clone of the process variable which may or may not exist currently
    // const processVarNameStr = processVarName.valueOf();
    const notSyncedOfType: SyncFailDetails<T>[] = task.variables.get(processVarName);
    const varsToAdd = new Variables();
    // if list does not exist create it
    if (notSyncedOfType == undefined) {
      varsToAdd.set(processVarName, [syncFailDetails]);
    } else { // if list exists add to it
      notSyncedOfType.push(syncFailDetails);
      varsToAdd.set(processVarName, notSyncedOfType);
    }
    // set the generic process var to notify the process that errors occurred irrespective of which entity had the issue
    varsToAdd.set(PROCESS_VAR.PROCESS_HAS_ERRORS, true);

    // complete the task and update the process var containing the report on failure
    return taskService.complete(task, varsToAdd);
  }
}
