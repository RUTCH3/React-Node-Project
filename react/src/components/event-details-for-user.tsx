import { useParams } from "react-router-dom";

function EventDetailsForUser() {
    const { id } = useParams();
    return (<>
        <h2>Details for Event ID: {id}</h2>
    </>);
}

export default EventDetailsForUser