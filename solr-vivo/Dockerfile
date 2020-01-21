# FROM solr

# # ADD VIVO
# COPY vivocore /opt/solr/server/solr/configsets/vivocore

# CMD precreate-core vivocore; exec solr -f

FROM solr

COPY ./vivocore /opt/vivocore

CMD solr-precreate solr /opt/vivocore