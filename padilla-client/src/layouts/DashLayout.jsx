import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Reports", to: "/dashboard/reports", icon: AssessmentIcon },
  { label: "Users", to: "/dashboard/users", icon: PeopleIcon },
];

/* FIXED DRAWER */
const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#fff",
  padding: "0 10px",
  borderRadius: 10,
  marginLeft: 20,
}));

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", background: "#f4f6f8", minHeight: "100vh" }}>
      <CssBaseline />

      {/* TOP BAR */}
      <AppBar position="fixed" sx={{ background: "#111827" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Architecture Dashboard
          </Typography>

          <Search>
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase placeholder="Search projects..." />
          </Search>

          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer variant="persistent" anchor="left" open={open}>
        <Toolbar />
        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;