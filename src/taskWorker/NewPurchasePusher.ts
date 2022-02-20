import { Client, HandlerArgs, Variables } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR, ERROR_CODE } from '../model/enums';
import QbService from '../service/QbService';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_IBT> {
  qbService: QbService = new QbService();

  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {
    // const qbService = this.qbService;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      console.log('pushing new inbound tickets as QuickBooks purchases');
      // const newIbts = task.variables.get(PROCESS_VAR.NEW_INBOUND_TICKETS);
      // console.log(newIbts);
      const iteration = task.variables.get('loopCounter');
      console.log('iter: ', iteration);

      //! simulating an error scenario
      if (iteration == 0) {
        return taskService.complete(task);
      } else {
        const errVariables = new Variables()
          .set('ooga', 'booga'); //? can set whatever env vars for the error we want
        return taskService.handleBpmnError(task,
          ERROR_CODE.SYNC_FAIL_ERROR,
          'there was a sync error with {info goes here}',
          errVariables // probably should make a custom fn to handle this
        );
      }
    });
  }

}
