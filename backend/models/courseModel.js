import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    InstructorUsername: {
        type: String,
        required: true,
    },
    InstructorName: {
        type: String,
        required: true,
    },
    Hours: {
        type: Number,
        required: false,
    },
    Price: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        required: false,
    },
    Subtitles: {
        type: String,
        required: true,
    },
    ShortSummary: {
        type: String,
        required: true,
    }



}, { timestamps: true });

const courseModel = mongoose.model('courseModel', courseSchema);
export default courseModel;