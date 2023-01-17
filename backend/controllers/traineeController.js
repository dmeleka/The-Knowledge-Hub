import Trainee from '../models/traineeModel.js';
import Instructor from '../models/instructorModel.js';
import Courses from '../models/courseModel.js';
import nodemailer from 'nodemailer';

export const addIndTrainee = async (req, res) => {
    const u = await Trainee.findOne({ username: req.body.username })
    const e = await Trainee.findOne({ email: req.body.email })
    if (!e && !u) {
        const trainee = new Trainee(req.body)
        trainee.save().then(data => {
            res.json(data)
        }).catch(e => {
            res.json({ message: e })
        })
    }
    else if (e) {
        res.json({ alert: "This Email is already registered!! Sign In" })
    }
    else if (!e && u) {
        res.json({ alert: "Username TAKEN!" })
    }
}
export const rateInstructor = async (req, res) => {
    try {
        await Instructor.updateOne({ username: req.params.username }, { $set: { Rating: req.body.Rating } });
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
        await Courses.updateOne({ Title: req.params.title }, { $set: { Rating: req.body.Rating } });
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

export const enrolledCourses = async (req, res) => {
    try {
        const trainee = await Trainee.findOne({ username: req.params.username })
        res.json({ data: trainee.enrolledCourses })
    }
    catch {
        res.send("err")
    }
}

export const enroll = async (req, res) => {
    let complete = []
    try {
        const c = await Courses.findOne({ Title: req.params.title })
        for (let i = 0; i < c.Subtitles.length; i++) {
            complete.push({ Subtitle: c.Subtitles[i], Complete: false })
        }
        const course = {
            title: req.params.title,
            progress: 0,
            instructorName: c.InstructorName,
            nSubtitles: complete.length,
            ncomplete: 0,
            isComplete: complete
        };
        await Trainee.updateOne({ _id: req.UserId }, {
            $push: { enrolledCourses: course }
        })
        res.send("enrolled")
    }
    catch {
        res.send("err")
    }
}

export const isEnrolled = async (req, res) => {
    try {
        const trainee = await Trainee.findOne({ _id: req.UserId })
        for (let i = 0; i < trainee.enrolledCourses.length; i++) {
            if (trainee.enrolledCourses[i].title === req.params.title) {
                res.json({ enrolled: true })
                return
            }
        }
        res.json({ enrolled: false })
    }
    catch (err) {
        console.log(err)
    }
}

export const isLoggedIn = async (req, res) => {
    try {
        const trainee = await Trainee.findOne({ _id: req.UserId })
        res.json({ loggedIn: true, username: trainee.username })
    }
    catch (err) {
        console.log(err)
    }
}

export const updateProgress = async (req, res) => {
    let progress = null
    try {
        // await Trainee.updateOne({ _id: req.UserId }, { $set: { "enrolledCourses.$[c].isComplete.$[sub].Complete": true } }, { arrayFilters: [{ "c.title": req.params.courseTitle }, { "sub.Subtitle": req.params.examTitle }] })
        //await Trainee.updateOne({ _id: req.UserId, "enrolledCourses.title": req.params.courseTitle }, { $set: { "enrolledCourses.$.isComplete.$[sub].Complete": true } }, { arrayFilters: [{ "sub.Subtitle": req.params.examTitle }] })
        await Trainee.updateOne({ _id: req.UserId, "enrolledCourses.title": req.params.courseTitle }, { $inc: { "enrolledCourses.$.ncomplete": 1 } })
        const trainee = await Trainee.findOne({ _id: req.UserId })
        for (let i = 0; i < trainee.enrolledCourses.length; i++) {
            if (trainee.enrolledCourses[i].title === req.params.courseTitle) {
                progress = Math.ceil((trainee.enrolledCourses[i].ncomplete / trainee.enrolledCourses[i].nSubtitles) * 100)
            }
        }
        if (progress) {
            await Trainee.updateOne({ _id: req.UserId, "enrolledCourses.title": req.params.courseTitle }, { $set: { "enrolledCourses.$.progress": progress } })
        }

        if (progress === 100) {
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'no-reply.tkh@outlook.com',
                    pass: '12345tkh'
                }
            });

            const mailOptions = {
                from: 'no-reply.tkh@outlook.com',
                to: trainee.email,
                subject: 'Certificate',
                html: "Congrats You have sucsessfully completed the" + req.params.courseTitle + " course",
                attachments: [
                    {
                        filename: 'Certificate.pdf',
                        path: "/Users/danielmeleka/Desktop/ACL-main/frontend/public/Certificates/Certificate.pdf",
                        contentType: 'application/pdf'
                    }
                ]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.send("check your mail")
                }
            });
        }
    }
    catch (err) {
        console.log(err)
    }
}