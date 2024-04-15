import { AdminNextButton } from "../../components/AdminNextButton";

const SingleCandidatedetails=()=>{
    return(
    <div className="form-container">
    <form className="form-card">
    <h1>Candidate Details</h1>
   
    <div className="input-container">
    <div><label>Name :</label></div>
    <div><input type="text" placeholder="Enter Candidate Name"/></div>
    </div>
    <div className="input-container">
    <div><label >Score :</label></div>
    <div><input type="number"  placeholder="Enter Score of Candidate" readOnly value={90} /></div>
    </div>
    <div className="textarea-container">
    <div><label >Feedback to Candiate :</label></div>
    <div><textarea type="text" placeholder="Feedback is shared to user"/></div>
    </div>
    <div className="textarea-container">
    <div><label >Feedback to Admin :</label></div>
    <div><textarea type="text" placeholder="Feedback is shared to admin"/></div>
    </div>
    <AdminNextButton content="Submit"/>
    </form>
    </div>
    );
   }
   export default SingleCandidatedetails;