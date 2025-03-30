import { Event } from "../models/event.schema.js";

export default async (req, res) => {
    let status = 500;
    let send = "Error";
    if (req.method === "GET" && typeof (req.params.id) === "undefined") {
        try {
            const events = await Event.find();
            status = 200;
            send = events;
        } catch (error) {
            status = 500;
            send = { error: error.message };
        }
    }
    if (req.method === 'GET' && typeof (req.params.id) != "undefined") {
        try {
            const event = await Event.findOne({ id: req.params.id });
            if (!event) throw new Error("Event not found.");
            status = 200;
            send = event;
        } catch (error) {
            status = 404;
            send = { error: error.message };
        }
    }
    if (req.method === "POST")
        try {
            const { id, name, description, producerId } = req.body;
            if (!id || !name || !description || !producerId) throw new Error("Missing required fields.");

            const existingEvent = await Event.findOne({ id });
            if (existingEvent) throw new Error("Event with this ID already exists.");

            const newEvent = new Event({ id, name, description, producerId });
            await newEvent.save();

            status = 200;
            send = { message: 'Event created successfully', event: newEvent };
        } catch (error) {
            status = 404;
            send = { error: error.message };
        }
    if (req.method === 'PUT') {
        try {
            const { name, description, producerId } = req.body;
            const updatedEvent = await Event.findOneAndUpdate(
                { id: req.params.id },
                { name, description, producerId },
                { new: true, runValidators: true }
            );

            if (!updatedEvent) throw new Error("Event not found.");

            status = 200;
            send = { message: "Event updated successfully", event: updatedEvent };
        } catch (error) {
            status = 404;
            send = { error: error.message };
        }
    }
    if (req.method === "DELETE") {
        try {
            const deletedEvent = await Event.findOneAndDelete({ id: req.params.id });
            if (!deletedEvent) throw new Error("Event not found.");

            status = 200;
            send = { message: "Event deleted successfully", event: deletedEvent };
        } catch (error) {
            status = 404;
            send = { error: error.message };
        }
    }
    res.status(status).send(send);
};