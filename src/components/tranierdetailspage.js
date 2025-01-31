import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // New state for login modal
  const [formData, setFormData] = useState({
    trainer: "", // This will be set based on the fetched trainer data
    courseType: "",
    date: "",
    time: "",
  });
  const [trainers, setTrainers] = useState([]); // Assuming this will be populated dynamically
  const [courses, setCourses] = useState([]); // Assuming this will be populated dynamically
  const todayDate = format(new Date(), "yyyy-MM-dd"); // Get today's date in "yyyy-MM-dd" format
  const minTime = "09:00"; // 9:00 AM
  const maxTime = "18:00"; // 6:00 PM

  useEffect(() => {
    // Fetch trainer details
    axios
      .get(`https://safety-backend.vercel.app/api/trainers/${id}`)
      .then((response) => {
        setTrainer(response.data);
        setFormData({ ...formData, trainer: response.data._id }); // Set the trainer ID automatically
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trainer details:", err);
        setError("Failed to load trainer details.");
        setLoading(false);
      });

    // Fetch available trainers and courses (for the modal form select options)
    axios
      .get("https://safety-backend.vercel.app/api/trainers")
      .then((response) => setTrainers(response.data))
      .catch((error) => console.error("Error fetching trainers:", error));

    axios
      .get("https://safety-backend.vercel.app/api/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, [id]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle appointment submission
  const handleSubmitbooking = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("Email");

    // Check if user is logged in
    if (!userId || !email) {
      toast.error("Please log in to book an appointment.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check if all fields are filled
    if (
      !formData.trainer ||
      !formData.courseType ||
      !formData.date ||
      !formData.time
    ) {
      toast.error("Please fill all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const appointmentData = {
      ...formData,
      user: userId,
      userEmail: email,
    };

    // Submit the appointment data to the backend
    axios
      .post(
        "https://safety-backend.vercel.app/api/appointments/",
        appointmentData
      )
      .then((response) => {
        console.log("Appointment created:", response.data);
        toast.success("Appointment successfully created!", {
          position: "top-right",
          autoClose: 3000,
        });

        setFormData({ trainer: "", courseType: "", date: "", time: "" });
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        toast.error("Error creating appointment. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  // Handle request button click
  const handleRequestButtonClick = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setShowLoginModal(true); // Show login modal instead of redirecting
      return;
    }

    // If logged in, show the appointment modal
    setOpenModal(true);
  };

  // Handle closing of login modal
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Loading trainer details...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 5, px: "8%" }}>
      <ToastContainer />
      <Grid
        container
        spacing={4}
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
      >
        {/* Trainer Photo Section */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ mb: 3 }}>
            <img
              src={
                trainer?.photo?.secure_url || "https://via.placeholder.com/800"
              }
              alt={trainer?.name || "Trainer Image"}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Paper>
        </Grid>

        {/* Trainer Details Section */}
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {trainer?.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {trainer?.bio}
            </Typography>

            <br />
            <Typography variant="h6">
              <span style={{ fontWeight: "bold" }}>Areas of Expertise:</span>{" "}
              {trainer?.areas_of_expertise?.join(", ")}
            </Typography>
            <Typography variant="h6">
              <span style={{ fontWeight: "bold" }}>Qualification:</span>{" "}
              {trainer?.qualification}
            </Typography>

            <Divider sx={{ mt: 2 }} />

            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Contact Information
                </Typography>
                <Typography variant="body1">
                  Phone: {trainer?.contact?.phone}
                </Typography>
                <Typography variant="body1">
                  Email: {trainer?.contact?.email}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "40px",
                  padding: "30px",
                  backgroundColor: "#81C784",
                  "&:hover": {
                    backgroundColor: "#66BB6A",
                  },
                }}
                onClick={handleRequestButtonClick}
              >
                Book Appointment
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Login Modal */}
      <Modal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "50%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="login-modal-title"
            variant="h6"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Please log in to request an appointment.
          </Typography>

          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                height: "40px",
                padding: "30px",
                backgroundColor: "#81C784",
                "&:hover": {
                  backgroundColor: "#66BB6A",
                },
              }}
              onClick={handleLoginModalClose}
            >
              Go to Login
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Appointment Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="appointment-modal-title"
        aria-describedby="appointment-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "50%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography id="appointment-modal-title" variant="h6" sx={{ mb: 3 }}>
            Book Appointment
          </Typography>

          {/* Trainer is pre-selected, so no dropdown for trainer */}

          {/* Course Type Select */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="courseType-label">Course Type</InputLabel>
            <Select
              labelId="courseType-label"
              name="courseType"
              value={formData.courseType}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {courses.map((course) => (
                <MenuItem key={course._id} value={course.title}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date and Time Inputs */}
          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.date}
            onChange={handleInputChange}
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: todayDate, // Prevent past dates
            }}
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.time}
            onChange={handleInputChange}
            required
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                height: "40px",
                padding: "30px",
                backgroundColor: "#81C784",
                "&:hover": {
                  backgroundColor: "#66BB6A",
                },
              }}
              onClick={handleSubmitbooking}
            >
              Submit Appointment
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TrainerDetailsPage;
