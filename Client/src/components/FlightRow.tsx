// FlightRow.tsx
import React from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
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
}

const FlightRow: React.FC<FlightRowProps> = ({
  flight,
  handlePassengerChange,
  calculateCost,
  saveChanges,
}) => (
  <TableRow>
    {/* <TableCell >{flight.id}</TableCell> */}
    <TableCell>{flight.flightNo}</TableCell>
    <TableCell>{flight.aircraftRegistrationNo}</TableCell>
    <TableCell>{flight.destination}</TableCell>
    <TableCell>
      <TextField
        type="number"
        value={flight.numberOfPassengers}
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
        value={flight.note}
        onChange={(e) =>
          handlePassengerChange(
            flight.id,
            e.target.value,
            "note"
          )
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
    </TableCell>
  </TableRow>
);

export default FlightRow;
