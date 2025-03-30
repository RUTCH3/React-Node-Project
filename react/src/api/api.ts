import axios from 'axios';
import { Event } from '../types/event';
import { Producer } from '../types/producer';

const serverInstance = axios.create({
    baseURL: 'http://localhost:8000',
})

//event
export const getEvents = async () => {
    const result = await serverInstance.get<Event>(`/event`);
    return result.data
}

export const getEvent = async (id: number) => {
    const result = await serverInstance.get<Event>(`/event/${id}`);
    return result.data
}

export const addEvent = async (event: Event) => {
    const result = await serverInstance.post<Event>('/event', event);
    return result.data;
}

export const updateEvent = async (id: number, newEvent: Event) => {
    const result = await serverInstance.put<Event>(`/event/${id}`, newEvent);
    return result.data;
}

export const deleteEvent = async (id: number) => {
    const result = await serverInstance.delete<Event>(`/event/${id}`);
    return result.data
}

//producer
export const getProducer = async (id: number) => {
    const result = await serverInstance.get<Producer>(`/producer/${id}`);
    return result.data
}

export const addProducer = async (prod: Producer) => {
    const result = await serverInstance.post<Producer>('/producer', prod);
    return result.data;
}

export const updateProducer = async (id: number, newProducer: Producer) => {
    const result = await serverInstance.put<Producer>(`/producer/${id}`, newProducer);
    return result.data;
}