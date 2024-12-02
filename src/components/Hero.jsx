// src/components/Hero.jsx

import React from "react";
import VideoBackground from "@/components/VideoBackground";
import Button from "@/components/Button";
import SearchComponent from "@/components/SearchComponent"; // Import the SearchComponent

const Hero = () => (
  <div
    id="home"
    className="relative h-screen flex flex-col items-center justify-center text-white "
  >
    <VideoBackground />
    <div className="z-10  text-center ">
      <h1 className="text-5xl md:text-6xl font-bold mt-4">
        Discover the World
      </h1>
      <p className="text-xl md:text-2xl mb-8">
        Unforgettable journeys await you
      </p>
      <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
        Start Your Adventure
      </Button>
    </div>
    <SearchComponent />
  </div>
);

export default Hero;
