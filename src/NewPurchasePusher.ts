import {Listener, TOPIC} from './Interface';
import {Client, HandlerArgs} from 'camunda-external-task-client-js';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_PURCHASES> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const {task, taskService} = handlerArgs;

            console.log('pushing new purchases')
            // console.log(task.variables.get('orgId'))

            await taskService.complete(task);
        })
    }

}
