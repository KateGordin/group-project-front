import "./App.css";
import { Routes, Route } from "react-router-dom";
//import NavBar from "./components/NavBar";
import Navigation from "./components/Navigation";
import MessageBox from "./components/MessageBox";
import Loading from "./components/Loading";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventForm from "./pages/EventForm";
import MyProfile from "./pages/Profile";
import MyEvent from "./pages/MyEvent";
import DetailPage from "./pages/DetailPage";
import Artist from "./pages/Artist";
import { fetchEvents } from "./store/event/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getArtistWithStoredToken } from "./store/artist/actions";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const stripePromise = loadStripe(process.env.REACT_APP_KEY);
  useEffect(() => {
    dispatch(getArtistWithStoredToken());
    dispatch(fetchEvents);
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />}>
            <Route path=":filter" element={<EventPage />} />
          </Route>

          <Route path="/event/:id" element={<DetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/form" element={<EventForm />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/myEvents" element={<MyEvent />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
