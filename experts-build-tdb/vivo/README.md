# VIVO Dockerfile

The VIVO [Dockerfile](vivo/Dockerfile) is based on a tomcat container and
installs VIVO 1.11-SNAPSHOT using maven. Note that this image is designed to run with an
external solr container, so any solr instances built with the vivo installation
are removed.

Some example configuration files are included, but they can be overwritten,
typically by mounting a local configuration directory on over that image
directory.
