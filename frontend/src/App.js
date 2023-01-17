import './App.css';
import Home from './components/Home/Home';
// import Navbar from './components/Home/Navbar'
import { Routes, Route } from 'react-router-dom';
import Login from './components/User/Login';
import Footer from './components/Home/Footer';
import Register from './components/User/Register';
import TraineeHome from './components/Trainee/TraineeHome'
import TraineeCourses from './components/Trainee/TraineeCourses'
import InstructorHome from './components/Instructor/InstuctorHome'
import AdminHome from './components/Admin/AdminHome';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Courses from './components/Courses/Courses';
import Course from './components/Courses/Course';
import SearchResults from './components/Courses/SearchResults';
import Exam from './components/Courses/Exam'
import Terms from './components/Home/Terms';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:username" element={<TraineeHome />} />
        <Route path="/:username/myCourses" element={<TraineeCourses />} />
        <Route path="/instructorHome" element={<InstructorHome />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
        <Route path="/searchResults/:search" element={<SearchResults />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:title" element={<Course />} />
        <Route path="/exam/:CourseTitle/:ExamTitle" element={<Exam />} />
        <Route path="/T&C" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
