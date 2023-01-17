import mongoose from "mongoose";
const Schema = mongoose.Schema;

const refundRequestSchema = new Schema({
    tusername: {
        type: String,
        required: true
    },
    cTitle: {
        type: String,
        required: true
    },
    refundAmount: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const refundRequestModel = mongoose.model('refundRequestModel', refundRequestSchema);
export default refundRequestModel;