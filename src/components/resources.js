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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Download, Assignment, Book, Image } from "@mui/icons-material"; // Icons for different resource types
import { motion } from "framer-motion";
import axios from "axios";
import Banner from "../images/banner1.jpg";

const Resources = () => {
  const [resourcesData, setResourcesData] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState(""); // Filter by type

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://safety-backend.vercel.app/api/resources/") // Replace with your actual API endpoint
      .then((response) => {
        setResourcesData(response.data);
        setFilteredResources(response.data); // Set initial filtered resources data
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load resources");
        setLoading(false);
      });
  }, []);

  // Filter resources by resourceType
  useEffect(() => {
    let filtered = resourcesData;

    if (resourceType) {
      filtered = filtered.filter((resource) => resource.type === resourceType);
    }

    setFilteredResources(filtered);
  }, [resourceType, resourcesData]);

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading resources...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  // Icon selection for resource types
  const getResourceIcon = (type) => {
    switch (type) {
      case "guide":
        return <Assignment />;
      case "ebook":
        return <Book />;
      case "infographic":
        return <Image />;
      default:
        return <Assignment />;
    }
  };

  // Handle file download directly without opening in a new tab
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName; // Optionally set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          alt="Resources Background"
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
          Resources
        </Typography>
      </Box>

      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "lighter", marginTop: 2 }}>
            Stay updated with <br /> our latest resources and materials
          </Typography>
        </Box>

        {/* Filter by Type */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Resource Type</InputLabel>
          <Select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            label="Resource Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Guide">Guide</MenuItem>
            <MenuItem value="eBook">eBook</MenuItem>
            <MenuItem value="Infographic">Infographic</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={4} justifyContent="center">
          {filteredResources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Resource Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: 1.5,
                      fontSize: "1.5rem",
                      "&:hover": { color: "#81C784" },
                    }}
                  >
                    {resource.title}
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
                    {resource.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tags:
                    {Array.isArray(resource.tags)
                      ? resource.tags.join(", ")
                      : resource.tags}
                  </Typography>
                </CardContent>

                {/* Date, Author, and Download Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    borderTop: "1px solid #ddd",
                  }}
                >
                  {/* Resource Type Icon */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ marginRight: 1 }}>
                      {getResourceIcon(resource.type)}
                    </IconButton>
                    <Typography variant="body2" color="textSecondary">
                      {resource.type}
                    </Typography>
                  </Box>

                  {/* Download Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Download />}
                    sx={{
                      backgroundColor: "#81C784",
                    }}
                    onClick={() => {
                      const fileUrl = resource.file.secure_url;
                      const fileName = fileUrl.split("/").pop(); // You can set a better filename if needed
                      handleDownload(fileUrl, fileName);
                    }}
                  >
                    Download
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Resources;
