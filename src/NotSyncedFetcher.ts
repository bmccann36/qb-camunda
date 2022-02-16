import type {Client, HandlerArgs} from "camunda-external-task-client-js";
import {Listener, TOPIC} from "./Interface";


export default class NotSyncedFetcher implements Listener<TOPIC.GET_NOT_SYNCED_ENTITIES> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const {task, taskService} = handlerArgs;

            console.log('fetching not synced entities')
            // console.log(task.variables.get('orgId'))

            await taskService.complete(task);
        });
    }

}
