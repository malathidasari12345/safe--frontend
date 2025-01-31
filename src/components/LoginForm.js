import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://safety-backend.vercel.app/api/users/login",
        formData
      );

      console.log(response);
      console.log(response.data.token);
      console.log(response.data.user.id);
      console.log(response.data.user.email);
      if (response.status === 200) {
        // Save tokens and redirect on success
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("FirstName", response.data.user.FirstName);
        localStorage.setItem("LastName", response.data.user.LastName);
        localStorage.setItem("Email", response.data.user.email);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => navigate("/"), 1000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.log(err);
      // Check if it's an invalid email or password based on the error message
      if (err.response?.data?.message === "Invalid credentials") {
        toast.error("Invalid email address or password. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(err.response?.data?.message || "Invalid credentials!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth="xs">
      {/* Toast Container for notifications */}
      <ToastContainer />
      <Box
        mt={5}
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
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
            Login
          </Button>
        </form>

        {/* Signup redirect link */}
        <Box mt={1}>
          <h4>
            <Link
              to="/forget-password"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <center>Forget Password? click here to reset</center>
            </Link>
          </h4>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Button
              onClick={handleSignupRedirect}
              sx={{ color: "#81C784", "&:hover": { color: "#66BB6A" } }}
            >
              Signup
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
