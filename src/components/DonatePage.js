import React from "react";
import { Box, Typography, Grid, Button, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Banner from "../images/jungle.webp";

const DonatePage = () => {
  return (
    <>
      {/* Banner Section with Parallax Effect */}
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={Banner}
          alt="Donate Now"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1, // Ensures the image stays behind the text
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
          Donate Now
        </Typography>
      </Box>

      {/* Donation Content */}
      <Box sx={{ py: 5, px: "8%" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              Thank you for your interest in getting involved
            </Typography>
            <Typography
              variant="h2"
              align="center"
              fontWeight="bold"
              sx={{ mt: 1 }}
            >
              To Our Organization
            </Typography>
          </Grid>
        </Grid>

        {/* Informational Content and Pay Online Button */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}
            >
              Your generosity helps us make a difference in countless lives.
              With your support, we can continue empowering communities,
              uplifting those in need, and creating a better future for
              everyone. Every contribution matters, and together, we can achieve
              incredible things.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#81C784",
                color: "#fff",
                boxShadow: 3,
                minWidth: "200px",
                "&:hover": {
                  backgroundColor: "#66BB6A",
                },
              }}
              size="large"
            >
              Pay Online
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bank Details Section */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Bank Details
        </Typography>
        <Grid container spacing={4}>
          {/* International Payments Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  For International Payments
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  <strong>Bank Name:</strong> International Bank Ltd.
                  <br />
                  <strong>Account Name:</strong> Our Organization
                  <br />
                  <strong>Account Number:</strong> 1234567890
                  <br />
                  <strong>SWIFT Code:</strong> INTSWFT123
                  <br />
                  <strong>Branch:</strong> New York, USA
                </Typography>
              </Box>
              <img
                src="https://via.placeholder.com/100" // Replace with actual bank logo image URL
                alt="Bank Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </Paper>
          </Grid>

          {/* Payments in India Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  For Payments in India
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  <strong>Bank Name:</strong> State Bank of India
                  <br />
                  <strong>Account Name:</strong> Our Organization
                  <br />
                  <strong>Account Number:</strong> 9876543210
                  <br />
                  <strong>IFSC Code:</strong> SBIIN12345
                  <br />
                  <strong>Branch:</strong> Mumbai, India
                </Typography>
              </Box>
              <img
                src="https://via.placeholder.com/100" // Replace with actual bank logo image URL
                alt="Bank Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* UPI Payment QR Code Section */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          UPI Payment (Paytm, Google Pay, etc.)
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Scan the QR code below to donate via UPI (Paytm, Google Pay,
                etc.):
              </Typography>
              <img
                src="https://via.placeholder.com/200" // Replace with actual UPI QR code image URL
                alt="UPI QR Code"
                style={{ width: "200px", height: "auto" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DonatePage;
