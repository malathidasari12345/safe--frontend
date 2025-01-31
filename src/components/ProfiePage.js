import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../images/banner1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    phoneNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState({ phoneNumber: "", email: "" });
  const navigate = useNavigate();

  // Fetch userId from localStorage
  const userId = localStorage.getItem("userId");
  if (!userId) {
    // Redirect to login if userId is not available
    navigate("/login");
  }

  // Example API endpoints (replace :id with userId dynamically)
  const apiUrl = `https://safety-backend.vercel.app/api/users/${userId}`;
  const updateUrl = `https://safety-backend.vercel.app/api/users/${userId}`;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    // Validate on change
    if (name === "phoneNumber") {
      // Check if phone number has 10 digits
      const phoneValid = /^\d{10}$/.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: phoneValid ? "" : "Phone number must be 10 digits.",
      }));
    }

    if (name === "email") {
      // Check if email contains @gmail.com
      const emailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: emailValid ? "" : "Email must be a valid Gmail address.",
      }));
    }
  };

  // Save changes
  const saveChanges = async () => {
    // Check if there are any validation errors before saving
    if (formErrors.phoneNumber || formErrors.email) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(updateUrl, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccessMessage("User details updated successfully!");
      toast.success("User details updated successfully!");
    } catch (err) {
      setError("Failed to update user details.");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 5, px: "8%" }}>
      {/* Profile Banner */}
      <Box
        sx={{
          height: { xs: "200px", sm: "250px", md: "300px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Banner}
          alt="News Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          User Profile
        </Typography>
      </Box>

      {/* Profile Form */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper sx={{ p: 3, width: "100%", maxWidth: "600px", boxShadow: 3 }}>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            Update Your Details
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {/* <CircularProgress /> */}
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="FirstName"
                    variant="outlined"
                    name="FirstName"
                    value={userData.FirstName}
                    onChange={handleChange}
                    sx={{ boxShadow: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LastName"
                    variant="outlined"
                    name="LastName"
                    value={userData.LastName}
                    onChange={handleChange}
                    sx={{ boxShadow: 2 }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    sx={{ boxShadow: 2 }}
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    sx={{ boxShadow: 2 }}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#81C784",
                    boxShadow: 3,
                    "&:hover": { backgroundColor: "#66BB6A" },
                  }}
                  onClick={saveChanges}
                  disabled={
                    loading || formErrors.phoneNumber || formErrors.email
                  }
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>

      {/* Toast Container for Success/Error */}
      <ToastContainer />
    </Box>
  );
};

export default ProfilePage;
