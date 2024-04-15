import React, { useState } from 'react';

import Sidebar from '../sidebar/sidebar';
import { LiveUpcomingContest } from '../sidebar/LiveUpcomingContestontest';
import { ContestLog } from '../sidebar/ContestLog';
import "../../../assets/admin/contestmenu/admincontestmenu.css"
import { SearchAddButton } from '../../../components/SearchAddButton';
export const AdminContestMenu = () => {
    const [selectedComponent, setSelectedComponent] = useState("LiveUpcomingContest");

    const handleSidebarItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };
    return (
        <>
            <div className='admin-contest-menu'>
                <div className='sidebars'>
                    <Sidebar onSidebarItemClick={handleSidebarItemClick} />
                </div>
                <div className='sidebarcontent'>
                    <SearchAddButton/>
                    <main className="content">
                        {selectedComponent === 'LiveUpcomingContest' ? <LiveUpcomingContest /> : <ContestLog />}
                    </main>
                </div>

            </div>
        </>
    );

};

export default AdminContestMenu;

