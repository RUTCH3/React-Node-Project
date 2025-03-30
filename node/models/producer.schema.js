import mongoose from 'mongoose';

const producer = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: String
}, { timestamps: true });

export const Producer = mongoose.model('Producer', producer);
