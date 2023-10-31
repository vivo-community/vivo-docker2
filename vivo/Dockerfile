FROM tomcat:9-jdk11-openjdk

RUN apt update && \
	apt install -y ca-certificates-java maven git tzdata

ENV TZ="America/New_York"
ENV CATALINA_OPTS="-Xms512m -Xmx4g -XX:MaxPermSize=512m"

WORKDIR /usr/local/

ARG GIT_BRANCH="main"

RUN git clone https://github.com/vivo-project/Vitro.git Vitro -b ${GIT_BRANCH} && \
	git clone https://github.com/vivo-project/VIVO.git VIVO -b ${GIT_BRANCH}

WORKDIR /usr/local/VIVO/

## insert customizations to image before maven install
COPY --chown=root:staff ./configs/settings.xml /usr/local/VIVO/settings.xml
COPY --chown=root:staff ./configs/initialSiteConfig.rdf /usr/local/VIVO/installer/home/src/main/resources/rdf/applicationMetadata/firsttime/

WORKDIR /usr/local/Vitro
RUN mvn install
WORKDIR /usr/local/VIVO
RUN mvn clean package -s settings.xml
RUN mvn install -s settings.xml

## clean up
# RUN rm -r /usr/local/tomcat/webapps/docs && \
# 	rm -r /usr/local/tomcat/webapps/examples && \
# 	rm -r /usr/local/tomcat/webapps/ROOT

## insert customizations to image after maven install
COPY --chown=root:staff ./configs/runtime.properties /usr/local/VIVO/home/config/runtime.properties
COPY --chown=root:staff ./configs/applicationSetup.n3 /usr/local/VIVO/home/config/applicationSetup.n3

RUN chmod ugo+w -R /usr/local/tomcat/temp && \
	chmod ugo+w -R /usr/local/VIVO/home

RUN ln -s /usr/local/tomcat/webapps/vivo/ /usr/local/tomcat/webapps/ROOT
