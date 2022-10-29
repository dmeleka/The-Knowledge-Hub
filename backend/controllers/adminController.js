import Admin from '../models/adminModel.js';
import Instructor from '../models/instructorModel.js';
import Trainee from '../models/traineeModel.js';

export const addAdmin = async (req,res) =>{
    try{
        const allAdmins = await Admin.find({});
        var exists = false;
        allAdmins.forEach(currentAdmin => {
            if(req.body.username == currentAdmin.username){
                exists = true;
            }
        });
        if(exists){
            res.send("Admin already exists");
        }else{
            const newAdmin = new Admin(req.body);
            await newAdmin.save();
            res.send("Admin created");
        }
    }catch (error){
        res.status(404).json({message: error.message});
    }
}

export const addInstructor = async (req,res) =>{
    try{
        const allInstructors = await Instructor.find({});
        var exists = false;
        allInstructors.forEach(currentInstructor => {
            if(req.body.username == currentInstructor.username){
                exists = true
            }
        })
        if(exists){
            res.send("Instructor already exists");
        }else{
            const newInstructor = new Instructor(req.body);
            await newInstructor.save();
            res.send("Instructor created");
        }
    }catch (error){
        res.status(404).json({message: error.message});
    }
}

export const addCorpTrainee = async (req,res) =>{
    try{
        const allTrainees = await Trainee.find({});
        var exists = false;
        allTrainees.forEach(currentTrainee =>{
            if(req.body.username == currentTrainee.username){
                exists = True;
            }
        })
        if(exists){
            res.send("Trainee already exists");
        }else{
            const newTrainee = new Trainee({
                username: req.body.username,
                password: req.body.password,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Corprate: true
            })
            await newTrainee.save();
            res.send("Trainee created");
        }
    }catch(error){
        res.status(404).json({message: error.message});
    }
}