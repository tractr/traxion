---
id: documentation-guidelines
title: Documentation guidelines
sidebar_label: Documentation guidelines
---

# Documentation guidelines

## Overview

This document aims to define writing guidelines in order to harmonize documentation.
It mainly focuses on formatting, but also on semantics.

### Markdown engine

This documentation supports the [GitHub-flavored Markdown syntax](https://github.github.com/gfm/).

## Content breakdown

### Document length

There is no firm limit to the size of a document, but if it is too large to read in its entirety, it should be split into several hierarchical documents.
Depending on the nature of the document, the acceptable size may vary.

For example, an API reference document could be relatively long because it is not meant to be read in one go, nor in any particular order.
It is rather a detailed list of functions than a text to be read from beginning to end.

On the other hand, a procedure or an onboarding document must remain readable at once. These types of documents cannot be read in part.

### Headers

Headers allow you to separate parts of the text properly and to visually structure the document.
If a block of text is longer than 3 paragraphs, then it should be split into sub-blocks by adding lower level headers.

Header sizes must follow each other. You don't jump from an `H2` to an `H4`.

#### `H1`

A document should contain only one `H1` heading, at the beginning of the page, which repeats the title of the document.
It can be more explicit than the menu title.

#### `H2`

It is used to separate the different parts of the document.
If a document has too many `H2`, then the structure of the document must be rethought and `H3` subsections must be used.

#### `H3` to `H6`

These headers allow you to subdivide and prioritize the `H2` blocks.

## Formatting

Only the formatting styles that are mentioned in this document are allowed.
The number of styles is voluntarily restricted to simplify the reading of a document.

Styles should not be mixed together.

### Bold text

#### Usage

Bold text should be used to underline the name of an entity (a proper noun, a button on an interface, the name of a page in a breadcrumb trail, etc.) or a key value (for example **70%**).

:::success Examples

Go to your GitHub account, in **Settings** → **Developer settings** → **Personal access tokens** and click on **Generate new token**... <br />
If you use **macOS** or **Linux**, use the following command: ...

:::

#### Restrictions

Bold should not be used to highlight a complete sentence, nor to highlight a conjunction (and, or, etc.).
It should not be used in a header.

:::danger Examples

**Run the npm install command to install the packages.**

:::

### Inline code

#### Usage

This formatting allows you to highlight a name that can be assimilated to a variable.
For example: the name of a function, the name or value of a variable, the name of a file, the value of a field to be entered in a form, an email address, etc.

It can also be used to highlight a command line.
If this command is too long it is better to use a code block.

This formatting helps the reader to copy the text if needed because the beginning and end (including spaces) are clearly defined.

It can be used in a header.

:::success Examples

Login with the default account: `admin@exemple.com` and enter the password `demo`... <br />
Run the `npm install` command to install the packages... <br />
If we take a closer look at the `onModuleInit()` method of the `api/src/app.module.ts` file ...

:::

#### Restrictions

The inline code must not be used to highlight a complete sentence, nor to highlight a conjunction (and, or, etc.).

:::danger Examples

`Run the npm install command to install the packages.` <br />
Click the `or` button to run the start command.

:::

### Links

#### Usage

Links can be used to point to an external resource or other page in the documentation.

If the link is current it can be displayed as is, otherwise it is better to integrate it into the text.

:::success Examples

For more information go to https://docs.hapify.io/ <br />
Click [here](https://docs.hapify.io/) to see the documentation.

:::

#### Restrictions

If a link is really long and contains tokens in the URL, it must be integrated in the text.

:::danger Examples

See the documentation : https://longurlmaker.com/go?id=Metamark401Ne1kTightURLGetShorty11904remote16030107enduring0j0wenlargedstringy4continuedNanoRef0911011SimURLYepItspreadZoutfarawayc1towering01Shorl7b06ShortURL5ganglingcDecentURL1Xil0remote1highffarZreachingm104towering218prolongedfarZoffstretchingexpanded51stretchstretching11a21stretchedlShredURL2eprotracted22zvShredURL804prolongedcganglingg8076436sustainedr9b7spunZoutde10lnkZin230FhURLShrinkr1URLCutterj8prolong

:::

## Blocks

### Code

Code blocks should be used to display code (even a single line) or a command if it is longer than 50 characters.
These blocks can be easily copied.

:::note Examples

```ts {3}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

```shell
nx g @nrwl/react:component my-component --project=my-app
```

:::

### Admonitions

Admonitions allow you to add useful information that is not part of the main information.
The document should not lose its meaning if they are removed.
Admonitions should be kept short.

#### Examples

:::note More information

For more information go to https://docs.hapify.io/

:::

:::tip Tip

Unplug the power to shut down your computer faster!

:::

:::caution

If this document bores you, go play Quake III.

:::

### Lists

Lists should be used to list short items only (a single sentence, a few words).

They should not be used to list the steps of a procedure for example.
In this case, it is better to have different paragraphs separated by headers.
For this reason, numbered lists should not be used.

:::note Examples

Here are the main tools for writing documentation:

- [Docusaurus](https://docusaurus.io/)
- [Sphinx](https://www.sphinx-doc.org/)
- [Mkdocs](https://www.mkdocs.org/)

:::

### Tables

Tables are not easy to read, but allow to display a large amount of information that does not need to be explained.

For this reason, tables should only be used to display data for comparison at a glance.
They should not replace a list that has become too detailed.

:::note Example

| Compose file format | Docker Engine release | Supported |
| -------- | --------- | --------- |
| 3.8 | 19.03.0+ | yes |
| 3.7 | 18.06.0+ | yes |
| 3.6 | 18.02.0+ | yes |
| 3.5 | 17.12.0+ | no |
| 3.4 | 17.09.0+ | no |
| 3.3 | 17.06.0+ | no |

:::

### Images

An image illustrates a process (with a diagram) or a step in a procedure (with a screenshot).

It does not replace a text but accompanies it.
Do not use inline images because they distort the layout of the text.
Do not integrate memes or gifs.

:::danger

Never use an image to display text: a console error for example. The text will be neither indexable nor copyable.

:::

#### Image size

The image must not interfere with the reading. For this reason, it should not take the full height of the page.
If a screenshot is too high, then its width should be constrained and it should be centered to reduce its footprint.

### Blockquotes

Blockquotes should only be used to notify the reader that the text comes from another source.
Before adding a quotation, you must name the source.

:::note Example

As indicated in the NPM documentation, `npm uninstall` allows you to remove a package:

> This uninstalls a package, completely removing everything npm installed on its behalf.
> In global mode (ie, with `-g` or `--global` appended to the command), it uninstalls the current package context as a global package.

:::

### HTML

The only HTML tag allowed is `<br />` which allows you to make a line break without creating a new paragraph.
It is very useful in admonitions that you want to keep short.

## Not allowed

### Italic & Underline

Italic or underline should not be used to support a word. Only bold text or inline code is used for this.

### Text Separator

Text separators (`---`) should not be used.
If a block is to be split visually into two, it should be done with headers.

Text separators should not be used for formatting (e.g. underlining text).
We rely on the formatting proposed by the documentation theme.

### Emoticon

The meaning of emoticons is subjective.
This documentation should not leave room for interpretation.
For this reason emoticons are not allowed.
