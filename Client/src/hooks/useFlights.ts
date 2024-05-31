import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Flight from "../components/Flight";
import { baseUrl } from "../Config/config"; // Assuming baseUrl is defined in a separate file
import CostTableEntry from "../components/CostTableEntry";
import { CalculateCost } from "./costUtils";

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [costTable, setCostTable] = useState<CostTableEntry[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [refreshTable, setRefreshTable] = useState<boolean>(false); // State variable for refreshing table

  useEffect(() => {
    loadFlights();
    loadCostTable();
  }, [refreshTable]); // Include refreshTable in dependency array

  const loadFlights = async () => {
    try {
      const response = await axios.get<Flight[]>(`${baseUrl}/api/flights`);
      setFlights(response.data);
    } catch (error) {
      alert("Error loading flights.");
    }
  };

  const loadCostTable = async () => {
    try {
      const response = await axios.get<CostTableEntry[]>(
        `${baseUrl}/api/passengercosts`
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

  // const calculateCost = (flight: Flight): number => {
  //   const costEntry = costTable.find(
  //     (entry) =>
  //       flight.numberOfPassengers >= entry.minPassengers &&
  //       flight.numberOfPassengers <= entry.maxPassengers &&
  //       flight.destination === entry.location
  //   );

  //   if (costEntry) {
  //     const cost = flight.numberOfPassengers * costEntry.costPerPassenger;
  //     const roundedCost = Math.round(cost * 100) / 100;
  //     return roundedCost;
  //   }

  //   return 0;
  // };

  const calculateCost = (flight: Flight): number => {
    return CalculateCost(
      flight.numberOfPassengers,
      flight.destination,
      costTable
    );
  };

  const saveChanges = async (id: number) => {
    const flight = flights.find((f) => f.id === id);
    if (flight) {
      flight.cost = calculateCost(flight);
      try {
        await axios.put(`${baseUrl}/api/flights/${id}`, flight);
        alert("Flight updated successfully.");
        setRefreshTable((prev) => !prev); // Toggle refreshTable to trigger table refresh
      } catch (error) {
        alert("Error updating flight.");
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
      if (fileType !== "csv" && fileType !== "json") {
        alert("Please select a CSV or JSON file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const fileType = file.name.split(".").pop()?.toLowerCase();
    if (fileType !== "csv" && fileType !== "json") {
      alert("Please select a CSV or JSON file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${baseUrl}/api/flights/upload`, formData);
      setFile(null); // Clear the file input after successful upload
      alert("Flights uploaded successfully.");
      setRefreshTable((prev) => !prev); // Toggle refreshTable to trigger table refresh
    } catch (error) {
      alert("Error uploading flights.");
    }
  };

  // type CsvRow = {
  //   [key: string]: string;
  //   FlightNo: string;
  //   AircraftRegistrationNo: string;
  //   Destination: string;
  //   Passengers: string;
  // };

  // type JsonData = {
  //   FlightNo: string;
  //   AircraftRegistrationNo: string;
  //   Destination: string;
  //   Passengers: string;
  // }[];

  // const uploadFile = async () => {
  //   if (!file) {
  //     alert("Please select a file to upload.");
  //     return;
  //   }

  //   const fileType = file.name.split(".").pop()?.toLowerCase();
  //   if (fileType !== "csv" && fileType !== "json") {
  //     alert("Please select a CSV or JSON file.");
  //     return;
  //   }

  //   const requiredColumns = ["FlightNo", "AircraftRegistrationNo", "Destination", "Passengers"];

  //   const validateFile = (data: CsvRow[] | JsonData): boolean => {
  //     if (data.length === 0) return false;

  //     const headers = Object.keys(data[0]);
  //     return requiredColumns.every(col => headers.includes(col));
  //   };

  //   const readFile = (file: File): Promise<CsvRow[] | JsonData> => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         try {
  //           const content = event.target?.result;
  //           if (fileType === "csv" && typeof content === "string") {
  //             const rows = content.split("\n");
  //             const headers = rows[0].split(",");
  //             const parsedData = rows.slice(1).map(row => {
  //               const values = row.split(",");
  //               return headers.reduce((obj, header, index) => {
  //                 obj[header.trim()] = values[index]?.trim();
  //                 return obj;
  //               }, {} as CsvRow);
  //             });
  //             resolve(parsedData);
  //           } else if (fileType === "json" && typeof content === "string") {
  //             const parsedData = JSON.parse(content) as JsonData;
  //             resolve(parsedData);
  //           } else {
  //             reject("Unsupported file type or invalid content.");
  //           }
  //         } catch (error) {
  //           reject("Error parsing file content.");
  //         }
  //       };
  //       reader.onerror = () => reject("Error reading file.");
  //       reader.readAsText(file);
  //     });
  //   };

  //   try {
  //     const data = await readFile(file);
  //     if (!validateFile(data)) {
  //       alert("The file is missing required columns.");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     await axios.post(`${baseUrl}/api/flights/upload`, formData);
  //     setFile(null);
  //     alert("Flights uploaded successfully.");
  //     setRefreshTable(prev => !prev);
  //   } catch (error) {
  //     alert(error || "Error uploading flights.");
  //   }
  // };

  const deleteFlight = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/api/flights/${id}`);
      setFlights(flights.filter((flight) => flight.id !== id));
      alert("Flight deleted successfully.");
      setRefreshTable((prev) => !prev); // Toggle refreshTable to trigger table refresh
    } catch (error) {
      alert("Error deleting flight.");
    }
  };

  return {
    flights,
    costTable,
    loadFlights,
    handlePassengerChange,
    calculateCost,
    saveChanges,
    handleFileChange,
    uploadFile,
    deleteFlight,
  };
};
