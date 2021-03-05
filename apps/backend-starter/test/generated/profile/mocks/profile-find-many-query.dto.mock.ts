import { ProfileFindManyQueryDto } from '../../../../src/generated';
import {
  mockProfileIdFactory,
  mockProfileOwnerIdFactory,
  mockProfileAddressFactory,
  mockProfilePhoneFactory,
  mockProfileGenderFactory,
} from './profile.mock';

export function mockProfileFindManyQueryDtoFactory(
  override: Partial<ProfileFindManyQueryDto> = {},
): Required<ProfileFindManyQueryDto> {
  return {
    id: mockProfileIdFactory(),
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    populate: ['owner'],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
