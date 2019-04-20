FROM tomcat:8.5.39-jre8

MAINTAINER Justin Merz <jrmerz@ucdavis.edu>
MAINTAINER Quinn Hart <qjhart@ucdavis.edu>

RUN apt-get update
RUN apt-get install -y maven

ENV VIVO_MD5 861865a57ded2bc99237e1c78f90d45c
ENV VIVO_VERSION 1.10.0

RUN mkdir -v /opt/vivo
WORKDIR /opt/vivo
RUN echo "$VIVO_MD5  vivo.tar.gz" > vivo.tar.gz.md5
RUN wget -O vivo.tar.gz https://github.com/vivo-project/VIVO/releases/download/vivo-${VIVO_VERSION}/VIVO-${VIVO_VERSION}.tar.gz && \
    md5sum vivo.tar.gz.md5 && \
    tar -xzf vivo.tar.gz && rm vivo.tar.gz
    
RUN mvn install -s example-settings.xml
    
WORKDIR /usr/local/vivo/home/config
# This should be overwritten by docker-compose file.
COPY ./example.runtime.properties runtime.properties
COPY ./example.applicationSetup.n3 applicationSetup.n3

RUN export CATALINA_OPTS="-Xms512m -Xmx512m -XX:MaxPermSize=128m"