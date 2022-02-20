import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC } from '../model/enums';


export default class SyncStatusRecorder implements Listener<TOPIC.MARK_AS_SYNCED> {
  constructor(private topic: TOPIC) {
  }

  listen(client: Client) {
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      console.log('marking synced entities with sync success');

      await taskService.complete(task);
    });
  }

}
