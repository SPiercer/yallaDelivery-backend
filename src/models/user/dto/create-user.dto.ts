import { IsEmail, IsEnum, IsNotEmpty, Min, MinLength } from "class-validator";
import { Match } from "../../../common/decorators/match.decorator";
import { Role } from "../../../common/enums/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(7)
    password: string;   
    
    @IsNotEmpty()
    @Match(CreateUserDto, (dto: CreateUserDto) => dto.password, { message: 'Password confirmation does not match password' })
    passwordConfirmation: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
    
}
