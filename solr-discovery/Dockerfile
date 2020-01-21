# FROM solr


# # ADD DISCOVERY
# # Copied from: https://github.com/vivo-community/scholars-discovery/blob/master/solr/Dockerfile

# COPY config /opt/solr/server/solr/configsets/persons/conf
# COPY config /opt/solr/server/solr/configsets/organizations/conf
# COPY config /opt/solr/server/solr/configsets/documents/conf
# COPY config /opt/solr/server/solr/configsets/relationships/conf
# COPY config /opt/solr/server/solr/configsets/processes/conf
# COPY config /opt/solr/server/solr/configsets/collections/conf
# COPY config /opt/solr/server/solr/configsets/concepts/conf

# USER root
# RUN chown -R solr:solr /opt/solr/server/solr/configsets/
# USER solr

# # RUN /opt/docker-solr/scripts/precreate-core persons /opt/discovery-config/persons/conf
# # RUN /opt/docker-solr/scripts/precreate-core organizations /opt/discovery-config/organizations/conf
# # RUN /opt/docker-solr/scripts/precreate-core documents /opt/discovery-config/documents/conf
# # RUN /opt/docker-solr/scripts/precreate-core relationships /opt/discovery-config/relationships/conf
# # RUN /opt/docker-solr/scripts/precreate-core processes /opt/discovery-config/processes/conf
# # RUN /opt/docker-solr/scripts/precreate-core collections /opt/discovery-config/collections/conf
# # RUN /opt/docker-solr/scripts/precreate-core concepts /opt/discovery-config/concepts/conf

# # https://github.com/docker-solr/docker-solr/issues/188
# # CMD /opt/solr-create-no-start.sh -c vivocore -d /opt/vivocore && \
# #  precreate-core persons /opt/solr/server/solr/configsets/persons/conf; \
# #  precreate-core organizations /opt/solr/server/solr/configsets/organizations/conf; \
# #  precreate-core documents /opt/solr/server/solr/configsets/documents/conf; \
# #  precreate-core relationships /opt/solr/server/solr/configsets/relationships/conf; \
# #  precreate-core processes /opt/solr/server/solr/configsets/processes/conf; \
# #  precreate-core collections /opt/solr/server/solr/configsets/collections/conf; \
# #  precreate-core concepts /opt/solr/server/solr/configsets/concepts/conf; \
# #  exec solr -f

# CMD precreate-core persons; \
#  precreate-core organizations; \
#  precreate-core documents; \
#  precreate-core relationships; \
#  precreate-core processes; \
#  precreate-core collections; \
#  precreate-core concepts; \
#  exec solr -f

FROM solr:7.7.2-slim

RUN precreate-core persons
RUN precreate-core organizations
RUN precreate-core documents
RUN precreate-core relationships
RUN precreate-core processes
RUN precreate-core collections
RUN precreate-core concepts

RUN chmod -R ugo+w /opt/solr/server/solr/
RUN chmod -R ugo+w /opt/solr/server/logs/

COPY config /opt/solr/server/solr/mycores/persons/conf
COPY config /opt/solr/server/solr/mycores/organizations/conf
COPY config /opt/solr/server/solr/mycores/documents/conf
COPY config /opt/solr/server/solr/mycores/relationships/conf
COPY config /opt/solr/server/solr/mycores/processes/conf
COPY config /opt/solr/server/solr/mycores/collections/conf
COPY config /opt/solr/server/solr/mycores/concepts/conf

USER root

RUN chown -R solr:solr /opt/solr/server/solr/mycores/

USER solr