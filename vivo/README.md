# VIVO Dockerfile

The VIVO [Dockerfile](vivo/Dockerfile) is based on a tomcat container and installs VIVO 1.10 using maven.  Note that this
image is designed to not run without an external solr container, so any solr instances built with the vivo installaion
are removed.

Some example configuation files are included, but they can be overwritten, typepically by mounting a local configuration
directory on over that image directory.
