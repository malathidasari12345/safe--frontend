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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Menu as MenuIcon,
  Event as EventIcon,
  Campaign as CausesIcon,
  Newspaper as NewsIcon,
  Info as InfoIcon,
  PhotoLibrary as GalleryIcon,
  MailOutline as ContactIcon,
  VolunteerActivism as DonateIcon,
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
// import HealthLogo from "../../health.png";

const NavMain = () => {
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <ToastContainer />

      <AppBar position="sticky" sx={{ backgroundColor: "#81C784" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              SafteyEdge
            </h1>
          </Box>

          {/* Main Navigation */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              marginLeft: "100px",
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
            >
              Home
            </Button>
            <Button
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
              onClick={() => navigate("/courses")}
            >
              Courses
            </Button>
            <Button
              component={Link}
              to="/traniers"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effetraniersct
              }}
            >
              Traniers
            </Button>
            <Button
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
              onClick={() => navigate("/blogs")}
            >
              Blogs
            </Button>
            <Button
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
              onClick={() => navigate("/resources")}
            >
              Resources
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/contact"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginRight: "20px",
                "&:hover": { color: "black" }, // Hover effect
              }}
            >
              Contact
            </Button>
            <Button
              component={Link}
              to="/faq"
              sx={{
                color: "white",
                fontWeight: "bold",
                "&:hover": { color: "black" }, // Hover effect
              }}
            >
              FAQ
            </Button>
          </Box>

          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {user ? (
              <Box sx={{ marginLeft: 2 }}>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "black", // Initial background color
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "black", // Hover background color
                      color: "white", // Text color on hover
                    },
                  }}
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                >
                  Welcome, {user.FirstName}
                </Button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={() => setAnchorElUser(null)}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElUser(null);
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    color: "black", // Text color
                    backgroundColor: "white",
                    fontWeight: "bold",
                    marginLeft: 2,
                    marginRight: 4,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "black", // Hover background color
                      color: "white", // Text color on hover
                    },
                  }}
                >
                  Signup
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "black", // Text color
                    backgroundColor: "white", // Initial background color
                    fontWeight: "bold",
                    marginLeft: 2,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "black", // Hover background color
                      color: "white", // Text color on hover
                    },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>

          {/* Drawer for mobile */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: "white", fontSize: "50px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#81C784",
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <HomeIcon
              sx={{
                marginRight: 1,

                color: "white",
                fontSize: "2rem", // Increase icon size
                "&:hover": { color: "black" }, // Hover color for the icon
              }}
            />
            <ListItemText
              primary="Home"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" }, // Increase text font size
                "&:hover": { color: "black" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/courses"
            onClick={handleDrawerToggle}
          >
            <GalleryIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "black" },
              }}
            />
            <ListItemText
              primary="courses"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "black" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/traniers"
            onClick={handleDrawerToggle}
          >
            <GalleryIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "#81C784" },
              }}
            />
            <ListItemText
              primary="trainers"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "black" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/blogs"
            onClick={handleDrawerToggle}
          >
            <GalleryIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "#81C784" },
              }}
            />
            <ListItemText
              primary="blogs"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "black" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/resources"
            onClick={handleDrawerToggle}
          >
            <GalleryIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "#81C784" },
              }}
            />
            <ListItemText
              primary="resources"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "black" },
              }}
            />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/about"
            onClick={handleDrawerToggle}
          >
            <InfoIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "black" },
              }}
            />
            <ListItemText
              primary="About"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "#81C784" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/contact"
            onClick={handleDrawerToggle}
          >
            <ContactIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "black" },
              }}
            />
            <ListItemText
              primary="Contact"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "#81C784" },
              }}
            />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/faq"
            onClick={handleDrawerToggle}
          >
            <HelpOutlineIcon
              sx={{
                marginRight: 1,
                color: "white",
                fontSize: "2rem",
                "&:hover": { color: "black" },
              }}
            />
            <ListItemText
              primary="FAQ"
              sx={{
                color: "white",
                "& span": { fontSize: "1.25rem" },
                "&:hover": { color: "#81C784" },
              }}
            />
          </ListItem>

          {user ? (
            <>
              <ListItem
                button
                component={Link}
                to="/profile"
                onClick={handleDrawerToggle}
              >
                <ProfileIcon
                  sx={{
                    marginRight: 1,
                    color: "white",
                    fontSize: "2rem",
                    "&:hover": { color: "black" },
                  }}
                />
                <ListItemText
                  primary="Profile"
                  sx={{
                    color: "white",
                    "& span": { fontSize: "1.25rem" },
                    "&:hover": { color: "black" },
                  }}
                />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <LogoutIcon
                  sx={{
                    marginRight: 1,
                    color: "white",
                    fontSize: "2rem",
                    "&:hover": { color: "black" },
                  }}
                />
                <ListItemText
                  primary="Logout"
                  sx={{
                    color: "white",
                    "& span": { fontSize: "1.25rem" },
                    "&:hover": { color: "black" },
                  }}
                />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/signup"
                onClick={handleDrawerToggle}
              >
                <PersonAddIcon
                  sx={{
                    marginRight: 1,
                    color: "white",
                    fontSize: "2rem",
                    "&:hover": { color: "#81C784" },
                  }}
                />
                <ListItemText
                  primary="Signup"
                  sx={{
                    color: "white",
                    "& span": { fontSize: "1.25rem" },
                    "&:hover": { color: "#81C784" },
                  }}
                />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleDrawerToggle}
              >
                <LoginIcon
                  sx={{
                    marginRight: 1,
                    color: "white",
                    fontSize: "2rem",
                    "&:hover": { color: "#81C784" },
                  }}
                />
                <ListItemText
                  primary="Login"
                  sx={{
                    color: "white",
                    "& span": { fontSize: "1.25rem" },
                    "&:hover": { color: "#81C784" },
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavMain;
