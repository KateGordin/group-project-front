import React  from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import event from "../../assets/music.jpeg";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectToken, selectArtist } from "../../store/artist/selectors";
import NavbarItem from "./NavbarItem";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import  {filterEvents}  from '../../store/event/actions'

export default function Navigation() {
    const [name, setName] = useState("");
  const token = useSelector(selectToken);
  const artist = useSelector(selectArtist);
  const dispatch = useDispatch()
const navigate = useNavigate()
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

const handleSearchField = (e)=>{
  e.preventDefault()
  dispatch(filterEvents(name))
  navigate(`/events/${name}`)
}

  return (
    <div className="navbar">
      <NavLink end to={"/"}>
        <img
          className="navbar__logo"
          alt="logo"
          style={{ width: 170, height: 100 }}
          src={event}
          />
      </NavLink>

      <div className="navbar__buttons d-flex">
        {/* <NavLink end to={"/events"}>
          <button className="btn-green">Events</button>
        </NavLink> */}
          <Paper
        component="form"
        onSubmit={handleSearchField}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 800,
          height: 50,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Artist"
          inputProps={{ "aria-label": "search google maps" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
        <NavbarItem path="/events" linkText="Events" />

        <Nav style={{ width: "100%" }} fill>
          {token && artist.isArtist && (
            <NavbarItem path="/form" linkText="Add Events" />
          )}
          {token && artist.isArtist && (
            <NavbarItem path="/myEvents" linkText="My Events" />
          )}
          {loginLogoutControls}
        </Nav>
      </div>
    </div>
  );
}
