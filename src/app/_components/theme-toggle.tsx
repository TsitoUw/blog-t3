"use client";

import { useColorScheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    console.log({ mode });
  }, [mode]);


  return (
    <Button
      onClick={() => {
        setMode(mode == "dark" ? "light" : "dark");
      }}
    >
      change theme
    </Button>
  );
}

export default ThemeToggle;
