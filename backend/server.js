import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import traineeRoutes from './routes/traineeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || "8000";
const MongoURI = 'mongodb+srv://dbUser:dbUserPassword@cluster0.gldybaz.mongodb.net/test';

app.use(bodyParser.json());
app.use(cors());


app.use('/trainee', traineeRoutes);
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);
app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);
app.use('/', userRoutes);



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