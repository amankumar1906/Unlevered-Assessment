import React, { useState } from "react";
import styles from "./NewsFeed.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface NewsItem {
  title: string;
  date: string;
  sentiment: {
    score: number;
    value: string;
  };
  summary: string;
  content: string;
}

interface NewsFeedProps {
  news: { [key: string]: NewsItem };
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  const newsItems = Object.values(news);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  const handlePrevious = () => {
    setAnimationClass(styles.slideOutRight);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
      );
      setAnimationClass(styles.slideInLeft);
    }, 300);
  };

  const handleNext = () => {
    setAnimationClass(styles.slideOutLeft);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      );
      setAnimationClass(styles.slideInRight);
    }, 300);
  };

  const currentNews = newsItems[currentIndex];

  return (
    <div className={styles.newsContainer}>
      <h2>Latest News</h2>
      <div className={styles.newsFeed}>
        <FaArrowLeft className={styles.icon} onClick={handlePrevious} />
        <div
          className={`${styles.newsItem} ${animationClass}`}
          onAnimationEnd={() => setAnimationClass("")}
        >
          <h3 className={styles.title}>{currentNews.title}</h3>
          <p className={styles.date}>{currentNews.date}</p>
          <p className={styles.summary}>{currentNews.summary}</p>
          <p className={styles.content}>{currentNews.content}</p>
        </div>
        <FaArrowRight className={styles.icon} onClick={handleNext} />
      </div>
    </div>
  );
};

export default NewsFeed;
