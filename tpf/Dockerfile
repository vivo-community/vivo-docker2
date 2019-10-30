FROM tomcat:9.0.27-jdk8-openjdk

MAINTAINER Andrew Woods<awoods@lyrasis.org>

RUN apt-get update
RUN apt-get install -y maven git

ENV TPF_MD5 c8cdb3350a0b7cf94c6a3481ca12d8d8
ENV TPF_VERSION v0.2.4a

RUN mkdir -v /opt/tpf
WORKDIR /opt/tpf
RUN echo "$TPF_MD5  tpf.war" > tpf.war.md5
RUN wget -O tpf.war https://github.com/awoods/Server.Java/releases/download/${TPF_VERSION}/ldfserver-0.2.3.war && \
     md5sum -c tpf.war.md5

RUN mkdir /usr/local/tomcat/webapps/tpf
WORKDIR /usr/local/tomcat/webapps/tpf
RUN jar xvf /opt/tpf/tpf.war

# Update the web.xml
COPY ./web.xml /usr/local/tomcat/webapps/tpf/WEB-INF/web.xml

RUN export CATALINA_OPTS="-Xms512m -Xmx512m -XX:MaxPermSize=128m"
