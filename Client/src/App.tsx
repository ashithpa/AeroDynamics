import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import FlightTable from "./components/FlightTable";
import { useFlights } from "./hooks/useFlights";
import { red } from "@mui/material/colors";

const App: React.FC = () => {
  // Destructuring properties from useFlights hook
  const {
    flights,
    costTable,
    handlePassengerChange,
    calculateCost,
    saveChanges,
    deleteFlight,
    uploadFile,
    handleFileChange,
  } = useFlights();

  // State for managing Accordion
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <Container>
      <Box sx={{ bgcolor: "lightskyblue", color: red }} py={3}>
        <Typography variant="h4" align="center" color="white">
          AeroDynamics Flights
        </Typography>
      </Box>
      <Box my={2}>
        {/* File input and upload button */}
        <input type="file" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={uploadFile}>
          Upload Flights
        </Button>
      </Box>
      <Typography
        variant="body1"
        color="textSecondary"
        style={{
          fontStyle: "italic",
          fontSize: "0.9rem",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        You can save files in either CSV or JSON format.
      </Typography>
      {/* Accordion for displaying cost table */}
      <Accordion
        expanded={accordionOpen}
        onChange={() => setAccordionOpen(!accordionOpen)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Cost Per Passenger Lookup:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Conditional rendering of cost table */}
          {costTable && costTable.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Min Passengers</th>
                  <th>Max Passengers</th>
                  <th>Cost Per Passenger</th>
                </tr>
              </thead>
              <tbody>
                {costTable.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.minPassengers}</td>
                    <td>{entry.maxPassengers}</td>
                    <td>{entry.costPerPassenger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No cost table available.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Box mt={3}>
        {/* Flight table component */}
        <FlightTable
          flights={flights}
          handlePassengerChange={handlePassengerChange}
          calculateCost={calculateCost}
          saveChanges={saveChanges}
          deleteFlight={deleteFlight}
        />
      </Box>

      <Box bgcolor="lightskyblue" py={3} mt={5}>
        <Typography variant="body2" align="center" color="white">
          © 2024 AeroDynamics. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
