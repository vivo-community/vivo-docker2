# Dockerized VIVO

This project creates two dockerized containers,
- `vivo` The vivo instance
- `solr` A standalone solr instance, based on a solr docker image

# Usage

## Example Docker Installation

Regardless of the usage, you will need to build the images, which require the following steps:

1. Linux: [Install](https://docs.docker.com/install/) Docker
1. Linux: [Install](https://docs.docker.com/compose/install/) Docker Compose
1. Windows/Mac: [Install](https://www.docker.com/products/docker-desktop) Docker Desktop
1. Git Clone this project

## Build the docker images

When satisfied with your dev box, build and push the images to production

1. Your custom theme like ./vivo/uncw_theme is included in the docker image.
1. Your config files at ./vivo/config are include in the docker image.
1. Your vivo container will serve from http://localhost:8080/
1. `docker build --no-cache -t vivo ./vivo`
1. `docker build --no-cache -t solr ./solr`
1. Your production environment can be some analogue of what is in ./docker-compose-rancher.yml

## Development env

1. (optional)  Copy the tdbModels & tdbContentModels from your production instance into the matching folders in this repo.  This pulls in any changes made on the production site via the Admin panel to the dev box. They are gitignored.
```bash
   rsync -avz yourname@servername.com:/path/to/vivo/home/tdbModels .
   rsync -avz yourname@servername.com:/path/to/vivo/home/tdbContentModels .
   sudo chown -R root:root tdbModels/ tdbContentModels/
```
1. (optional)  Place any additional graph files into ./current_turtle .  They will be autoimported into vivo on docker compose up.  They are gitignored.  We use a userdata.ttl file in this folder to import/remove instance data from our production vivo.
1. (optional)  Create a custom theme, similar this repo's main branch './vivo/uncw_theme' folder.  Revise ./vivo/Dockerfile and docker-compose.yml lines including uncw_theme.
1. Start the containers:
```bash
   docker compose up solr
   (wait 1 minute)
   docker compose up vivo
   (wait 30 minutes)
```
(The vivo.all.log file will reveal when Vivo is fully loaded.  `docker exec vivo tail -f /usr/local/tomcat/logs/vivo.all.log`)

1. Watch [localhost:8080](http://localhost:8080) until the site is up.
1. Rebuild the search index via logging into the Admin menu if the frontend does not display your instance data.
1. NOTE:  After doing any theme or configfile changes, you must do a `docker build ...` step before pushing to production.  `docker compose up` only temporarily overlays those folders onto the containers.  `docker build ...` bakes those changes into the image.  

## VIVO Runtime Example

The example [docker-compose.yml](docker-compose.yml) is a basic VIVO installation in docker. This file has two containers and uses the standard TBD system.  The files in ./vivo configure many of the vivo settings.  This repo's main branch has various customizations you can use/modify. 

1. On first startup, log in with user: vivo_root@mydomain.edu password: rootPassword
1. Any users/instance data is preserved in docker bind mounted volumes to the tdb* volumes in this folder.  They are gitignored.
1. Subsequent `docker-compose down` and `docker-compose up` will retain the tdb files in persistant docker volumes.
1. If you wish to start clean, `docker volume rm vivo-docker2_solr_data` will delete the volume holding user/instance data.  And `sudo rm tdbModel/*.* tdbContentModels/*.*` will empty your tdb files.

## Solr access for dev

In the docker-compose.yml, adding a `ports: 8983:8983` will expose the solr instance to localhost:8983.  The build otherwise makes solr unreachable everywhere except from the vivo container.


## Revising the Theme

On this repo's main branch, a custom theme lives at ./vivo/uncw_theme  That branch includes the theme in the docker container during 'docker build'
You can copy this folder into a sister folder, then find-replace all references to 'uncw_theme' within this folder and the ./vivo/configs/runtime.properties file.

You can disable the theme caching in the Site Admin page: "Activate developer Panel" / "Defeat the template cache".  Then, you can edit files in the "nemo" folder and see the changes in real time at localhost:8080.  On the next `docker-compose up --build` the changes will be baked into your vivo image.

## Production

```
{{use your docker registry url}}
docker build --no-cache --platform linux/amd64 -t {your docker registry}/vivo --platform linux/amd64 ./vivo
docker push {your docker registry}/vivo  
```

Data persistance can be accomplished by bind volume mapping two container folders to the production filesystem:

 - /usr/local/VIVO/home/tdbContentModels
 - /usr/local/VIVO/home/tdbModels


# Person Images portion {for this repo's main branch}

A GET request to http://sitename.com/file/n1234567890/personImage.jpg will load the file on the server at /usr/local/VIVO/home/uploads/file_storage_root/a\~n/123/456/789/0/personImage.jpg

The spliting of the large integer into groups of 3 is important.

So a file in ./uploads/file_storage_root/a~n/123/456/789/0/personImage.jpg will map to the two locations above.

# Automatic import/refresh

The UNCW use-case is:  One ttl file holds all the userdata.  Place it at ./current_turle/userdata.ttl.  When starting the vivo instance, userdata.ttl is autoimported into Vivo.   (Vivo autoimports any file in vivo/home/rdf/abox/filegraph/;  docker-compose mounts userdata.ttl into that folder).  

To do a data refresh, replace the userdata.ttl file with a new version.  Restarting Vivo will update the tdb files & solr.


Acknowledgements:  Thank you to the developers of earlier dockerized VIVO releases who laid the groundwork,

 - [vivo-docker](https://github.com/gwu-libraries/vivo-docker)
 - [vivo-docker2](https://github.com/vivo-community/vivo-docker2)