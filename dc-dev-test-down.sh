# WARNING! - Only for development testing! May remove items outside of vivo-docker2 scope.

docker-compose down
docker rmi vivo-docker2_vivo vivo-docker2_solr vivo-docker2_mariadb
docker rmi solr mariadb tomcat
docker volume ls
docker volume rm vivo-docker2_maria-data vivo-docker2_solr-data
docker volume ls
