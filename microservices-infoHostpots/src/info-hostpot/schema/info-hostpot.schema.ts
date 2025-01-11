import * as mongoose from 'mongoose';

export const InfoHostpotSchema = new mongoose.Schema(
  {
    sceneId: { type: String, required: true },
    name: { type: String, required: true },
    info: { type: String, required: true },
    position: { type: Array, required: true },
    transparency:{type: Number, required: true},
    size:{type: Number, required: true},
  },

  { timestamps: true },
);


