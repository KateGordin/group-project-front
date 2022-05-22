import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardComponent(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //for modal (payment)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const onClose = () => setSelectedEvent(null);

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 5,
      }}
    >
      <NavLink
        style={{
          textDecoration: "none",
          color: "darkblue",
          textAlign: "center",
        }}
        to={`/event/${props.id}`}
      >
        <h2>
          {props.title}
          {props.data}
        </h2>
      </NavLink>

      <CardMedia
        component="img"
        height="300"
        image={props.image}
        alt={props.title}
      />
      <div style={{ margin: "20px" }}>
        <Typography variant="body2" color="text.secondary">
          {props.artistName} {props.description}
        </Typography>
        <Typography variant="p">
          <Link style={{ color: "darkblue" }} to={`/artist/${props.artistId}`}>
            {props.artistName}{" "}
          </Link>
        </Typography>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
        <div></div>
        {props.tickets.map((ticket) => {
          return (
            <div key={ticket.id}>
              {" "}
              <p>Price:{ticket.price}</p>{" "}
              <p>tickets available:{ticket.numberAvailable}</p>
            </div>
          );
        })}
      </div>

      {/* for pop-up modal (payment) */}
      <Button onClick={props.onOpenModal}>Buy now</Button>
    </Card>
  );
}
