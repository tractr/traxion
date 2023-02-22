---
id: configuration
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
  @trxn/terraform-aws-stack \
  @trxn/terraform-group-network \
  @trxn/terraform-group-pool \
  @trxn/terraform-group-registry \
  @trxn/terraform-group-zone \
  @trxn/terraform-service-api \
  @trxn/terraform-service-postgres \
  @trxn/terraform-service-pwa \
  @trxn/terraform-service-reverse-proxy
```
