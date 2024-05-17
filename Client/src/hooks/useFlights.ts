// useFlights.ts
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Flight from "../components/Flight";


interface CostTableEntry {
  minPassengers: number;
  maxPassengers: number;
  costPerPassenger: number;
}

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [costTable, setCostTable] = useState<CostTableEntry[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadFlights();
    loadCostTable();
  }, []);

  const loadFlights = async () => {
    try {
      const response = await axios.get<Flight[]>(
        "http://localhost:5000/api/flights"
      );
      setFlights(response.data);
    } catch (error) {
      alert("Error loading flights.");
    }
  };

  const loadCostTable = async () => {
    try {
      const response = await axios.get<CostTableEntry[]>(
        "http://localhost:5000/api/flights/PassengerCost"
      );
      setCostTable(response.data);
    } catch (error) {
      alert("Error loading cost table.");
    }
  };

  const handlePassengerChange = (
    id: number,
    value: number | string,
    field: string
  ) => {
    const updatedFlights = flights.map((flight) =>
      flight.id === id ? { ...flight, [field]: value } : flight
    );
    setFlights(updatedFlights);
  };

  const calculateCost = (flight: Flight): number => {
    const costEntry = costTable.find(
      (entry) =>
        flight.numberOfPassengers >= entry.minPassengers &&
        flight.numberOfPassengers <= entry.maxPassengers
    );
  
    if (costEntry) {
      const cost = flight.numberOfPassengers * costEntry.costPerPassenger;
      const roundedCost = Math.round(cost * 100) / 100; // Round off to 2 decimal places
      return roundedCost; // Return the rounded cost as a number
    }
  
    return 0; // Default cost if entry not found in cost table
  };

  const saveChanges = async (id: number) => {
    const flight = flights.find((f) => f.id === id);
    if (flight) {
      flight.cost = calculateCost(flight);
      try {
        await axios.put(`http://localhost:5000/api/flights/${id}`, flight);
        alert("Flight updated successfully.");
      } catch (error) {
        alert("Error updating flight.");
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/api/flights/upload", formData);
      loadFlights(); // Load flights after uploading
      // Clear the file input by resetting its value

      alert("Flights uploaded successfully.");
    } catch (error) {
      alert("Error uploading flights.");
    }
  };

  return {
    flights,
    loadFlights,
    handlePassengerChange,
    calculateCost,
    saveChanges,
    handleFileChange,
    uploadFile,
  };
};
