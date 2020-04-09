# VIVO Dockerfile

The VIVO [Dockerfile](vivo/Dockerfile) is based on a tomcat container and
installs VIVO 1.10 using maven. Note that this image is designed to not run
without an external solr container, so any solr instances built with the vivo
installaion are removed.

Some example configuation files are included, but they can be overwritten,
typepically by mounting a local configuration directory on over that image
directory.

## UMLS

Support for UMLS vocabulary is included in this build. Unfortunately, this
appears in any installation regardless if one has entered a valid key of not.
Setting the key is accomplished through the Docker environment variable as shown
below.

``` text
UMLS_APIKEY = <apikey>
```
