import { createContext } from "react";

export const DataContext = createContext();

export const columns = [
  { id: "car", label: "Company", minWidth: 130 },
  { id: "car_model", label: "Model", minWidth: 130 },
  { id: "car_vin", label: "VIN", minWidth: 130 },
  { id: "car_color", label: "Color", minWidth: 130 },
  { id: "car_model_year", label: "Year", minWidth: 130 },
  { id: "price", label: "Price", minWidth: 130 },
  { id: "availability", label: "Availability", minWidth: 130 },
  { id: "actions", label: "Actions", minWidth: 130 },
];
