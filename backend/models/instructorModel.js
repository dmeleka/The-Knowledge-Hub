import mongoose from "mongoose";
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    username: {
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
    Country: {
        type: String,
        required: false,
        default: "De"
    }
}, { timestamps: true });

const instructorModel = mongoose.model('instructorModel', instructorSchema);
export default instructorModel;