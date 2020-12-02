# Pulumi AWS fargate test

Pulumi is a tool to manage infrastructure as code in typescript!

This folder contains a small app that serve a static html file with an engine docker image.
The infratructure is described in `index.ts` and is made of a load balancer that distribute incoming requests between
to instances of the app image.

Containers are hosted on AWS FartGate

The associated tutorial can be found here: https://www.pulumi.com/docs/tutorials/aws/ecs-fargate/

## Deploy the stack
- Move in the pulumi-test directory
- run `npm i`
- set your AWS credentials in your terminal by running `
export AWS_ACCESS_KEY_ID=<YOUR AWS ID>
export AWS_SECRET_ACCESS_KEY=<YOUR AWS SECRET>
`
- Run `pulumi up`

## Destroy the stack
- Run `pulumi destroy`
