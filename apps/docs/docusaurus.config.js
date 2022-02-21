module.exports = {
  title: 'Traxion',
  tagline: 'Use code generator like never',
  url: 'https://traxion.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Tractr',
  projectName: 'Traxion',
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
              to: '/docs/get-started/quick-start',
            },
            {
              label: 'Contribute',
              to: '/docs/contribution/how-to-write-this-documentation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/traxion',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/traxion',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/tractr/traxion',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Traxion, Inc. Built with Docusaurus.`,
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
