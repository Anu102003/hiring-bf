import "../../../assets/admin/addons/addmcq.css"
import { AdminNextButton } from "../../../components/AdminNextButton";

const Addmcq=()=>{
    return(
     <div className="form-container">
     
     <form className="addons-form ">
    
     <h1>Add MCQ</h1>
     <div className="addons-input-container">
     <div>
     <label className="Category">Category :</label>
     </div>
     <div className="select-menu">
     <select className="Cateory-Input">
     <option className="category-choose" selected>Choose...</option>
     <option className="logical">Logical</option>
     <option className="grammer">Grammer</option>
     <option className="programming">Programming</option>
     </select>
     </div>
     </div>
    
     <div className="addons-input-container">
     <label>Easy :</label>
     <div>
     <input type="number" className="Easy-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Easy Mode " 
     />
     </div>
     </div>
    
     <div className="addons-input-container">
     <div >
     <label>Medium :</label>
     </div>
     <div>
     <input type="number" className="Medium-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Medium Mode " 
     />
     </div>
     </div>
    
     <div className="addons-input-container">
     <div >
     <label >Hard :</label>
     </div>
     <div>
     <input type="number" className="Hard-Input" inputmode="numeric" pattern="[0-9]*"
     placeholder="Enter No of questions of Hard Mode " 
     />
     </div>
     </div>
     <AdminNextButton content={"ADD"}/>
     </form>
     </div>
    );
    }
    
    export default Addmcq;