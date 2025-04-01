import { createContext } from "react";
import { Event } from "../types/event";
import { useHttp } from "../custom-hooks/useHttp";

type EventContextType = {
    events: Event[] | undefined;
    getEventById: (id: number) => Event | undefined;
    addEvent: (newEvent: Event) => void;
    updateEvent: (id: number, updatedEvent: Event) => void;
    deleteEvent: (id: number) => void;
};

export const EventContext = createContext<Partial<EventContextType>>({});

export const EventProvider = (props: any) => {
    const { data: events, error, loading, request } = useHttp<Event[]>("/event",'get');

    const contextValue: EventContextType = {
        events,
        getEventById(id: number) {
            return events?.find(e => e.id = id);
        },
        addEvent(newEvent) {
            request(newEvent);
        },
        updateEvent(id, newEvent) {
            const id2 = events?.find(e => e.id = id);
            console.log(id2);
            request(newEvent);
        },
        deleteEvent(id) {
            const id2 = events?.find(e => e.id = id);
            console.log(id2);
            request(``,`${id}`);
        }
    };

    return <EventContext.Provider value={contextValue}>
        {/* שם שמור שכולל את התוכן שנשלח לקומפוננטה מבחוץ */}
        {loading && 'Loading...'}
        {error}
        {!loading && !error && props.children}
    </EventContext.Provider>
};
