import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnbarChart = ({ mcq }) => {
  const categories = mcq.map((data) => data.name);
  const dataValues = mcq.map((data) => data.value);

  return (
    <div className="Columnbarchart">
      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: "bar",
          },
          xaxis: {
            categories: categories, // Use dynamically generated categories
            position: "top",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        }}
        type="bar"
        height={350}
        width={500}
        series={[
          {
            name: "Inflation",
            data: dataValues, // Use dynamically generated data
          },
        ]}
      />
    </div>
  );
};

export default ColumnbarChart;
