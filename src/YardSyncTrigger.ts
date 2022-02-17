import {Listener, TOPIC} from "./Interface";
import {Client, HandlerArgs} from "camunda-external-task-client-js";
import CamundaMsgService from "./service/CamundaMsgService";


export default class YardSyncTrigger implements Listener<TOPIC.START_PROCESS_FOR_YARD> {
    private msgSvc = new CamundaMsgService();
    constructor(private topic: TOPIC) {
    }

    listen(client: Client): void {
        client.subscribe(this.topic, async (handlerArgs: HandlerArgs) => {
            const {task, taskService} = handlerArgs;

            console.log('starting sync for yard: ')

            console.log('yardId is: ', task.variables.get('yardId'))
            //
            console.log('sending message')
            const res = await this.msgSvc.sendMsg()

            await taskService.complete(task);
        })
    }

}
