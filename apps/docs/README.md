# Traxion documentation

Welcome to the documentation site for Traxion! This site was built using [Docusaurus](https://docusaurus.io/), a static site generator for documentation.

## Getting Started

To run the site locally, you'll need to have Node.js and NPM installed. Once you have those, you can install the dependencies and start the development server by running the following commands:

```bash
nx serve docs
```

The site will be available at <http://localhost:5000>.

## Writing documentation

Documentation is written in Markdown and placed in the `docs` folder. The site's navigation and structure is defined in the `sidebars.json` file. You can learn more about writing documentation and how to customize the site in the [Docusaurus documentation](https://docusaurus.io/docs/).

## Build

When you're ready to deploy the site, you can use the `nx build docs` command to generate a production-ready version of the site in the `dist/apps/docs` folder. This folder can then be deployed to a web server or a service like GitHub Pages.

## Deployment

To deploy you can run the `nx deploy docs` command to deploy on the `https://github.com/tractr/traxion.github.io` repository via the `deploy.ts` script.
You can learn more about deploying Docusaurus sites in the [Docusaurus documentation](https://docusaurus.io/docs/en/deployment).

## Notes

Docusaurus still use react 17. That why in this mono repo the docusaurus dependencies are scoped to the app and not the main package.json.
That's means we use a pre script to install the dependencies when we serve or build the docs (the dependencies are located in `apps/docs/package.json` and the prepare script are in `apps/docs/project.json`).

## Community

The Traxion community can be found on [Discord](https://discord.gg/traxion) and [Reddit](https://www.reddit.com/r/traxion/).

## Contributing

If you're interested in contributing to the Traxion project, you can check out the [contributing guide](https://github.com/tractr/traxion/blob/main/CONTRIBUTING.md) for more information.

## License

The code for this documentation site is licensed under the [MIT License](https://github.com/tractr/traxion/blob/main/LICENSE).
