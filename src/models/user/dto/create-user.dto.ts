import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { Role } from "../../../common/enums/role.enum";

export abstract class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Min(8)
    password: string;   

    @IsNotEmpty()
    role: Role;
    
}
