"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSchema = void 0;
const mongoose = require("mongoose");
const MarkerSchema = new mongoose.Schema({
    sceneId: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    description: { type: String },
}, { _id: true });
exports.MapSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    baseImagePath: { type: String, required: true },
    markers: { type: [MarkerSchema], default: [] },
}, { timestamps: true });
//# sourceMappingURL=map.schema.js.map