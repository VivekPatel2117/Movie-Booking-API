// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./pages/movies";
import Summary from "./pages/summary";
function App() {
  return (
    <Router>
      <Routes>
        <Route index="/movies.jsx" element={<Movies />} />
        <Route path="/summary/:id" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
