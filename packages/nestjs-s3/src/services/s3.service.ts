/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from '@tractr/nestjs-core';
import S3 from 'aws-sdk/clients/s3';

import { S3_MODULE_CONFIG } from '../constants';
import { S3Config } from '../interfaces';

@Injectable()
export class S3Service implements OnModuleInit {
  public client!: S3;

  constructor(
    @Inject(S3_MODULE_CONFIG)
    private readonly s3Config: S3Config,
    private readonly logger: Logger,
  ) {}

  onModuleInit(): void {
    this.client = new S3(this.s3Config);
  }
}
