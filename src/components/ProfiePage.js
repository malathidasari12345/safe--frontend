import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Card,
  CardContent,
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
  const [appointments, setAppointments] = useState([]);
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

  const userApiUrl = `https://safety-backend.vercel.app/api/users/${userId}`;
  const appointmentsApiUrl = `https://safety-backend.vercel.app/api/appointments/user/${userId}`;
  const updateUrl = `https://safety-backend.vercel.app/api/users/${userId}`;

  // Fetch user data and appointments on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(userApiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserData(userResponse.data);

        // Fetch appointments for the user
        const appointmentResponse = await axios.get(appointmentsApiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setAppointments(appointmentResponse.data);
      } catch (err) {
        setError("Failed to fetch user data or appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userApiUrl, appointmentsApiUrl]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    // Validate on change
    if (name === "phoneNumber") {
      const phoneValid = /^\d{10}$/.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: phoneValid ? "" : "Phone number must be 10 digits.",
      }));
    }

    if (name === "email") {
      const emailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: emailValid ? "" : "Email must be a valid Gmail address.",
      }));
    }
  };

  // Save changes
  const saveChanges = async () => {
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
    <Box>
      {/* Toast Container */}
      <ToastContainer />

      {/* Banner Section with Parallax Effect */}
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateZ(0)",
          position: "relative",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Banner}
          alt="Causes Background"
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

      {/* User Profile and Appointments Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          px: { xs: 2, md: 8 },
          py: 4,
        }}
      >
        {/* Left Column (User Profile Form) */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Update Profile
          </Typography>
          <TextField
            label="First Name"
            name="FirstName"
            value={userData.FirstName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="LastName"
            value={userData.LastName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(formErrors.phoneNumber)}
            helperText={formErrors.phoneNumber}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <Button
            variant="contained"
            color="error"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 30,
              textTransform: "none",
              backgroundColor: "#81C784",
              "&:hover": { backgroundColor: "#66BB6A" },
            }}
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </Box>

        {/* Right Column (Appointments) */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Appointments
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            appointments.map((appointment, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{appointment.courseType}</Typography>
                  <Typography variant="body2">
                    <b>Date : </b>
                    {new Date(appointment.date).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body2">
                    <b>Time : </b>
                    {appointment.time}
                  </Typography>
                  <Typography variant="body2">
                    <b>Status : </b>
                    {appointment.status}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
