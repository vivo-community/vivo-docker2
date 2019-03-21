# Dockerized VIVO

This project starts up two Docker containers:
- Solr
- MariaDB

This project does not (yet) start up the VIVO application.

# Usage

## Docker containers
1. [Install](https://docs.docker.com/install/) Docker
1. [Install](https://docs.docker.com/compose/install/) Docker Compose
1. Clone this project
1. Start the containers:
   ```
   docker-compose up -d
   ```

## VIVO
1. Install VIVO as usual, with the following changes to `runtime.properties`:
   ```
   vitro.local.solr.url = http://localhost:8983/solr/vivocore
   ```
1. Open a browser to: http://localhost:8080/vivo


# Note
For earlier Dockerized VIVO releases, see [vivo-docker](https://github.com/gwu-libraries/vivo-docker)
