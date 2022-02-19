import { Client, HandlerArgs } from 'camunda-external-task-client-js';
import { Listener } from './model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from './model/enums';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_IBT> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const { task, taskService } = handlerArgs;

            console.log('pushing new inbound tickets as QuickBooks purchases');
            const newIbts = task.variables.get(PROCESS_VAR.NEW_INBOUND_TICKETS);
            console.log(newIbts);

            await taskService.complete(task);
        });
    }

}
