import { useEffect, useState } from "react";
import { useHttp } from "../../api/http";
import { useCallback } from "react";
import { CarsTable } from "../CarsTable";
import { LiveSearch } from "../LiveSearch";
import { DataContext } from "../../context";
import { AddButton } from "../AddButton";
import { Container } from "@mui/material";
import { columns } from "../../context";

const App = () => {
  const { request } = useHttp();
  const [data, setData] = useState();
  const [filter, setFilter] = useState();

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
