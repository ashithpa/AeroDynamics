import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Flight from "./Flight";

interface FlightRowProps {
  flight: Flight;
  handlePassengerChange: (
    id: number,
    value: number | string,
    field: string
  ) => void;
  calculateCost: (flight: Flight) => number;
  saveChanges: (id: number) => void;
  deleteFlight: (id: number) => void;
}

const FlightRow: React.FC<FlightRowProps> = ({
  flight,
  handlePassengerChange,
  calculateCost,
  saveChanges,
  deleteFlight,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false); // State for confirmation dialog

  // Function to open the confirmation dialog
  const handleDeleteClick = () => {
    setOpenConfirmation(true);
  };

  // Function to confirm the deletion
  const handleConfirmDelete = () => {
    debugger;
    deleteFlight(flight.id);
    setOpenConfirmation(false);
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setOpenConfirmation(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>{flight.flightNo}</TableCell>
        <TableCell>{flight.aircraftRegistrationNo}</TableCell>
        <TableCell>{flight.destination}</TableCell>
        <TableCell>
          <TextField
            type="number"
            value={flight.numberOfPassengers|| ""}
            onChange={(e) =>
              handlePassengerChange(
                flight.id,
                parseInt(e.target.value),
                "numberOfPassengers"
              )
            }
          />
        </TableCell>
        <TableCell>${calculateCost(flight)}</TableCell>
        <TableCell>
          <TextField
            value={flight.note|| ""}
            onChange={(e) =>
              handlePassengerChange(flight.id, e.target.value, "note")
            }
          />
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => saveChanges(flight.id)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteClick} // Trigger delete confirmation dialog
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {/* Confirmation dialog */}
      <Dialog open={openConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>{`Are you sure you want to delete flight ${flight.flightNo}?`}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
          <Button onClick={handleCancelDelete} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlightRow;
