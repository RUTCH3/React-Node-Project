// import { MongoClient } from "mongodb";
// import mongoose from 'mongoose';
// const { Schema, model } = mongoose;
// ////////////////////////////////////////////
// import mongoose from 'mongoose';
// import { Producer } from "../models/producer.schema";
// mongoose.connect("mongodb+srv://mongo:mongo@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

// const p = new Producer({
//     name: "",
//     description: "",
//     email: "",
//     phone: ""
// });

// await p.save();

// const p2 = await Producer.create({
//     name: "",
//     description: "",
//     email: "",
//     phone: ""
// });
// console.log(p2);

// const blog = await Producer.deleteOne({ author: "Jesse Hall" })
// console.log(blog);

// const article = await Producer.findById("62472b6ce09e8b77266d6b1b", "title slug content").exec();
// console.log(article);
// //////////////////////////////////////////
// // Replace the uri string with your connection string.
// const uri =
//     "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });


// export const producers = [];
// export const events = [];

// async function run() {
//     try {
//         await client.connect();

//         const database = client.db('Activities');
//         producers = database.collection('producers');
//         events = database.collection('events');
//         // database.collection('producers').findOne(p=>p.h==1);
//         // Query for a movie that has the title 'Back to the Future'
//         const query = { title: 'Back to the Future' };
//         const movie = await producers.findOne(query);
//         console.log(movie);

//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);