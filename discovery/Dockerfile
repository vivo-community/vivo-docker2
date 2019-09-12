# make sure you build https://github.com/vivo-community/scholars-discovery
FROM vivo-scholars-discovery

RUN apk update && apk add jq

COPY config.json /opt/discovery-config.json

CMD export SPRING_APPLICATION_JSON=$(less /opt/discovery-config.json | \
    jq ".mail.username = \"$GMAIL_USERNAME\" | .mail.password = \"$GMAIL_PASSWORD\""); \
    echo $SPRING_APPLICATION_JSON; \
    java -jar ./scholars-discovery.jar