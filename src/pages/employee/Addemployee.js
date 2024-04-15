import { AdminNextButton } from "../../components/AdminNextButton";

// import "../../assets/employee/addemployee.css"
const Addemployee=()=>{
 return(
 <div className="form-container">
 <form className="addons-form">
 <h1>Add Employee</h1>
 
 <div className="addons-input-container">
<label>Employee ID:</label>
 <div><input type="number" inputmode="numeric" pattern="[0-9]*"
 placeholder="Enter Employee ID only in number" 
 /></div>
 </div>
 <div className="addons-input-container">
<label>Name:</label>
 <div><input type="text"
 placeholder="Enter User Name"
 /></div> 
 </div> 
 
 <div className="addons-input-container">
<label>Email:</label>
 <div><input type="email"
 placeholder="Enter Valid User Mail Id" 
 /></div>
 </div>

 <div className="addons-input-container">
 <label>Field of Expertise:</label>
 <div><input type="text"
 placeholder="Enter the name of Expertise field "
 /> </div> 
 </div>

 <AdminNextButton content={"SUBMIT"}></AdminNextButton>

 </form>
 </div>
 
 );
}

export default Addemployee;
