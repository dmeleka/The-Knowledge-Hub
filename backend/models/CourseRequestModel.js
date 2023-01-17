import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseRequestSchema = new Schema(
    {
        course: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Please provide the creator'],
            ref: "Course"
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Please provide the creator'],
            ref: 'User',
        },
        state: {
            type: String,
            enum: ['PENDING', 'GRANTED', "DENIED"],
        },
    },
    { timestamps: true }
);

const CourseRequestModel = mongoose.model('CourseRequestModel', CourseRequestSchema);
export default CourseRequestSchema
