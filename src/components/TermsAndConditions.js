import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Banner from "../images/banner1.jpg"; // Consider using a banner related to safety training

const TermsAndConditions = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Banner Section with Parallax Effect */}
      <Box
        sx={{
          height: { xs: "200px", md: "300px" },
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          Terms & Conditions
        </Typography>
      </Box>

      {/* Overview Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          At Safety Training Solutions, we are committed to providing
          comprehensive and effective safety training programs that ensure the
          well-being of employees, reduce workplace accidents, and promote a
          culture of safety. Our training programs are designed to equip
          participants with the knowledge and skills necessary to recognize and
          mitigate workplace hazards.
        </Typography>
      </Box>

      {/* Why Safety Training Matters */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Why Safety Training Matters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Protecting Employees:</strong> Safety training helps
              employees recognize hazards in their work environment and take
              preventive measures to protect themselves and their colleagues.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Complying with Regulations:</strong> Proper safety
              training ensures compliance with OSHA (Occupational Safety and
              Health Administration) and other regulatory bodies, helping avoid
              fines and legal issues.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Reducing Workplace Accidents:</strong> A well-trained
              workforce is less likely to make mistakes that lead to accidents.
              Safety training can significantly reduce workplace injuries and
              fatalities.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              <strong>Boosting Productivity:</strong> A safe working environment
              leads to higher employee morale, reduced absenteeism, and overall
              better performance.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Impact of Safety Training */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          The Impact of Safety Training
        </Typography>
        <ul style={{ marginTop: "16px", paddingLeft: "20px" }}>
          <li>
            <Typography variant="body1" color="textSecondary">
              <strong>Reducing Accidents and Injuries:</strong> Proper safety
              training helps identify potential hazards before they lead to
              accidents, significantly reducing workplace injuries.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              <strong>Improving Emergency Response:</strong> Employees trained
              in safety procedures are better equipped to respond effectively in
              emergencies, saving lives and minimizing damage.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              <strong>Promoting a Safety Culture:</strong> Safety training
              fosters a culture of awareness, where employees actively
              participate in identifying and addressing safety concerns in their
              work environment.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              <strong>Meeting Legal and Insurance Requirements:</strong> Safety
              training ensures that your organization meets all necessary safety
              standards and helps lower insurance premiums by reducing risk.
            </Typography>
          </li>
        </ul>
      </Box>

      {/* Goals of Safety Training */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Our Goals for Safety Training
        </Typography>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <Typography variant="body1" color="textSecondary">
              Provide <strong>comprehensive safety training</strong> to
              employees across various industries to minimize risks and enhance
              workplace safety.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              Equip employees with the necessary skills to{" "}
              <strong>identify hazards</strong> and respond appropriately to
              potential safety issues.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              Ensure that all employees are{" "}
              <strong>well-versed in emergency procedures</strong>, from fire
              drills to first-aid training.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="textSecondary">
              Promote a <strong>positive safety culture</strong> where all
              employees are empowered to prioritize their own safety and the
              safety of others.
            </Typography>
          </li>
        </ul>
      </Box>

      {/* Call to Action */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Join the Safety Training Movement
        </Typography>
        <Typography variant="body1" color="textSecondary">
          By supporting and participating in safety training programs, you
          contribute to a safer, healthier, and more productive work
          environment. Your commitment to safety ensures the well-being of
          employees and helps build a strong culture of awareness and
          prevention. Get involved in making safety a top priority.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
