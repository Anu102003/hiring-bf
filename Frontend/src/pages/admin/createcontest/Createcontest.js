import "../../../assets/admin/createcontest/createcontest.css"
import { AdminNextButton } from "../../../components/AdminNextButton";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuthToken, request } from "../helper/axios_helper";

const Createcontest = () => {
    const navigate = useNavigate();
    const [contestFormValues, setContestFormValues] = useState({
        name: "",
        startTime: "",
        endTime: "",
        passPercentage: "",
        details: "",
        rules: ""
    });
    const handleContestChange = (e) => {
        const { name, value } = e.target;
        setContestFormValues({ ...contestFormValues, [name]: value });
    };
    const handleContestSubmit = (e) => {
        e.preventDefault();
        console.log("first")
        if (contestFormValues.contestName !== "" && contestFormValues.startTime !== "" &&
            contestFormValues.endTime !== "" && contestFormValues.passPercentage !== "" &&
            contestFormValues.details !== "" && contestFormValues.rules!=="") {
            console.log(contestFormValues);
            AddComponents()
        }else{
            console.log("first")
        }
    }

    const AddComponents = () => {
        const token = getAuthToken();
        request(
            "POST",
            "/admin/addContest",
            contestFormValues,
            {
                header : {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.status === 200) {
                    const contestId = res.data.data
                    navigate(`/addcomponent/${contestId}`)
                    console.log(res)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    return (

        <div className="form-container">

            <form className="form-card">
                <h1 >Create Contest</h1>
                <div className="input-container">
                    <label>Contest Name :</label>
                    <input type="text"
                        className="inputs"
                        placeholder="Enter Contest Name"
                        name="contestName"
                        onChange={(e) => { handleContestChange(e) }}
                    />
                </div>
                <div className="input-container">
                    <label>Start Time : </label>
                    <input type="datetime-local"
                        className="inputs"
                        name="startTime"
                        onChange={(e) => { handleContestChange(e) }}
                        placeholder="Enter start time"
                    /></div>
                <div className="input-container">
                    <label>End Time :</label>
                    <input type="datetime-local"
                        className="inputs"
                        name="endTime"
                        onChange={(e) => { handleContestChange(e) }}
                        placeholder="Enter end time"
                    /></div>
                <div className="input-container">
                    <label>Pass Percentage :</label>
                    <input type="number"
                        inputmode="numeric"
                        className="inputs"
                        name="passPercentage"
                        onChange={(e) => { handleContestChange(e) }}
                        placeholder="Enter the pass percentage"
                    />
                </div>
                <div className="textarea-container">
                    <label>Details :</label>
                    <textarea type="text"
                        className="inputs"
                        rows="4" cols="50"
                        name="details"
                        onChange={(e) => { handleContestChange(e) }}
                        placeholder="Write a short summary about the challenge"
                    /></div>
                <div className="textarea-container">
                    <label>Rules :</label>
                    <textarea type="text"
                        className="inputs"
                        rows="4" cols="50"
                        name="rules"
                        onChange={(e) => { handleContestChange(e) }}
                        placeholder="Write a short summary about Rules of the challenge"
                    /></div>
                <div className="next-button-align">
                    <button className="Nextbutton" onClick={(e) => handleContestSubmit(e)}>NEXT</button>
                    {/* <AdminNextButton content={"NEXT"} onClick={(e) => handleContestSubmit(e)}/> */}
                </div>    </form>
        </div>

    );
}

export default Createcontest;