FROM tomcat:9.0.21-jdk11-openjdk

MAINTAINER Ralph OFlinn <roflinn@uab.edu>
MAINTAINER Justin Merz <jrmerz@ucdavis.edu>
MAINTAINER Quinn Hart <qjhart@ucdavis.edu>

RUN apt-get update
RUN apt-get install -y maven git

WORKDIR /usr/local/

RUN git clone https://github.com/vivo-project/Vitro.git Vitro -b sprint-i18n
RUN git clone https://github.com/vivo-project/VIVO.git VIVO -b sprint-i18n
RUN git clone https://github.com/vivo-project/VIVO-languages.git VIVO-languages -b sprint-i18n
RUN git clone https://github.com/vivo-project/Vitro-languages.git Vitro-languages -b sprint-i18n

ENV BRANCH_NAME docker

WORKDIR /usr/local/VIVO-languages/
RUN mvn clean install

WORKDIR /usr/local/Vitro-languages/
RUN mvn clean install

WORKDIR /usr/local/VIVO/
COPY ./example-settings.xml example-settings.xml
RUN mvn clean install -s example-settings.xml

# clean up
RUN rm -r /usr/local/tomcat/webapps/docs
RUN rm -r /usr/local/tomcat/webapps/examples

# Set properties
# Adjust logging, you can mount over this in docker-compose to further adjust
COPY ./log4j.properties /usr/local/tomcat/webapps/VIVO/WEB-INF/classes

WORKDIR /usr/local/VIVO/home/config

COPY ./dockercompose.runtime.properties runtime.properties
COPY ./example.applicationSetup.n3 applicationSetup.n3

RUN chmod ugo+w -R /usr/local/tomcat/temp
RUN chmod ugo+w -R /usr/local/VIVO/home

RUN export CATALINA_OPTS="-Xms512m -Xmx512m -XX:MaxPermSize=128m"
