---
id: index
title: Configuration
sidebar_label: Configuration
---

:::caution Coming soon

This page describes the step-by-step installation of the packages related to Terraform and the setting up of the infrastructure hosting the applications.
Soon, schematics will automate some or all of these manual operations.

:::


## Install libraries

The following libraries are required by the `terraform` application we will create:

```shell
npm install --save \
  constructs \
  cdktf \
  cdktf-cli \
  @cdktf/provider-aws \
  @tractr/terraform-aws-stack \
  @tractr/terraform-group-network \
  @tractr/terraform-group-pool \
  @tractr/terraform-group-registry \
  @tractr/terraform-group-zone \
  @tractr/terraform-service-api \
  @tractr/terraform-service-postgres \
  @tractr/terraform-service-pwa \
  @tractr/terraform-service-reverse-proxy
```
