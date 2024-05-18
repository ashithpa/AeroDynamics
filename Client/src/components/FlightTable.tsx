import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import FlightRow from "./FlightRow";
import Flight from "./Flight";

interface FlightTableProps {
  flights: Flight[];
  handlePassengerChange: (
    id: number,
    value: number | string,
    field: string
  ) => void;
  calculateCost: (flight: Flight) => number;
  saveChanges: (id: number) => void;
  deleteFlight: (id: number) => void; // Add deleteFlight prop
}

const FlightTable: React.FC<FlightTableProps> = ({
  flights,
  handlePassengerChange,
  calculateCost,
  saveChanges,
  deleteFlight,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Flight ID</TableCell>
        <TableCell>Aircraft Registration No</TableCell>
        <TableCell>Destination</TableCell>
        <TableCell>Number of passengers</TableCell>
        <TableCell>Flight Cost</TableCell>
        <TableCell>Note</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {flights.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7}>No records found.</TableCell>
        </TableRow>
      ) : (
        flights.map((flight) => (
          <FlightRow
            key={flight.id}
            flight={flight}
            handlePassengerChange={handlePassengerChange}
            calculateCost={calculateCost}
            saveChanges={saveChanges}
            deleteFlight={deleteFlight}
          />
        ))
      )}
    </TableBody>
  </Table>
);


export default FlightTable;
