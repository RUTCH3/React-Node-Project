import { useContext, useState } from "react";
import { Producer } from "../types/producer";
import { ProdContext } from "../context/prod.context";
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Grid } from "@mui/material";
import { EventContext } from "../context/event.context";
import { NavLink } from "react-router-dom";

const ProducerDetailes = () => {
    const { getProdById } = useContext(ProdContext);
    const { events } = useContext(EventContext);
    const [producer1, setProducer] = useState<Producer | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [eventsProducer, setEventProducer] = useState(events);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return alert("יש למלא את שדה החיפוש");

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(searchTerm.trim())) return alert("מייל לא תקין");

        setLoading(true);
        setError("");
        try {
            const result = getProdById?.(searchTerm);
            console.log("the result is: ", result);
            setProducer(result);
            console.log("the producer1 is: ", producer1);
            setEventProducer(events?.filter(e => e.producerId === producer1?.id));
        } catch (err) {
            setError("שגיאה בקבלת הנתונים");
            console.error(err);
        } finally {
            setLoading(false);
            console.log(producer1);
        }
    };

    const addEvent = () => { }
    const deleteEvent = () => { }


    const updateProd = () => { }//לעשות בסוף

    return (
        <>
            <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column" sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>פרטי מפיקה</Typography>
                <Grid container>
                    <TextField id="search_prod" label="אימייל" variant="filled" type="search" required value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2 }}>
                        חפש
                    </Button>
                    {/* להוסיף אופציה של עדכון */}
                </Grid>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {error && <Typography color="error">{error}</Typography>}
                {producer1 ? (
                    <Grid>
                        <Card sx={{ maxWidth: 400, mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>פרטי המפיקה</Typography>
                                <Typography><strong>שם:</strong> {producer1.name}</Typography>
                                <Typography><strong>טלפון:</strong> {producer1.phone}</Typography>
                                <Typography><strong>אימייל:</strong> {producer1.email}</Typography>
                                <Typography><strong>תיאור:</strong> {producer1.description}</Typography>
                                <Button variant="contained" color="primary" onClick={updateProd} sx={{ ml: 2 }}>
                                    עדכון<NavLink to={'/update'}></NavLink>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 400, mt: 3 }}>
                            <ul>{eventsProducer?.map((event) => (
                                <li key={event.id}>
                                    <NavLink to={`/user/${event.id}`}>{event.name}</NavLink>
                                    <Button variant="contained" color="primary" onClick={deleteEvent} sx={{ ml: 2 }}>
                                        מחיקה<NavLink to={'/update'}></NavLink>
                                    </Button>
                                </li>))}</ul>
                            <Button variant="contained" color="primary" onClick={addEvent} sx={{ ml: 2 }}>
                                הוספה<NavLink to={'/update'}></NavLink>
                            </Button>
                            {/* {eventsProducer?.map(ep => <p>{ep.details}</p>) || <p>לא נמצאו אירועים למפיקה</p>} */}
                        </Card>
                    </Grid>
                ) : (
                    <Typography sx={{ mt: 2 }}>לא נמצאו תוצאות</Typography>
                )}
            </Grid>
        </>
    );
}

export default ProducerDetailes