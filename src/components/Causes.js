import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Container,
  Grid,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../images/banner1.jpg";

const Courses = () => {
  const [courses, setCourses] = useState([]); // Changed to courses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://safety-backend.vercel.app/api/courses/") // API call to fetch courses
      .then((response) => {
        const coursesData = response.data; // Response from courses endpoint
        console.log("API Response:", coursesData);
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
          setFilteredCourses(coursesData); // Set initial filtered courses
        } else {
          console.error("Invalid data format:", coursesData);
          setError("Invalid response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter courses based on selected category
  useEffect(() => {
    let filtered = courses;

    if (selectedCategory) {
      filtered = filtered.filter(
        (course) =>
          course.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, courses]);

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Loading courses...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <>
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
          alt="Courses Background"
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
          Our Courses
        </Typography>
      </Box>

      {/* Category Filter Section */}
      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "lighter", marginTop: 2 }}>
            Browse our top-rated courses
          </Typography>
        </Box>

        {/* Category Dropdown */}
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ marginBottom: 4 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="OSHA Compliance">OSHA Compliance</MenuItem>
          <MenuItem value="Fire Safety">Fire Safety</MenuItem>
          <MenuItem value="First Aid & CPR">First Aid & CPR</MenuItem>
          <MenuItem value="Construction Safety">Construction Safety</MenuItem>
          {/* Add other categories here */}
        </Select>

        <Grid container spacing={4} justifyContent="center">
          {filteredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={course.icon || "https://via.placeholder.com/500"}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, minHeight: 150 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: 2,
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#81C784",
                      },
                    }}
                  >
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 2,
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      lineHeight: "1.4",
                    }}
                  >
                    {course.description}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Price: {course.price}</Typography>
                    <Typography>Duration: {course.duration}</Typography>
                  </div>
                  <br></br>
                  {/* Know More Button */}
                  <center>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#81C784",
                        "&:hover": { backgroundColor: "#66BB6A" },
                      }}
                      onClick={() => navigate(`/course-details/${course._id}`)}
                    >
                      Know More
                    </Button>
                  </center>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Courses;
