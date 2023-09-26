import { useState } from "react";
import "./App.css";
import { UserData } from "./Data";
import Modal from "react-modal";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
function App() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPoint, setNewPoint] = useState("");
  const [filterTime, setFilterTime] = useState(10); // Default filter time is 10 minutes

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addNewPoint = () => {
    if (newPoint !== "") {
      const newData = [
        ...data,
        { timestamp: new Date().getTime(), value: parseInt(newPoint) },
      ];
      newData.sort((a, b) => a.timestamp - b.timestamp);
      setData(newData);
      closeModal();
      setNewPoint("");
    }
  };

  // Function to filter data by time
  const filterDataByTime = (time) => {
    const currentTime = new Date().getTime();
    const filteredData = data.filter(
      (point) => currentTime - point.timestamp <= time * 60 * 1000
    );
    return filteredData;
  };

  const filteredData = filterDataByTime(filterTime);

  const chartData = {
    labels: filteredData.map((point) => new Date(point.timestamp)), // Use Date objects
    datasets: [
      {
        label: "Value",
        data: filteredData.map((point) => point.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  return (
    <div className="App">
      <button onClick={openModal}>Add New Point</button>
      <select onChange={(e) => setFilterTime(parseInt(e.target.value))}>
        <option value={10}>Last 10 Minutes</option>
        <option value={60}>Last 1 Hour</option>
      </select>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <input
          type="number"
          placeholder="Enter a value"
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
        />
        <button onClick={addNewPoint}>Add</button>
      </Modal>
      <LineChart data={chartData} />
    </div>
    // <div className="App">
    //   <div style={{ width: 700 }}>
    //     <BarChart chartData={userData} />
    //   </div>
    //   <div style={{ width: 700 }}>
    //     <LineChart chartData={userData} />
    //   </div>
    // </div>
  );
}

export default App;

// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import Modal from "react-modal";

// function App() {

//   // Function to open the modal
//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   // Function to handle adding a new point to the chart data
//   const addNewPoint = () => {
//     if (newPoint !== "") {
//       const newData = [
//         ...data,
//         { timestamp: new Date().getTime(), value: parseInt(newPoint) },
//       ];
//       newData.sort((a, b) => a.timestamp - b.timestamp);
//       setData(newData);
//       closeModal();
//       setNewPoint("");
//     }
//   };

//   // Function to filter data by time
//   const filterDataByTime = (time) => {
//     const currentTime = new Date().getTime();
//     const filteredData = data.filter(
//       (point) => currentTime - point.timestamp <= time * 60 * 1000
//     );
//     return filteredData;
//   };

//   const filteredData = filterDataByTime(filterTime);

//   const chartData = {
//     labels: filteredData.map((point) => new Date(point.timestamp)), // Use Date objects
//     datasets: [
//       {
//         label: "Value",
//         data: filteredData.map((point) => point.value),
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div className="App">
//       <button onClick={openModal}>Add New Point</button>
//       <select onChange={(e) => setFilterTime(parseInt(e.target.value))}>
//         <option value={10}>Last 10 Minutes</option>
//         <option value={60}>Last 1 Hour</option>
//       </select>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         <input
//           type="number"
//           placeholder="Enter a value"
//           value={newPoint}
//           onChange={(e) => setNewPoint(e.target.value)}
//         />
//         <button onClick={addNewPoint}>Add</button>
//       </Modal>
//       <Line data={chartData} />
//     </div>
//   );
// }

// export default App;
