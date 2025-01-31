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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false); // For showing login modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To check if user is logged in

  useEffect(() => {
    // Fetch course details on mount
    axios
      .get(`https://safety-backend.vercel.app/api/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setError("Failed to load course details.");
        setLoading(false);
      });

    // Check if the user is logged in
    const token = localStorage.getItem("authToken");
    const LastName = localStorage.getItem("LastName");
    const FirstName = localStorage.getItem("FirstName");
    const email = localStorage.getItem("Email");
    console.log(FirstName, LastName, email);
    setIsLoggedIn(!!token);
  }, [id]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const FirstName = localStorage.getItem("FirstName");
    const LastName = localStorage.getItem("LastName");
    const email = localStorage.getItem("Email");
    console.log();
    try {
      const response = await axios.post(
        `https://safety-backend.vercel.app/api/courses/${id}/register`,
        {
          FirstName, // Sending the FirstName from localStorage
          LastName,
          email, // Sending the LastName from localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
          },
        }
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error registering for course:", error.message);
      toast.error("Failed to register for course. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Handle button click for registration
  const handleRequestButtonClick = () => {
    if (!isLoggedIn) {
      setIsLoginRequired(true); // Show login modal if user is not logged in
      setOpenModal(true);
    } else {
      setIsLoginRequired(false); // Show confirmation modal if user is logged in
      setOpenModal(true);
    }
  };

  // Handle close modal
  const handleCloseModal = () => setOpenModal(false);

  // Handle login button click in the modal
  const handleLoginRedirect = () => {
    navigate("/login");
    handleCloseModal();
  };

  // Handle registration confirmation
  const handleConfirmRegistration = () => {
    handleSubmit();
    handleCloseModal();
  };

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Loading course details...
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
        <Grid item xs={12} md={5}>
          <Paper sx={{ mb: 3 }}>
            <img
              src={course?.icon || "https://via.placeholder.com/800"}
              alt={course?.name || "Course Image"}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {course?.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {course?.description}
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ flex: 1, ml: 2, mb: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Methodologies
                </Typography>
                <ul>
                  {course?.methodologies?.map((methodology, index) => (
                    <li key={index}>
                      <Typography variant="body1">{methodology}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              <Box sx={{ flex: 1, ml: 2, mb: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tools
                </Typography>
                <ul>
                  {course?.tools?.map((tool, index) => (
                    <li key={index}>
                      <Typography variant="body1">{tool}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              <Box sx={{ flex: 1, mr: 2, mb: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Benefits
                </Typography>
                <ul>
                  {course?.benefits?.map((benefit, index) => (
                    <li key={index}>
                      <Typography variant="body1">{benefit}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>

            <Divider sx={{ mt: 4 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Price: ₹{course?.price?.toLocaleString()}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ mt: 2, display: { xs: "none", md: "block" } }}
                >
                  Category : {course?.category}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, display: { xs: "none", md: "block" } }}
                >
                  Duration : {course?.duration}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "40px",
                  ml: 2,
                  padding: "30px",
                  backgroundColor: "#81C784",
                  "&:hover": {
                    backgroundColor: "#66BB6A",
                  },
                }}
                onClick={handleRequestButtonClick}
              >
                Register now for the course
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for Login / Confirmation */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle }}>
          {isLoginRequired ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                You are not logged in. Please log in to register.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#81C784", // Apply your desired color here
                  "&:hover": {
                    backgroundColor: "#66BB6A", // Hover color (you can adjust this as needed)
                  },
                }}
                onClick={handleLoginRedirect}
              >
                Go to Login
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Are you sure you want to register for this course?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#81C784", // Apply your desired color here
                  "&:hover": {
                    backgroundColor: "#66BB6A", // Hover color (you can adjust this as needed)
                  },
                }}
                onClick={handleConfirmRegistration}
              >
                Confirm Registration
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: 24,
};

export default CourseDetailsPage;
