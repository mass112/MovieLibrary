import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ConfirmDialog from "./ConfirmDialog";
import AccountSettingsDialog from "../AccountSettings/AccountSettingsDialog";

const Nav = () => {
  const navigate = useNavigate();
  const currentName = useSelector((state) => state.auth.name);
  const isLogged = useSelector((state) => state.auth.isLoggedIn);
  const logout = useSelector((state) => state.auth.logout);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const smd = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const lgd = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
    setAnchorElUser(null);
  };

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false);
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#88F2F7",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="ML"
              src="/GoGLogoF.png"
              sx={{
                width: smd ? "24px" : mdd ? "48px" : lgd ? "56px" : "64px",
                height: smd ? "24px" : mdd ? "48px" : lgd ? "56px" : "64px",
                display: { xs: "flex" },
                mr: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontSize: smd ? "24px" : mdd ? "48px" : lgd ? "56px" : "64px",
                fontFamily: "'Cormorant SC', sans-serif",
                color: "#4A8487",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Movie Library
            </Typography>

            {isLogged ? (
              <Box
                sx={{
                  flexGrow: 0,
                  flexDirection: "row",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "#427578",
                    borderColor: "#427578",
                    margin: 5,
                    marginY: 0,
                  }}
                  onClick={() => navigate("/list")}
                >
                  My List
                </Button>
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={currentName} sx={{ bgcolor: "#A6E3E9" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        setSettingsDialogOpen(true);
                      }}
                    >
                      <Typography textAlign="center">
                        Account Settings
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setLogoutDialogOpen(true);
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  variant="outlined"
                  sx={{ color: "#427578", borderColor: "#427578" }}
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {logoutDialogOpen && (
        <ConfirmDialog
          title="Logout"
          desc="Logout from your Account"
          open={logoutDialogOpen}
          handleClose={handleLogoutDialogClose}
          onConfirm={() => {
            logout();
            handleLogoutDialogClose();
          }}
        />
      )}
      {settingsDialogOpen && (
        <AccountSettingsDialog
          open={settingsDialogOpen}
          handleClose={handleSettingsDialogClose}
        />
      )}
    </>
  );
};

export default Nav;
