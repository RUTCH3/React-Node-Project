import mongoose from 'mongoose';

const event = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    producerId: { type: Number, required: true }
}, { timestamps: true });

export const Event = mongoose.model('Event', event);
