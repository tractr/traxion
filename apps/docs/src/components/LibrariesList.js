// eslint-disable-next-line
import React from 'react';

const libsList = [
  {
    title: 'Angular',
    level: 1,
    link: 'https://angular.io/',
    description: <>A front-end framework for modern web.</>,
  },
  {
    title: 'Ant Design',
    level: 1,
    link: 'https://ant.design/',
    description: (
      <>
        A design system for enterprise-level products. Create an efficient and
        enjoyable work experience.
      </>
    ),
  },
  {
    title: 'Apollo',
    level: 2,
    link: 'https://www.apollographql.com/',
    description: (
      <>
        Apollo is a platform for building a unified graph, a communication layer
        that helps you manage the flow of data between your application clients
        (such as web and native apps) and your back-end services.
      </>
    ),
  },
  {
    title: 'GraphQL',
    level: 2,
    link: 'https://graphql.org/',
    description: (
      <>
        GraphQL is a query language for APIs and a runtime for fulfilling those
        queries with your existing data.
      </>
    ),
  },
  {
    title: 'Casl',
    level: 2,
    link: 'https://casl.js.org/',
    description: <>Isomorphic Authorization JavaScript library.</>,
  },
  {
    title: 'Docusaurus',
    level: 1,
    link: 'https://docusaurus.io/',
    description: <>A documentation framework built on top of React and MDX.</>,
  },
  {
    title: 'MDX',
    level: 2,
    link: 'https://mdxjs.com/',
    description: <>MDX allows you to use JSX in your markdown content.</>,
  },
  {
    title: 'NestJS',
    level: 1,
    link: 'https://nestjs.com/',
    description: (
      <>
        A progressive Node.js framework for building efficient, reliable and
        scalable server-side applications.
      </>
    ),
  },
  {
    title: 'JWT',
    level: 2,
    link: 'https://jwt.io/',
    description: (
      <>
        JSON Web Tokens are an open, industry standard RFC 7519 method for
        representing claims securely between two parties.
      </>
    ),
  },
  {
    title: 'Passport',
    level: 2,
    link: 'https://www.passportjs.org/',
    description: <>Simple, unobtrusive authentication for Node.js.</>,
  },
  {
    title: 'Swagger',
    level: 2,
    link: 'https://swagger.io/',
    description: (
      <>
        The Single Source of Truth for API Development Accelerating API delivery
        and quality through standards and collaboration, built on OpenAPI.
      </>
    ),
  },
  {
    title: 'Ngx Translate',
    level: 3,
    link: 'https://github.com/ngx-translate/core',
    description: <>The internationalization (i18n) library for Angular.</>,
  },
  {
    title: 'Nx',
    level: 1,
    link: 'https://nx.dev/',
    description: (
      <>
        Next generation build system with first class monorepo support and
        powerful integrations.
      </>
    ),
  },
  {
    title: 'Prisma',
    level: 2,
    link: 'https://www.prisma.io/',
    description: <>Node.js and TypeScript ORM.</>,
  },
  {
    title: 'Faker',
    level: 3,
    link: 'https://www.npmjs.com/package/faker/v/5.5.3',
    description: (
      <>Generate massive amounts of fake data in the browser and Node.js.</>
    ),
  },
  {
    title: 'Case',
    level: 3,
    link: 'https://github.com/nbubna/Case',
    description: (
      <>An extensible utility to convert, identify, and flip string case.</>
    ),
  },
  {
    title: 'Class transformer',
    level: 2,
    link: 'https://github.com/typestack/class-transformer',
    description: (
      <>
        Allows you to transform plain object to some instance of class and
        versa.
      </>
    ),
  },
  {
    title: 'Class validator',
    level: 2,
    link: 'https://github.com/typestack/class-validator',
    description: (
      <>Allows use of decorator and non-decorator based validation.</>
    ),
  },
  {
    title: 'Commander',
    level: 2,
    link: 'https://github.com/tj/commander.js',
    description: <>Solution for node.js command-line interfaces.</>,
  },
  {
    title: 'Constructs',
    level: 3,
    link: 'https://github.com/aws/constructs',
    description: (
      <>
        Constructs are classes which define a "piece of system state".
        Constructs can be composed together to form higher-level building blocks
        which represent more complex state.
      </>
    ),
  },
  {
    title: 'Deepmerge',
    level: 3,
    link: 'https://github.com/TehShrike/deepmerge',
    description: (
      <>Merges the enumerable properties of two or more objects deeply.</>
    ),
  },
  {
    title: 'Dotenv',
    level: 3,
    link: 'https://github.com/motdotla/dotenv',
    description: (
      <>
        A zero-dependency module that loads environment variables from a{' '}
        <code>.env</code>
        file into <code>process.env</code>.
      </>
    ),
  },
  {
    title: 'Enquirer',
    level: 2,
    link: 'https://github.com/enquirer/enquirer',
    description: (
      <>
        Stylish CLI prompts that are user-friendly, intuitive and easy to
        create.
      </>
    ),
  },
  {
    title: 'Express',
    level: 2,
    link: 'https://github.com/expressjs/express',
    description: <>Fast, unopinionated, minimalist web framework for node.</>,
  },
  {
    title: 'FS extra',
    level: 3,
    link: 'https://github.com/jprichardson/node-fs-extra',
    description: (
      <>
        Adds file system methods that aren't included in the native fs module
        and adds promise support to the fs methods.
      </>
    ),
  },
  {
    title: 'Glob',
    level: 3,
    link: 'https://github.com/isaacs/node-glob',
    description: (
      <>Match files using the patterns the shell uses, like stars and stuff.</>
    ),
  },
  {
    title: 'Jest',
    level: 1,
    link: 'https://jestjs.io/',
    description: (
      <>A JavaScript testing framework with a focus on simplicity.</>
    ),
  },
  {
    title: 'Lodash',
    level: 2,
    link: 'https://lodash.com/',
    description: (
      <>
        A modern JavaScript utility library delivering modularity, performance &
        extras.
      </>
    ),
  },
  {
    title: 'Mime Types',
    level: 3,
    link: 'https://github.com/jshttp/mime-types',
    description: <>A JavaScript content-type utility.</>,
  },
  {
    title: 'Minio',
    level: 2,
    link: 'https://github.com/minio/minio-js',
    description: (
      <>
        The MinIO JavaScript Client SDK provides simple APIs to access any
        Amazon S3 compatible object storage server.
      </>
    ),
  },
  {
    title: 'Morgan',
    level: 2,
    link: 'https://github.com/expressjs/morgan',
    description: <>HTTP request logger middleware for node.js</>,
  },
  {
    title: 'Nanoid',
    level: 3,
    link: 'https://github.com/ai/nanoid',
    description: (
      <>
        A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
      </>
    ),
  },
  {
    title: 'Ng Zorro',
    level: 1,
    link: 'https://ng.ant.design/docs/introduce/en',
    description: (
      <>
        An enterprise-class Angular UI component library based on Ant Design,
        all components are open source and free to use under MIT license.
      </>
    ),
  },
  {
    title: 'Terraform',
    level: 1,
    link: 'https://www.terraform.io/',
    description: (
      <>
        An open-source infrastructure as code software tool that provides a
        consistent CLI workflow to manage hundreds of cloud services.
      </>
    ),
  },
  {
    title: 'Pg',
    level: 2,
    link: 'https://github.com/brianc/node-postgres',
    description: (
      <>
        Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional
        native libpq bindings.
      </>
    ),
  },
  {
    title: 'React Admin',
    level: 1,
    link: 'https://marmelab.com/react-admin/',
    description: (
      <>
        React-admin offers the best developer experience, lets you focus on
        business needs, and build delightful user interfaces.
      </>
    ),
  },
  {
    title: 'RxJS',
    level: 2,
    link: 'https://rxjs.dev/',
    description: (
      <>
        RxJS is a library for composing asynchronous and event-based programs by
        using observable sequences.
      </>
    ),
  },
  {
    title: 'Supertest',
    level: 2,
    link: 'https://github.com/visionmedia/supertest',
    description: <>HTTP assertions made easy via superagent.</>,
  },
  {
    title: 'TS Essentials',
    level: 2,
    link: 'https://github.com/krzkaczor/ts-essentials',
    description: (
      <>
        A set of high-quality, useful TypeScript types that make writing
        type-safe code easier.
      </>
    ),
  },
  {
    title: 'Tslib',
    level: 3,
    link: 'https://github.com/Microsoft/tslib',
    description: (
      <>
        A runtime library for TypeScript that contains all of the TypeScript
        helper functions.
      </>
    ),
  },
  {
    title: 'Uuid',
    level: 3,
    link: 'https://github.com/uuidjs/uuid',
    description: <>For the creation of RFC4122 UUIDs.</>,
  },
  {
    title: 'Xhr2',
    level: 3,
    link: 'https://www.npmjs.com/package/xhr2',
    description: (
      <>
        An npm package that implements the W3C XMLHttpRequest specification on
        top of the node.js APIs.
      </>
    ),
  },
  {
    title: 'Zone.js',
    level: 3,
    link: 'https://www.npmjs.com/package/zone.js',
    description: <>Implements Zones for JavaScript, inspired by Dart.</>,
  },
  {
    title: 'Zx',
    level: 2,
    link: 'https://github.com/google/zx',
    description: (
      <>
        Provides useful wrappers around child_process, escapes arguments and
        gives sensible defaults.
      </>
    ),
  },
  {
    title: 'Schematics',
    level: 2,
    link: 'https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics',
    description: <>A scaffolding library for the modern web.</>,
  },
  {
    title: 'CDKtf',
    level: 2,
    link: 'https://learn.hashicorp.com/tutorials/terraform/cdktf',
    description: (
      <>
        Cloud Development Kit for Terraform allows you to define infrastructure
        using a familiar programming language such as TypeScript, Python, or Go.
      </>
    ),
  },
  {
    title: 'Commitlint',
    level: 3,
    link: 'https://github.com/conventional-changelog/commitlint',
    description: (
      <>
        Forces the commit message format. It is required for automatic changelog
        generation and automatic versioning based on commit messages.
      </>
    ),
  },
  {
    title: 'Hapify',
    level: 1,
    link: 'https://docs.hapify.io/',
    description: <>Template engine for CRUD operations.</>,
  },
  {
    title: '@jscutlery/semver',
    level: 3,
    link: 'https://github.com/jscutlery/semver',
    description: (
      <>
        Nx plugin for versioning using [SemVer](https://semver.org/) and
        CHANGELOG generation powered by [Conventional
        Commits](https://conventionalcommits.org).
      </>
    ),
  },
  {
    title: 'SWC',
    level: 3,
    link: 'https://github.com/swc-project/swc',
    description: (
      <>A super-fast TypeScript / JavaScript compiler written in Rust.</>
    ),
  },
  {
    title: 'Autoprefixer',
    level: 3,
    link: 'https://github.com/postcss/autoprefixer',
    description: (
      <>
        PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using
        values from Can I Use.
      </>
    ),
  },
  {
    title: 'Commitizen',
    level: 3,
    link: 'https://commitizen-tools.github.io/commitizen/',
    description: (
      <>
        A tool to define a standard way of committing rules and communicating
        it.
      </>
    ),
  },
  {
    title: 'Cypress',
    level: 2,
    link: 'https://github.com/cypress-io/cypress',
    description: (
      <>Fast, easy and reliable testing for anything that runs in a browser.</>
    ),
  },
  {
    title: 'Cz conventional changelog',
    level: 3,
    link: 'https://github.com/commitizen/cz-conventional-changelog',
    description: (
      <>
        Part of the commitizen family. Prompts for conventional changelog
        standard.
      </>
    ),
  },
  {
    title: 'ESlint',
    level: 2,
    link: 'https://eslint.org/',
    description: (
      <>
        Statically analyzes your code to quickly find problems. Many problems
        ESLint finds can be automatically fixed. It runs automatically when
        commiting changes, thanks to Husky and Lint-staged. If an error cannot
        be fixed automatically, the commit will fail.
      </>
    ),
  },
  {
    title: 'Husky',
    level: 2,
    link: 'https://github.com/typicode/husky/',
    description: (
      <>
        A tool triggering actions on git hook (before/after{' '}
        <code>git commit</code>, etc.).
      </>
    ),
  },
  {
    title: 'Is-ci',
    level: 3,
    link: 'https://github.com/watson/is-ci',
    description: (
      <>
        A simple tool that detects if the current environment is a Continuous
        Integration server.
      </>
    ),
  },
  {
    title: 'Lint-staged',
    level: 3,
    link: 'https://www.npmjs.com/package/lint-staged',
    description: (
      <>
        A simple library that runs linters (<code>eslint</code>,{' '}
        <code>prettier</code>) on staged files before commiting.
      </>
    ),
  },
  {
    title: 'Ng-packagr',
    level: 3,
    link: 'https://github.com/ng-packagr/ng-packagr',
    description: (
      <>
        Compile and package Angular libraries in Angular Package Format (APF).
      </>
    ),
  },
  {
    title: 'Postcss',
    level: 3,
    link: 'https://github.com/postcss/postcss',
    description: <>A tool for transforming styles with JS plugins.</>,
  },
  {
    title: 'Prettier',
    level: 2,
    link: 'https://prettier.io/',
    description: (
      <>
        A unified code formatter that supports many languages, integrated in
        many IDE and has few options. It runs automatically when commiting
        changes, thanks to Husky and Lint-staged.
      </>
    ),
  },
  {
    title: 'Tailwind CSS',
    level: 1,
    link: 'https://tailwindcss.com/',
    description: (
      <>
        A utility-first CSS framework packed with classes like flex, pt-4,
        text-center and rotate-90 that can be composed to build any design,
        directly in your markup.
      </>
    ),
  },
  {
    title: 'TypeScript',
    level: 1,
    link: 'https://www.typescriptlang.org/',
    description: (
      <>
        A strongly typed programming language that builds on JavaScript, giving
        you better tooling at any scale.
      </>
    ),
  },
  {
    title: 'Webpack',
    level: 2,
    link: 'https://webpack.js.org/',
    description: (
      <>A static module bundler for modern JavaScript applications.</>
    ),
  },
].sort((a, b) => a.title.localeCompare(b.title));

function LibDetails({ link, title, description }) {
  return (
    <div>
      <h3>
        <a href={link}>{title}</a>
      </h3>
      <p>{description}</p>
    </div>
  );
}

export default function LibrariesList({ levels }) {
  return (
    <div>
      {libsList
        .filter((props) => levels.includes(props.level))
        .map((props, idx) => (
          <LibDetails key={idx} {...props} />
        ))}
    </div>
  );
}
