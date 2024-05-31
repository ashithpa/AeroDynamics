import React from "react";
import { Container, Typography, Box } from "@mui/material";
import FlightTable from "./components/FlightTable";
import { useFlights } from "./hooks/useFlights";
import { red } from "@mui/material/colors";
import AccordionPage from "./components/AccordionPage";
import FileUploadPage from "./components/FileUploadPage";

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
  return (
    <Container>
      <Box sx={{ bgcolor: "lightskyblue", color: red }} py={3}>
        <Typography variant="h4" align="center" color="white">
          AeroDynamics Flights
        </Typography>
      </Box>
      <Box my={2}>
        <FileUploadPage
          handleFileChange={handleFileChange}
          uploadFile={uploadFile}
        ></FileUploadPage>
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
      <AccordionPage costTable={costTable}></AccordionPage>
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
