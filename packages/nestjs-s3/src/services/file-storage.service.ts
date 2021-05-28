import { Inject, Injectable } from '@nestjs/common';
import { Client, CopyConditions } from 'minio';
import { v4 as uuidv4 } from 'uuid';

import { FILE_STORAGE_MODULE_CONFIG } from '../constants';
import { FileStorageConfig } from '../interfaces';

@Injectable()
export class FileStorageService extends Client {
  constructor(
    @Inject(FILE_STORAGE_MODULE_CONFIG)
    private fileStorageConfig: FileStorageConfig,
  ) {
    super(fileStorageConfig);
  }

  /**
   * Get presigned upload url
   *
   * @param bucket - Bucket to upload file
   */
  public getPresignedUploadUrl(bucket: string) {
    const { temporaryPrefix, presignedUploadDefaults } = this.fileStorageConfig;
    const path = `${temporaryPrefix}/${this.getUniqueFilename()}`;
    const expires = new Date(
      Date.now() + presignedUploadDefaults.defaultValidity,
    );

    const policy = this.newPostPolicy();
    policy.setBucket(bucket);
    policy.setKey(path);
    policy.setExpires(expires);
    policy.setContentLengthRange(
      presignedUploadDefaults.minFileSize,
      presignedUploadDefaults.maxFileSize,
    );
    return this.presignedPostPolicy(policy);
  }

  /**
   * Get presigned upload url
   *
   * @param bucket - Bucket to download from
   * @param object - Object to download
   */
  public getPresignedDownloadUrl(bucket: string, object: string) {
    return this.presignedGetObject(
      bucket,
      object,
      this.fileStorageConfig.presignedDownloadDefaults.defaultValidity,
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
   * @param bucket - Targeted bucket
   * @param file - File to check
   */
  public async doesFileExists(bucket: string, file: string) {
    try {
      await this.statObject(bucket, file);
      return true;
    } catch (e) {
      if (e.code === 'NotFound') return false;
      throw new Error(
        `Something went wrong while testing file existence: ${JSON.stringify(
          e,
        )}`,
      );
    }
  }

  /**
   * Move a temporary file to a permanent destination
   *
   * @param bucket - Targeted bucket
   * @param file - file to commit
   * @param destination - file destination
   */
  public async commitTemporaryFile(
    bucket: string,
    file: string,
    destination: string,
  ) {
    const temporaryFile = `${this.fileStorageConfig.temporaryPrefix}/${file}`;

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
   */
  public async removeOutdatedTemporaryFiles(bucket: string) {
    const { temporaryPrefix, temporaryFilesTTL } = this.fileStorageConfig;

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
