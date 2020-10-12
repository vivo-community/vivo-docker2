# Dockerized VIVO

This project creates four dockerized containers,
- `vivo` The vivo instance
- `solr` A standalone solr instance, based on a solr docker image
- `mariadb` A standalone mariadb instance
- `tpf` A standalone [Triple Pattern Fragment server](https://linkeddatafragments.org/) that queries the vivo instance.

These images can be used together, or independently to setup some development or working VIVO docker instances.

# Usage

## Example Docker Installation

Regardless of the usage, you will need to build the images, which require the following steps:

1. [Install](https://docs.docker.com/install/) Docker
1. [Install](https://docs.docker.com/compose/install/) Docker Compose
1. Clone this project
1. Start the containers:
```bash
   docker-compose up -d
```

### Verification

After running the above steps,
1. Verify your VIVO by navigating to:
   - [http://localhost:8080/vivo/](http://localhost:8080/vivo/)
   - username: vivo_root@mydomain.edu, password: rootPassword
1. Verify your Solr by navigating to:
   - [http://localhost:8983/solr/](http://localhost:8983/solr/)
1. Verify your Triple Pattern Fragment server by navigating to:
   - [http://localhost:7070/tpf/](http://localhost:7070/tpf/)

## VIVO Runtime Example

The example [docker-compose.yml](docker-compose.yml) is a typical installation for trying out a simple VIVO installation in docker. This file starts three containers and uses the standard SDB system with the mariadb backend.  This example also shows how a local directory [example-config](example-config) is used to overwrite the default `runtime.properties` as installed by the Dockerfile.  Here the root password, and the domain are modified.

```bash
docker-compose up -d
```
When navigating to http://localhost:8080/vivo/, if you get an error indicating that the database was not found, this could be due to a bug where the vivo instance is not waiting on the mariadb instance to initialize.  IF you have this error, try `docker-compose down; docker-compose up -d`.


## VIVO Development

You can use these same containers to develop a local VIVO installation.  In this
case, your `docker-compose.yml` file would only contain the `solr` and the
`mariadb` images.  You can then connect to these images with your local setup.

1. Install VIVO as usual, with the following changes to `runtime.properties`:
   ```
   vitro.local.solr.url = http://localhost:8983/solr/vivocore
   ```
1. Open a browser to: http://localhost:8080/vivo


# Notes

## MariaDB ACL
Currently, the [Mariadb Dockerfile](mariadb/Dockerfile) includes [SQL](mariadb/mysql-init.sql), that initializes a username:password for VIVO to communicate with mariadb.  If you'd like to change this, you'll need to perform some additional sql grant commands to alter this.


For earlier Dockerized VIVO releases, see [vivo-docker](https://github.com/gwu-libraries/vivo-docker)
