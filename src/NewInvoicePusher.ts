import {Listener, TOPIC} from "./Interface";
import {Client, HandlerArgs} from "camunda-external-task-client-js";


export default class NewInvoicePusher implements Listener<TOPIC.PUSH_NEW_INVOICES> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const {task, taskService} = handlerArgs;

            console.log('pushing new invoices')
            // console.log(task.variables.get('orgId'))

            await taskService.complete(task);
        })
    }

}
