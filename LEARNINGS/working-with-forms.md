
# I PROBABLY SHOULD look into this
https://docs.camunda.org/manual/7.16/reference/forms/embedded-forms/controls/select/#populating-the-options-from-a-variable

may not need angular at all or js

The directive cam-choices expects the values to be a List or Map (Object). In case of a Map (Object), the keys of the map are used as values of the options. java.util.Map and java.util.List are supported but must be serialized as JSON:

### using javascript

https://docs.camunda.org/manual/7.16/reference/forms/embedded-forms/javascript/

## links

task forms with embedded variables
https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-json-variables

embedded task form is what I want
embedded can still be a standalone .html file it just means the task exists on the engine

https://docs.camunda.org/manual/7.9/user-guide/task-forms/#embedded-task-forms
AND
https://docs.camunda.org/manual/7.16/reference/forms/embedded-forms/

The file containing the form can be referenced in two ways:

app:: Add the file to your development project in a folder src/main/webapp/forms. The HTML file will be packaged into your deployment artifact (typically a WAR archive). During runtime it will be loaded from there.
deployment:: The file is part of your deployment (e.g., by adding it to your process archive), which means that it is stored in the Camunda database. It can then be loaded from there. Note that this allows versioning of your form alongside the process model.

## json in forms

https://docs.camunda.org/manual/7.16/reference/forms/embedded-forms/json-data/



## gotchas

- uses angularJS
- 

## very basic form tutorial

https://docs.camunda.org/get-started/java-process-app/forms/


## USER task bpmn symbol

https://docs.camunda.org/manual/7.12/reference/bpmn20/tasks/user-task/
