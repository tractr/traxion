---
id: index
title: Terraform
sidebar_label: Terraform
---

Traxion uses [Terraform](https://www.terraform.io/) to describe the underlying architecture of the application.

## What is Terraform ?

> HashiCorp Terraform is an infrastructure as code tool that lets you define both cloud and on-prem resources
> in human-readable configuration files that you can version, reuse, and share. You can then use a consistent
> workflow to provision and manage all of your infrastructure throughout its lifecycle. Terraform can manage
> low-level components like compute, storage, and networking resources, as well as high-level components like
> DNS entries and SaaS features.


:::info Source

https://www.terraform.io/intro

:::

## Terraform within Traxion

Natively, Terraform uses either its own [configuration syntax](https://www.terraform.io/language/syntax) (based on the [HCL syntax](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md)),
or a [JSON format](https://www.terraform.io/language/syntax/json) to describe the components of the infrastructure.

However, Terraform also provides a [TypeScript CDK](https://learn.hashicorp.com/tutorials/terraform/cdktf-build?in=terraform/cdktf) to describe the infrastructure using TypeScript.
This TypeScript code will generate a JSON file that can be understood by the Terraform CLI.

It is this [CDKtf](https://learn.hashicorp.com/tutorials/terraform/cdktf-build?in=terraform/cdktf) that we use in Traxion. Thus the infrastructure is described in TypeScript.


## Cloud provider

Currently, only [AWS](https://aws.amazon.com/) is supported as a cloud provider.

:::info Learn more

To learn more about the AWS infrastructure created by Terraform, see [the infrastructure documentation](/docs/how-to/infrastructure)

:::
