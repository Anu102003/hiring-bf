import { AdminNextButton } from "../../../components/AdminNextButton";

const AddOrEditCoding = () => {
    return (
        <div className="form-container">
            <form className="addons-form form-card">
                <h1>Edit/Add Coding Question</h1>
                <div className="textarea-container">
                    <label >Question:</label>
                    <div><textarea type="text"
                        className="Question-input"
                        placeholder="Enter the Question" />
                    </div>
                </div>
                <h2>Test Cases :</h2>
                <div className="textarea-container">
                    <label>Sample Input 1 :</label>
                    <div><textarea type="text"
                        className="Question-input"
                        placeholder="Enter the Sample Input" />
                    </div>
                </div>
                <div className="textarea-container">
                    <label>Sample Output 2 :</label>
                    <div><textarea type="text"
                        className="Question-input"
                         />
                    </div>
                </div>

                <AdminNextButton content={"Submit"} />
            </form>
        </div>
    );
}
export default AddOrEditCoding;