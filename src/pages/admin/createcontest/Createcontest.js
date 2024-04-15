import "../../../assets/admin/createcontest/createcontest.css"
import { AdminNextButton } from "../../../components/AdminNextButton";
const Createcontest = () => {
    return (

        <div className="form-container">

            <form className="form-card">
                <h1 >Create Contest</h1>
                <div className="input-container">
                    <label>Contest Name :</label>
                    <input type="text"
                        className="inputs"
                        placeholder="Enter Contest Name"
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Start Time : </label>
                    <input type="text"
                        className="inputs"
                        placeholder="Enter start time"
                    /></div>
                <div className="input-container">
                    <label>End Time :</label>
                    <input type="text"
                        className="inputs"
                        placeholder="Enter end time"
                    /></div>
                <div className="input-container">
                    <label>Score :</label>
                    <input type="text"
                        className="inputs"
                        placeholder="Enter total score"
                    />
                </div>
                <div className="textarea-container">
                    <label>Details :</label>
                    <textarea type="text"
                        className="inputs"
                        rows="4" cols="50"
                        placeholder="Write a short summary about the challenge"
                    /></div>
                <div className="textarea-container">
                    <label>Rules :</label>
                    <textarea type="text"
                        className="inputs"
                        rows="4" cols="50"
                        placeholder="Write a short summary about Rules of the challenge"
                    /></div>

                <AdminNextButton content={"NEXT"}/>
            </form>
        </div>

    );
}

export default Createcontest;