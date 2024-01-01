import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Summary.css";
import host from "../hostUrl";
import { AuthContext } from "../context/AuthContext";

const SummaryPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [comparisonData, setComparisonData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [topPhrases, setTopPhrases] = useState([]);
  const [barChartColors, setBarChartColors] = useState([
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 206, 86, 0.6)",
  ]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserFrequencyData = async () => {
      try {
        const response = await fetch(
          `${host}/api/user/wordFrequencies/${currentUser.User._id}`
        );
        const data = await response.json();
        const sortedTableData = Object.entries(data)
          .map(([key, value]) => ({ word: key, frequency: value }))
          .sort((a, b) => b.frequency - a.frequency);

        setTableData(sortedTableData);
      } catch (error) {
        console.error("Error fetching user frequency data: ", error);
      }
    };

    const loadComparisonData = async () => {
      try {
        const response = await fetch(
          `${host}/api/user/compareFrequencies/${currentUser.User._id}`
        );
        const data = await response.json();
        setComparisonData(data);
      } catch (error) {
        console.error("Error loading comparison data: ", error);
      }
    };

    const loadTopPhrases = async () => {
      try {
        const response = await fetch(
          `${host}/api/user/topPhrases/${currentUser.User._id}`
        );
        const data = await response.json();
        setTopPhrases(data);
      } catch (error) {
        console.error("Error loading top phrases data: ", error);
      }
    };

    fetchUserFrequencyData();
    loadComparisonData();
    loadTopPhrases();
  }, [currentUser.User._id]);

  const charts = [
    {
      name: "Word Choice Analysis",
      type: "bar",
      data: {
        labels: Object.keys(comparisonData),
        datasets: [
          {
            label: "Current User Frequency",
            data: Object.values(comparisonData).map(
              (data) => data.currentUserFrequency
            ),
            backgroundColor: barChartColors[0],
            borderWidth: 1,
          },
          {
            label: "Average User Frequency",
            data: Object.values(comparisonData).map(
              (data) => data.averageFrequency
            ),
            backgroundColor: barChartColors[1],
            borderWidth: 1,
          },
        ],
      },
      options: {
        //  chart options
      },
    },
    {
      name: "Your Top Word Choices",
      type: "table",
    },
    {
      name: "A Focus on Top 3 Unique Phrases",
      type: "phrases",
    },
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

            {chart.type === "bar" && (
              <>
                <p>Your Voice vs. the Average User Frequency</p>
                <Bar data={chart.data} options={chart.options} />
              </>
            )}

            {chart.type === "table" && (
              <>
                <p>A Personalized Frequency Breakdown</p>
                <div className="user-frequency-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Word</th>
                        <th>User Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={`row-data-${index}`}>
                          <td>{data.word}</td>
                          <td>{data.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {chart.type === "phrases" && (
              <>
                <div className="phrases">
                  {topPhrases.map((data, index) => (
                    <p key={index}>{data}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;
