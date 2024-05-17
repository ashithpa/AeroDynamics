// App.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import FlightTable from "./components/FlightTable";
import { useFlights } from "./hooks/useFlights";

const App: React.FC = () => {
  const { flights, handlePassengerChange, calculateCost, saveChanges, uploadFile, handleFileChange } = useFlights();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AeroDynamics Flights
      </Typography>
      <input type="file"  onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload Flights</button>
      <Box mb={2} />
      <FlightTable
        flights={flights}
        handlePassengerChange={handlePassengerChange}
        calculateCost={calculateCost}
        saveChanges={saveChanges}
      />
    </Container>
  );
};

export default App;
