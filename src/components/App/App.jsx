import { Alert, Container, Box, LinearProgress } from "@mui/material";
import { CarsTable } from "../CarsTable";
import { LiveSearch } from "../LiveSearch";
import { DataContext } from "../../context";
import { AddButton } from "../AddButton";
import { columns } from "../../context";
import { getCars } from "../../services/cars";
import { useState, useEffect, useMemo, useCallback } from "react";

const App = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState();
  const [filter, setFilter] = useState("");

  const getElements = useCallback(async () => {
    await getCars().then((resp) => {
      if (!resp.error) {
        setData(resp.cars);
        setError("");
      } else {
        setError(resp.message);
        setData([]);
      }
    });
  }, []);

   const loadingLine = useMemo(
     () => (
       <Box sx={{ width: "100%" }}>
         <LinearProgress />
       </Box>
     ),
     []
   );

  const searchKeywords = useCallback((array, keyword) => {
    keyword = keyword.toLowerCase();

    return array.filter((obj) => {
      return Object.values(obj).some((value) => {
        const stringValue = "" + value;
        if (stringValue.toLowerCase().includes(keyword)) {
          return true;
        }
      });
    });
  }, []);

  useEffect(() => {
    getElements();
  }, [getElements]);

  const errorMsg = useMemo(
    () => (error ? <Alert severity="error">{error}</Alert> : null),
    [error]
  );

  const appContent = useMemo(
    () => (
      <>
        <DataContext.Provider value={{ setData, data, columns }}>
          {errorMsg}
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
          {!data ? (
            loadingLine
          ) : (
            <CarsTable data={filter ? searchKeywords(data, filter) : data} />
          )}
        </DataContext.Provider>
      </>
    ),
    [data, errorMsg, filter, searchKeywords]
  );

  return appContent;
};

export default App;
