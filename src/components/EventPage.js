import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { LocationOn, AccessTime } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://safety-backend.vercel.app/api/events/")
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading events...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  return (
    <>
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/focused-indian-college-student-sitting-attentively-classroom-engaged-academic-activities_1015182-39428.jpg?w=1060')",
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
          Events
        </Typography>
      </Box>

      <Box sx={{ py: 5, px: "8%" }}>
        <Grid container spacing={4} justifyContent="center">
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
              <Link
                to={`/event-details/${event._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Paper sx={{ overflow: "hidden", borderRadius: "8px", mb: 2 }}>
                  <img
                    src={event.image.secure_url}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
                <Typography variant="h5" fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                  color="textSecondary"
                >
                  {event.description.slice(0, 100)}...
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <AccessTime sx={{ color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1 }}
                    color="text.secondary"
                  >
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LocationOn sx={{ color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1 }}
                    color="text.secondary"
                  >
                    Location: {event.location || "TBA"}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default EventsPage;
