import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreFooter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubscribe = async () => {
    // Email validation
    if (!email) {
      toast.error("Email is required.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      // Make the POST request to the backend API
      const response = await axios.post(
        "https://safety-backend.vercel.app/api/subscribe/",
        { email }
      );

      // If successful, display success message
      console.log("API Response:", response.data);
      toast.success("Subscription successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      setEmail("");
    } catch (error) {
      // Handle errors if the API call fails
      console.error("Subscription Error:", error);
      toast.error(error.response?.data?.error || "Failed to subscribe.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3,
        p: { xs: 2, sm: 4 },
        borderRadius: 2,
        boxShadow: 3,
        background: "linear-gradient(135deg, #ffffff, #f1f1f1)",
        maxWidth: "90%",
        mx: "auto",
        mt: 4,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Toast Container for notifications */}
      <ToastContainer />

      {/* Left Side Content */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1 }}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Newsletter
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          To get weekly & monthly news, subscribe to our newsletter.
        </Typography>
      </Box>

      {/* Center Input and Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            maxWidth: 300,
            "& .MuiInputBase-root": {
              borderRadius: 30,
            },
          }}
          component={motion.div}
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 30,
            textTransform: "none",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#81C784", // Custom teal green color
            color: "white",
            "&:hover": {
              backgroundColor: "#66BB6A", // Slightly darker shade for hover effect
            },
          }}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </Box>
    </Box>
  );
};

export default PreFooter;
