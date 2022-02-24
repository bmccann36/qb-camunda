import { Handler, TopicSubscription, ClientConfig, HandlerArgs, Client } from 'camunda-external-task-client-js';

export function createMockClient() {
  return {
    Client: class MockClient {
      handlerArgs = {
        task: null,
        taskService: { complete: () => null },
      };
      handlerCallBack: any;

      constructor(config: ClientConfig) {
        // console.log('MOCK CLIENT INITIALIZED');
      }

      /**
       * our code calls subscribe to start the worker listening
       * in this mock we set handlerCallback as instance variable so that the test can execute it when the test is ready
       * @param topic
       * @param handlerCallback
       */
      subscribe(topic: string, handlerCallback: Handler) {
        this.handlerCallBack = handlerCallback;
      }

      /**
       * this is a back door fn to simulate a message coming in to a topic at runtime
       * the mock needs this extra fn to actually trigger the callback that subscribe takes as an argument
       * @param handlerArgs
       */
      async simulateMessage(handlerArgs: HandlerArgs){
        return this.handlerCallBack(handlerArgs);
      }

    }
  };
}


