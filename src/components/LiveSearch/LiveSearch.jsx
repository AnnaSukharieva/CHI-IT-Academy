import {
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";

export const LiveSearch = ({ setFilter }) => {
  const handleChange = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const search = useMemo(
    () => (
      <FormControl sx={{ m: 1, width: "300px" }} variant="filled">
        <InputLabel htmlFor="search">Search</InputLabel>
        <FilledInput
          id="search"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    ),
    [handleChange]
  );

  return search;
};

LiveSearch.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
