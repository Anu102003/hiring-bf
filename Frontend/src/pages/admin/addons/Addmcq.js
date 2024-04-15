import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/admin/addons/addmcq.css"
import { AdminNextButton } from "../../../components/AdminNextButton";
import { request } from "../helper/axios_helper";
import { useEffect, useState } from "react";

const Addmcq=()=>{

    const {id} = useParams()
    const nav = useNavigate()
    const [part, setPart] = useState({
        "Category": "",
        "Easy" : "",
        "Medium" : "",
        "Hard" : ""
    })

    const addPart = (d) => {
        d.preventDefault()
        const token = window.localStorage.getItem("auth_token")
        const data = request(
        "POST",
        `/admin/addPart/${id}`,
        part,
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

    const update = (data) => {
        setPart({...part,[data.target.name]:data.target.value})
    }


    return(
     <div className="form-container">
     
     <form className="addons-form ">
    
     <h1>Add MCQ</h1>
     <div className="addons-input-container">
     <div>
     <label className="Category">Category :</label>
     </div>
     
     <div className="select-menu">
        <select name="Category" className="Cateory-Input" onChange={(data) => update(data)}>
            <option value="Choose...">Choose...</option>
            <option option value="Logical" className="Logical">Logical</option>
            <option value="Grammar" className="Grammar">Grammar</option>
            <option value="Programming" className="Programming">Programming</option>
        </select>
     </div>
     </div>
    
     <div className="addons-input-container">
     <label>Easy :</label>
     <div>
     <input value={part.Easy} name="Easy" onChange={(data) => update(data)} type="number" className="Easy-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Easy Mode " />
     </div>
     </div>
    
     <div className="addons-input-container">
     <div >
     <label>Medium :</label>
     </div>
     <div>
     <input value={part.Medium} name="Medium" onChange={(data) => update(data)}  type="number" className="Medium-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Medium Mode"
     />
     </div>
     </div>
    
     <div className="addons-input-container">
     <div >
     <label >Hard :</label>
     </div>
     <div>
     <input value={part.Hard} name="Hard" onChange={(data) => update(data)}  type="number" className="Hard-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Hard Mode "
     />
     </div>
     </div>
     <div className="admin-add-button" onClick={(data) => addPart(data)} >
     <AdminNextButton content={"ADD"}/>
     </div>
     </form>
     </div>
    );
    }
    
    export default Addmcq;