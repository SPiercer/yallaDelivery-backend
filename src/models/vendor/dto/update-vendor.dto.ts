import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';

export class UpdateVendorDto extends OmitType(CreateVendorDto, [
  'password',
  'passwordConfirmation',
  'role',
]) {}


