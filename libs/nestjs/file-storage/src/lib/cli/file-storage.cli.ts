import { Command, Console } from 'nestjs-console';

import { FileStorageService } from '../services';

@Console({
  command: 'file-storage',
  description: 'Manipulate file storgage service',
})
export class FileStorageCliService {
  constructor(private fileStorageService: FileStorageService) {}

  @Command({
    command: 'presigned-upload <mimeType> <fileSize> [customBucket]',
    description: 'Get a presigned upload url for file storage',
  })
  public async getPresignedUploadUrl(
    mimeType: string,
    fileSize: number,
    customBucket?: string,
  ) {
    const result = await this.fileStorageService.getPresignedUploadUrl(
      mimeType,
      fileSize,
      customBucket,
    );
    console.info(result);
  }

  @Command({
    command: 'presigned-download <file> [customBucket]',
    description: 'Get a presigned download url for file storage',
  })
  public async getPresignedDownloadUrl(file: string, customBucket?: string) {
    const result = await this.fileStorageService.getPresignedDownloadUrl(
      file,
      customBucket,
    );
    console.info(result);
  }

  @Command({
    command: 'unique-filename [prefix] [suffix]',
    description: 'Get a unique filename',
  })
  public getUniqueSuffix(prefix?: string, suffix?: string) {
    const result = this.fileStorageService.getUniqueFilename(prefix, suffix);
    console.info(result);
  }

  @Command({
    command: 'file-exists <file> [customBucket]',
    description: 'Check if file exists in file storage',
  })
  public async doesFileExists(file: string, customBucket?: string) {
    const result = await this.fileStorageService.doesFileExists(
      file,
      customBucket,
    );
    console.info(result);
  }

  @Command({
    command: 'commit-temporary-file <file> <destination> [customBucket]',
    description: 'Move a temporary file to a permanent destination',
  })
  public async commitTemporaryFile(
    file: string,
    destination: string,
    customBucket?: string,
  ) {
    await this.fileStorageService.commitTemporaryFile(
      file,
      destination,
      customBucket,
    );
    console.info(`Successfully committed ${file} to ${destination}`);
  }

  @Command({
    command: 'prune-temporary-files [customBucket]',
    description: 'Remove outdated temporary files from bucket',
  })
  public async pruneTemporaryFiles(customBucket?: string) {
    const result = await this.fileStorageService.pruneTemporaryFiles(
      customBucket,
    );
    console.info(`Pruned ${result} files from temporary zone`);
  }
}
