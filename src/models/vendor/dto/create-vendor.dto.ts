import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Point } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateVendorDto extends CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  address: string;

  phone: string;

  logo: string;

  branch: string;

  location: Point;

  workingHours: {
    sat?: { open: string; close: string };
    sun?: { open: string; close: string };
    mon?: { open: string; close: string };
    tue?: { open: string; close: string };
    wed?: { open: string; close: string };
    thu?: { open: string; close: string };
    fri?: { open: string; close: string };
  };

  isOnline: boolean;

  balance: number;

  profitRatio: number;
}
