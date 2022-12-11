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
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        default: 0,
        required: false,
    },
    Subtitles: {
        type: Array,
        required: true,
    },
    SubtitlesHours: {
        type: Array,
        required: true,
    },
    ShortSummary: {
        type: String,
        required: true,
    },
    Exercises: {
        type: Array,
        required: true,
    }
}, { timestamps: true });

const courseModel = mongoose.model('courseModel', courseSchema);
export default courseModel;