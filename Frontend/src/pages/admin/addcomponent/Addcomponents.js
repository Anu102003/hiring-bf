import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../../assets/admin/addcomponent/addcomponent.css";
import { Mcqcard } from './Mcqcard';
import { Link } from 'react-router-dom';
import { request } from '../helper/axios_helper';
import Participants from './participants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Participant } from './Participant';

export const Addcomponents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("MCQ");
  const [searchComponent, setSearchComponent] = useState("");
  const [tabs, setTabs] = useState([]);
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    loadPart();
    loadUsers(); // Load user data when the component mounts
  }, []);

  const loadPart = async () => {
    const token = window.localStorage.getItem("auth_token");
    const data = await request("GET",`/admin/getMcqParts/${id}`,{
        header: {
          'Authorization': `Bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        setTabs(res.data.data);
      }
    }).catch((res) => {
      console.log(res);
    });
  };

  const loadUsers = async () => {
      request("GET", `/admin/getUser/${id}`)
      .then((res) => {setUsers(res.data.data); console.log(res.data.data)})
      .catch((err) => console.log(err))
  };

  const handleSearchComponentChange = (e) => {
    setSearchComponent(e.target.value);
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };


  const addparticipant = "ADD PARTICANT";

  const filteredTabs = tabs.filter((tab) => {
    const nameLowerCase = tab.name.toLowerCase();
    const searchComponentLowerCase = searchComponent.toLowerCase();

    if (currentTab === "MCQ") {
      return (
        nameLowerCase.includes(searchComponentLowerCase) &&
        ["Logical", "Grammar", "Programming"].includes(tab.name)
      );
    } else if (currentTab === "Coding") {
      return (
        nameLowerCase.includes(searchComponentLowerCase) &&
        tab.name === "Coding"
      );
    }

    return false;
  });

  return (
    <div className='add-container'>
      <div className='tabs'>
        {["MCQ", "Coding", addparticipant].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${tab === currentTab ? "tabchecked" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='search-add-component add-cards'>
        <div className='search-bar'>
          <span className='search-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            className="nav-card__search-input"
            type="text"
            placeholder="Enter the Contest Name"
            onChange={handleSearchComponentChange}
            value={searchComponent}
          />
        </div>
        <div className='add-button'>
          {currentTab === "MCQ" ? (
            <Link to={`/addmcq/${id}`}>
              <button>
                <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
              </button>
            </Link>
          ) : currentTab === "Coding" ? (
            <Link to={`/addcoding/${id}`}>
              <button>
                <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
              </button>
            </Link>
          ) : currentTab === addparticipant ? (
            <Link to={`/addparticipant/${id}`}>
              <button>
                <span className='add-icon'><FontAwesomeIcon icon={faPlus} /> </span> Add
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className='content'>
        {currentTab === "ADD PARTICANT" ? (          
          users.map((user) => (
            
            <Participant  key={user.id}
            name={user.email}
            areaOfInterest={user.stack}
            search={searchComponent}/>
            // <Participants
            //   key={user.id}
            //   name={user.name}
            //   areaOfInterest={user.areaOfInterest}
            // />
            
          ))
        ) : (
          
          filteredTabs.map((tab) => (
            <div key={tab.pid}>
              <Mcqcard
                name={tab.name}
                easy={tab.weight.easy}
                medium={tab.weight.medium}
                hard={tab.weight.hard}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
