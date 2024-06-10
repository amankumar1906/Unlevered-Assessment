import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TopStocksMarquee.module.css";

interface Stock {
  symbol: string;
  price: number;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const TopStocksMarquee: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        const symbols = [
          "AAPL",
          "MSFT",
          "GOOGL",
          "AMZN",
          "TSLA",
          "NFLX",
          "NVDA",
          "BABA",
          "INTC",
          "AMD",
        ];
        const stockPromises = symbols.map((symbol) =>
          axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          )
        );
        const stockResponses = await Promise.all(stockPromises);
        const stockData = stockResponses.map((response, index) => ({
          symbol: symbols[index],
          price: response.data.c,
        }));
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching top stocks data", error);
      }
    };

    fetchTopStocks();
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {stocks.map((stock) => (
          <span key={stock.symbol} className={styles.marqueeItem}>
            {stock.symbol}: ${stock.price.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopStocksMarquee;
