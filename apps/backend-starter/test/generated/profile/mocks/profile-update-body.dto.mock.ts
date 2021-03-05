import { ProfileUpdateBodyDto } from '../../../../src/generated';
import {
  mockProfileAddressFactory,
  mockProfileGenderFactory,
  mockProfileOwnerIdFactory,
  mockProfilePhoneFactory,
} from './profile.mock';

export function mockProfileUpdateBodyDtoFactory(
  override: Partial<ProfileUpdateBodyDto> = {},
): Required<ProfileUpdateBodyDto> {
  return {
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ...override,
  };
}
