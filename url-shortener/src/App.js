import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShortUrl(data.short_url);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button type="submit">Shorten</button>
        </form>
        {shortUrl && (
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
