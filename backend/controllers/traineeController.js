import Trainee from '../models/traineeModel.js';
import Course from '../models/courseModel.js';
import refundRequest from '../models/refundRequestModel.js';

export const addIndTrainee = (req, res) => {
    const trainee = new Trainee(req.body)
    trainee.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
}

export const reqRefund = async (req, res) => {
    const courseAttend = (await Course.findOne({Title: req.body.Title})).Attendance;
    const coursePrice = (await Course.findOne({Title: req.body.Title})).Price;
    const maxAttend = Math.ceil(courseAttend.length/2);
    let attended = 0;
    courseAttend.forEach(x => {
        if(x == 1){
            attended++;
        }
    });
    const newRefundRequest = new refundRequest({tusername: req.body.username, cTitle: req.body.Title, refundAmount: coursePrice});
    refundRequest.findOne({tusername: req.body.username, cTitle: req.body.Title}, (err,doc) => {
        if(err){

        }else if(doc){
            res.send("Request already submitted");
        }else{
            newRefundRequest.save();
            res.send("Success");
        }
    })
}

export const getWallet = async (req, res) => {
    const tWallet = (await Trainee.findOne({username: req.body.username})).Wallet;
    res.json({Wallet: tWallet});
} 