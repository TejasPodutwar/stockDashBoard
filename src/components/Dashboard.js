import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

Chart.register(CategoryScale);

let stocksSymbols = ["MSFT", "AMRN"];
let optionsList = stocksSymbols.map((stockSymbol) => {
  let option = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: stockSymbol,
      outputsize: "compact",
      datatype: "json",
    },
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "23a3ef8ac9mshb40b8afa3c39e59p138f90jsn1cd0f262a278",
    },
  };
  return option;
});

const dates = [
  "2022-01-04",
  "2022-01-05",
  "2022-01-07",
  "2022-01-06",
  "2022-01-10",
  "2022-01-11",
];

// const dummyData = [
//   {
//     labels: ["Jan 05", "Jan 06", "Jan 07", "Jan 10", "Jan 11"],
//     datasets: [
//       {
//         id: 1,
//         label: "TATA MOTORS SHARE PRICE",
//         data: [489.75, 488.85, 490.6, 503.7, 501.3],
//         backgroundColor: ["#0000FF"],
//         borderColor: ["FF0000"],
//         pointBorderColor: ["00FF00"],
//       },
//     ],
//   },
//   {
//     labels: ["Jan 05", "Jan 06", "Jan 07", "Jan 10", "Jan 11"],
//     datasets: [
//       {
//         id: 1,
//         label: "VBL SHARE PRICE",
//         data: [875.0, 841.35, 851.3, 849.75, 869.45],
//         backgroundColor: ["#0000FF"],
//         borderColor: ["FF0000"],
//         pointBorderColor: ["00FF00"],
//       },
//     ],
//   },
// ];

function Dashboard() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    optionsList.forEach((option, idx) => {
      let stockData;
      let stockPriceList = [];
      axios
        .request(option)
        .then(function (response) {
          stockData = response.data["Time Series (Daily)"];
          stockPriceList = dates.map((date) => {
            return stockData[date]["4. close"];
          });

          const plotData = {
            labels: ["Jan 05", "Jan 06", "Jan 07", "Jan 10", "Jan 11"],
            datasets: [
              {
                id: 1,
                label: `${stocksSymbols[idx]} STOCK PRICE`,
                data: stockPriceList,
                backgroundColor: ["#0000FF"],
                borderColor: ["FF0000"],
                pointBorderColor: ["00FF00"],
              },
            ],
          };

          setStockData((prevState) => {
            return [...prevState, plotData];
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  }, []);

  return (
    <>
      <Container className="my-3">
        <Row>
          {stockData.map((stockData, idx) => {
            return (
              <Col md={6} key={idx}>
                <div className={classes["graph-container"]}>
                  <Line datasetIdKey="id" data={stockData} />
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
