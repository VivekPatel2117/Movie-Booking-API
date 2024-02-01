import React, { useEffect, useState } from "react";
import "../CSS/movies.css";
import { Link } from "react-router-dom";

export default function Movies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  async function fetchMovie() {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const res = await response.json();
    console.log(res);
    setData(res);
  }

  return (
    <>
      <div className="container">
        {data.map((item) => (
          <div className="Box" key={item.show.id}>
            <div className="content">
              <p>Movie Name: {item.show.name}</p>
              <p>Langiage: {item.show.language}</p>
              <p>Ratings: {item.show.rating.average}</p>
              <p>
                <Link
                  to={`${item.show.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Now
                </Link>{" "}
              </p>
              <Link to={`/summary/${item.show.id}`}>
                <button className="btn">Details</button>{" "}
              </Link>
              {/* Include additional movie details as needed */}
            </div>
            <div className="img">
              <img
                className="img-src"
                src={item.show.image?.medium || "placeholder.jpg"}
                alt="moviePoster"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
