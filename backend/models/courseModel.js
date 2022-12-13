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
    Discount: {
        type: Number,
        default: 0,
    },
    DiscountTime:{
        type: Number,
        default: 0,
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
    SubtitlesVideos: {
        type: Array,
        required: false,
    },
    ShortSummary: {
        type: String,
        required: true,
    },
    ExercisesQuestions: {
        type: Array,
        required: false,
    },
    CoursePreviewLink: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: true });

const courseModel = mongoose.model('courseModel', courseSchema);
export default courseModel;