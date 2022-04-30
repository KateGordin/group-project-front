import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventForm from "./pages/EventForm";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/form" element={<EventForm />} />
      </Routes>
    </div>
  );
}

export default App;
