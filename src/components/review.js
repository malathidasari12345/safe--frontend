import React from "react";
import Slider from "react-slick";
import { Typography } from "@mui/material";
// Sample safety training testimonials data
const safetyTestimonials = [
  {
    name: "John Doe",
    testimonial:
      "The safety training I received was exceptional! I feel much more confident in handling workplace hazards now.",
    // company: "XYZ Manufacturing",
    imageUrl:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?uid=R154992264&ga=GA1.1.1920711162.1733828512&semt=ais_hybrid", // Example image URL
  },
  {
    name: "Jane Smith",
    testimonial:
      "This training provided real-world examples that made the concepts easy to grasp. I feel more prepared for any emergency now.",
    // company: "ABC Construction",
    imageUrl:
      "https://img.freepik.com/free-photo/smart-confident-man-looking_114579-79390.jpg?uid=R154992264&ga=GA1.1.1920711162.1733828512&semt=ais_hybrid", // Example image URL
  },
  {
    name: "Mark Johnson",
    testimonial:
      "I highly recommend this safety training program to anyone. It’s comprehensive and clear, with hands-on learning.",
    // company: "Tech Solutions",
    imageUrl:
      "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?uid=R154992264&ga=GA1.1.1920711162.1733828512&semt=ais_hybrid", // Example image URL
  },
  {
    name: "Sarah Lee",
    testimonial:
      "The safety protocols and procedures I learned were easy to understand, and I now know exactly how to react in case of an emergency.",
    // company: "LMN Logistics",
    imageUrl:
      "https://img.freepik.com/free-photo/handsome-attractive-young-european-man-casual-shirt-with-dark-hair-blue-eyes-keeping-arms-folded-confidently-looking-with-pleasant-smile-face-expression_176420-13279.jpg?uid=R154992264&ga=GA1.1.1920711162.1733828512&semt=ais_hybrid", // Example image URL
  },
];

const SafetyTestimonialCard = ({ name, testimonial, company, imageUrl }) => (
  <div className="testimonial-card">
    <img src={imageUrl} alt={`${name}'s photo`} className="testimonial-image" />
    <div className="testimonial-content">
      <p className="testimonial-text">"{testimonial}"</p>
      <h3 className="testimonial-name">{name}</h3>
      <p className="testimonial-company">{company}</p>
    </div>
  </div>
);

const SafetyTrainingTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="testimonials-section">
      <center>
        {" "}
        <Typography variant="h4" gutterBottom>
          <center style={{ fontWeight: "bold" }}>Testmonials</center>
        </Typography>
      </center>

      <Slider {...settings} className="testimonial-slider">
        {safetyTestimonials.map((testimonial, index) => (
          <SafetyTestimonialCard
            key={index}
            name={testimonial.name}
            testimonial={testimonial.testimonial}
            imageUrl={testimonial.imageUrl}
          />
        ))}
      </Slider>
    </section>
  );
};

export default SafetyTrainingTestimonials;
