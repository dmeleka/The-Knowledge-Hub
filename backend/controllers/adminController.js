import Admin from '../models/adminModel.js';
import Instructor from '../models/instructorModel.js';
import Trainee from '../models/traineeModel.js';
import refundRequest from '../models/refundRequestModel.js';
import Report from '../models/ReportModel.js';
import Course from '../models/courseModel.js';

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

export const sendRefund = async(req,res) =>{
    const refundAmount = (await refundRequest.findOne({tusername: req.body.tusername, cTitle: req.body.cTitle})).refundAmount;
    const newWallet = (await Trainee.findOne({username: req.body.tusername})).Wallet + refundAmount;
    await Trainee.updateOne({username: req.body.tusername}, {Wallet: newWallet});
    res.send("Success");
}
  
export const getAllReport = async (req, res) => {
    const status=req.query.status;
    const Questions = await Report.find({status}).populate("createdBy","username").populate("course","title");
    res.status(200).json(Questions);
};
  
export const getAllCourseRequest = async (req, res) => {
   const courses= await CourseRequest.find({}).populate('createdBy', 'username').populate("course","title");
    //const courses = await CoursesRequest.find({});
    res.status(200).json(courses);
}; // ! missing model
 
export const updateReport = async (req, res) => {

  //  console.log("id"+id ,state);
    console.log("req.body"+req.body);
    const report = await Report.findByIdAndUpdate(
      {_id:req.body.id},
      {
        status: req.body.state
      }
    ).populate("createdBy","username").populate("course","title");
    
    res.status(200).json(report);
};
  
export const updateCourseRequest = async (req, res) => {
    let complete = [];
    const { id } = req.body;
    const{courseid,state}=req.body;
    console.log("id:"+id)
    const courserequest= await Course.findOne({
      createdBy:id,
      course:courseid
    }).populate("createdBy","username").populate("course","title")  
  if(state=="GRANTED"){
    const user = await Trainee.findOne(
      { _id: id }
    );
    for (let i = 0; i < courserequest.Subtitles.length; i++) {
            complete.push({ Subtitle: c.Subtitles[i], Complete: false })
        }
    const course = {
            title: courserequest.Title,
            progress: 0,
            instructorName: courserequest.InstructorName,
            nSubtitles: complete.length,
            ncomplete: 0,
            isComplete: complete
        };
      user.enrolledCourses.push({course})
      await user.save();
   
    if (courserequest!=null){
    courserequest.state="GRANTED"
    courserequest.save();}
    }
    else{
      await CourseRequest.findOneAndDelete({
        createdBy:id,
        course:courseid
      })
    }

    res.status(200).json(courserequest);
}; // ! missing model
  
//   export const getallcourses = async (req, res) => {
//     const courses= await Course.find({});
//      //const courses = await CoursesRequest.find({});
//      res.status(200).json(courses);
//    };
