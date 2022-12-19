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
            let tLinks = [""];
            let emptyCount = newCourse.Subtitles.length - 1;
            while (emptyCount > 0) {
                tLinks.push("");
                emptyCount--;
            }
            newCourse.SubtitlesVideos = tLinks;
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

    if (sub || price) {
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
    }
    else {
        for (let i = 0; i < allCourses.length; i++) {
            if (req.body.InstructorUsername == allCourses[i].InstructorUsername) {
                myCourses.push(allCourses[i]);
            }
        }
    }
    res.status(200).json({
        status: 'Success',
        data: {
            myCourses
        }
    })
}

export const changeEmail = async (req, res) => {
    try {
        await Instructor.updateOne({ username: req.body.username, password: req.body.password }, { $set: { email: req.body.newemail } })
        res.send("Email changed")
    }
    catch {

    }
}

export const editBio = async (req, res) => {
    try {
        await Instructor.updateOne({ username: req.body.username }, { $set: { miniBio: req.body.miniBio } })
        res.send("MiniBio updated")
    }
    catch {

    }
}

export const addVideoLink = async (req, res) => {
    const subIdx = (await Course.findOne({ Title: req.body.Title })).Subtitles.indexOf(req.body.Subtitle);
    try {
        await Course.updateOne({ Title: req.body.Title, SubtitlesVideos: "" }, { $set: { [`SubtitlesVideos.${subIdx}`]: req.body.Link } })
        res.status(200).json({
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }

}

export const addPreviewLink = async (req, res) => {
    try {
        const link = "https://www.youtube.com/embed/" + req.body.Link.split("=")[1];
        await Course.updateOne({ Title: req.body.Title }, { CoursePreviewLink: link });
        res.status(200).json({
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}
export const addQuestion = async (req, res) => {
    try {
        // await Course.updateOne({Title: req.body.Title}, {$push:{ExercisesQuestions: req.body.Question}});
        // await Course.updateOne({Title: req.body.Title}, {$push:{ExercisesChoices:{
        //     $each:[req.body.ChoiceA, req.body.ChoiceB, req.body.ChoiceC, req.body.ChoiceD]
        // }}});
        // await Course.updateOne({Title: req.body.Title},{$push:{ExercisesAnswers: req.body.Answer}});
        let answerIdx = null;
        if (req.body.Answer.toLowerCase() == "a") {
            answerIdx = 0;
        } else if (req.body.Answer.toLowerCase() == "b") {
            answerIdx = 1;
        } else if (req.body.Answer.toLowerCase() == "c") {
            answerIdx = 2;
        } else {
            answerIdx = 3;
        }
        const question = {
            title: req.body.Question,
            choices: [req.body.ChoiceA, req.body.ChoiceB, req.body.ChoiceC, req.body.ChoiceD],
            answer: answerIdx
        };
        const exam = [req.body.Duration, req.body.ExamTitle, [question]];
        await Course.updateOne({ Title: req.body.Title }, {
            $push: { ExercisesQuestions: exam }
        })
        res.status(200).json({
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}
export const addDiscount = async (req, res) => {
    try {
        await Course.updateOne({ Title: req.body.Title }, { Discount: req.body.Discount, DiscountTime: req.body.DiscountTime });
        res.status(200).json({
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed'
        })
    }
}

export const getRating = async (req, res) => {
    try {
        const instructor = await Instructor.findOne({ username: req.body.username });
        const rating = instructor.Rating
        res.status(200).json({
            rating: rating,
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed'
        })
    }
}

export const getCourseRating = async (req, res) => {
    try {
        const Course = await Instructor.findOne({ title: req.body.title });
        const rating = Course.Rating
        res.status(200).json({
            rating: rating,
            status: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed'
        })
    }
}

export const searchMyCourses = async (req, res) => {
    const courses = await Course.find({ InstructorUsername: req.body.InstructorUsername });
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