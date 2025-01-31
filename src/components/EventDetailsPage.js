import React, { useEffect, useState } from "react";
import {
  LocationOn,
  AccessTime,
  ConstructionOutlined,
} from "@mui/icons-material";
import { Grid, Typography, Box, Paper, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetailsPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch event data based on the ID
    axios
      .get(`https://safety-backend.vercel.app/api/events/${id}`)
      .then((response) => {
        console.log(response);
        setEvent(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load event details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading event details...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          backgroundImage: `url(${
            event?.image?.secure_url || "https://via.placeholder.com/800"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          {event?.title}
        </Typography>
      </Box>

      {/* Event Details */}
      <Box sx={{ py: 5, px: "8%" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Event Image */}
            <Paper sx={{ mb: 3 }}>
              <img
                src={
                  event?.image?.secure_url || "https://via.placeholder.com/800"
                }
                alt={event?.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold">
              {event?.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {event?.description}
            </Typography>
            <Divider sx={{ mt: 4 }} />

            {/* Date and Location */}
            <Box sx={{ mt: 2 }}>
              <ul>
                <li>
                  <AccessTime sx={{ verticalAlign: "middle", mr: 1 }} />
                  Date: {new Date(event?.startDate).toLocaleDateString()} -{" "}
                  {new Date(event?.endDate).toLocaleDateString()}
                </li>
                <li>
                  <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
                  Location: {event?.location || "Not specified"}
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EventDetailsPage;
