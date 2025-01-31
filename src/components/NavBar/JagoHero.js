import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import safetyImage from "../../images/ban2.jpg"; // Ensure this is the correct path for the image

const JagoHero = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate("/about");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left side image */}
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: { xs: "200px", sm: "100%" },
          zIndex: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={safetyImage}
          alt="Safety Training"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Right side content */}
      <Container
        maxWidth="lg"
        sx={{
          width: { xs: "100%", sm: "50%" },
          textAlign: { xs: "center", sm: "left" },
          zIndex: 1,
          paddingLeft: { sm: 4 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2rem", md: "3rem" },
            fontWeight: "bold",
            color: "#333",
            marginBottom: 2,
          }}
        >
          Essential Safety Training Programs
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: "normal",
            color: "#81C784",
            marginBottom: 2,
          }}
        >
          First Aid, OSHA Compliance, and Fire Safety Training
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            fontWeight: "light",
            color: "#777",
            marginBottom: 3,
            display: { xs: "none", sm: "block" },
          }}
        >
          Comprehensive training to keep your workplace safe and compliant.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1.5rem" },
            color: "#444",
            marginBottom: 3,
            lineHeight: 1.6,
            display: { xs: "none", sm: "block" }, // Hide on mobile (xs) screens, show on larger screens (sm and up)
          }}
        >
          Our specialized safety training programs focus on ensuring your
          employees are equipped with the skills to handle emergency situations,
          comply with OSHA regulations, and stay prepared for fire-related
          hazards.
        </Typography>

        <Button
          variant="contained"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            padding: { xs: "8px 16px", sm: "10px 20px" },
            backgroundColor: "#81C784",
            color: "white",
            "&:hover": {
              backgroundColor: "#66BB6A",
            },
          }}
          onClick={click}
        >
          Know More About Us
        </Button>
      </Container>
    </Box>
  );
};

export default JagoHero;
