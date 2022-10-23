import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },
    Type: {
        type: String,
        enum: ["Admin", "Instructor", "IndividualTrainee", "CorporateTrainee"],
        required: false,
        default: "IndividualTrainee",
    },
    Country: {
        type: String,
        required: false,
        default: null,
    },
    EnrolledCourses: {
        type: [],
        required: false,
        default: null,
    },
    EnrolledCoursesProgress: {
        type: [],
        required: false,
        default: null,
    },
    OwedMonthlyMoney: {
        type: Number,
        required: false,
        default: null,
    },
    Rating: {
        type: Number,
        required: false,
        default: null,
    },
    MiniBio: {
        type: String,
        required: false,
        default: null,
    },
    TeachingCourses: {
        type: [],
        required: false,
        default: null,
    }
}, { timestamps: true });

const userModel = mongoose.model('userModel', userSchema);
export default userModel;