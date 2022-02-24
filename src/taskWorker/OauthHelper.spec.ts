// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { createMockClient } from '../__test_utils/camundaClientMock';
//! mock  out camunda client using manual mock
const mockCamundaClient = createMockClient();
const camundaDefaultManualMock = jest.mock(
  'camunda-external-task-client-js',
  () => mockCamundaClient
);


import { Client, ClientConfig, Task } from 'camunda-external-task-client-js';

import { Connection } from 'typeorm';
import initTypeOrm from '../initTypeOrm';
import OauthHelper from './OauthHelper';
import { TOPIC } from '../model/enums';


let target: OauthHelper;
let conn: Connection;
let mockedClient: Client;

beforeAll(async () => {
  conn = await initTypeOrm();
  target = new OauthHelper(TOPIC.SET_OAUTH_FOR_ORG);
  // generate mock client using our custom mock implementation
  mockedClient = new Client({} as ClientConfig);
});

describe('#OauthHelper', () => {
  it('retrieves an existing yard token', async () => {
    const mockGetVariable = jest.fn((varName: string) => {
      if (varName == 'yardId') return '00000000-0000-0000-0000-000000000000';
    });
    const task = {
      variables: {
        get: mockGetVariable
      }
    };
    const handlerArgs = { task, taskService: { complete: () => null }, };
    // start our listener fn
    target.listen(mockedClient);
    // simulate a message coming in from process engine
    await (mockedClient as any).simulateMessage(handlerArgs as any);
    // const firstCall = mockGetVariable.mock.calls[0]
    // console.log(firstCall);

  });
});




