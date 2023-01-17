import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a report title'],
    },
    commentsadmin: [{
      type: String,
      required: [true, 'Please provide a report comment'],
    }],
    commentsuser: [{
      type: String,
      required: [true, 'Please provide a report comment'],
    }],
    type:{
        type: String,
        enum:["technical","financial","other"],
        required: [true, 'Please provide a report type'],

    },
    status: {
        type: String,
        enum: ['resolved','pending','unseen'],
      },
   createdBy : {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide the creator'],
      ref: 'User',
    },
    course : {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide the course '],
      ref: 'Course',
    },

  }
);

const reportModel = mongoose.model('reportModel', reportSchema);
export default reportModel;
