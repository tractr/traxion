# GitHub Workflows

Add GitHub workflows to a NX project.

```shell
nx g @trxn/schematics:github-workflows
```

## Description

Creates `.github` folder and adds workflows that will be executed by GitAction runners.

The following steps will be performed:

- Creates `.github` folder
- Create files (workflows) inside `.github` folder

## Options

| Option                         | Description                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `--all`                        | Install all workflows                                                                                                 |
| `--workflow`                   | Select the workflows to generate: `test`, `semantic` or `release`                                                     |
