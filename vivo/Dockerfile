FROM tomcat:9.0.21-jdk11-openjdk

MAINTAINER Ralph OFlinn <roflinn@uab.edu>
MAINTAINER Justin Merz <jrmerz@ucdavis.edu>
MAINTAINER Quinn Hart <qjhart@ucdavis.edu>

RUN apt-get update
RUN apt-get install -y maven git

WORKDIR /usr/local/

#RUN git clone https://github.com/vivo-project/Vitro.git Vitro -b rel-1.11.0-RC
#RUN git clone https://github.com/vivo-project/VIVO.git VIVO -b rel-1.11.0-RC

ENV VITRO_VERSION 1.11.0
RUN wget -O Vitro.zip https://github.com/vivo-project/Vitro/releases/download/vitro-${VITRO_VERSION}/vitro-${VITRO_VERSION}.zip 
RUN unzip Vitro.zip -d Vitro
RUN rm Vitro.zip

ENV VIVO_VERSION 1.11.0
RUN wget -O VIVO.zip https://github.com/vivo-project/VIVO/releases/download/vivo-${VIVO_VERSION}/VIVO-${VIVO_VERSION}.zip
RUN unzip VIVO.zip -d VIVO
RUN rm VIVO.zip

WORKDIR /usr/local/VIVO/
COPY ./settings.xml settings.xml
RUN mvn install -s settings.xml

# clean up
RUN rm -r /usr/local/tomcat/webapps/docs
RUN rm -r /usr/local/tomcat/webapps/examples

# Set properties
# Adjust logging, you can mount over this in docker-compose to further adjust
COPY ./log4j.properties /usr/local/tomcat/webapps/VIVO/WEB-INF/classes

WORKDIR /usr/local/VIVO/home/config

COPY ./runtime.properties runtime.properties
COPY ./applicationSetup.n3 applicationSetup.n3

RUN chmod ugo+w -R /usr/local/tomcat/temp
RUN chmod ugo+w -R /usr/local/VIVO/home

RUN export CATALINA_OPTS="-Xms512m -Xmx512m -XX:MaxPermSize=128m"
