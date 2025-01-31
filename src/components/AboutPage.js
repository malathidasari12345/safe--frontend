import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
  CircularProgress,
  Divider,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Banner from "../images/banner1.jpg";
import image from "../images/ab.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
const AboutPage = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    trainer: "",
    courseType: "",
    date: "",
    time: "",
  });
  const [courses, setCourses] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const todayDate = format(new Date(), "yyyy-MM-dd"); // Get today's date in "yyyy-MM-dd" format
  const minTime = "09:00"; // 9:00 AM
  const maxTime = "18:00"; // 6:00 PM
  const handleBookAppointment = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setShowLoginModal(true); // Show login modal if user is not logged in
    } else {
      setOpenModal(true); // Otherwise open the booking modal
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCardClick = (id) => {
    navigate(`/tranier-details/${id}`);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    // Fetch trainers and courses when the component mounts
    const fetchTrainers = async () => {
      try {
        const response = await fetch(
          "https://safety-backend.vercel.app/api/trainers/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trainers data.");
        }
        const data = await response.json();
        setTrainers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://safety-backend.vercel.app/api/courses/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses data.");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchTrainers();
    fetchCourses();
  }, []);

  const timelineEvents = [
    { year: "2015", event: "Founded the organization" },
    { year: "2017", event: "Opened the first training center" },
    { year: "2019", event: "Expanded to new cities" },
    { year: "2023", event: "Launched online training platform" },
    { year: "2024", event: "Certified over 10,000 individuals" },
  ];

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <Box>
        {/* Header section */}
        <Box
          sx={{
            height: { xs: "200px", md: "300px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateZ(0)",
            position: "relative",
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={Banner}
            alt="Causes Background"
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
            About
          </Typography>
        </Box>
        {/* Main content */}
        <Box
          sx={{
            my: 6,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flex: 1,
              paddingRight: { xs: 0, sm: 4 },
              mb: { xs: 4, sm: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                marginTop: "60px",
                marginLeft: "10px",
              }}
            >
              Explore the World of Safety Training
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, marginLeft: "10px" }}
            >
              Step into a world where safety is prioritized. Our training
              programs cover everything from workplace hazards to emergency
              response techniques, ensuring a secure environment for all.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: "normal",
                color: "#81C784",
                marginBottom: 2,
                marginLeft: "10px",
              }}
            >
              Equip yourself with essential skills to stay safe and prepared.
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                fontWeight: "light",
                color: "#777",
                marginBottom: 3,
                marginLeft: "10px",
              }}
            >
              Training that saves lives and prevents accidents.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "#444",
                marginBottom: 3,
                marginLeft: "10px",
              }}
            >
              Perfect for employees, managers, and organizations looking to
              foster a culture of safety. Our programs provide hands-on training
              to handle emergencies and minimize risks effectively.
            </Typography>
            <center>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#81C784",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#81C784",
                  },
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
                onClick={handleBookAppointment}
              >
                Book A Appointment
              </Button>
            </center>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img
              src={image}
              alt="Safety Training"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
        {/* Timeline Section */}
        <Container sx={{ my: 0, backgroundColor: "#f5f5f5", padding: "10px" }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
          >
            Our History
          </Typography>
          <Box sx={{ position: "relative", width: "100%" }}>
            {/* Vertical Timeline */}
            {timelineEvents.map((event, index) => (
              <Box key={index} sx={{ position: "relative", mb: 4 }}>
                <Divider
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "0",
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#81C784",
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "48%",
                      textAlign: index % 2 === 0 ? "right" : "left",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#81C784",
                        marginBottom: 1,
                      }}
                    >
                      {event.year}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#444" }}>
                      {event.event}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#81C784",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  ></Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
        {/* Trainers Section */}
        <Container sx={{ my: 6 }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
          >
            Meet Our Trainers
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {trainers.slice(0, 3).map((trainer) => (
                <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={trainer.name}
                      height="250"
                      image={trainer.photo.secure_url || image}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h5">{trainer.name}</Typography>
                      <Typography variant="body3" color="text.secondary">
                        Area Of Expertise: {trainer.areas_of_expertise}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          backgroundColor: "#81C784",
                          color: "#fff",
                          border: "none",
                          "&:hover": {
                            backgroundColor: "#66BB6A",
                          },
                        }}
                        onClick={() => handleCardClick(trainer._id)}
                      >
                        Know More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        {/* Appointment Modal */}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
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
              sx={{ mb: 3 }}
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

            {/* Date and Time Input */}
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
              inputProps={{
                min: todayDate, // Only allow present and future dates
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
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minTime, // Limit time to 9 AM
                max: maxTime, // Limit time to 6 PM
              }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  padding: "30px", // Adjust padding for mobile (xs) and larger screens (sm)
                  backgroundColor: "#81C784", // Set the background color for the normal state
                  "&:hover": {
                    backgroundColor: "#66BB6A", // Set the background color for the hover state
                  },
                }}
                onClick={handleSubmit}
              >
                Submit Appointment
              </Button>
            </Box>
          </Box>
        </Modal>
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
                  padding: "30px", // Adjust padding for mobile (xs) and larger screens (sm)
                  backgroundColor: "#81C784", // Set the background color for the normal state
                  "&:hover": {
                    backgroundColor: "#66BB6A", // Set the background color for the hover state
                  },
                }}
                onClick={handleLoginModalClose}
              >
                Go to Login
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default AboutPage;
