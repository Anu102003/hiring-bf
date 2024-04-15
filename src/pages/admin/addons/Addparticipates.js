import { AdminNextButton } from "../../../components/AdminNextButton";

const Addparticipant=()=>{
    return(
    <div className="form-container">
    <form className="addons-form">
    <h1>Add Participant</h1>
    <div className="addons-input-container">
    <label >Area of Expertise:</label>
    <div><input type="text"
    placeholder="Enter name of Field(eg:Backend,Frontend)"/>
    </div>
    </div>
    <div className="addons-input-container">
    <div><label >Email:</label></div>
    <div><input type="email"
    placeholder="Enter Valid Email Id"/>
    </div>
    </div>
    <AdminNextButton content={"ADD"}/>
    </form>
    </div>
    );
   }
   
   export default Addparticipant;