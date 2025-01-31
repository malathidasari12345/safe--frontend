import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../images/banner1.jpg";

const Trainers = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://safety-backend.vercel.app/api/trainers/")
      .then((response) => {
        setTrainersData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load trainers");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading trainers...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  const handleCardClick = (id) => {
    navigate(`/tranier-details/${id}`);
  };

  const handleAppointmentClick = (id) => {
    navigate(`/book-appointment/${id}`);
  };

  return (
    <>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: "200px", sm: "250px", md: "300px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Banner}
          alt="Trainers Background"
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
          Trainers
        </Typography>
      </Box>

      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Our Trainers
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "lighter", marginTop: 2 }}>
            Meet our talented trainers and get to know their expertise
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {trainersData.map((trainer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleCardClick(trainer._id)}
              >
                {/* Trainer Image */}
                <Box
                  sx={{ position: "relative", height: 200, overflow: "hidden" }}
                >
                  <img
                    src={
                      trainer.photo?.secure_url ||
                      "https://via.placeholder.com/800"
                    }
                    alt={trainer.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Trainer Content */}
                <CardContent
                  sx={{
                    flexGrow: 1, // Allows content to grow and push the footer section to the bottom
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: 1.5,
                      fontSize: "1.5rem",
                      "&:hover": { color: "#81C784" },
                    }}
                  >
                    {trainer.name}
                  </Typography>

                  {/* Areas of Expertise */}
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <strong>Areas of Expertise:</strong>
                    <ul>
                      {trainer.areas_of_expertise.map((area, idx) => (
                        <li key={idx}>{area}</li>
                      ))}
                    </ul>
                  </Typography>

                  {/* Add Appointment Button */}
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#81C784", // Normal color
                      "&:hover": {
                        backgroundColor: "#66BB6A", // Hover color
                      },
                    }}
                    onClick={() => handleAppointmentClick(trainer._id)}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Trainers;
