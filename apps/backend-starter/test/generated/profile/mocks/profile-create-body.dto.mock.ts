import { ProfileCreateBodyDto } from '../../../../src/generated';
import {
  mockProfileAddressFactory,
  mockProfileGenderFactory,
  mockProfileOwnerIdFactory,
  mockProfilePhoneFactory,
} from './profile.mock';

export function mockProfileCreateBodyDtoFactory(
  override: Partial<ProfileCreateBodyDto> = {},
): Required<ProfileCreateBodyDto> {
  return {
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ...override,
  };
}
