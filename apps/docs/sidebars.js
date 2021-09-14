module.exports = {
  documentation: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'introduction',
    },
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/generation', 'overview/scaffolding'],
    },
    {
      type: 'category',
      label: 'How to',
      items: [
        'how-to/initialization',
        'how-to/data-models',
        'how-to/database',
        'how-to/angular',
        'how-to/authentication',
        'how-to/authorization',
        'how-to/file-storage',
        'how-to/mailer',
        'how-to/infrastructure',
        'how-to/ci-cd',
        'how-to/style-guide',
      ],
    },
    {
      type: 'category',
      label: 'Schematics',
      items: [
        'schematics/how-to',
        'schematics/publish',
        'schematics/release',
        'schematics/prettier',
        'schematics/schematic-template-lib',
      ],
    },
    {
      type: 'category',
      label: 'Contribution',
      items: ['contribution/how-to-write-this-documentation'],
    },
  ],
};
