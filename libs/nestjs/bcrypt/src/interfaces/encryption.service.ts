export interface EncryptionService {
  hash(value: string): Promise<string> | string;
  compare(value: string, hash: string): Promise<boolean> | boolean;
}
