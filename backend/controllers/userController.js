import Instructor from '../models/instructorModel.js';
import Trainee from '../models/traineeModel.js';
import Admin from '../models/adminModel.js';
import Courses from '../models/courseModel.js';

export const setCountry = async (req, res) => {
    try {
        await Instructor.updateOne({ username: req.body.username }, { Country: req.body.Country });
        await Trainee.updateOne({ username: req.body.username }, { Country: req.body.Country });
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

export const login = async (req, res) => {

}

export const search = async (req, res) => {
    const courses = await Courses.find({});
    const course = [];
    for (let i = 0; i < courses.length; i++) {
        if (req.body.search == courses[i].Title) {
            course.push(courses[i]);
            res.status(200).json({
                status: 'Success',
                data: {
                    course
                }
            })
        }
        else if (req.body.search == courses[i].InstructorName) {
            // course = await Courses.find({ InstructorName: req.body.search })
            course.push(courses[i]);
            res.status(200).json({
                status: 'Success',
                data: {
                    course
                }
            })

        }
        else if (req.body.search == courses[i].Subject) {
            // course = await Courses.find({ Subject: req.body.search })
            course.push(courses[i]);
            res.status(200).json({
                status: 'Success',
                data: {
                    course
                }
            })
        }
    }
    res.status(404).json({ message: "Not Found" });
}