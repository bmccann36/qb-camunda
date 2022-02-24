import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from '../model/enums';
import AuthTokenService from '../service/AuthTokenService';
import NewDataService from '../service/NewDataService';
import { getConnection } from 'typeorm';
import { ErpToolCredsEntity } from '../entity/ErpToolCredsEntity';


export default class OauthHelper implements Listener<TOPIC.SET_OAUTH_FOR_ORG> {
  authTokenService = new AuthTokenService(getConnection());

  constructor(private topic: TOPIC) {
  }

  listen(client: Client) {
    const tokenSvc = this.authTokenService;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      const yardId = task.variables.get(PROCESS_VAR.YARD_ID);
      // get auth token from DB
      const qbPreviousAuthToken: ErpToolCredsEntity | undefined =
        await tokenSvc.getQbTokenForYard(yardId);
      console.log(qbPreviousAuthToken);


      await taskService.complete(task);
    });
  }

}
