import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://safety-backend.vercel.app/api/users/verify-otp",
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message || "OTP verified successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Toast Container for notifications */}
      <ToastContainer />
      <Box
        mt={5}
        sx={{
          padding: 3, // Padding inside the box
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Adding box shadow
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "auto", // Ensures the height adjusts to content
        }}
      >
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#81C784",
              "&:hover": { backgroundColor: "#66BB6A" },
            }}
            fullWidth
          >
            Verify
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VerifyOtp;
