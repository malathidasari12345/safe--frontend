import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Password validation regex: must contain at least one letter, one number, and one special character
const passwordValidationRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Validate the password
  const validatePassword = (password) => {
    if (!passwordValidationRegex.test(password)) {
      toast.error(
        "Password must contain at least one letter, one number, and one special character."
      );
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password with regex
    if (!validatePassword(password)) {
      return; // Validation failure will already show a toast, so we return here
    }

    try {
      const response = await axios.post(
        `https://safety-backend.vercel.app/api/users/reset-password/${resetToken}`,
        { password, confirmpassword }
      );
      toast.success(response.data.message);
      // navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Typography variant="h4">Reset Password</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* New Password Field */}
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Grid>

          {/* Confirm Password Field */}
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#81C784",
                "&:hover": { backgroundColor: "#66BB6A" },
              }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Container>
  );
};

export default ResetPassword;
