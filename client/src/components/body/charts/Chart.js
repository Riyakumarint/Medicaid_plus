import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

export default function Chart(props) {
  console.log("cfvghbnj:     " + props.chartData);
  console.log(props.chartData2);
  return (
    <div className="chart">
      {props.barData ? (
        <div className="bar_chart">
          <Bar
            data={props.barData}
            options={{
              title: {
                display: props.displayTitle,
                text: "Largest Cities In " + props.location,
                fontSize: 25,
              },
              legend: {
                display: props.displayLegend,
                position: props.legendPosition,
              },
            }}
          />
        </div>
      ) : (
        "Waiting For Fetching"
      )}
      <div className="row">
        <div className="pie_chart">
          <Pie
            data={props.chartData}
            options={{
              title: {
                display: props.displayTitle,
                text: "Largest Cities In " + props.location,
                fontSize: 25,
              },
              legend: {
                display: props.displayLegend,
                position: props.legendPosition,
              },
            }}
          />
        </div>
        {props.chartData2 ? (
          <div className="pie_chart">
            <Pie
              data={props.chartData2}
              options={{
                title: {
                  display: props.displayTitle,
                  text: "Largest Cities In " + props.location,
                  fontSize: 25,
                },
                legend: {
                  display: props.displayLegend,
                  position: props.legendPosition,
                },
              }}
            />
          </div>
        ) : (
          "Waiting For Fetching"
        )}
      </div>
    </div>
  );
}
