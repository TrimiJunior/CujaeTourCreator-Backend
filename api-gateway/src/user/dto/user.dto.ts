import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmail, IsNotEmpty, IsString, IsArray} from 'class-validator';

export class UserDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty()
 //   @IsNotEmpty()
 //   @IsString()
    readonly username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string; 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role: string;
    @ApiProperty()
    @IsArray()
    readonly favorites: string[]; 
    @ApiProperty()
    @IsArray()
    readonly perValidate: string[]; 
    
}