module.exports = {
  documentation: [
    { type: 'doc', label: 'Introduction', id: 'introduction' },
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/first-steps', 'overview/hapify'],
    },
    {
      type: 'category',
      label: 'How to',
      items: ['how-to/docusaurus'],
    },
    {
      type: 'category',
      label: 'Commons',
      items: ['commons/common', 'commons/nestjs-core', 'commons/angular-tools'],
    },
    {
      type: 'category',
      label: 'Génération de code',
      items: ['code-generation/hapify'],
    },
    { type: 'category', label: 'Exemples', items: ['doc1', 'doc2', 'doc3'] },
    { type: 'category', label: 'MDX !', items: ['mdx'] },
  ],
};
