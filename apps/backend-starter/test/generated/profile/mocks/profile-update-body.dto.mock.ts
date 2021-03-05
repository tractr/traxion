import { ProfileUpdateBodyDto } from '../../../../src/generated';
import {
  mockProfileOwnerIdFactory,
  mockProfileAddressFactory,
  mockProfilePhoneFactory,
  mockProfileGenderFactory,
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
