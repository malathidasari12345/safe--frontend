import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "./NavBar/HeroBanner";
import JagoHero from "./NavBar/JagoHero";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
// import IndiaMap from "../images/go.jpg";
import AnimalAnimationSection from "./animal";
import SafetyTrainingSection from "./animal";
import ReviewsPage from "./review";

const Home = () => {
  const [cardData, setCardData] = useState([]);

  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "https://safety-backend.vercel.app/api/courses/"
        );
        console.log(response);
        setCardData(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "https://safety-backend.vercel.app/api/blog/"
        );
        setGalleryImages(response.data.slice(0, 3)); // Only take the first 3
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    fetchGallery();
  }, []);

  const handleCardClick = (id, type) => {
    if (type === "news") {
      navigate(`/news-details/${id}`);
    } else if (type === "courses") {
      navigate(`/course-details/${id}`);
    } else if (type === "blogs") {
      navigate(`/blog-details/${id}`);
    }
  };

  return (
    <>
      <Box>
        {/* Hero Section */}

        <HeroBanner />
        <br></br>

        <JagoHero />

        <Container sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            <center style={{ fontWeight: "bold" }}>Top-Rated Courses</center>
          </Typography>
          <br />
          <Grid container spacing={3}>
            {cardData.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  onClick={() => handleCardClick(service._id, "courses")}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column", // Stack content vertically
                    height: "100%", // Full height available in grid
                    justifyContent: "space-between", // Space out content so progress bar stays at the bottom
                  }}
                >
                  <CardMedia
                    component="img"
                    image={service.icon}
                    alt={service.title}
                    height="200"
                    width="100%" // Ensure the image takes full width
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    {/* Divider and duration/price */}
                    <Divider sx={{ my: 2 }} />{" "}
                    {/* Divider to separate the content */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Duration: {service.duration}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Price: ${service.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <br></br>
        <SafetyTrainingSection />
        <br></br>
        {/* Gallery Section */}
        <Container sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            <center style={{ fontWeight: "bold" }}>Featured Blogs</center>
          </Typography>
          <Grid container spacing={3}>
            {galleryImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  onClick={() => handleCardClick(image._id, "blogs")}
                  sx={{ cursor: "pointer" }}
                >
                  <CardMedia
                    component="img"
                    src={image.image.secure_url} // Assuming 'secure_url' is the image URL
                    alt={`Gallery Image ${index + 1}`}
                    height="200"
                    sx={{ width: "100%" }} // Ensures the image stretches across the card's width
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {image.title}{" "}
                      {/* Assuming 'title' is the text you want to display */}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3, // Limits to 3 lines
                      }}
                    >
                      {image.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <ReviewsPage />
    </>
  );
};

export default Home;
