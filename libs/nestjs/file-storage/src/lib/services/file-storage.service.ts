import { Inject, Injectable } from '@nestjs/common';
import { Client, CopyConditions } from 'minio';
import { v4 as uuidv4 } from 'uuid';

import { FILE_STORAGE_CONFIGURATION } from '../constants';
import { FileStorageConfiguration } from '../interfaces';

@Injectable()
export class FileStorageService extends Client {
  constructor(
    @Inject(FILE_STORAGE_CONFIGURATION)
    private fileStorageConfiguration: FileStorageConfiguration,
  ) {
    super(fileStorageConfiguration);
  }

  /**
   * Get presigned upload url
   *
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public getPresignedUploadUrl(customBucket?: string) {
    const { temporaryPrefix, presignedUpload, defaultBucket } =
      this.fileStorageConfiguration;
    const bucket = customBucket ?? defaultBucket;
    const path = `${temporaryPrefix}/${this.getUniqueFilename()}`;
    const expires = new Date(Date.now() + presignedUpload.defaultValidity);

    const policy = this.newPostPolicy();
    policy.setBucket(bucket);
    policy.setKey(path);
    policy.setExpires(expires);
    policy.setContentLengthRange(
      presignedUpload.minFileSize,
      presignedUpload.maxFileSize,
    );
    return this.presignedPostPolicy(policy);
  }

  /**
   * Get presigned upload url
   *
   * @param file - File to download
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public getPresignedDownloadUrl(file: string, customBucket?: string) {
    const { defaultBucket, presignedDownload } = this.fileStorageConfiguration;
    const bucket = customBucket ?? defaultBucket;
    return this.presignedGetObject(
      bucket,
      file,
      presignedDownload.defaultValidity,
    );
  }

  /**
   * Get unique file name (with uuid)
   *
   * @param prefix - Prefix of the generated uuid
   * @param suffix - Suffix of the generated uuid
   */
  public getUniqueFilename(prefix = '', suffix = '') {
    return `${prefix}${uuidv4()}${suffix}`;
  }

  /**
   * Check if a file exists on file storage
   *
   * @param file - File to check
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public async doesFileExists(file: string, customBucket?: string) {
    const bucket = customBucket ?? this.fileStorageConfiguration.defaultBucket;
    try {
      await this.statObject(bucket, file);
      return true;
    } catch (e) {
      if (e.code === 'NotFound') return false;
      throw new Error(
        `Something went wrong while testing existence of file ${file} in bucket ${bucket}: ${JSON.stringify(
          e,
        )}`,
      );
    }
  }

  /**
   * Move a temporary file to a permanent destination
   *
   * @param file - file to commit
   * @param destination - file destination
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public async commitTemporaryFile(
    file: string,
    destination: string,
    customBucket: string,
  ) {
    const bucket = customBucket ?? this.fileStorageConfiguration.defaultBucket;
    const temporaryFile = `${this.fileStorageConfiguration.temporaryPrefix}/${file}`;

    if (await this.doesFileExists(bucket, temporaryFile))
      throw new Error(
        `Can not commit file ${temporaryFile} of bucket ${bucket}: file does not exists`,
      );

    if (await this.doesFileExists(bucket, destination))
      throw new Error(
        `Can not commit file ${temporaryFile} of bucket ${bucket} to ${destination}: ${destination} already exists`,
      );

    await this.copyObject(
      bucket,
      destination,
      temporaryFile,
      new CopyConditions(),
    );
    await this.removeObject(bucket, temporaryFile);
  }

  /**
   * Remove outdated temporary files from targeted bucket
   *
   * @param bucket - Targeted bucket
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public async removeOutdatedTemporaryFiles(customBucket?: string) {
    const { temporaryPrefix, temporaryFilesTTL, defaultBucket } =
      this.fileStorageConfiguration;

    const bucket = customBucket ?? defaultBucket;
    const limit = new Date();
    limit.setMilliseconds(-1 * temporaryFilesTTL);

    let counter = 0;

    await new Promise((resolve, reject) => {
      const promises: Promise<void>[] = [];
      const stream = this.listObjects(bucket, temporaryPrefix, true);
      stream.on('data', (file) => {
        // Only old files
        if (file.lastModified < limit) {
          promises.push(this.removeObject(bucket, file.name));
          /* eslint-disable-next-line no-plusplus */
          counter++;
        }
      });
      stream.on('end', () => {
        Promise.all(promises).then(resolve).catch(reject);
      });
      stream.on('error', reject);
    });

    return counter;
  }
}
