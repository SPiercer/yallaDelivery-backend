import { IsEmail, IsNotEmpty, Min } from "class-validator";

export abstract class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Min(8)
    password: string;   
}
