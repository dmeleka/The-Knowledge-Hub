import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, { timestamps: true });

const adminModel = mongoose.model('adminModel', adminSchema);
export default adminModel;