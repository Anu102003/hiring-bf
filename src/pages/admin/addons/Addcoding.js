import { AdminNextButton } from "../../../components/AdminNextButton";
const Addcoding = () => {
    return (
        <div className="form-container">
            <form className="addons-form ">
                <h1>Add Coding Question</h1>
                <div className="addons-input-container">
                    <div><label >No of Question:</label></div>
                    <div><input type="number" 
                        placeholder="Enter total no of questions for Coding "
                    /></div>
                </div>
                <div className="addons-input-container">
                    <div><label>Difficult Level:</label></div>
                    <div><input type="number"inputmode="numeric" pattern="[0-9]*"
                        placeholder="Specify Difficult level (Easy,Medium,Hard)"
                    /></div>
                </div>
                <AdminNextButton content={"ADD"}/>
            </form>
        </div>
    );
}

export default Addcoding;