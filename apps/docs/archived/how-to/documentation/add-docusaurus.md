---
id: add-docusaurus
title: Add Docusaurus to your project
sidebar_label: Add Docusaurus
---

## Create a documentation

Docusaurus is a static documentation generator from markdown files.

### Install packages

Run the following command to install docusaurus packages:

```shell
npm install -D @nx-plus/docusaurus
```

Generate a docusaurus application, run the following command:

```shell
nx generate @nx-plus/docusaurus:app docs
```

### Usage

Run the following command to start the development server:

```shell
nx serve docs
```

:::caution Troubleshooting

If an error occurs, it may be a webpack problem. Try to install `npm i -D webpack@5`.

:::
