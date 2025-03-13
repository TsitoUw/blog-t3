import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "./auth/signout";
import Link from "next/link";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import { Box, FormControl, Input, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <AppBar position="sticky" variant="outlined" color="default">
      <Toolbar>
        <Link href="/">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <NewspaperIcon />
          </IconButton>
        </Link>

        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          The awesome blog
        </Typography>
        <FormControl>
          <Input
            id="text"
            type="search"
            placeholder="Search"
            autoComplete="search"
            fullWidth
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={{ flexGrow: 1 }} />

        {!!session?.user ? (
          <>
            <Link href="/write">
              <Button
                color="inherit"
                startIcon={<HistoryEduOutlinedIcon />}
                sx={{ mr: 2 }}
              >
                Write
              </Button>
            </Link>
            <SignOut />
          </>
        ) : (
          <Link href="/signin">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
