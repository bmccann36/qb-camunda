import {Client, HandlerArgs, logger} from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {baseUrl: "http://localhost:8080/engine-rest", use: logger};

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("get-not-synced-purchases", async function (handlerArgs: HandlerArgs) {
    const {task, taskService} = handlerArgs;

    // console.log(task.variables.getTyped('listElement'))
    console.log(task.variables.get('element'))
    // const listVar = task.variables.getTyped('list')
    // console.log(JSON.parse(listVar.value))

    await taskService.complete(task);
});
