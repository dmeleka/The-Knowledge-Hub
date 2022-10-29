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
    InstructorUserName: {
        type: String,
        required: false ,
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
        required: true,
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