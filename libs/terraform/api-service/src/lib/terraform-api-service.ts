import { Environment, SecretMap } from '../../pool/containers/container';
import {
  HttpContainer,
  HttpContainerConfig,
} from '../../pool/containers/http-container';
import { ApiContainerConfig } from './terraform-api-config';

export class ApiContainer extends HttpContainer<ApiContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'api';
  }

  getImageTag(): string {
    return 'latest';
  }

  protected getPort(): number {
    return 3000;
  }

  protected getEnvironments(): Environment[] {
    const options = this.config.db.options || '';
    return [
      { name: 'NODE_ENV', value: 'production' },
      { name: 'NODE_OPTIONS', value: '' },
      { name: 'API_URL', value: this.service.getApplicationUrl('/api') },
      { name: 'PWA_URL', value: this.service.getApplicationUrl('') },
      { name: 'POSTGRES_DB', value: this.config.db.name },
      { name: 'POSTGRES_DB_TEST', value: this.config.db.nameTest },
      {
        name: 'POSTGRES_HOST',
        value:
          this.config.db.host || this.service.getServiceDomainName('postgres'),
      },
      { name: 'POSTGRES_PORT', value: this.config.db.port },
      { name: 'POSTGRES_SCHEMA', value: this.config.db.schema },
      { name: 'POSTGRES_OPTIONS', value: options },
      {
        name: 'FILE_STORAGE_ENDPOINT',
        value: this.service.getFileStorageS3Endpoint(),
      },
      {
        name: 'FILE_STORAGE_DEFAULT_BUCKET',
        value: this.service.getFileStorageS3BucketName(),
      },
      { name: 'FILE_STORAGE_PORT', value: '443' },
      { name: 'FILE_STORAGE_USE_SSL', value: 'true' },
      { name: 'MOCK_DATA_FOLDER', value: '' },
      { name: 'HOOTSUITE_BASE_URL', value: 'https://platform.hootsuite.com' },
      { name: 'REVIEWS_BASE_URL', value: 'https://reviews.com' },
      {
        name: 'COMMUNICATION_PLAN_GENERATION_CRON',
        value: '0 0 0 * * 7',
      },
      { name: 'HOOTSUITE_PUBLICATION_CRON', value: '0 0 2 * * 7' },
      {
        name: 'FILE_STORAGE_PRUNE_TEMPORARY_FILES_CRON',
        value: '0 0 4 * * *',
      },
      {
        name: 'HOOTSUITE_PUBLICATION_ACTIVATE_POST_APPROBATION',
        value: 'false',
      },
    ];
  }

  protected getSecrets(): (string | SecretMap)[] {
    return [
      'COOKIE_SECRET',
      'JWT_SECRET',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'HOOTSUITE_CLIENT_ID',
      'HOOTSUITE_CLIENT_SECRET',
      'HOOTSUITE_ORGANISATION_ID',
      'REVIEWS_CLIENT_ID',
      'REVIEWS_CLIENT_SECRET',
      'REVIEWS_CLIENT_ACCOUNT_ID',
      'FILE_STORAGE_ACCESS_KEY',
      'FILE_STORAGE_SECRET_KEY',
      'MAILER_PRIVATE_API_KEY',
      'MAILER_PUBLIC_API_KEY',
    ];
  }
}
