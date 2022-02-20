import { Listener } from '../model/ListenerInterface';
import { TOPIC } from '../model/enums';
import CamundaMsgService from '../service/CamundaMsgService';
import { HandlerArgs, Client } from 'camunda-external-task-client-js';


export default class YardSyncTrigger implements Listener<TOPIC.START_PROCESS_FOR_YARD> {
  private msgSvc = new CamundaMsgService();

  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {
    client.subscribe(this.topic, async (handlerArgs: HandlerArgs) => {
      const { task, taskService } = handlerArgs;
      console.log('starting sync for yard: ');
      const yardId = task.variables.get('yardId');
      console.log('yardId is: ', yardId);
      console.log('sending message to init sync for yard');
      const res = await this.msgSvc.initSyncForYard(yardId);

      await taskService.complete(task);
    });
  }

}
