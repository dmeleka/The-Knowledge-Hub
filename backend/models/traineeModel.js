import mongoose from "mongoose";
const Schema = mongoose.Schema;

const traineeSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Corprate:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const traineeModel = mongoose.model('traineeModel', traineeSchema);
export default traineeModel;