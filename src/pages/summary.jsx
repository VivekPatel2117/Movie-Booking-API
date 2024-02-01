import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS/summary.css";

export default function Summary() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState(null); // Initialize movie state with null

  useEffect(() => {
    fetchMovie();
  }, []);

  async function fetchMovie() {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const res = await response.json();
    setData(res);
    const showId = parseInt(id);
    const foundMovie = res.find((element) => element.show.id === showId);
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }

  const handleBookClick = () => {
    const form = document.getElementById("form");
    if (form) {
      form.style.display = "block";
    }
  };

  const handleCloseClick = () => {
    const form = document.getElementById("form");
    if (form) {
      form.style.display = "none";
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    movie: "",
    time: "",
    dates: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here, e.g., submit to server or perform validation
    console.log(formData);
    sessionStorage.setItem(formData, "user");
    const formId = document.getElementById("form");
    if (formId) {
      formId.style.display = "none";
    }
    const book = document.querySelector(".btn-container");
    if (book) {
      book.innerText = "Tickets Booked!";
    }
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      movie: "",
      time: "",
      dates: "",
    });
  };

  return (
    <>
      {movie && (
        <div className="container">
          <div className="boxSumarry">
            <div className="summary">
              <img
                className="img-src"
                src={movie.show.image?.medium || "placeholder.jpg"}
                alt="moviePoster"
              />
              <p dangerouslySetInnerHTML={{ __html: movie.show.summary }}></p>
            </div>

            <div className="btn-container">
              <button id="book" onClick={handleBookClick}>
                Book Tickets
              </button>
            </div>
          </div>
          <div id="form">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="form">
                <p id="close" className="id" onClick={handleCloseClick}>
                  Close
                </p>
                <label htmlFor="Name">Name:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input-field"
                />
                <br />
                <label htmlFor="EMail">EMAil</label>
                <br />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
                <br />
                <label htmlFor="Phone">Phone:</label>
                <br />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="input-field"
                />
                <br />
                <label htmlFor="Movie">Movie Name:</label>
                <br />
                <input
                  type="text"
                  name="movie"
                  value={(formData.movie = movie.show.name)}
                  onChange={handleChange}
                  className="input-field"
                />
                <br />
                <label htmlFor="Schedule">Schedule</label>
                <br />
                <input
                  type="text"
                  name="schedule"
                  value={(formData.time = movie.show.schedule.time)}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="schedule"
                  value={(formData.days = movie.show.schedule.days)}
                  onChange={handleChange}
                  className="input-field"
                />
                <br />
                <div className="btn-container">
                  <button type="submit" id="book" className="submit-button">
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
