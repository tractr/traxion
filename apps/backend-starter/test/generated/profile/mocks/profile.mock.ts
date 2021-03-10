import { Profile, ProfileGender } from '@prisma/client';
import { lorem, random } from 'faker';

export function mockProfileIdFactory(): Profile['id'] {
  return random.uuid();
}

export function mockProfileOwnerIdFactory(): Profile['ownerId'] {
  return random.uuid();
}

export function mockProfileAddressFactory(): Profile['address'] {
  return lorem.words();
}

export function mockProfilePhoneFactory(): NonNullable<Profile['phone']> {
  return lorem.words();
}

export function mockProfileGenderFactory(): Profile['gender'] {
  return random.arrayElement(Object.values(ProfileGender));
}

export function mockProfileFactory(override: Partial<Profile> = {}): Profile {
  return {
    id: mockProfileIdFactory(),
    address: mockProfileAddressFactory(),
    phone: mockProfilePhoneFactory(),
    gender: mockProfileGenderFactory(),
    ownerId: mockProfileOwnerIdFactory(),
    ...override,
  };
}
