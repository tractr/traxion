---
id: docusaurus
title: New project - Docusaurus
sidebar_label: Docusaurus
---

## Add Docusaurus

Docusaurus is a static documentation generator from markdown files.

### Install packages

Run the following command to install docusaurus packages:

```shell
npm install -D @nx-plus/docusaurus
```

Generate a docusaurus application, run the following command:

```shell
nx g @nx-plus/docusaurus:app docs
```

### Usage

Run the following command to start the development server:

```shell
nx serve docs
```

### Troubleshooting

If an error occurs, it may be a webpack problem. Try to install `npm i -D webpack@5`.
