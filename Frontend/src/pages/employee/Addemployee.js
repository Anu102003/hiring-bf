import { useState } from "react";
import { AdminNextButton } from "../../components/AdminNextButton";
import { request } from "../admin/helper/axios_helper";

const Addemployee = () => {

    const [emp, setEmp] = useState({
        eid: "",
        name: "",
        password:"",
        email:"",
        expertise:"",
    })

    const update = (data) => {
        setEmp({
            ...emp,
            [data.target.name]: data.target.value
        });
    }

    const submit = (data) => {
        data.preventDefault()
        request("POST", '/admin/addEmp', emp)
        .then((res) => console.log(res))
    }
  return (
    <div className="form-container">
      <form className="addons-form">
        <h1>Add Employee</h1>

        <div className="addons-input-container">
          <label>Employee ID:</label>
          <div>
            <input
              type="number"
              inputmode="numeric"
              name="eid"
              pattern="[0-9]*"
              placeholder="Enter Employee ID only in number"
              value={emp.Eid}
              onChange={(data) => update(data)}
            />
          </div>
        </div>
        <div className="addons-input-container">
          <label>Name:</label>
          <div>
            <input type="text" placeholder="Enter User Name" name="name"  onChange={(data) => update(data)} value={emp.name}/>
          </div>
        </div>

        <div className="addons-input-container">
          <label>Email:</label>
          <div>
            <input type="email" placeholder="Enter Valid User Mail Id" name="email" onChange={(data) => update(data)} value={emp.email} />
          </div>
        </div>

        <div className="addons-input-container" >
          <label>Field of Expertise:</label>
          <div>
            <input
              type="text"
              placeholder="Enter the name of Expertise field " name="expertise" onChange={(data) => update(data)} value={emp.expertise}/>{" "}
          </div>
        </div>
        <div onClick={(data) => submit(data)}>
            <AdminNextButton content={"SUBMIT"}></AdminNextButton>
        </div>
      </form>
    </div>
  );
};

export default Addemployee;
