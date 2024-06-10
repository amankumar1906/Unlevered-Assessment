import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import CandlestickChart from "./components/CandleStickChart/CandlestickChart";
import KeyRatios from "./components/KeyRatios/KeyRatios";
import AnalystEstimates from "./components/AnalystEstimates/AnalystEstimates";
import TopStocksMarquee from "./components/TopStocks/TopStocksMarquee";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";
import { Oval } from "react-loader-spinner";

interface FinancialData {
  analyst_estimates: { [key: string]: number };
  current_ratio: number;
  debt_to_equity_ratio: number;
  eps: number;
  market_ap: number;
  news: {
    [key: string]: {
      sentiment: { score: number; value: string };
      summary: string;
    };
  };
  pb_ratio: number;
  pe_ratio: number;
  peg_ratio: number;
  ps_ratio: number;
  shares_outstanding: number;
  ticker: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FinancialData>(
          "https://unlevered-backend-3y13i2hop-aman-kumars-projects-a109b2b6.vercel.app/financials"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (!data) return <div>Error loading data</div>;

  return (
    <div className={styles.app}>
      <Navbar />
      <TopStocksMarquee />
      <div className={styles.content}>
        <h1>{data.ticker} Stock Overview</h1>
        <div className={styles.chartContainer}>
          <CandlestickChart />
        </div>
        <div className={styles.flexContainer}>
          <KeyRatios
            ratios={{
              "Current Ratio": data.current_ratio,
              "Debt to Equity Ratio": data.debt_to_equity_ratio,
              EPS: data.eps,
              "Market Cap": data.market_ap,
              "P/B Ratio": data.pb_ratio,
              "P/E Ratio": data.pe_ratio,
              "PEG Ratio": data.peg_ratio,
              "P/S Ratio": data.ps_ratio,
              "Shares Outstanding": data.shares_outstanding,
            }}
          />
          <AnalystEstimates
            estimates={Object.entries(data.analyst_estimates).map(
              ([bank, estimate]) => ({ bank, estimate })
            )}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
