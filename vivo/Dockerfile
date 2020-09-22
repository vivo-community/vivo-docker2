FROM tomcat:9.0.21-jdk11-openjdk

MAINTAINER Ralph OFlinn <roflinn@uab.edu>
MAINTAINER Justin Merz <jrmerz@ucdavis.edu>
MAINTAINER Quinn Hart <qjhart@ucdavis.edu>

RUN apt-get update
RUN apt-get install -y maven git

WORKDIR /usr/local/

RUN git clone https://github.com/vivo-project/Vitro.git Vitro 
RUN git clone https://github.com/vivo-project/VIVO.git VIVO -b sprint-i18n
RUN git clone https://github.com/vivo-project/VIVO-languages.git VIVO-languages 
RUN git clone https://github.com/vivo-project/Vitro-languages.git Vitro-languages 

ENV BRANCH_NAME docker

WORKDIR /usr/local/Vitro/
RUN git fetch origin pull/169/head:${BRANCH_NAME}
RUN git checkout ${BRANCH_NAME}

WORKDIR /usr/local/VIVO-languages/
RUN git fetch origin pull/57/head:${BRANCH_NAME}
RUN git checkout ${BRANCH_NAME}
RUN mvn clean install

WORKDIR /usr/local/Vitro-languages/
RUN git fetch origin pull/24/head:${BRANCH_NAME}
RUN git checkout ${BRANCH_NAME}
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
#COPY ./dockercompose.runtime.properties /usr/local/vivo/home/config/runtime.properties
#COPY ./example.applicationSetup.n3 /usr/local/vivo/home/config/applicationSetup.n3

RUN chmod ugo+w -R /usr/local/tomcat/temp
RUN chmod ugo+w -R /usr/local/VIVO/home

RUN export CATALINA_OPTS="-Xms512m -Xmx512m -XX:MaxPermSize=128m"
