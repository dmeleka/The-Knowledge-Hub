const mongoose = require('mongoose');
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

const Course = mongoose.model('Course', userSchema);
module.exports = Course;