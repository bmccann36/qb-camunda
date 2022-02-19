import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import CamundaMsgService from './service/CamundaMsgService';
import { Listener } from './model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from './model/enums';
import NewDataService from './service/NewDataService';
import { getConnection, getRepository } from 'typeorm';
import { Variables } from 'camunda-external-task-client-js';
import { InboundTicketEntity } from './entity/InboundTicketEntity';


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

            const newData = await this.newDataSvc.getNewData(yardId);
            console.log('ibt array length: ', newData.inboundTickets.length);

            // set process variables
            const prcsVars = new Variables();
            prcsVars.set(PROCESS_VAR.NEW_INBOUND_TICKETS, newData.inboundTickets);
            await taskService.complete(task, prcsVars);
        });
    }

}
