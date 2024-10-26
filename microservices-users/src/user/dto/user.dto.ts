import { UserRole } from "../schema/user.schema";

export class UserDTO{
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string; 
    readonly role: UserRole;
    readonly favorites: string[];
    readonly perValidate: string[];
}