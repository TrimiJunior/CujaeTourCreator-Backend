import * as mongoose from 'mongoose';

export const SceneSchema = new mongoose.Schema({
    projectId:{type:String,required:true},
    title:{type:String,required:true},
    img:{type:String,required:true},
    initial:{type:String,required:true},
},
{timestamps:true},
);
 

