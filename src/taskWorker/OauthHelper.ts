import type { Client, HandlerArgs } from 'camunda-external-task-client-js';
import { Listener } from '../model/ListenerInterface';
import { TOPIC, PROCESS_VAR } from '../model/enums';
import AuthTokenService from '../service/AuthTokenService';
import NewDataService from '../service/NewDataService';
import { getConnection } from 'typeorm';
import { ErpToolCredsEntity } from '../entity/ErpToolCredsEntity';
import { Variables } from 'camunda-external-task-client-js';


export default class OauthHelper implements Listener<TOPIC.SET_OAUTH_FOR_ORG> {
  authTokenService = new AuthTokenService(getConnection());

  constructor(private topic: TOPIC) {
  }

  listen(client: Client) {
    const tokenSvc = this.authTokenService;
    client.subscribe(this.topic, async function (handlerArgs: HandlerArgs) {
      const { task, taskService } = handlerArgs;

      console.log('refreshing auth token and attaching to process');
      const yardId = task.variables.get(PROCESS_VAR.YARD_ID);
      // refresh token and get latest
      const accessTknForYrd = await tokenSvc.updateToken(yardId);

      // set yard access token object ob as process variable
      const accessTokenVar = new Variables()
        .set(PROCESS_VAR.QB_CREDENTIALS, accessTknForYrd);
      await taskService.complete(task, accessTokenVar);
    });
  }

}
