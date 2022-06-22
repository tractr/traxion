module.exports = {
  title: 'Traxion',
  tagline:
    'A suite of orchestrated tools that aims to accelerate the development of web applications.',
  url: 'https://git',
  baseUrl: '/traxion.github.io/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tractr',
  projectName: 'traxion.github.io',
  deploymentBranch: 'main',
  trailingSlash: true,
  themeConfig: {
    navbar: {
      title: 'Traxion',
      logo: {
        alt: 'Traxion Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/tractr/stack',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get started',
              to: '/docs/get-started',
            },
            {
              label: 'Contribute',
              to: '/docs/contribution/code-guidelines',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.traxion.dev/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/TraxionDev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tractr/stack',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tractr, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tractr/stack/tree/main/apps/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
