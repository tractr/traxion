# terraform-helpers-post-synth

This library contains a set of helpers in order to fix CDKtf synth output.

## Usage

It runs all fixes defined in this library. This command should be used after `cdktf synth`.

```bash
npx terraform-post-synth
```

## Fixes

### CIDR Subnet

Adds support for Terraform's built-in function `cidrsubnet`.
