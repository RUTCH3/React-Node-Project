import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from 'react'
import { Producer } from "../types/producer";
import { useLocation } from "react-router-dom";

const AddProducer = () => {
    const location = useLocation();

    const isEditMode = location.pathname.includes("/edit");
    const isAddMode = location.pathname.includes("/add");

    let producer: Producer = { id: 0, name: "", phone: "", email: "", description: "" };
    const [formData, setFormData] = useState<Producer>(producer);
    // const { producers, addProducer, updateProducer } = useContext(ProdContext);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setFormData(formData);
        console.log(formData);
        //אם ה-URL הוא EDIT אז לשלוח ל-UPDATE
        // ואם הוא של NEW אז לשלוח ל-ADD
        // addProducer!(prod);
        // const id = producers?.find(e => e.id = prod.id)?.id;
        // updateProducer!(0, prod);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (<>
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 3, p: 2 }}>
            <CardContent>
                <h2>{isEditMode ? "עריכת מפיק" : isAddMode ? "הוספת מפיק" : "לא ידוע"}</h2>
                <Typography variant="h5" gutterBottom>פרטי מפיק</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container spacing={0}>
                            <TextField fullWidth label="שם" name="name" type="filled"
                                value={formData.name}
                                onChange={handleChange}
                                required variant="filled"
                            />
                        </Grid>
                        <Grid container spacing={0}>
                            <TextField fullWidth label="טלפון" name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required variant="filled"
                            />
                        </Grid>
                        <Grid container spacing={0}>
                            <TextField fullWidth label="אימייל" name="email" type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required variant="filled"
                            />
                        </Grid>
                        <Grid container spacing={0}>
                            <TextField fullWidth label="תיאור" name="description" rows={1}
                                value={formData.description}
                                onChange={handleChange}
                                variant="filled"
                            />
                        </Grid>
                        <Grid container spacing={1}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>שמור</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </>)
}

export default AddProducer