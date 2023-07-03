import { useEffect, useState, createContext } from "react";
import { useHttp } from "../../api/http";
import { useCallback } from "react";
import { CarsTable } from "../CarsTable";
import { LiveSearch } from "../LiveSearch";
import { DataContext } from "../../context";
import { AddButton } from "../AddButton";
import { Container } from "@mui/material";

const App = () => {
  const { request } = useHttp();
  const [data, setData] = useState();
  const [filter, setFilter] = useState();

  const columns = [
    { id: "car", label: "Company", minWidth: 130 },
    { id: "car_model", label: "Model", minWidth: 130 },
    { id: "car_vin", label: "VIN", minWidth: 130 },
    { id: "car_color", label: "Color", minWidth: 130 },
    { id: "car_model_year", label: "Year", minWidth: 130 },
    { id: "price", label: "Price", minWidth: 130 },
    { id: "availability", label: "Availability", minWidth: 130 },
    { id: "actions", label: "Actions", minWidth: 130 },
  ];

  const getElements = useCallback(async () => {
    await request("https://myfakeapi.com/api/cars/").then((data) =>
      setData(data.cars)
    );
  }, [request]);

  const searchKeywords = (array, keyword) => {
    keyword = keyword.toLowerCase();

    return array.filter((obj) => {
      return Object.values(obj).some((value) => {
        const stringValue = "" + value;
        if (stringValue.toLowerCase().includes(keyword)) {
          return true;
        }
      });
    });
  };

  useEffect(() => {
    getElements();
  }, [getElements]);

  return (
    <>
      <DataContext.Provider value={{ setData, data, columns }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LiveSearch setFilter={setFilter} />
          <AddButton />
        </Container>
        <CarsTable data={filter ? searchKeywords(data, filter) : data} />
      </DataContext.Provider>
    </>
  );
};

export default App;
