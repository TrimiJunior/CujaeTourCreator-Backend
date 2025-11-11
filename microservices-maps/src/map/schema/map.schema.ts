import * as mongoose from 'mongoose';

const MarkerSchema = new mongoose.Schema(
  {
    sceneId: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    description: { type: String },
  },
  { _id: true }
);

export const MapSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    baseImagePath: { type: String, required: true },
    markers: { type: [MarkerSchema], default: [] },
  },
  { timestamps: true }
);
