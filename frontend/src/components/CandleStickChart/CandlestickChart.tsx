import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./CandlestickChart.module.css";
import { Oval } from "react-loader-spinner";

Chart.register(...registerables);

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const CandlestickChart: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [interval, setIntervalValue] = useState<"D" | "W" | "M">("D");
  const [selectedData, setSelectedData] = useState<StockData | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/financials/${interval}`);
        const stockData = response.data.map((item: any) => {
          let date;
          if (interval === "M") {
            const [month, year] = item.Date.split("/");
            date = new Date(`${year}-${month}-01`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            });
          } else {
            date = new Date(item.Date).toLocaleDateString();
          }
          return {
            date,
            open: parseFloat(item.Open),
            high: parseFloat(item.High),
            low: parseFloat(item.Low),
            close: parseFloat(item.Close),
            volume: parseInt(item.Volume.replace(/,/g, ""), 10),
          };
        });

        setData(stockData);
        setSelectedData(stockData[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [interval]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Oval
          height={100}
          width={100}
          color="#9A83BF"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4f4f4f"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Closing Price",
        data: data.map((entry) => entry.close),
        borderColor: "#9A83BF",
        backgroundColor: "#f1f1f1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedData(data[index]);
      }
    },
  };

  return (
    <div className={styles.wrapper}>
      {showTooltip && (
        <Tooltip
          message="* The chart is responsive. Click on the chart to see details for a specific date."
          onClose={() => setShowTooltip(false)}
        />
      )}
      {selectedData && (
        <div className={styles.infoSection}>
          <h2>Information for {formatDate(selectedData.date)}</h2>
          <ul>
            <li>Open: {selectedData.open.toFixed(2)}</li>
            <li>High: {selectedData.high.toFixed(2)}</li>
            <li>Low: {selectedData.low.toFixed(2)}</li>
            <li>Close: {selectedData.close.toFixed(2)}</li>
            <li>Volume: {selectedData.volume.toLocaleString()}</li>
          </ul>
          <p className={styles.disclaimer}>
            Disclaimer: Data is only for the year 2023-2024.
          </p>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.chartSection}>
          <div className={styles.buttonContainer}>
            <button onClick={() => setIntervalValue("D")}>Daily</button>
            <button onClick={() => setIntervalValue("W")}>Weekly</button>
            <button onClick={() => setIntervalValue("M")}>Monthly</button>
          </div>
          <div className={styles.chartWrapper}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
