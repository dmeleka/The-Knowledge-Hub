import Trainee from '../models/traineeModel.js';
import Instructor from '../models/instructorModel.js';
import Courses from '../models/courseModel.js';

export const addIndTrainee = (req, res) => {
    const trainee = new Trainee(req.body)
    trainee.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
}
export const rateInstructor = async (req, res) => {
    try {
        await Instructor.updateOne({ username: req.query.username }, { Rating: req.body.Rating });
        res.status(200).json({
            status: 'Success',
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
}
export const rateCourse = async (req, res) => {
    try {
        await Courses.updateOne({ Title: req.query.Title }, { Rating: req.body.Rating });
        res.status(200).json({
            status: 'Success',
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
}
export const watchvideo =async (req, res) => {
    const course = await Courses.findOne({Title : req.body.viewTitle});
    res.status(200).json({
        "Url": course.Video  
        })
}
export const openItems = async (req,res) => {
    var arr=[];
    const course = await Courses.findOne({Title : req.body.viewTitle});
    res.status(200).json({
    "Title": course.Title,
    "SUBTitle": course.Subtitles,
    "SubtitlesHours": course.SubtitlesHours,
    "Hours": course.Hours,
    "Exercisess": course.Exercises,
    "Video":course.Video
    
    
    
    })
    }