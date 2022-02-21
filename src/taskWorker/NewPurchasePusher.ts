import { Client, HandlerArgs, Variables, logger } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR, ERROR_CODE } from '../model/enums';
import QbService from '../service/QbService';
import { AxiosResponse } from 'axios';
import { InboundTicketEntity } from '../entity/InboundTicketEntity';
import { AxiosError } from 'axios';


export default class NewPurchasePusher implements Listener<TOPIC.PUSH_NEW_IBT> {
  qbService: QbService = new QbService();

  constructor(private topic: TOPIC) {
  }

  listen(client: Client): void {
    const qbService = this.qbService;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      console.log('pushing new inbound ticket as QuickBooks purchase');

      const ibtToPush: InboundTicketEntity = task.variables.get(PROCESS_VAR.INBOUND_TICKET);

      let qbPushRes: AxiosResponse<InboundTicketEntity>;
      try {
        qbPushRes = await qbService.pushNewPurchase(
          ibtToPush,
          '4625319964620848278', // todo fix these
          getToken()
        );
      } catch (e: any) {
        if (e.isAxiosError) {
          const axiosErr: AxiosError = e;
          console.log(logger.error('http request threw error. ' + axiosErr.message));
          const errVars = new Variables()
            .set('FAILED_ENTITY', ibtToPush)
            .set('ERROR_DETAILS', axiosErr.response?.data);
          return taskService.handleBpmnError(
            task,
            ERROR_CODE.QB_COMMUNICATION_ERROR,
            `failed to push QB purchase entity with id: ${ibtToPush.id}`,
            errVars
          );
        }
      }


      //! simulating an error scenario
      // if (iteration == 0) {
      //   return taskService.complete(task);
      // } else {
      //   const errVariables = new Variables()
      //     .set('ooga', 'booga'); //? can set whatever env vars for the error we want
      //   return taskService.handleBpmnError(task,
      //     ERROR_CODE.SYNC_FAIL_ERROR,
      //     'there was a sync error with {info goes here}',
      //     errVariables // probably should make a custom fn to handle this
      //   );
      // }
    });
  }

}


function getToken() {
  return 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..i0juDK0U4yV8i273XVTmEg.obuwvWE3VLxRYa8SfwMCVNNgRWJhnmpybqzVGUN0AxsqeCNjvQIG98utRSgoPF8j2oc8SywgqSxUg6s7R32FTYAG2KPuI21vcCLD1az2ahScKHXW37BnwOEbs3d7P2sbhVHmZyWbpog5Me6h3-GY3qkuovi9BL2swTOeOQQ4kyeDdicBhwH6tT-rqNnA20HN8Fx1Zn6vPy-CdXiYqb7wV9H6zKW3dRmaWWUKb-qTZoAEWIE7-zYRFMKL70xgbQRDxmCZvElh32b2G1Y4IvdE6JdaqN6qZBsC_JRNoFOvmyZQPyfCzGiort-KP3T6uk6zcnlBXx8Zr7ZCMMzfeC3EHoTtGLpTU96erFbfzZJ6Lnk96IwQ4D6r3KCEf2vY-ZosmGaxbewAT33Qn4yN-fwDpQcQMLOkw0LAXEm_tgVMEPIoW5UnOMH5pG2QWEWnMKC15bQeYif0oV30ahm1xdAKrcK1Z8aJa-xxYk2S6lLONWOhcQr6jogK0DND0fIg-_Bhb1ntDw7gm-vZeeRhI4RpHqwqvEz2fhcynWkxXQxMGE52CPWb5HmJ9Ru42dFknexRu-0Cz63-1ARMqC1A_c3BVE8t4NhswZ20t77y572leiHKIjjpAyxhT2L8Fg4IAowX-ivMaT0XGXKk58adDipnT_QhpMPOeZGLY0JUsUvIHOYdHQQBQoYf0_xvVejtb6KfukI1DaPX5RBOg89byqt6rCqRfu9lTmBlSSDY00yuXGHBt9rRAWQMa_N4xOykv5QA.YJzwiddGb7vF4qlFXctzlQ';
}
