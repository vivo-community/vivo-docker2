#!/bin/bash
ln -s /usr/local/VIVO/webapps/vivo ROOT
echo "export CATALINA_OPTS="'"-Xms8192m -Xmx8192m -XX:MaxPermSize=2048m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/VIVO"'"" > /usr/local/tomcat/bin/setenv.sh
catalina.sh run
