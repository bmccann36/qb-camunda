import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import CamundaMsgService from './service/CamundaMsgService';
import { Listener } from './model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from './model/enums';
import NewDataService from './service/NewDataService';
import { getConnection, getRepository } from 'typeorm';
import { Variables, logger } from 'camunda-external-task-client-js';
import { InboundTicketEntity } from './entity/InboundTicketEntity';
import { NewData } from './model/NewData';


export default class NewDataFinder implements Listener<TOPIC.FIND_NEW_DATA> {
    msgSvc = new CamundaMsgService();
    newDataSvc = new NewDataService(getConnection());

    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async (handlerArgs: HandlerArgs) => {
            const { task, taskService } = handlerArgs;

            const yardId = task.variables.get('yardId');
            console.log('finding new data');
            console.log('yardId is: ', yardId);

            let newData: Partial<NewData> = {};
            try {
                const newData = await this.newDataSvc.getNewData(yardId);
            } //! handle failures with fetching newData
            catch (e: any) {
                console.log('current num retries: ', task.retries);
                const enhancedMsg = 'Failed to fetch new data for yard.\nQuery failed with error: ' + e.message;
                console.log(logger.error(enhancedMsg));
                return taskService.handleFailure(task, {
                    errorMessage: enhancedMsg,
                    errorDetails: e.stack,
                    retries: task.retries ? task.retries - 1 : 1,
                });
            }
            // set process variables
            const prcsVars = new Variables();
            prcsVars.set(PROCESS_VAR.NEW_INBOUND_TICKETS, newData.inboundTickets);
            await taskService.complete(task, prcsVars);

        });
    }

}
