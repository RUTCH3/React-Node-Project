import { useContext, useState } from "react";
import { Producer } from "../types/producer";
import { ProdContext } from "../context/prod.context";
// import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Grid } from "@mui/material";
import { EventContext } from "../context/event.context";
// import { NavLink } from "react-router-dom";

function ProducerDetailes() {
    const { getProdById } = useContext(ProdContext);
    const { events } = useContext(EventContext);
    const [producer1, setProducer] = useState<Producer | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    let evs = events;
    const [eventsProducer, setEventProducer] = useState<Event[] | undefined>(evs);
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

    return (
        <>
            <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column" sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>פרטי מפיק</Typography>
                <Grid container>
                    <TextField
                        id="search_prod"
                        label="מזהה מפיק"
                        variant="filled"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2 }}>
                        חפש
                    </Button>
                    {/* <Fab color="primary" aria-label="edit" sx={{ ml: 2 }}>
                        <NavLink to={"/"}></NavLink>
                        <EditIcon />
                    </Fab> */}
                    {/* להוסיף אופציה של עדכון */}
                </Grid>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {error && <Typography color="error">{error}</Typography>}
                {producer1 ? (
                    <Grid>
                        <Card sx={{ maxWidth: 400, mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>פרטי המפיק</Typography>
                                <Typography><strong>שם:</strong> {producer1.name}</Typography>
                                <Typography><strong>טלפון:</strong> {producer1.phone}</Typography>
                                <Typography><strong>אימייל:</strong> {producer1.email}</Typography>
                                <Typography><strong>תיאור:</strong> {producer1.description}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 400, mt: 3 }}>
                            {/* {eventsProducer?.map(ep => <p>{ep.BUBBLING_PHASE}</p>)} */}
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