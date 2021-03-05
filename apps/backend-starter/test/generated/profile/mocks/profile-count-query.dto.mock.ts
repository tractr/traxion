import { ProfileCountQueryDto } from '../../../../src/generated';
import {
  mockProfileIdFactory,
  mockProfileOwnerIdFactory,
  mockProfileAddressFactory,
  mockProfilePhoneFactory,
  mockProfileGenderFactory,
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
