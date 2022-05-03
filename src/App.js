import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventForm from "./pages/EventForm";
import DetailPage from "./pages/DetailPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getArtistWithStoredToken } from "./store/artist/actions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getArtistWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/form" element={<EventForm />} />
      </Routes>
    </div>
  );
}

export default App;
