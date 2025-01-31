import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../images/banner1.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("All fields are required.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://safety-backend.vercel.app/api/contact",
        formData
      );
      toast.success("Message sent successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        question: "",
      });
    } catch (err) {
      toast.error("Failed to send the message. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box>
      {/* Toast Container */}
      <ToastContainer />

      {/* Banner Section with Parallax Effect */}
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
          Contact
        </Typography>
      </Box>

      {/* Intro Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
          component={motion.div}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.3 }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Get in touch with us & stay updated.
        </Typography>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          px: { xs: 2, md: 8 },
          py: 4,
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[
            { title: "Email", value: "support@safety Edge.site" },
            { title: "Phone", value: "+91 9234556781" },
            { title: "Address", value: "Main Streeet, Lb Nagar, Hyderabad" },
            {
              title: "Working Hours",
              value: "Monday to Friday 9:00 AM - 6:00 PM",
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
                textAlign: "center",
                "&:hover": { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Right Column (Contact Form) */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Leave Us a Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                mb: 2,
              }}
            />
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                mb: 2,
              }}
            />
            <TextField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                mb: 2,
              }}
            />
            <TextField
              label="Question (optional)"
              name="question"
              value={formData.question}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2,
                mb: 2,
              }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 30,
                textTransform: "none",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#81C784",
                "&:hover": {
                  backgroundColor: "#66BB6A", // Slightly darker shade for hover effect
                },
              }}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Box>

      {/* Location Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: { xs: 2, md: 4 },
          mt: 5, // Margin-top to space it out
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
          component={motion.div}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.3 }}
        >
          Our Location
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          123 Main Street, City, Country
        </Typography>

        {/* Optional: You can add a Google Map embed here */}
        <Box
          sx={{
            mt: 4,
            maxWidth: "100%",
            height: "300px", // Set a fixed height for the map
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.216117899645!2d78.55089597414045!3d17.35333060378738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99005a6b6089%3A0x78a0bd01ec6960f2!2sTechno%20Tide%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1734937842938!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: "0", width: "100%", height: "100%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
