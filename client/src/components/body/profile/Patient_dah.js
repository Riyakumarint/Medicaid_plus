import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Charts from "../charts/Chart";
import { Chart, ArcElement, CategoryScale, registerables } from "chart.js";
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(...registerables);
Chart.defaults.font.size=16;
const initData1 = {
  labels: [],
  datasets: [
    {
      label: "Number Of Appointments",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
      ],
    },
  ],
};
const initData2 = {
  labels: ["Online", "Offline"],
  datasets: [
    {
      label: "Online vs Offline",
      data: [],
      backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
    },
  ],
};
const initData3 = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      label: "Active vs Inactive",
      data: [],
      backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(255, 99, 132, 0.6)"],
    },
  ],
};
const initData4 = {
  labels: ["Blood Sugar Upper", "Blood Sugar Lower", "User Blood Sugar"],
  datasets: [
    {
      label: "Blood Sugar",
      data: [],
      backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(255, 99, 132, 0.6)"],
    },
  ],
};
const initData5 = {
  labels: ["Low Blood Oxygen Level", "User Blood Oxygen Level"],
  datasets: [
    {
      label: "Blood Sugar",
      data: [],
      backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(255, 99, 132, 0.6)"],
    },
  ],
};
const initData6 = {
  labels: ["Low Pulse Rate", "High Pulse Rate", "User Pulse Rate"],
  datasets: [
    {
      label: "Pulse Rate",
      data: [],
      backgroundColor: ["rgba(255, 159, 64, 0.6)", "rgba(255, 99, 132, 0.6)"],
    },
  ],
};
export default function Patient_dah() {
  const auth = useSelector((state) => state.auth);
  const { user, isAdmin, isDoctor } = auth;
  const [barData, setBarData] = useState(initData1);
  const [pieData, setPieData] = useState(initData2);
  const [pieData2, setPieData2] = useState(initData3);
  const [barblood, setBarblood] = useState(initData4);
  const [baroxygen, setBarOxygen] = useState(initData5);
  const [barpulse, setBarPulse] = useState(initData6);
  const [appointments, setAppointments] = useState([]);
  const [callBack, setcallBack] = useState(false);
  const [current, setCurrent] = useState("");
  const [medicalhist, setMedicalHist] = useState(null);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const getdata1 = async () => {
      try {
        const temp = await axios.get("appointments/getdata1/" + user);
        // console.log("hello:  " + temp);
      } catch (err) {
        console.log(err);
      }
    };
    getdata1();
    const getdata2 = async () => {
      try {
        const res = await axios.get("/appointments/fetchAppointments", {
          headers: { Authorization: token },
        });
        // console.log(res.data);
        setAppointments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getdata2();
  }, [callBack]);

  useEffect(() => {
    const getpiedata = () => {
      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;
      var l1 = new Date();
      var l2 = new Date();
      l2.setDate(l2.getDate() + 1);
      var l3 = new Date();
      l3.setDate(l3.getDate() + 2);
      var l4 = new Date();
      l4.setDate(l4.getDate() + 3);
      var l5 = new Date();
      l5.setDate(l5.getDate() + 4);
      var l6 = new Date();
      l6.setDate(l6.getDate() + 5);
      var l7 = new Date();
      l7.setDate(l7.getDate() + 6);
      var a1 = 0;
      var a2 = 0;
      var a3 = 0;
      var a4 = 0;
      var a5 = 0;
      var a6 = 0;
      var a7 = 0;
      // console.log("llolo:  " + appointments.length);
      for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].mode === "online") {
          a++;
        } else {
          b++;
        }
        if (appointments[i].status === "active") {
          c++;
        } else {
          d++;
        }
        if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l1.toDateString()
        ) {
          a1++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l2.toDateString()
        ) {
          a2++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l3.toDateString()
        ) {
          a3++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l4.toDateString()
        ) {
          a4++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l5.toDateString()
        ) {
          a5++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l6.toDateString()
        ) {
          a6++;
        } else if (
          new Date(appointments[i].meetingDetail).toDateString() ===
          l7.toDateString()
        ) {
          a7++;
        }
      }
      setBarData({
        labels: [
          l1.toDateString(),
          l2.toDateString(),
          l3.toDateString(),
          l4.toDateString(),
          l5.toDateString(),
          l6.toDateString(),
          l7.toDateString(),
        ],
        datasets: [
          {
            label: "Number Of Appointments",
            data: [a1, a2, a3, a4, a5, a6, a7],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      });
      setPieData({
        labels: ["Online", "Offline"],
        datasets: [
          {
            label: "Online vs Offline",
            data: [a, b],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      });
      setPieData2({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "Active vs Inactive",
            data: [c, d],
            backgroundColor: [
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      });
      // console.log(barData);
    };
    getpiedata();
    const getmedical = async () => {
      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setMedicalHist(res.data);
          // console.log(medicalhist);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(medicalhist);

      const a = medicalhist?.bloodSugar;
      const b = medicalhist?.oxygenLevel;
      const c = medicalhist?.pulse;
      var k = 0;
      if (parseInt(a) > 140) {
        k++;
      }
      if (parseInt(b) < 80) {
        k++;
      }
      if (parseInt(c) < 60 || parseInt(c) > 140) {
        k++;
      }
      if (k == 0) {
        setCurrent("Fit");
      } else if (k == 1) {
        setCurrent("You might Want to book an apointment");
      } else {
        setCurrent(
          "Book an urgent apointment or your health might Digrade Considerably"
        );
      }
      // console.log(a + " " + b + " " + c);
      setBarblood({
        labels: ["Blood Sugar High", "User Blood sugar", "Blood Sugar Low"],
        datasets: [
          {
            label: "Blood Sugar",
            data: [141, parseInt(a), 70],
            backgroundColor: [
              "rgba(235, 52, 67)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(235, 52, 67)",
            ],
          },
        ],
      });
      setBarOxygen({
        labels: ["Low Blood Oxygen Level", "User Blood Oxygen Level"],
        datasets: [
          {
            label: "Blood Oxygen",
            data: [80, parseInt(b)],
            backgroundColor: ["rgba(235, 52, 67)", "rgba(255, 99, 132, 0.6)"],
          },
        ],
      });
      setBarPulse({
        labels: ["Low Pulse Rate", "User Pulse Rate", "High Pulse Rate"],
        datasets: [
          {
            label: "Pulse Rate",
            data: [50, parseInt(c), 140],
            backgroundColor: [
              "rgba(235, 52, 67)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(235, 52, 67)",
            ],
          },
        ],
      });
    };
    getmedical();
  }, [appointments]);
  return (
    <>
      <h1>Current Health Status: {current}</h1>
      <Charts
        barData={barData}
        chartData={pieData}
        chartData2={pieData2}
        chartData3={barblood}
        chartData4={baroxygen}
        chartData5={barpulse}
        location="Massachusetts"
        legendPosition="bottom"
      />
    </>
  );
}
