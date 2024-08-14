import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const Scrapper = () => {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async (e) => {
    e.preventDefault();
    if (!topic) {
      setError("Please enter a topic");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/scrape", {
        topic,
      });
      setArticles(response.data);
    } catch (error) {
      setError("Failed to fetch articles");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Medium Article Scraper</h1>
      <p>Enter a Topic to View Top 5 Related Articles</p>
      <form onSubmit={handleScrape}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
        />
        <button type="submit">Scrape Articles</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <h2>{article.title}</h2>
            <p>
              By {article.author} on {article.date}
            </p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrapper;
