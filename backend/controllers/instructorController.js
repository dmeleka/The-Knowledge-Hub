import Instructor from '../models/instructorModel.js';
import Course from '../models/courseModel.js';

export const addCourse = async (req, res) => {
    try {
        const allCourses = await Course.find({});
        var exists = false;
        allCourses.forEach(currentCourse => {
            if (req.body.Title == currentCourse.Title) {
                exists = true;
            }
        });
        if (exists) {
            res.send("Course already exists");
        } else {
            const newCourse = new Course(req.body);
            await newCourse.save();
            res.send("Course added");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const myCourses = async (req, res) => {
    const allCourses = await Course.find({});
    const myCourses = [];
    for (let i = 0; i < allCourses.length; i++) {
        if (req.body.InstructorUsername == allCourses[i].InstructorUsername) {
            myCourses.push(allCourses[i]);
        }
    }
    res.status(200).json({
        status: 'Success',
        data: {
            myCourses
        }
    })
}

export const myCoursesFilter = async (req, res) => {
    const allCourses = await Course.find({});
    var myCourses = [];
    var sub = false;
    var price = false;
    if (req.body.Subject.length != 0)
        sub = true;

    if (req.body.maxPrice.length != 0)
        price = true;

    for (let i = 0; i < allCourses.length; i++) {
        if (sub && price) {
            if (req.body.InstructorUsername == allCourses[i].InstructorUsername && req.body.maxPrice >= allCourses[i].Price && req.body.Subject == allCourses[i].Subject)
                myCourses.push(allCourses[i]);
        }
        else if (price) {
            if (req.body.InstructorUsername == allCourses[i].InstructorUsername && req.body.maxPrice >= allCourses[i].Price)
                myCourses.push(allCourses[i]);
        }
        else {
            if (req.body.InstructorUsername == allCourses[i].InstructorUsername && req.body.Subject == allCourses[i].Subject)
                myCourses.push(allCourses[i]);
        }
    }

    res.status(200).json({
        status: 'Success',
        data: {
            myCourses
        }
    })
} 