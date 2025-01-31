import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion"; // For animations

// Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image imports
import slider2 from "../../images/v1-vmake.mp4";
// import slider4 from "../../images/fire.mp4";
// import slider1 from "../../images/bird.mp4";
// import slider3 from "../../images/unwatermark_work.mp4";

const HeroBanner = () => {
  const slides = [
    {
      title: "First Aid Training - Be the First Responder",
      subtitle: "Equip yourself with life-saving first aid skills.",
      background: slider2,
      isVideo: true, // Change to false if using an image
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: "25vh", sm: "100vh" },
              color: "white",
              textAlign: "center",
            }}
          >
            {/* Background: Video or Image */}
            {slide.isVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: -1,
                }}
              >
                <source src={slide.background} type="video/mp4" />
              </video>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: -1,
                }}
              />
            )}

            {/* Add motion.div for fade-in animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                textAlign: "center",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Container>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "4rem" },
                    fontWeight: "bold",
                    mb: 2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.5rem" },
                    mb: 3,
                    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* {slide.subtitle} */}
                </Typography>
              </Container>
            </motion.div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroBanner;
