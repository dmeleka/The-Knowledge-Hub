import Course from '../models/courseModel.js';

export const getAllCourses = async (req, res) => {
    const courses = await Course.find({});
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                courses
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
}

export const getExam = async (req, res) => {
    try {
        const exams = (await Course.findOne({ Title: req.params.CourseTitle })).ExercisesQuestions;
        let e = null;
        for (let i = 0; i < exams.length; i++) {
            if (exams[i][1] == req.params.ExamTitle) {
                e = exams[i];
            }
        }
        res.status(200).json({
            status: 'Success',
            data: e,
            title: e[1],
            duration: e[0],
            questions: e[2]
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }

}

export const getVideo = async (req, res) => {
    try {
        const Link = (await Course.findOne({ Title: req.params.CourseTitle })).CoursePreviewLink;
        res.status(200).json({
            status: 'Success',
            link: Link
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }

}

export const getSubtitles = async (req, res) => {
    try {
        const Subitles = (await Course.findOne({ Title: req.params.CourseTitle })).Subtitles;
        const SubitleHours = (await Course.findOne({ Title: req.params.CourseTitle })).SubtitlesHours;
        const SubitleVideos = (await Course.findOne({ Title: req.params.CourseTitle })).SubtitlesVideos;
        res.status(200).json({
            auth: true,
            status: 'Success',
            Subtitles: Subitles,
            SubtitleHours: SubitleHours,
            SubtitleVideos: SubitleVideos

        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }

}

export const getExams = async (req, res) => {
    try {
        const exams = (await Course.findOne({ Title: req.params.CourseTitle })).ExercisesQuestions;
        res.status(200).json({
            status: 'Success',
            data: exams
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }

}
