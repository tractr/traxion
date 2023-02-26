import { Inject, Injectable } from '@nestjs/common';
import { extension as getFileExtensionFromMimeType } from 'mime-types';
import { Client, CopyConditions } from 'minio';
import { v4 as uuidv4 } from 'uuid';

import { FILE_STORAGE_CONFIGURATION } from '../constants';
import { FileStorageConfigurationPrivate } from '../interfaces';

/**
 * Service to manipulate remote file storage.
 * Note: it extends Minio Client
 */
@Injectable()
export class FileStorageService extends Client {
  constructor(
    @Inject(FILE_STORAGE_CONFIGURATION)
    private fileStorageConfiguration: FileStorageConfigurationPrivate,
  ) {
    super(fileStorageConfiguration);
  }

  /**
   * Get presigned upload url
   *
   * @param fileMimeType - MIME type of the file to upload
   * @param fileSize - Size of the file to upload (in bits)
   * @param destinationPath - Custom destination path in the temporary folder
   * If not provided, a random id will be used
   * @param customBucket - Custom bucket to upload file. Default
   * bucket will be used if not provided
   */
  public getPresignedUploadUrl(
    fileMimeType: string,
    fileSize: number,
    destinationPath?: string,
    customBucket?: string,
  ) {
    const { temporaryPrefix, presignedUpload, defaultBucket } =
      this.fileStorageConfiguration;

    // File Mime type should be allowed
    if (!presignedUpload.allowedMimeTypes.includes(fileMimeType))
      throw new Error(`${fileMimeType} is not an allowed MIME type`);

    // File size must be allowed
    if (
      fileSize < presignedUpload.minFileSize ||
      fileSize > presignedUpload.maxFileSize
    )
      throw new Error(
        `File size is out of allowed range. It must be between ${presignedUpload.minFileSize} and ${presignedUpload.maxFileSize} bits`,
      );

    const bucket = customBucket ?? defaultBucket;
    const fileExtension = getFileExtensionFromMimeType(fileMimeType);
    const path = `${temporaryPrefix}/${
      destinationPath || `${this.getUniqueFilename()}.${fileExtension}`
    }`;
    const expires = new Date(
      Date.now() + presignedUpload.defaultValidity * 1000,
    );

    const policy = this.newPostPolicy();
    policy.setBucket(bucket);
    policy.setKey(path);
    policy.setExpires(expires);
    policy.setContentLengthRange(fileSize - 5, fileSize + 5);

    return this.presignedPostPolicy(policy);
  }

  /**
   * Get presigned download url
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
      presignedDownload?.defaultValidity,
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
      if (
        typeof e === 'object' &&
        (e as Record<string, unknown>)?.code === 'NotFound'
      )
        return false;

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
    customBucket?: string,
  ) {
    const { defaultBucket, temporaryPrefix } = this.fileStorageConfiguration;
    const bucket = customBucket ?? defaultBucket;
    const temporaryFile = `${temporaryPrefix}/${file}`;

    if (!(await this.doesFileExists(temporaryFile, bucket)))
      throw new Error(
        `Can not commit file ${temporaryFile} of bucket ${bucket}: file does not exists`,
      );

    if (await this.doesFileExists(destination, bucket))
      throw new Error(
        `Can not commit file ${temporaryFile} of bucket ${bucket} to ${destination}: ${destination} already exists`,
      );

    await this.copyObject(
      bucket,
      destination,
      `${bucket}/${temporaryFile}`,
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
  public async pruneTemporaryFiles(customBucket?: string) {
    const { temporaryPrefix, temporaryFilesTTL, defaultBucket } =
      this.fileStorageConfiguration;

    const bucket = customBucket ?? defaultBucket;
    const limit = new Date();
    // limit.setMilliseconds(-1 * ( temporaryFilesTTL ?? 60 * 60 * 2 ));
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
