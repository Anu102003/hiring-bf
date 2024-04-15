import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import { LiveUpcomingContest } from '../sidebar/LiveUpcomingContestontest';
import { ContestLog } from '../sidebar/ContestLog';
import "../../../assets/admin/contestmenu/admincontestmenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { contestdata } from '../../../database/contest';
import { livecontest } from '../../../database/livecontest';
import { request } from '../helper/axios_helper';



export const AdminContestMenu = () => {

    useEffect(() => {
        loadContest()
    },[])

    const loadContest = () => {

        const token = window.localStorage.getItem("auth_token")
        console.log(token)
        const data = request(
            "GET",
            "/admin/getLiveContest",
            {
                header : {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.status === 200) {
                    console.log(res.data.data)
                    setData(res.data.data)
                }
            }).catch((res) => {
                console.log(res)
            })
        const contestLog = request(
            "GET",
            "/admin/getContestLog",
            {
                header : {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if(res.status === 200) {
                    setLiveData(res.data.data)
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [livecontestdata,setLiveData] =useState([])

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredliveData = livecontestdata.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    //   console.log(filteredData)
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const [selectedComponent, setSelectedComponent] = useState("LiveUpcomingContest");

    const handleSidebarItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };
    console.log(filteredliveData)
    return (
        <>
            <div className='admin-contest-menu'>
                <div className='sidebars'>
                    <Sidebar onSidebarItemClick={handleSidebarItemClick} />
                </div>
                <div className='sidebarcontent'>
                    <div className='menu-search'>
                        <div className='search-bar search-menu'>
                            <span className='search-icon'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                                <input
                                    className="nav-card__search-input"
                                    type="text"
                                    placeholder="Enter the Contest Name"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                        </div>
                        
                    </div>
                    <main className="content">
                        {selectedComponent === 'LiveUpcomingContest' ? <LiveUpcomingContest filteredData={filteredData} /> : <ContestLog filteredliveData={filteredliveData} />}
                    </main>
                </div>
            </div>
        </>
    );

};

export default AdminContestMenu;

