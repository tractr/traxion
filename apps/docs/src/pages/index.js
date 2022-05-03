/* eslint-disable import/default */
/* eslint-disable import/no-unresolved */
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

const features = [
  {
    title: 'Frameworks orchestration',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Traxion configures and manipulates multiple frameworks and provides a
        working and scalable application in minutes.
      </>
    ),
  },
  {
    title: 'Enhance by generators',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Traxion uses several generators and scaffolders, such as Hapify and
        Schematics
      </>
    ),
  },
  {
    title: 'Powered by many',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Traxion is built on top of many popular frameworks and libraries such as
        NestJS, Prisma, ReactAdmin, Angular, React, Nx, Hapify, Schematics,
        Jest, Terraform, and more.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/get-started')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
