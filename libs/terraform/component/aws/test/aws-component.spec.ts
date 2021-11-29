import { AwsComponent } from '../src';

describe('Unit tests of AwsComponent', () => {
  describe('test trimName method', () => {
    it('with short names', () => {
      expect(AwsComponent.trimName('name', 16, '-')).toEqual('name');
      expect(AwsComponent.trimName('other-name', 16, '-')).toEqual(
        'other-name',
      );
      expect(AwsComponent.trimName('other--name-2', 16, '-')).toEqual(
        'other--name-2',
      );
    });
    it('with long names', () => {
      expect(
        AwsComponent.trimName('this-resource-name-is-too-long', 28, '-'),
      ).toEqual('this-resour-name-is-too-long');
      expect(
        AwsComponent.trimName('this-resource-name-is-too-long', 12, '-'),
      ).toEqual('th-r-n-i-t-l');
      expect(
        AwsComponent.trimName('this-resource-name-is-too-long', 6, '-'),
      ).toEqual('t-----');
      expect(
        AwsComponent.trimName('this-resource-name-is-too-long', 4, '-'),
      ).toEqual('----');
    });
  });
});
