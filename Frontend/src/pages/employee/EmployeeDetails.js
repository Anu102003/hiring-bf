import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { employee } from "../../database/employe";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { request } from "../admin/helper/axios_helper";
export const EmployeeDetails = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await request("GET", `/admin/getEmployee`).then((res) => {
      setData(res.data.data);
      // console.log(res.data.data)
    });
  };
  const handleSearchChange = (e) => {
    // e.preventDefault();
    setSearchText(e.target.value);
  };
  console.log(searchText+"ssss")

  const filteredData = data.filter((item) => {
        item.name.toLowerCase().includes(searchText.toLowerCase());
  });
  console.log(filteredData)
data.map(i=>{
  console.log(i.name)
})

  return (
    <>
      <div className="score-container">
        <div className="score-card">
          <h1>Employee</h1>
          <div className="search-container">
            <div className="search-bar">
              <span className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                className="nav-card__search-input"
                type="text"
                placeholder="Enter the Contest Name"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="add-button add-align">
            <div></div>
            <Link to="/addemployee">
              <button>
                <span className="add-icon">
                  <FontAwesomeIcon icon={faPlus} />{" "}
                </span>{" "}
                Add
              </button>
            </Link>
          </div>
          <div class="table">
            <div class="header">
              <div class="cell">Employee ID</div>
              <div class="cell">Name</div>
              <div class="cell">Area of Expertise</div>
            </div>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div class="row" key={index}>
                  <div class="cell">{item.eid}</div>
                  <div class="cell">{item.name}</div>
                  <div class="cell">{item.expertise}</div>
                </div>
              ))
            ) : (
              <div class="row">
                <div class="cell" colSpan="3">
                  No matching data found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
