import { useContext, useState } from "react";
import { NavLink } from "react-router-dom"
import { EventContext } from "../context/event.context";

function EventsUserList() {
    const { events } = useContext(EventContext);
    const [searchTerm, setSearchTerm] = useState("");

    const eventList = Array.isArray(events) ? events : [];

    const filteredEvents = eventList.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (<>
        <h2> Events List </h2>
        <input
            type="search"
            id="search_event"
            placeholder="Search event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredEvents.length === 0 ? (
            <p>No events found...</p>
        ) : (<ul>{filteredEvents?.map((event) => (
            <li key={event.id}>
                <NavLink to={`/user/${event.id}`}>{event.name}</NavLink>
            </li>))}</ul>)}
    </>)
}

export default EventsUserList