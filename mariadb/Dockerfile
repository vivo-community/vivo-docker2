FROM mariadb:10.4-bionic

COPY ./mysql-init.sql /docker-entrypoint-initdb.d

ENV MYSQL_USER root
ENV MYSQL_ROOT_PASSWORD abc123
