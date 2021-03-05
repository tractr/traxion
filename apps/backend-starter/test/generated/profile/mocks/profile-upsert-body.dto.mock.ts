import { ProfileUpsertBodyDto } from '../../../../src/generated';
import {
  mockProfileAddressFactory,
  mockProfileGenderFactory,
  mockProfileOwnerIdFactory,
  mockProfilePhoneFactory,
} from './profile.mock';

export function mockProfileUpsertBodyDtoFactory(
  override: Partial<ProfileUpsertBodyDto> = {},
): Required<ProfileUpsertBodyDto> {
  return {
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ...override,
  };
}
