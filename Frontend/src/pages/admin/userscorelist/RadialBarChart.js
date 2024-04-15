import React from "react";
import ReactApexChart from "react-apexcharts";
// import { FaTruckLoading } from 'react-icons/fa';

const RadialBarChart = ({chart}) => {
  return (
    <div id="chart">
      <ReactApexChart
        options={{
          series: [45, 10, 29, 12],
          chart: {
            height: 390,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: "20%",
                background: "transparent",
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          colors: ["#f02881", "#007934", "#ff0000", "#12127d"],
          labels: ["Total No of Participant", "Pass", "Fail", "Absentence"],
          legend: {
            show: true,
            floating: true,
            fontSize: "16px",
            fontWeight: "bold",
            position: "left",
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              offsetX: -25,
              size: 0,
            },
            formatter: function (seriesName, opts) {
              return (
                seriesName + ": " + opts.w.globals.series[opts.seriesIndex]
              );
            },
            width: 315,
            height: 225,
            toggleDataSeries: false,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: true,
                },
              },
            },
          ],
        }}
        series={[chart.participants, chart.pass, chart.fail, chart.Na]}
        type="radialBar"
        height={450}
      />
    </div>
  );
};

export default RadialBarChart;
