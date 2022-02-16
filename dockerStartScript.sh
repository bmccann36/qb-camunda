

docker run \
  -d --name camunda \
  -p 8080:8080 \
  --name camunda \
  -v "$(pwd)/localAppFiles/hello.txt":/camunda/webapps/hello.txt \
  camunda/camunda-bpm-platform:latest



