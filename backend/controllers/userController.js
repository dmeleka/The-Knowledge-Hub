import Instructor from '../models/instructorModel.js';
import Trainee from '../models/traineeModel.js';
import Admin from '../models/adminModel.js';
import Courses from '../models/courseModel.js';
import Report from '../models/ReportModel.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

const JWT_SECRET = "dhajdbajdbaldsjadlkabdkajbdklabdkadbfhabaiwaknzkvbnirsughiosL"

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
    const userI = await Instructor.findOne({ username: req.body.username, password: req.body.password })
    const userT = await Trainee.findOne({ username: req.body.username, password: req.body.password })
    const userA = await Admin.findOne({ username: req.body.username, password: req.body.password })
    try {
        if (userI) {
            const id = userI._id.toString();
            const token = jwt.sign({ id }, JWT_SECRET, {
                expiresIn: 600,
            })
            res.json({ auth: true, token: token, res: userI, type: "I" })
        }
        else if (userT) {
            const id = userT._id.toString();
            const token = jwt.sign({ id }, JWT_SECRET, {
                expiresIn: 600,
            })
            res.json({ auth: true, token: token, res: userT, type: "T" })
        }
        else if (userA) {
            const id = userA._id.toString();
            const token = jwt.sign({ id }, JWT_SECRET, {
                expiresIn: 600,
            })
            res.json({ auth: true, token: token, res: userA, type: "A" })
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
        if ((courses[i].Title).toLowerCase().startsWith(req.body.search)) {
            course.push(courses[i]);

        }
        else if ((courses[i].InstructorName).toLowerCase().startsWith(req.body.search)) {
            course.push(courses[i]);

        }
        else if ((courses[i].Subject).toLowerCase().startsWith(req.body.search)) {
            course.push(courses[i]);
        }
    }
    if (courses.length != 0) {
        res.status(200).json({
            status: 'Success',
            data: {
                course
            }
        })
    }
    else {
        res.status(404).json({ message: "Not Found" });
    }
}

export const searchView = async (req, res) => {
    const courses = await Courses.find({});
    const course = [];
    for (let i = 0; i < courses.length; i++) {
        if ((courses[i].Title).toLowerCase().startsWith(req.params.search)) {
            course.push(courses[i]);

        }
        else if ((courses[i].InstructorName).toLowerCase().startsWith(req.params.search)) {
            course.push(courses[i]);

        }
        else if ((courses[i].Subject).toLowerCase().startsWith(req.params.search)) {
            course.push(courses[i]);
        }
    }
    if (courses.length != 0) {
        res.status(200).json({
            status: 'Success',
            data: {
                course
            }
        })
    }
    else {
        res.status(404).json({ message: "Not Found" });
    }
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
    const course = await Courses.findOne({ Title: req.params.view });
    res.status(200).json({
        data: {
            course
        }
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

export const forgotPassword = async (req, res) => {
    const userI = await Instructor.findOne({ email: req.body.email })
    const userT = await Trainee.findOne({ email: req.body.email })
    let user = null;
    if (!userI && !userT) {
        res.json({ status: "User doesnt exist" })
    }
    else {
        if (userT)
            user = userT
        if (userI)
            user = userI
    }
    if (user != null) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '5m'
        })
        const link = `http://localhost:3000/resetPassword/${user._id}/${token}`
        console.log(link)

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'no-reply.tkh@outlook.com',
                pass: '12345tkh'
            }
        });

        const mailOptions = {
            from: 'no-reply.tkh@outlook.com',
            to: user.email,
            subject: 'Reset Password',
            html: link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.json({ auth: true, token: token, res: user })
            }
        });
    }
}

export const authResetPassword = async (req, res) => {
    const { id, token } = req.params
    const userI = await Instructor.findOne({ _id: id })
    const userT = await Trainee.findOne({ _id: id })
    let user = null;
    if (!token) {
        res.json({ auth: false, message: "No token found" })
    }
    else {
        jwt.verify(token, JWT_SECRET, (err) => {
            if (err) {
                res.json({ auth: false, message: "failed to auth" })
            }
            else {
                if (!userI && !userT) {
                    res.json({ auth: false })
                }
                else {
                    res.json({ auth: true })
                }
            }
        })
    }
}

export const resetPassword = async (req, res) => {
    const { id } = req.params
    await Instructor.updateOne({ _id: id }, { $set: { password: req.body.password } })
    await Trainee.updateOne({ _id: id }, { $set: { password: req.body.password } })
    res.json({ success: true })

}

export const createreport = async (req, res) => {
    const { title, status, type} = req.body;
    // console.log('req.body ' + username,email,password,type);
     if (
       !status ||
       !title ||
       !type 
       
     ) {
       throw new BadRequestError('Please provide all report values');
     }
     //req.body.createdBy = userId;
   
     const report = await Report.create(req.body);
     res.status(StatusCodes.CREATED).json({ report });
    
  };