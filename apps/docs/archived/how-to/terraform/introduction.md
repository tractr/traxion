---
id: introduction
title: Introduction
sidebar_label: Introduction
---

Traxion uses [Terraform](https://www.terraform.io/) to describe the underlying infrastructure of the application.

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

## Code architecture

Basically, within Traxion, Terraform is a NodeJs application.
This application builds, in TypeScript, an AWS stack.
This stack is broken down into modules. These modules are called groups.
These groups are sets of components.
These components create AWS resources.
The CDKtf CLI takes this stack as input and generates the JSON file for the Terraform CLI.

```text
stack
├── group1
│   ├── component1
│   │   ├── resource1
│   │   └── resource2
│   ├── component2
│   └── component3
├── group2
└── group3
```

This nodes architecture is based on [CDKtf](https://learn.hashicorp.com/tutorials/terraform/cdktf-build?in=terraform/cdktf), itself based on [Constructs](https://github.com/aws/constructs).

> Constructs are classes which define a "piece of system state".
> Constructs can be composed together to form higher-level building blocks which represent more complex state.

### Available groups

The groups contained in the stack are the following:

- `RegistryGroup`: Creates the Docker regsitry that hosts your application images
- `ZoneGroup`: Creates the certificates and manages the DNS zone
- `NetworkGroup`: Creates the networks underlying the application
- `PoolGroup`: Creates the Docker services that run the applications and the automated deployment mechanisms.

### Folder architecture

In your project, the `terraform` application will have this structure:

```text
apps/terraform/src
├── configs
│   ├── apps.config.ts
│   ├── environments.config.ts
│   ├── index.ts
│   └── terraform.config.ts
├── dtos
│   ├── index.ts
│   └── terraform-environment-variables.dto.ts
├── interfaces
│   ├── environment.interface.ts
│   └── index.ts
├── main.ts
└── stacks
    ├── index.ts
    └── main.stack.ts
```

:::info More details

For more details about the folder architecture, please refer to the [configuration documentation](/docs/how-to/terraform/configuration).

:::
