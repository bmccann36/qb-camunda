import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import {Listener} from './model/ListenerInterface';
import {TOPIC} from './model/enums';


export default class OauthHelper implements Listener<TOPIC.SET_OAUTH_FOR_ORG> {
    constructor(private topic: TOPIC) {
    }

    listen(client: Client) {
        client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
            const { task, taskService } = handlerArgs;

            console.log('setting auth token for yard');

            await taskService.complete(task);
        });
    }

}
