import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Point } from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
export class CreateVendorDto extends CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('IQ')
  phone: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  branch: string;

  @IsNotEmpty()
  location: Point;

  @IsNotEmpty()
  workingHours: {
    sat?: { open: string; close: string };
    sun?: { open: string; close: string };
    mon?: { open: string; close: string };
    tue?: { open: string; close: string };
    wed?: { open: string; close: string };
    thu?: { open: string; close: string };
    fri?: { open: string; close: string };
  };

  @IsNotEmpty()
  @IsBoolean({})
  isOnline: boolean;

  @IsNumber({allowNaN: true})
  balance: number;

  @IsNumber()
  profitRatio: number;
}
