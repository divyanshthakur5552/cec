import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home";
import EventsPage from "./pages/events";
import EventDetailPage from "./pages/event-detail";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import NotFoundPage from "./pages/not-found";
import AboutEvents from "./components/home/AboutEvents";
import ContactSection from "./components/home/ContactSection";
import DepartmentsPage from "./pages/Department";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AnimatedRoute>
                <HomePage />
              </AnimatedRoute>
            }
          />
          <Route
            path="events"
            element={
              <AnimatedRoute>
                <EventsPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="about"
            element={
              <AnimatedRoute>
                <AboutEvents />
              </AnimatedRoute>
            }
          />
          <Route
            path="Contact"
            element={
              <AnimatedRoute>
                <ContactSection />
              </AnimatedRoute>
            }
          />
          <Route
            path="Departments"
            element={
              <AnimatedRoute>
                <DepartmentsPage />
              </AnimatedRoute>
            }
          />

          <Route
            path="events/:id"
            element={
              <AnimatedRoute>
                <EventDetailPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <AnimatedRoute>
                <DashboardPage />
              </AnimatedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <AnimatedRoute>
                <ProfilePage />
              </AnimatedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <AnimatedRoute>
              <LoginPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AnimatedRoute>
              <SignupPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AnimatedRoute>
              <ForgotPasswordPage />
            </AnimatedRoute>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedRoute>
              <NotFoundPage />
            </AnimatedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
