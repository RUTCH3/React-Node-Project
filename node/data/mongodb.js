import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri =
    "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



export const producers = [];
export const shows = [];

async function run() {
    try {
        await client.connect();

        const database = client.db('Activities');
        producers = database.collection('producers');
        shows = database.collection('shows');
        // database.collection('producers').findOne(p=>p.h==1);
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await producers.findOne(query);
        console.log(movie);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);