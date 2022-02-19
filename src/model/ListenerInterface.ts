import {Client} from 'camunda-external-task-client-js';


export interface Listener<T> {
    listen(client: Client, topic: T): void;
}
