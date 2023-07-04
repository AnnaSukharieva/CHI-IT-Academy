import {
  FilledInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

export const LiveSearch = ({ setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
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
    );
};

LiveSearch.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
