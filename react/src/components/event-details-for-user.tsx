import { useParams } from "react-router-dom";
import { EventContext } from "../context/event.context";
import { useContext } from "react";
import { ProdContext } from "../context/prod.context";
import { Button } from "@mui/material";

const EventDetailsForUser = () => {
    const { getEventById } = useContext(EventContext);
    const { producers } = useContext(ProdContext);

    const { id } = useParams();
    const event = getEventById?.(Number(id));
    const producer = producers?.find(p => p.id === event?.producerId)
    console.log(event,producer);
    return (<>
        <h2>Details for Event ID: {event?.id}</h2>
        <h2>Name: {event?.name}</h2>
        <h2>Details: {event?.details}</h2>
        <h2>Prducer: {producer?.name}</h2>
        <Button onClick={()=>{}}>Show Producer Details</Button>
        <h2>Name: {producer?.name}</h2>
        <h2>Email: {producer?.email}</h2>
        <h2>Description: {producer?.description}</h2>
        <h2>Phone: {producer?.phone}</h2>

    </>);
}

export default EventDetailsForUser