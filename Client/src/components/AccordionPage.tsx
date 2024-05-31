import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import CostTableEntry from "./CostTableEntry";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";

interface AccordionPageProp {
  costTable: CostTableEntry[];
}

const AccordionPage: React.FC<AccordionPageProp> = ({ costTable }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <>
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
          {costTable && costTable.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Min Passengers</th>
                  <th>Max Passengers</th>
                  <th>Cost Per Passenger</th>
                </tr>
              </thead>
              <tbody>
                {costTable.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.location}</td>
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
    </>
  );
};
export default AccordionPage;
