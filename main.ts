import {Handler, HandlerArgs} from "camunda-external-task-client-js";
import {Client, logger} from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {baseUrl: "http://localhost:8080/engine-rest", use: logger};

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("topic01", async function (handlerArgs: HandlerArgs) {
    const {task, taskService} = handlerArgs;
    console.log('vars are: ')
    console.log(task.variables.getAllTyped())

    await taskService.complete(task);
});
