import { AwsProvider } from '@cdktf/provider-aws';
import { snake } from 'case';
import { Construct } from 'constructs';

import { AwsProviderConstruct } from './interfaces';

export abstract class AwsComponent<Config, Artifacts>
  extends Construct
  implements AwsProviderConstruct
{
  readonly provider: AwsProvider;

  readonly id: string;

  readonly name: string;

  protected readonly config: Config;

  private artifactsValue: Artifacts | undefined;

  constructor(scope: AwsProviderConstruct, id: string, config: Config) {
    super(scope, id);
    this.id = id;
    this.config = config;
    this.name = `${scope.name.trim()}-${snake(id)}`;
    this.provider = scope.provider;
    this.validateConfig();
    this.createComponents();
  }

  /**
   * Create all sub components of this component.
   * Called in the constructor of the component.
   */
  protected abstract createComponents(): void;

  /**
   * Check the provided config to see if it is valid.
   * Should throw an error if the config is invalid.
   */
  protected validateConfig(): void {
    // noop
  }

  /**
   * Set properties of the artifacts object.
   */
  set artifacts(artifacts: Artifacts) {
    this.artifactsValue = artifacts;
  }

  /**
   * Get artifacts for this component available after the sub-components are created.
   * Must be populated while creating the sub-components.
   */
  get artifacts() {
    if (!this.artifactsValue) {
      throw new Error('RegistryGroup.artifacts: artifacts not set');
    }
    return this.artifactsValue;
  }

  /**
   * Get the parents of this component at the nth level.
   */
  getParent<T extends AwsProviderConstruct>(n = 1): T | undefined {
    const parents = this.node.scopes;
    if (parents.length < n) {
      return undefined;
    }
    return parents[parents.length - n] as T;
  }

  protected getResourceName(resource: string, maxLength?: number): string {
    const name = `${this.name.trim()}-${snake(resource)}`;
    if (maxLength) {
      return AwsComponent.trimName(name, maxLength, '-');
    }
    return name;
  }

  protected getResourceNameAsTag(
    resource: string,
    maxLength?: number,
  ): { Name: string } {
    return { Name: this.getResourceName(resource, maxLength) };
  }

  /**
   * Helper method to trim string by trimming sub-parts individually
   */
  static trimName(name: string, maxLength: number, separator: string): string {
    // If the name is already short enough, return it
    const overflow = name.length - maxLength;
    if (overflow <= 0) {
      return name;
    }

    // Get the longest name's length
    const words = name.split(separator);
    const longest = words.reduce((a, b) => (a.length > b.length ? a : b));
    const longestLength = longest.length;

    // Split chars of words into an array of arrays
    const charsMatrix: string[][] = [];
    for (let i = 0; i < longestLength; i += 1) {
      charsMatrix[i] = [];
      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        charsMatrix[i].push(word[i] || '');
      }
    }

    // Determine how many chars we can use for the words
    const wordsLength = words.reduce((acc, word) => acc + word.length, 0);
    const wordsFinalLength = wordsLength - overflow;
    const finalWords: string[] = words.map(() => '');

    // Iterate over the chars matrix and fill in the final words array, letter by letter
    let currentLength = 0;
    for (let i = 0; i < charsMatrix.length; i += 1) {
      const chars = charsMatrix[i];

      for (let j = 0; j < chars.length; j += 1) {
        const char = chars[j];
        if (char.length > 0) {
          if (currentLength < wordsFinalLength) {
            finalWords[j] += char;
            currentLength += 1;
          } else {
            // We have reached the final length, we can stop
            break;
          }
        }
      }

      // If we have reached the final length, we can stop
      if (currentLength >= wordsFinalLength) {
        break;
      }
    }

    // Join the words
    const finalName = finalWords.join(separator);

    // If the final name is longer than the max length, we need to trim it
    return finalName.length > maxLength
      ? finalName.slice(0, maxLength)
      : finalName;
  }
}

export type AwsComponentConstructor<
  Component extends AwsComponent<Config, Artifacts>,
  Config,
  Artifacts,
> = new (scope: AwsProviderConstruct, id: string, config: Config) => Component;
