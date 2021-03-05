import { ProfileUpsertBodyDto } from '../../../../src/generated';
import {
  mockProfileOwnerIdFactory,
  mockProfileAddressFactory,
  mockProfilePhoneFactory,
  mockProfileGenderFactory,
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
