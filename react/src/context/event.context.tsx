import { createContext } from "react";
import { Event } from "../types/event";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getEvents, addEvent, updateEvent, deleteEvent, getEvent } from "../api/api";
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

    const { data: events, error, loading, request } = useHttp<Event[]>('/event');

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
            request();
        }

    };

    return <EventContext.Provider value={contextValue}>
        {/* שם שמור שכולל את התוכן שנשלח לקומפוננטה מבחוץ */}
        {loading && 'Loading...'}
        {error}
        {!loading && !error && props.children}
    </EventContext.Provider>


    // const queryClient = useQueryClient();

    // // **1️⃣ שליפת כל האירועים (GET)**
    // const { data: events = [], error, isLoading } = useQuery<Event[]>({
    //     queryKey: ["events"],
    //     queryFn: () => getEvents()
    // });

    // // **2️⃣ מציאת אירוע לפי ID ישירות מה-Cache**
    // // const getEventById = (id: number) => events.find(event => event.id === id);
    // const getEventById = (id: number) => {
    //     const { data } = useQuery({
    //         queryKey: ["event", id], // מזהה ייחודי לכל אירוע
    //         queryFn: () => getEvent(id), // קריאה ל-API
    //         enabled: !!id // מבצע את השאילתה רק אם יש id חוקי
    //     });

    //     return data;
    // };

    // // **3️⃣ הוספת אירוע חדש (POST)**
    // const addMutation = useMutation({
    //     mutationFn: addEvent,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
    // });

    // // **4️⃣ עדכון אירוע (PUT)**
    // const updateMutation = useMutation({
    //     mutationFn: ({ id, updatedEvent }: { id: number; updatedEvent: Event }) => updateEvent(id, updatedEvent), // ✅
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
    // });

    // // **5️⃣ מחיקת אירוע (DELETE)**
    // const deleteMutation = useMutation({
    //     mutationFn: deleteEvent,
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
    // });

    // const contextValue: EventContextType = {
    //     events,
    //     getEventById,
    //     addEvent: (newEvent) => addMutation.mutate(newEvent),
    //     updateEvent: (id, updatedEvent) => updateMutation.mutate({ id, updatedEvent }),
    //     deleteEvent: (id) => deleteMutation.mutate(id),
    // };

    // return (
    //     <EventContext.Provider value={contextValue}>
    //         {isLoading && <p>Loading events...</p>}
    //         {error && <p>Error loading events</p>}
    //         {!isLoading && !error && props.children}
    //     </EventContext.Provider>
    // );
};
