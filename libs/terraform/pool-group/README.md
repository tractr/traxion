# TODO to clean this package

- [ ] Export container folder to a module named `@tractr/terraform-container
- [ ] Export deployment folder to a module named `@tractr/terraform-deployment-component
- [ ] Export reverse proxy folder to a module named `@tractr/terraform-reverse-proxy-component
- [ ] Export private dns folder to a module named `@tractr/terraform-private-dns-component
- [ ] Export owner picture folder to a module named `@tractr/terraform-owner-picture-component
- [ ] Export volume folder to a module named `@tractr/terraform-volume-component
- [ ] Export ecs service to a module named `@tractr/terraform-ecs-service

# Pool group

This group provides all components required to run containers on Fargate and
update them when a new image is build.

## Important

### Task definition

The track of the `task_definition` and `desired_count` are disabled to allow
continuous deployment and autoscaling.

Therefore, if you update a container definition, a new task definition will be
created in ECS, but the service will still use the last task definition. You
need to go in ECS console and update the service to use the last version of the
task definition.

### Code Pipeline

When updating task definition, Code Pipeline used the last stable task
definition. Therefore, if you have changed task definition from Terraform and
those tasks were not stable, they will be ignored by Code Pipeline. You need to
go in ECS console and update the service to use the last version of the task
definition.
