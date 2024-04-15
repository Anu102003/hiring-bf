import { AdminNextButton } from "../../../components/AdminNextButton";

const AddOrEditMcq=()=>{
    return(
    <div className="form-container">
    <form className="addons-form form-card">
    <h1>Edit/Add MCQ Question</h1>
    <div className="textarea-container">
    <label className="Question-label">Question:</label>
    <div><textarea type="text"
    className="Question-input"
    placeholder="Enter the Question"/>
    </div>
    </div>
   
    <div className="addons-input-container">
    <label >Option 1:</label>
    <div>
    <input type="text"  placeholder="Enter the value of option"/>
    </div>
    </div>
   
    
    <div className="addons-input-container">
    <label>Option 2:</label>
    <div>
    <input type="text"  placeholder="Enter the option"/></div>
    </div> 
   
    <div className="addons-input-container">
    <label >Option 3:</label>
    <div>
    <input type="text"  placeholder="Enter the option"/></div>
    </div> 
   
    <div className="addons-input-container">
    <label >Option 4:</label>
    <div>
    <input type="text"  placeholder="Enter the option"/></div>
    </div>
   
    <div className="addons-input-container">
    <label>Correct option:</label>
    <div>
    <input type="text"  placeholder="Enter the value of correct option"/></div>
    </div>
   <AdminNextButton content={"Submit"}/>
    </form>
    </div>
    );
   }
   export default AddOrEditMcq;