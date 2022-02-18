import type {Client, HandlerArgs} from 'camunda-external-task-client-js';
import {Listener, TOPIC} from './Interface';
import CamundaMsgService from './service/CamundaMsgService';


export default class NewDataFinder implements Listener<TOPIC.FIND_NEW_DATA> {
    msgSvc = new CamundaMsgService();

    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async (handlerArgs: HandlerArgs) => {
            const {task, taskService} = handlerArgs;

            console.log('finding new data')
            console.log('yardId is: ')
            console.log(task.variables.get('yardId'))
            //
            // console.log('sending message')
            // const res = await this.msgSvc.sendMsg()

            await taskService.complete(task);
        });
    }

}
