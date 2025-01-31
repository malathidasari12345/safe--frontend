import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Appointments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    trainer: "",
    courseType: "",
    date: "",
    time: "",
    user: "", // assuming user info is available
  });

  // Fetch trainers and courses when the component mounts
  useEffect(() => {
    // Fetch trainers
    axios
      .get("https://safety-backend.vercel.app/api/trainers/")
      .then((response) => {
        setTrainers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });

    // Fetch courses
    axios
      .get("https://safety-backend.vercel.app/api/courses/")
      .then((response) => {
        console.log(response);
        setCourses(response.data); // Set the courses data directly
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.trainer ||
      !formData.courseType ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all the fields");
      return;
    }
    // Submit the form data to the backend API
    axios
      .post("https://safety-backend.vercel.app/api/appointments", formData)
      .then((response) => {
        console.log("Appointment created:", response.data);
        // Reset the form and close modal after successful submission
        setFormData({
          trainer: "",
          courseType: "",
          date: "",
          time: "",
          user: "",
        });
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Book Appointment
      </Button>

      {/* Modal for the Appointment Form */}
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
          <Typography
            id="appointment-modal-title"
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Book Appointment
          </Typography>

          {/* Trainer Select */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="trainer-label">Trainer</InputLabel>
            <Select
              labelId="trainer-label"
              name="trainer"
              value={formData.trainer}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {trainers.map((trainer) => (
                <MenuItem key={trainer._id} value={trainer._id}>
                  {trainer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          {/* Date Input */}
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
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Time Input */}
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
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* User Input */}
          <TextField
            label="User"
            name="user"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.user}
            onChange={handleInputChange}
            required
          />

          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Appointment
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Appointments;
