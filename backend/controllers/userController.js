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
    const userI = await Instructor.findOne({ username: req.body.username, Password: req.body.password })
    const userT = await Trainee.findOne({ username: req.body.username, Password: req.body.password })
    const userA = await Admin.findOne({ username: req.body.username, Password: req.body.password })
    try {
        if (userI) {
            // const id = userI._id.toString();
            // const token = jwt.sign({ id }, "secret", {
            //     expiresIn: 300,
            // })
            res.json({ auth: true, res: userI, type: "I" })
        }
        else if (userT) {
            // const id = userT._id.toString();
            // const token = jwt.sign({ id }, "secret", {
            //     expiresIn: 300,
            // })
            res.json({ auth: true, res: userT, type: "T" })
        }
        else if (userA) {
            res.json({ auth: true, res: userT, type: "A" })
        }
        else {
            res.json({ auth: false, message: "No user found" })
        }

    } catch (err) {

    }
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
            course.push(courses[i]);
            res.status(200).json({
                status: 'Success',
                data: {
                    course
                }
            })

        }
        else if (req.body.search == courses[i].Subject) {
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

export const coursesFilter = async (req, res) => {
    const allCourses = await Courses.find({});
    var myCourses = [];
    var sub = false;
    var price = false;
    var rating = false;

    if (req.body.Subject.length != 0)
        sub = true;

    if (req.body.maxPrice.length != 0)
        price = true;

    if (req.body.Rating.length != 0)
        rating = true;

    if (sub || price || rating) {
        for (let i = 0; i < allCourses.length; i++) {
            if (sub && price && rating) {
                if (req.body.maxPrice >= allCourses[i].Price && req.body.Subject == allCourses[i].Subject && req.body.Rating <= allCourses[i].Rating)
                    myCourses.push(allCourses[i]);
            }
            else if (price && sub) {
                if (req.body.maxPrice >= allCourses[i].Price && req.body.Subject == allCourses[i].Subject)
                    myCourses.push(allCourses[i]);
            }
            else if (sub && rating) {
                if (req.body.Subject == allCourses[i].Subject && req.body.Rating <= allCourses[i].Rating)
                    myCourses.push(allCourses[i]);
            }
            else if (price && rating) {
                if (req.body.maxPrice >= allCourses[i].Price && req.body.Rating <= allCourses[i].Rating)
                    myCourses.push(allCourses[i]);
            }

            else if (sub) {
                if (req.body.Subject == allCourses[i].Subject)
                    myCourses.push(allCourses[i]);
            }
            else if (rating) {
                if (req.body.Rating <= allCourses[i].Rating)
                    myCourses.push(allCourses[i]);
            }
            else {
                if (req.body.maxPrice >= allCourses[i].Price)
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
    else {
        res.status(200).json({
            status: 'Success',
            data: {
                allCourses
            }
        })
    }
}

export const view = async (req, res) => {
    var arr = [];
    const course = await Courses.findOne({ Title: req.body.viewTitle });
    res.status(200).json({
        "Title": course.Title,
        "Subtitles": course.Subtitles,
        "Subtitles Hours": course.SubtitlesHours,
        "Hours": course.Hours,
        "Exercises": course.Exercises
    });
}

export const changePassword = async (req, res) => {
    try {
        await Trainee.updateOne({ username: req.body.username, password: req.body.password }, { $set: { password: req.body.newpassword } })
        await Instructor.updateOne({ username: req.body.username, password: req.body.password }, { $set: { password: req.body.newpassword } })
        res.send("password changed")
    }
    catch {

    }
}