import { useNavigate, useParams } from "react-router-dom";
import { AdminNextButton } from "../../../components/AdminNextButton";
import React,{useState} from "react";
import { request } from "../helper/axios_helper";
const Addparticipant=()=>{

    const {id} = useParams()
    const nav = useNavigate()

    const [addparticipantFormValues, setAddParticipantFormValues] = useState({ email:"",stack: "", password: "", codeMarks: 0, mcqMarks: 0, name: "" });
    const handleAddParticipantChange = (e) => {
        const { name, value } = e.target;
        setAddParticipantFormValues({ ...addparticipantFormValues, [name]: value });
    };
    const handleAddParticipantSubmit=(e)=>{
        e.preventDefault();
        if(addparticipantFormValues.email!=="" && addparticipantFormValues.aoi!=="" ){
            console.log(addparticipantFormValues)
            submit()
        }else{
            alert("Fill all the form fields")
        }
    }


    const submit = () => {
        const token = window.localStorage.getItem("auth_token")
        const data = request(
        "POST",
        `/admin/addUser/${id}`,
        addparticipantFormValues,
        {
            header : {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status === 200) {
                nav(`/addcomponent/${id}`)
            }
        }).catch((res) => {
            console.log(res)
        })
    }

    return(
    <div className="form-container">
    <form className="addons-form">
    <h1>Add Participant</h1>
    <div className="addons-input-container">
    <div><label >Email:</label></div>
    <div><input type="email" name="email" onChange={(e) => { handleAddParticipantChange(e) }}
    placeholder="Enter Valid Email Id"/>
    </div>
    </div>
    <div className="addons-input-container">
    <label >Area of Interest:</label>
    <div><input type="text" name="stack" onChange={(e) => { handleAddParticipantChange(e) }}
    placeholder="Enter name of Field(eg:Backend,Frontend)"/>
    </div>
    </div>
    <button className="Nextbutton" onClick={(e) => handleAddParticipantSubmit(e)}>ADD</button>
    </form>
    </div>
    );
   }
   
   export default Addparticipant;