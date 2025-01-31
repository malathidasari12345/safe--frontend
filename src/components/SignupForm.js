import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import the eye icons

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmpassword: "",
  });

  // State to handle visibility of password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let isValid = true;

    // Validate First Name
    if (!formData.FirstName.trim()) {
      toast.error("First Name is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    // Validate Last Name
    if (!formData.LastName.trim()) {
      toast.error("Last Name is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      toast.error("Email is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email address", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    // Validate Phone Number
    if (!formData.phoneNumber.trim()) {
      toast.error("Phone number is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      toast.error("Password is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (!/[A-Za-z]/.test(formData.password)) {
      toast.error("Password must contain at least one letter", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      toast.error("Password must contain at least one number", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (!/[\W_]/.test(formData.password)) {
      toast.error("Password must contain at least one special character", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    // Validate Confirm Password
    if (!formData.confirmpassword) {
      toast.error("Confirm Password is required", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    } else if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (!isValid) return; // Stop the form submission if validation fails

    try {
      const response = await axios.post(
        "https://safety-backend.vercel.app/api/users/register",
        formData
      );

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/verify-otp"), 500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      {/* Toast Container for popups */}
      <ToastContainer />
      <Box
        mt={2}
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            type="tel"
            margin="normal"
          />
          <TextField
            label="Password(contain letter,specialCharacter)"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton
                  position="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            fullWidth
            required
            type={showConfirmPassword ? "text" : "password"} // Toggle between text and password types
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton
                  position="end"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
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
            Signup
          </Button>
        </form>

        <Box mt={2}>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Button
              onClick={handleLoginRedirect}
              sx={{ color: "#81C784", "&:hover": { color: "#66BB6A" } }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
