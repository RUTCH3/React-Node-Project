import express from "express";
import cors from "cors";
import producer from './routers/producer.router'
import show from './routers/show.router'

const app = express();
app.use(cors());

app.use('/producer', producer);
app.use('/show', show);

const PORT = 8000;

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});