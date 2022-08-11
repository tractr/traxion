# Logstash service

Provides a Logstash service that will crawl information from CloudWatch and send it to Elastic Cloud.

A user, allowed to read CloudWatch, is created.
Its API key and secret are outputted by Terraform.

## Configuration example

```typescript
const api = new LogstashComponent(this, 'logstash', {
  containerConfig: {
    imageTag: '8.3.3',
    environments: {
      XPACK_MONITORING_ENABLED: 'false',
      XPACK_MANAGEMENT_ENABLED: 'true',
      XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID: Secret(),
      XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH: Secret(),
      XPACK_MANAGEMENT_PIPELINE_ID: Secret(),
    },
  },
  desiredCount: 1,
  cpu: '1024',
  memory: '1024',
});
```

`XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID`, `XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH`
and `XPACK_MANAGEMENT_PIPELINE_ID` must be set in AWS Secrets Manager.

## Elastic Cloud configuration

For more information on how to configure plugins :

- [Cloudwatch logs input plugin](https://github.com/lukewaite/logstash-input-cloudwatch-logs)
- [Cloudwatch input plugin](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-cloudwatch.html).

### Configuration example

The values `access_key_id` and `secret_access_key` will be output by Terraform.

```text
input {
    cloudwatch_logs {
        access_key_id => "AKXXXXXXXXX"
        secret_access_key => "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        log_group => "production-logs-group"
        region => "us-east-1"
    }
}
filter {
}
output {
    elasticsearch {
        cloud_id => "${XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID}"
        cloud_auth => "${XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH}"
        index => "cloudwatch-logs"
    }
}
```

