# Deployment trigger component

This component creates an event to trigger code pipeline when pushing to ECR.

It adds an `EventRule`, an `EventTarget`, a `Role`, and a `Policy`.

Based on https://github.com/hashicorp/terraform-provider-aws/issues/7012
