// Sidebar.js
import React from 'react';
import "../../../assets/admin/sidebar/sidebar.css"
const Sidebar = ({ onSidebarItemClick }) => {
  return (<>
    <div className="side">
      <div className="side-items" onClick={() => onSidebarItemClick('LiveUpcomingContest')}><h2>Live / Upcoming Contest</h2>
     </div>
     <div className="side-items" onClick={() => onSidebarItemClick('ContestLog')}><h2>Contest Log</h2>
     </div>
    </div>
   </>
  );
};

export default Sidebar;

   
