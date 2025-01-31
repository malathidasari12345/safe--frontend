import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import safetyTrainingImage from "../images/banner1.jpg"; // Replace with an appropriate image for safety training

const SafetyTrainingSection = () => {
  const navigate = useNavigate(); // Initialize the navigate function for routing

  const handleTrainingRedirect = () => {
    navigate("/courses"); // Redirect to the training page
  };

  return (
    <Container
      sx={{
        display: "flex", // Keep it in a row on all screen sizes
        flexDirection: "row", // Ensure row layout on all screen sizes
        my: 4,
        alignItems: "center",
        justifyContent: "space-between", // Ensure content is spread across the row
        gap: 4, // Increased gap between text and image
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "1.25rem", sm: "3rem" }, fontWeight: "bold" }} // Decrease font size on mobile
        >
          Safety Training Courses
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" }, // Decrease font size on mobile
            display: { xs: "none", sm: "block" }, // Hide on mobile and show on larger screens
          }}
        >
          Our comprehensive safety training programs are designed to ensure you
          and your team are equipped with the skills to handle emergencies,
          comply with OSHA regulations, and prevent accidents in the workplace.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }} // Decrease font size on mobile
        >
          Whether it’s first aid, fire safety, or workplace hazard awareness,
          our expert-led training helps you stay prepared for any situation.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#81C784", // You can change this color to match the palette you prefer
            color: "#fff",
            "&:hover": {
              backgroundColor: "#66BB6A", // Darker shade on hover
            },
            fontSize: { xs: "0.75rem", sm: "1rem" }, // Button font size adjusts on smaller screens
          }}
          onClick={handleTrainingRedirect}
        >
          Learn More
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          mt: { xs: 2, sm: 0 }, // Add margin-top on mobile to separate image from text
        }}
      >
        <img
          src={safetyTrainingImage}
          alt="Safety Training"
          style={{
            width: "100%", // Ensures the image takes full width of its container
            height: "auto",
          }}
        />
      </Box>
    </Container>
  );
};

export default SafetyTrainingSection;
