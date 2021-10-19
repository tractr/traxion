FROM sebp/elk:7.15.0

WORKDIR ${LOGSTASH_HOME}

RUN gosu logstash bin/logstash-plugin install logstash-integration-rabbitmq