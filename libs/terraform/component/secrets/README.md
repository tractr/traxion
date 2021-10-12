# Secrets component

This component simply create an AWS Secret Manager secrets store.

## Usage

This secrets store is empty. Once Terraform is applied, you should fill these
secrets manually in AWS console.

This store is meant to handle application environments: Database password,
database user, services API token, etc: any environment variables required by
the containers

