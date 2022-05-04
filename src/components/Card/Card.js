import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { NavLink, Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      <NavLink to={`/event/${props.id}`}>
        <CardHeader title={props.title} subheader={props.data} />
      </NavLink>

      <CardMedia
        component="img"
        height="300"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.artistName} {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Link to={`/artist/${props.artistId}`}>{props.artistName} </Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="By a ticket">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
      <div>
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
