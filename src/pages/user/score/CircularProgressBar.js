import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = ({percentage}) => {
  return (
    <div style={{ width: '300px', margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: `#00BFFF`,
          textColor: '#00BFFF',
          trailColor: '#D3D3D3',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
