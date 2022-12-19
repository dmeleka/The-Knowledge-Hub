import mongoose from "mongoose";
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    miniBio: {
        type: String,
        default: "",
        required: false
    },
    Country: {
        type: String,
        required: false,
        default: "De"
    },
    Ratings: {
        type: [],
        required: false,
        default: []
    },
    Rating: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: true });

const instructorModel = mongoose.model('instructorModel', instructorSchema);
export default instructorModel;