# Terraform

This application connects all Terraform components and services to build the infrastructure.

## Configuration

There are two configurations, one global and one environment specific.

`configs/apps.config.ts` contains the global configuration of the services and their containers.

`configs/environments.config.ts` contains the configuration of each environment (i.e. `production`, `staging`, etc.).
Each one can override the services and containers' global configuration.
