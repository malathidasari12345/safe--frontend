import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavMain from "./components/NavBar/NavMain";
import Causes from "./components/Causes";
import EventsPage from "./components/EventPage";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import GalleryPage from "./components/GallerPage";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import VerifyOtp from "./components/verifyotp";
import EventDetailsPage from "./components/EventDetailsPage";
import ProfilePage from "./components/ProfiePage";
import TermsAndConditions from "./components/TermsAndConditions";
import ScrollToTop from "./components/ScrollTop";
import FAQ from "./components/FAQ";
import ForgetPassword from "./components/forgetpassword";
import ResetPassword from "./components/ResetPassword";
import AnimationDetailPage from "./components/AnimationDetails";
import ServiceDetailsPage from "./components/CauseDetailsPage";
import Appointments from "./components/Appointments";
import Courses from "./components/Causes";
import CourseDetailsPage from "./components/CauseDetailsPage";
import Trainers from "./components/traniers";
import TrainerDetailsPage from "./components/tranierdetailspage";
import Resources from "./components/resources";
import Blogs from "./components/blogs";
import BlogDetailsPage from "./components/NewsDetailsPage";

const App = () => {
  const location = useLocation();

  const isAuthPage =
    ["/signup", "/login", "/verify-otp", "/forget-password"].includes(
      location.pathname
    ) || location.pathname.startsWith("/reset-password/");

  return (
    <div>
      {/* Persistent Layout */}
      {/* {!isAuthPage && <NavHead />} */}
      {!isAuthPage && <NavMain />}
      <ScrollToTop />
      {/* <br></br> */}
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details/:id" element={<CourseDetailsPage />} />
        <Route path="/traniers" element={<Trainers />} />
        <Route path="/tranier-details/:id" element={<TrainerDetailsPage />} />
        <Route path="/resources" element={<Resources />} />
        {/* <Route path="/event-details/:id" element={<EventDetailsPage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
        {/* <Route path="/portfolio/:id" element={<AnimationDetailPage />} /> */}
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        {/* <Route path="/appointments" element={<Appointments />} /> */}
      </Routes>
      <br></br>
      {!isAuthPage && <Footer />}
    </div>
  );
};
export default App;
