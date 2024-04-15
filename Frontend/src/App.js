import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Score } from './pages/user/score/Score';
import { Coding } from './pages/user/coding/Coding';
import { Mcq } from './pages/user/Mcq';
import { Contestdetails } from './pages/user/Contestdetails';
import { Signup } from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import { AdminHomepage } from './pages/admin/homepage/AdminHomepage';
import { AdminContestMenu } from './pages/admin/contestmenu/AdminContestMenu';
import { Addcomponents } from './pages/admin/addcomponent/Addcomponents';
import Createcontest from './pages/admin/createcontest/Createcontest';
import Addmcq from './pages/admin/addons/Addmcq';
import Addcoding from './pages/admin/addons/Addcoding';
import Addparticipant from './pages/admin/addons/Addparticipates';
import { Userscorelist } from './pages/admin/userscorelist/Userscorelist';
import { EmployeeDetails } from './pages/employee/EmployeeDetails';
import Addemployee from './pages/employee/Addemployee';
import AddOrEditMcq from './pages/admin/questionbank/AddOrEditMcq';
import AddOrEditCoding from './pages/admin/questionbank/AddOrEditCoding';
import { Questionbank } from './pages/admin/questionbank/Questionbank';
import { Candidatedetails } from './pages/employee/Candidatedetails';
import SingleCandidatedetails from './pages/employee/SingleCandidatedetails';
import { Navbar } from './pages/navbar/navbar';
import { IndividualScore } from './pages/admin/userscorelist/IndividualScore';
import { Participant } from './pages/admin/addcomponent/Participant';
// import QuizComponent from './pages/user/QuizComponent';
function App() {
  const [message, setMessage] = useState(0);
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       setMessage(message + 1);
  //        alert("Warning");
  //     }
  //   };
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);
  // console.log(message);
  return (
    <>
      <BrowserRouter>
      {/* <QuizComponent/> */}
      <Navbar/>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contestdetails/:id" element={<Contestdetails />} />
          <Route path="/mcq/:id" element={<Mcq />} />
          <Route path="/coding" element={ <Coding />} />
          <Route path="/score" element={<Score />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/admincontestmenu" element={<AdminContestMenu />} />
          <Route path="/addcomponent/:id" element={<Addcomponents /> } />
          <Route path="/createcontest" element={ <Createcontest/>} />
          <Route path="/addmcq/:id" element={<Addmcq/>} />
          <Route path="/addcoding/:id" element={<Addcoding /> } />
          <Route path="/addparticipant/:id" element={<Addparticipant/> } />
          <Route path="/userscorelist/:id" element={ <Userscorelist/>  } />
          <Route path="/employeedetails" element={<EmployeeDetails/>} />
          <Route path="/addemployee" element={<Addemployee/>} />
          <Route path="/addoreditmcq" element={ <AddOrEditMcq/>} />
          <Route path="/addoreditcoding" element={<AddOrEditCoding/> } />
          <Route path="/questionbank" element={<Questionbank/> } />
          <Route path="/candidatedetails/:id" element={<Candidatedetails/> } />
          <Route path="/singlecandidatedetails/:id" element={ <SingleCandidatedetails/>  } />
          <Route path="/individualscore/:id" element={ <IndividualScore/>  } />
          <Route path="/addparticipants/:id" element={ <Participant/>  } />
        </Routes>
      </BrowserRouter>
      {/* <Signup />
       <Signin /> 
      <Contestdetails />
      <Mcq />
      <Coding />
      <Score /> 
       <AdminHomepage />    */}
      {/* <AdminContestMenu />   */}
      {/* <Addcomponents /> 
       <Createcontest/>
      <Addmcq/> 
      <Addcoding /> 
       <Addparticipant/>   
     <Userscorelist/>     //
     <EmployeeDetails/>   //
     <Addemployee/>
     <AddOrEditMcq/>.
     <AddOrEditCoding/> 
     <Questionbank/>
    <Candidatedetails/>
    <SingleCandidatedetails/>*/}
    </>
  );
}

export default App;
