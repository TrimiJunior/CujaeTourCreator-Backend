import * as mongoose from 'mongoose';

export const LinkHostpotSchema = new mongoose.Schema(
  {
    sceneId: { type: String, required: true },
    name: { type: String, required: true },
    targetSceneId: { type: String, required: false },
    position: { type: Array, required: true },
    transparency: {type: Number, required: true},
    size: {type: Number, required: true},
  },

  { timestamps: true },
);


