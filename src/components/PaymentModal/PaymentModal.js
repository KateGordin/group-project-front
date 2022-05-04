import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function PaymentModal(props) {
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This ticket cost{" "}
            {props.oneEvent.tickets.map((ticket) => ticket.price)} €
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We have only{" "}
            {props.oneEvent.tickets.map((ticket) => ticket.numberAvailable)}{" "}
            tickets
            <Button onClick={props.buyTickets}>Press to buy</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
