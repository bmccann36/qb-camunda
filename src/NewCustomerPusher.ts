import {Listener, TOPIC} from './Interface';
import {Client, HandlerArgs} from 'camunda-external-task-client-js';


export default class NewCustomerPusher implements Listener<TOPIC.PUSH_NEW_CUSTOMERS> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const {task, taskService} = handlerArgs;

            console.log('pushing new customers')
            // console.log(task.variables.get('orgId'))

            await taskService.complete(task);
        })
    }

}

