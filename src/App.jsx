import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedDestinations from "./components/FeaturedDestinations";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import WhatsAppChat from "./components/WhatsAppChat";
import BackToTop from "./components/BackToTop";
import ExtraServices from "./components/ExtraServices";
import AboutUs from './components/Aboutus';
import DestinationDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin"; // Import Admin Login Page
import TravelChatbot from "./components/chatbot";

const App = () => {
  // State to handle admin authentication
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <FeaturedDestinations />
              <Services />
              <ExtraServices />
              <AboutUs />
              <Testimonials />
              <CallToAction />
              <Footer />
              <WhatsAppChat />
              <BackToTop />
              <TravelChatbot />
            </>
          }
        />

        {/* Admin Login route */}
        <Route
          path="/admin-login"
          element={<AdminLogin setIsAdmin={setIsAdmin} />}
        />

        {/* Protected Admin route */}
        <Route
          path="/dashboard"
          element={
            isAdmin ? <DestinationDashboard /> : <Navigate to="/admin-login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
