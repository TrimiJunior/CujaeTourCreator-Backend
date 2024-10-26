import * as mongoose from 'mongoose';
import { UserRole } from 'src/common/constants';

export const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role: { type: String, enum: [UserRole.USER, UserRole.ADMIN, UserRole.CREATOR, UserRole.MODERATOR], default: UserRole.CREATOR },
    favorites:{type: [String], default:[]},
    perValidate:{type: [String], default:[]},
},
{timestamps:true},
);
 
UserSchema.index({username:1}, {unique:true});
UserSchema.index({email:1}, {unique:true});

export { UserRole };



