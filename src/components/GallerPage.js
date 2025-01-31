import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../images/banner1.jpg";

const GalleryPage = () => {
  const [animations, setAnimations] = useState([]);
  const [filteredAnimations, setFilteredAnimations] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All"); // State for category filtering
  const navigate = useNavigate();

  // Fetch animations from backend
  useEffect(() => {
    const fetchAnimations = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(
          "https://safety-backend.vercel.app/api/animations/"
        );
        console.log(response);
        setAnimations(response.data);
        setFilteredAnimations(response.data); // Initialize filtered animations
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching animations:", err);
        setError("Failed to load animations. Please try again later.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchAnimations();
  }, []);

  // Filter animations based on selected category
  useEffect(() => {
    if (category === "All") {
      setFilteredAnimations(animations);
    } else {
      const filtered = animations.filter(
        (animation) => animation.category === category
      );
      setFilteredAnimations(filtered);
    }
  }, [category, animations]);

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
          portfolio
        </Typography>
      </Box>

      {/* Filter Dropdown */}
      <Box
        sx={{
          display: "flex", // Flexbox layout
          justifyContent: "space-between", // Space between text and form
          alignItems: "center", // Center align vertically
          textAlign: "center",
          py: 4,
          px: { xs: 2, md: 4 },
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile, horizontally on larger screens
        }}
      >
        {/* Left Side: Text and Subtext */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              textAlign: { xs: "center", md: "left" }, // Center align on small screens, left align on larger screens
              fontSize: { xs: "2rem", md: "2rem" }, // Smaller text on mobile devices
            }}
          >
            Our Creations
          </Typography>

          {/* Hide the subtext on mobile devices */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", md: "left" }, // Center align subtext to match the heading
              display: { xs: "none", md: "block" }, // Hide on small screens (xs)
            }}
          >
            Explore a world of stunning 3D animations.
          </Typography>
        </Box>

        {/* Right Side: Form */}
        <FormControl
          variant="outlined"
          sx={{
            minWidth: 300,
            mb: 4,
            flex: 1,
            display: "flex",
            justifyContent: "flex-end", // Align form to the right
          }}
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Wildlife">Wildlife</MenuItem>
            <MenuItem value="Mythical Creatures">Mythical Creatures</MenuItem>
            <MenuItem value="Pets">Pets</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Gallery Cards */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
        }}
      >
        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading... Please wait</Typography>
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : filteredAnimations.length === 0 ? (
          // No Animations Found for Selected Category
          <Typography textAlign="center" sx={{ color: "text.secondary" }}>
            No animations are available in this category.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredAnimations.map((animation, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                      transform: "scale(1.02)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Video Section */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <video
                      src={animation.secure_url}
                      autoPlay
                      loop
                      muted
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* Card Content */}
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {animation.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                      }}
                    >
                      {animation.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/portfolio/${animation._id}`)}
                    >
                      Know More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default GalleryPage;
