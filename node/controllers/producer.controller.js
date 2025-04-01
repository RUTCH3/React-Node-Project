import { Producer } from '../models/producer.schema.js';

let nextId = 7;
export default async (req, res) => {
    let status = 500;
    let send = "Error";
    if (req.method === 'GET' && typeof (req.params.id) === "undefined") {
        try {
            const producers = await Producer.find();
            status = 200;
            send = producers;
        } catch (error) {
            status = 500;
            send = { error: error.message };

        }
    }
    if (req.method === 'GET' && typeof (req.params.id) !== "undefined") {
        try {
            const producer = await Producer.findOne({ id: Number(req.params.id) });
            if (!producer) throw new Error("Producer not found.");
            status = 200;
            send = producer;
        } catch (error) {
            status = 404;
            send = { error: error.message };
        }
    }
    if (req.method === "POST") {
        try {
            const { name, email, phone, description } = req.body;
            if (!name || !email && !phone) throw new Error("invalid parameters.");
            const newProducer = new Producer({ nextId, name, email, phone, description });
            await newProducer.save();
            nextId++;
            status = 201;
            send = { message: 'User created successfully', user: newUser };
        } catch (error) {
            status = 400;
            send = { error: error.message };
        }
    }
    if (req.method === 'PUT') {
        try {
            const { name, email, phone, description } = req.body;
            const updatedProducer = await Producer.findByIdAndUpdate(
                req.params.id,
                { name, email, phone, description },
                { new: true, runValidators: true }
            );

            if (!updatedProducer) throw new Error("Producer not found.");
            status = 200;
            send = { message: "Producer updated successfully", producer: updatedProducer };
        } catch (error) {
            status = 400;
            send = { error: error.message };
        }
    }
    res.status(status).send(send);
}