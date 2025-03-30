import express from "express"
import cors from "cors"
import producer from './routers/producer.router.js'
import event from './routers/event.router.js'
import connectDB from "./data/db.js"

const app = express();

app.use(express.json());

connectDB();
// ["http://localhost:5174",
app.use(cors({
    origin: "http://localhost:5173",  // אפשר רק ל-Frontend שלך
    credentials: true  // תומך בשליחת עוגיות/הרשאות
}));

app.use('/producer', producer);
app.use('/event', event);

const PORT = 8000;

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, and App is listening on port ${PORT},
     http://localhost:${PORT}, https://localhost:${PORT}`);
    else
        console.log("Error accourred, server can't start", error);
});