import { ProfileCountQueryDto } from '../../../../src/generated';
import {
  mockProfileAddressFactory,
  mockProfileGenderFactory,
  mockProfileIdFactory,
  mockProfileOwnerIdFactory,
  mockProfilePhoneFactory,
} from './profile.mock';

export function mockProfileCountQueryDtoFactory(
  override: Partial<ProfileCountQueryDto> = {},
): Required<ProfileCountQueryDto> {
  return {
    id: mockProfileIdFactory(),
    owner: mockProfileOwnerIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ...override,
  };
}
