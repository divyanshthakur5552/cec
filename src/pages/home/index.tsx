import React from "react";
import HeroSection from "../../components/home/HeroSection";
import UpcomingEvents from "../../components/home/UpcomingEvents";
import AboutEvents from "../../components/home/AboutEvents";
import CommunitySection from "../../components/home/CommunitySection";
import ContactSection from "../../components/home/ContactSection";
import ChatBot from "../../components/ChatBot";
const HomePage: React.FC = () => {
  return (
    <div>
      <ChatBot />
      <HeroSection />
      <UpcomingEvents />
      <AboutEvents />
      <CommunitySection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
