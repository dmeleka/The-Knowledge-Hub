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

