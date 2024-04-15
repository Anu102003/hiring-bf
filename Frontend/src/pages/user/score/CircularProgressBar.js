import 'react-circular-progressbar/dist/styles.css';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import React ,{useState, useEffect}from "react";
import Chart from 'react-apexcharts';
const CircularProgressBar = () => {
  // return (
  //   <div style={{ width: '300px', margin: 'auto' }}>
  //     <CircularProgressbar
  //       value={percentage}
  //       text={`${percentage}%`}
  //       styles={buildStyles({
  //         textSize: '16px',
  //         pathColor: `#00BFFF`,
  //         textColor: '#00BFFF',
  //         trailColor: '#D3D3D3',
  //       })}
  //     />
  //   </div>
  // );


  // const [contryname, setCountryname]= useState([]);
  // const [medal, setMedal]= useState([]);

  // useEffect( ()=>{
  // const getdata= async()=>{
  // const countryname=[];
  // const getmedal=[];

  // const reqData= await fetch("http://localhost/reactgraphtutorial/medals"); 
  // const resData= await reqData.json();
  // for(let i=0; i<resData.length; i++)
  // {
  // countryname.push(resData[i].country);
  // getmedal.push(parseInt(resData[i].medals));
  // }
  // setCountryname(countryname);
  // setMedal(getmedal);


  // }
  // getdata();
  // },[]);
  return (
    <div className="DoughnutChart">
      <Chart
        type="donut"
        width={1000}
        height={420}
        series={[10, 10, 11, 1]}
        // series={medal}
        options={{

          labels: ["Part A", "Part B", "Part C", "Coding"], // Set the labels here
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    fontSize: 40,
                    color: '#f90000',
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
          },
          legend:{
            fontSize:'20px',
            markers:{
             width:18,
             height:17,
            }
          }
        }}


      />
    </div>
  );
}

export default CircularProgressBar;
