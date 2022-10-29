import Instructor from '../models/instructorModel.js';
import Course from '../models/courseModel.js';

export const addCourse = async (req,res) => {
    try{
        const allCourses = await Course.find({});
        var exists = false;
        allCourses.forEach(currentCourse => {
            if(req.body.Title == currentCourse.Title){
                exists = true;
            }
        });
        if(exists){
            res.send("Course already exists");
        }else{
            const newCourse = new Course(req.body);
            await newCourse.save();
            res.send("Course added");
        }
    }catch (error){
        res.status(404).json({message: error.message});
    }
} 