import { Client, HandlerArgs } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC } from '../model/enums';


export default class NewCustomerPusher implements Listener<TOPIC.PUSH_NEW_CUSTOMERS> {
  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      // const newData = task.variables.get('newData')
      console.log('handling push customer, DOES NOTHING for now')

      await taskService.complete(task);
    });
  }

}

