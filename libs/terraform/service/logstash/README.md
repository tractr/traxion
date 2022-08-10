# Logstash service

Provides a Logstash service that will crawl information from CloudWatch and send it to Elastic Cloud.

A role, allowed to read CloudWatch, is created and attached to the task.
The arn of the role is available in the environment variable `ROLE_ARN`.

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

### Elastic Cloud configuration

```text
input {
    cloudwatch {
        role_arn => "${ROLE_ARN}"
        namespace => "AWS/EC2"
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
        action => "create"
    }
}
```

