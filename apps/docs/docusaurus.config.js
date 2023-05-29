module.exports = {
  title: 'Traxion',
  tagline: 'From Prisma to anything',
  url: 'https://www.traxion.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tractr',
  projectName: 'traxion.github.io',
  deploymentBranch: 'main',
  trailingSlash: true,
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    navbar: {
      title: 'Traxion',
      logo: {
        alt: 'Traxion Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/tractr/traxion',
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
              label: 'Getting started',
              to: '/',
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
      copyright: `Copyright © ${new Date().getFullYear()} Tractr, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tractr/traxion/tree/main/apps/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: false,
      },
    ],
  ],
};
