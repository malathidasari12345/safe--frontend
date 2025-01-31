import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#81C784",
        color: "#FFFFFF",
        p: 4,
      }}
      component={motion.footer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Footer */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        {/* Logo and Info */}
        <Box sx={{ maxWidth: 300 }}>
          <Box>
            <h1 style={{ color: "white" }}>Safety Edge</h1>
          </Box>
          {/* <Typography variant="body2" sx={{ mb: 2 }}>
            At BeastlyVisions, we bring the beauty of wildlife to life through
            stunning 3D animal animations. Experience nature's wonders like
            never before.
          </Typography> */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Address:</strong> 123 Education Street, City, Country
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Email:</strong> support@safety Edge.site
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> +91 234 567 890
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {["About", "courses", "blogs", "resources"].map((link, index) => (
              <Link
                key={index}
                href={`/${link.toLowerCase().replace(" ", "-")}`}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
                component={motion.a}
                whileHover={{ color: "black", scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {link}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Support Links */}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Support
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {["Terms and Conditions", "FAQ", "Contact"].map((link, index) => (
              <Link
                key={index}
                href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
                component={motion.a}
                whileHover={{ color: "black", scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {link}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Follow Us Section */}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2 }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              { icon: LinkedIn, link: "https://www.linkedin.com" },
              { icon: Facebook, link: "https://www.facebook.com" },
              { icon: XIcon, link: "https://www.twitter.com" },
              { icon: Instagram, link: "https://www.instagram.com" },
            ].map(({ icon: Icon, link }, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
                component={motion.a}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Icon fontSize="large" />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Social Media & Copyright */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          © 2025 safetyEdge. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
