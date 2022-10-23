import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || "8000";
const MongoURI = 'mongodb+srv://dbUser:dbUserPassword@cluster0.gldybaz.mongodb.net/test';

app.use('/user', userRoutes);

app.use(bodyParser.json())
app.use(cors())

// Mongo DB
mongoose.connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!")
        // Starting server
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));