import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./Summary.css";

const SummaryPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const charts = [
    {
      name: "User Frequency",
      type: "pie",
      // Add data and options for the pie chart
    },
    {
      name: "Top Three Unique Phrases",
      type: "bar",
      // Add data and options for the bar chart
    },
    // Add more chart objects as needed...
  ];

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="summary-page">
      <div className="summary-navigation">
        <ul>
          {charts.map((chart, index) => (
            <li
              key={index}
              className={index === currentTab ? "active" : ""}
              onClick={() => handleTabClick(index)}
            >
              {chart.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="summary-content">
        {charts.map((chart, index) => (
          <div
            key={index}
            className={`summary-card ${
              index === currentTab ? "active" : "inactive"
            }`}
            style={{ display: index === currentTab ? "block" : "none" }}
          >
            <h2>{chart.name}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;
