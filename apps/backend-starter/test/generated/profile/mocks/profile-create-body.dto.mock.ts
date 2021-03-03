import { ProfileCreateBodyDto } from '../../../../src/generated';
import {
  mockProfileOwnerIdFactory,
  mockProfileAddressFactory,
  mockProfilePhoneFactory,
  mockProfileGenderFactory,
} from './profile.mock';

export function mockProfileCreateBodyDtoFactory(
  override: Partial<ProfileCreateBodyDto> = {},
): ProfileCreateBodyDto {
  return {
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ...override,
  };
}
