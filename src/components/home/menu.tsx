import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";


function Menu() {
  return (
    <div className="space-y-4 border-b p-4">
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Tags
        </Typography>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Articles
        </Typography>
        <FormControl size="small">
          <InputLabel id="filter-labelr">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            label="filter"
            defaultValue={"all"}
            sx={{ minWidth: "120px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="following">Following</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Menu;
