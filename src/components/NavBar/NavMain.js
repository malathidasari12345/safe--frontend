import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Book as BookIcon,
  LibraryBooks as LibraryBooksIcon,
  Home as HomeIcon,
  Person as ProfileIcon,
  ExitToApp as LogoutIcon,
  PersonAdd as PersonAddIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavMain = () => {
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchUser(userId, token);
    }
  }, []);

  const fetchUser = async (userId, token) => {
    try {
      const { data } = await axios.get(
        `https://safety-backend.vercel.app/api/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await axios.get("https://safety-backend.vercel.app/api/users/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <ToastContainer />
      <AppBar position="sticky" sx={{ backgroundColor: "#81C784" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ color: "white", cursor: "pointer" }} onClick={() => navigate("/")}>
              SafteyEdge
            </h1>
          </Box>

          {/* Main Navigation (Desktop) */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1, marginLeft: "100px" }}>
            <Button component={Link} to="/" sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }}>Home</Button>
            <Button sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }} onClick={() => navigate("/courses")}>Courses</Button>
            <Button sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }} onClick={() => navigate("/trainers")}>Trainers</Button>
            <Button sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }} onClick={() => navigate("/blogs")}>Blogs</Button>
            <Button sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }} onClick={() => navigate("/resources")}>Resources</Button>
            <Button component={Link} to="/about" sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }}>About</Button>
            <Button component={Link} to="/contact" sx={{ color: "white", fontWeight: "bold", marginRight: "20px", "&:hover": { color: "black" } }}>Contact</Button>
            <Button component={Link} to="/faq" sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "black" } }}>FAQ</Button>
          </Box>

          {/* User Actions (Login/Signup or Profile) */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            {user ? (
              <Box sx={{ marginLeft: 2 }}>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "black", color: "white" },
                  }}
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                >
                  Welcome, {user.FirstName}
                </Button>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
                  <MenuItem component={Link} to="/profile" onClick={() => setAnchorElUser(null)}>Profile</MenuItem>
                  <MenuItem onClick={() => { setAnchorElUser(null); handleLogout(); }}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button component={Link} to="/signup" sx={{ color: "black", backgroundColor: "white", fontWeight: "bold", marginLeft: 2, marginRight: 4, padding: 1, "&:hover": { backgroundColor: "black", color: "white" } }}>Signup</Button>
                <Button component={Link} to="/login" sx={{ color: "black", backgroundColor: "white", fontWeight: "bold", marginLeft: 2, padding: 1, "&:hover": { backgroundColor: "black", color: "white" } }}>Login</Button>
              </>
            )}
          </Box>

          {/* Drawer for Mobile */}
          <IconButton sx={{ display: { xs: "flex", sm: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: "white", fontSize: "50px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} sx={{ "& .MuiDrawer-paper": { backgroundColor: "#81C784" } }}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <HomeIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "black" } }} />
            <ListItemText primary="Home" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/courses" onClick={handleDrawerToggle}>
            <SchoolIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
            <ListItemText primary="Courses" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/trainers" onClick={handleDrawerToggle}>
            <PersonIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
            <ListItemText primary="Trainers" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/blogs" onClick={handleDrawerToggle}>
            <BookIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
            <ListItemText primary="Blogs" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/resources" onClick={handleDrawerToggle}>
            <LibraryBooksIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
            <ListItemText primary="Resources" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
            <HelpOutlineIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "black" } }} />
            <ListItemText primary="About" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
            <HelpOutlineIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "black" } }} />
            <ListItemText primary="Contact" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
          </ListItem>

          {user ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={handleDrawerToggle}>
                <ProfileIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "black" } }} />
                <ListItemText primary="Profile" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <LogoutIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "black" } }} />
                <ListItemText primary="Logout" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "black" } }} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/signup" onClick={handleDrawerToggle}>
                <PersonAddIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
                <ListItemText primary="Signup" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "#81C784" } }} />
              </ListItem>
              <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                <LoginIcon sx={{ marginRight: 1, color: "white", fontSize: "2rem", "&:hover": { color: "#81C784" } }} />
                <ListItemText primary="Login" sx={{ color: "white", "& span": { fontSize: "1.25rem" }, "&:hover": { color: "#81C784" } }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavMain;
