import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../images/banner1.jpg";
import { motion } from "framer-motion";

const AnimationDetailPage = () => {
  const { id } = useParams(); // Get the animation ID from the URL
  const [animation, setAnimation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch animation details based on ID
  useEffect(() => {
    const fetchAnimationDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://safety-backend.vercel.app/api/animations/${id}`
        );
        setAnimation(response.data); // Set animation details
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch animation details.");
        setLoading(false);
      }
    };

    fetchAnimationDetails();
  }, [id]);

  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Banner}
          alt="Gallery Background"
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
          {animation ? animation.title : "Loading..."}
        </Typography>
      </Box>
      <br />
      <br />
      {/* Main Content */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,

            padding: 3, // Add padding inside the container
            borderRadius: 2, // Rounded corners for aesthetic
          }}
        >
          {/* Video Section (Left) */}
          <Box sx={{ flex: 1 }}>
            <video
              src={animation.secure_url}
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "800px", // Adjust width to your preference
                borderRadius: 2, // Optional: Add rounded corners to the video
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Optional: Add shadow for depth
              }}
            />
          </Box>

          {/* Details Section (Right) */}
          <Box
            sx={{
              flex: 1,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              // Add padding inside the box
              borderRadius: 2, // Optional: Add rounded corners for aesthetic
            }}
          >
            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 3 }}>
              {animation.title}
            </Typography>

            {/* Category */}
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: "text.secondary", // Muted color for category
              }}
            >
              Category: {animation.category}
            </Typography>

            {/* Description */}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {animation.description}
            </Typography>

            {/* Techniques List */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}
              >
                Techniques Required:
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {animation.techniques.map((technique, index) => (
                  <li
                    key={index}
                    style={{ color: "darkslategray", marginBottom: "5px" }}
                  >
                    {technique}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnimationDetailPage;
