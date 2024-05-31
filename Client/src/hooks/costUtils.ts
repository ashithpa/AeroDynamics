import CostTableEntry from "../components/CostTableEntry";

export function CalculateCost(numberOfPassengers: number, destination: string, costTable: CostTableEntry[]): number {
    const costEntry = costTable.find(entry =>
        numberOfPassengers >= entry.minPassengers &&
        numberOfPassengers <= entry.maxPassengers &&
        (destination === entry.location || entry.location === "Other")
    );

    if (costEntry) {
        return Math.round(numberOfPassengers * costEntry.costPerPassenger * 100) / 100;
    }

    return 0;
}
