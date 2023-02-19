import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class ChangePasswordDto extends OmitType(CreateUserDto,['email','role']){}