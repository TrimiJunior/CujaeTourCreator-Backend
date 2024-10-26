import * as mongoose from 'mongoose';

export const InfoHostpotSchema = new mongoose.Schema(
  {
    sceneId: { type: String, required: true },
    name: { type: String, required: true },
    info: { type: String, required: true },
    position: { type: Array, required: true },
  },

  { timestamps: true },
);


