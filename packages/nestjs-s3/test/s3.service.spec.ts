import { Test, TestingModule } from '@nestjs/testing';
import S3 from 'aws-sdk/clients/s3';

import { S3Module, S3Service } from '../src';

describe('S3Service', () => {
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        S3Module.register({
          accessKeyId: 'minio',
          secretAccessKey: 'password',
          endpoint: 'http://127.0.0.1:9000',
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        }),
      ],
    }).compile();

    s3Service = module.get<S3Service>(S3Service);
    s3Service.onModuleInit();
  });

  it('should be defined', () => {
    expect(s3Service).toBeDefined();
  });

  it('should be an instance of S3Service', () => {
    expect(s3Service).toBeInstanceOf(S3Service);
  });

  it('should have an initalised S3 client instance', () => {
    expect(s3Service.client).toBeInstanceOf(S3);
  });

  it('should be able to connect to S3', async () => {
    expect((await s3Service.listBuckets()).Buckets).toBeInstanceOf(Array);
  });
});
