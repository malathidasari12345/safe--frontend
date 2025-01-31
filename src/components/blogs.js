import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Container,
  TextField,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../images/banner1.jpg";

const Blogs = () => {
  const [blogsData, setBlogsData] = useState([]); // We will use this directly
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://safety-backend.vercel.app/api/blog/") // API endpoint for blogs
      .then((response) => {
        console.log(response);
        setBlogsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading blogs...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  const handleCardClick = (id) => {
    navigate(`/blog-details/${id}`); // Navigate to the individual blog details page
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
          alt="Blogs Background"
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
          Blogs
        </Typography>
      </Box>

      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Latest Blogs
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {blogsData.map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleCardClick(blog._id)}
              >
                {/* Blog Image */}
                <Box
                  sx={{ position: "relative", height: 250, overflow: "hidden" }}
                >
                  <img
                    src={
                      blog.image?.secure_url ||
                      "https://via.placeholder.com/800"
                    }
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Blog Content */}
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
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 2,
                      fontSize: "0.875rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      lineHeight: "1.4",
                    }}
                  >
                    {blog.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Blogs;
