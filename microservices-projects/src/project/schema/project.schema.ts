import * as mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    chat: { type: String, required: true },
  },
  { timestamps: true },
);

const ratingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    userId: { type: String, required: true },
    likes: { type: [String], default: [] },
    isValid: { type: Boolean, default: false, required: true },
    currentState: { type: String, required: true, default: 'neutro' },
    comments: { type: [commentSchema], default: [] },
    rating: { type: [ratingSchema], default: [] },
  },
  { timestamps: true },
);
