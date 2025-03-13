import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "./auth/signout";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="outlined" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NewspaperIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The awesome blog
          </Typography>
          {!!session?.user ? (
            <SignOut />
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
