import { useParams } from "react-router-dom";
import { AdminNextButton } from "../../components/AdminNextButton";
import { useEffect, useState } from "react";
import { request } from "../admin/helper/axios_helper";

const SingleCandidatedetails = () => {

    const {id} = useParams()
    const [guest, setGuest] = useState([]);

    useEffect(() => {
        load()
    }, [])

    const load = () => {
        request("GET", `/guest/getUserScore/${id}`)
        .then((res) => setGuest(res.data.data))
    }

    const update = (data) => {
        setGuest({...guest,[data.target.name]:data.target.value})
    }

    const submit = (data) => {
        data.preventDefault()
        request("PUT", `/guest/addfeedback/${guest.userId}`, guest)
        .then((data) => console.log(data))
    }
   return (
    <div className="form-container">
      <form className="form-card">
        <h1>Candidate Details</h1>

        <div className="input-container">
          <div>
            <label>Name :</label>
          </div>
          <div>
            <input type="text" placeholder="Enter Candidate Name" value={guest.name} disabled/>
          </div>
        </div>
        <div className="input-container">
          <div>
            <label>Score :</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="Enter Score of Candidate"
              readOnly
              value={guest.totalMarks}
            />
          </div>
        </div>
        <div className="textarea-container">
          <div>
            <label>Feedback to Candiate :</label>
          </div>
          <div>
            <textarea type="text" name="userFeedback" onChange={(data) => update(data)} placeholder="Feedback is shared to user" value={guest.userFeedback}/>
          </div>
        </div>
        <div className="textarea-container">
          <div>
            <label>Feedback to Admin :</label>
          </div>
          <div>
            <textarea type="text" name="adminFeedback" onChange={(data) => update(data)} placeholder="Feedback is shared to admin" value={guest.adminFeedback} />
          </div>
        </div>
        <div onClick={(data) => submit(data)}><AdminNextButton content="Submit" /></div>
      </form>
    </div>
  );
};
export default SingleCandidatedetails;
