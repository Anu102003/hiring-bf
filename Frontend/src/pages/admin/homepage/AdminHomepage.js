import "../../../assets/admin/homepage/adminhomepage.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const AdminHomepage = () => {
    const navigate = useNavigate();
    const[clickedCard,setClickedCard]=useState("");
    const handleCard=(e)=>{
        setClickedCard(e);
    }
    if(clickedCard==="contestdetails"){
        navigate('/admincontestmenu')
    }else if(clickedCard==="addemployee"){
        navigate('/employeedetails')
    }else{
        navigate('/questionbank')
    }
    console.log(clickedCard)
    return(
        <div className="admin-home-container">
       
        <div className="admin-card" onClick={()=>handleCard("contestdetails")}>
        <div className="card-img card1">
        </div> 
        <h2>Contest Details</h2>
        </div>
       
        <div className="admin-card" onClick={()=>handleCard("addemployee")}>
        <div className="card-img card2">
        </div> 
        <h2>Employee Details</h2>
        </div>
       
        <div className="admin-card" onClick={()=>handleCard("questionbank")}>
        <div className="card-img card3">
        </div>
        <h2>Question Banks</h2>
        </div>
       
        </div>
        
        );
}

