import { UserRole } from "src/user/schema/user.schema";


export interface IUser extends Document {
    name: string;
    username:string;
    email:string;
    password: string;
    role: UserRole;
    favorites: string[]; 
    perValidate: string[];
}
