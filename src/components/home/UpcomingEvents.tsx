import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import EventCard from "../ui/EventCard";
import { Event } from "../../types";

// Mock data for upcoming events
const mockEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description:
      "Deep dive into modern AI techniques and hands-on machine learning projects with industry experts.",
    department: "Computer Science",
    type: "tech",
    startAt: "2023-10-15T10:00:00",
    endAt: "2023-10-15T16:00:00",
    venue: "Computer Lab 201",
    capacity: 50,
    registeredCount: 32,
    images: [],
    tags: ["AI", "Machine Learning", "Workshop"],
  },
  {
    id: "2",
    title: "Robotics Innovation Challenge",
    description:
      "Build and program autonomous robots to solve real-world problems. Compete for prizes with your innovative solutions.",
    department: "Electronics",
    type: "tech",
    startAt: "2023-11-22T09:00:00",
    endAt: "2023-11-22T18:00:00",
    venue: "Engineering Workshop",
    capacity: 40,
    registeredCount: 28,
    images: [],
    tags: ["Robotics", "Innovation", "Competition"],
  },
  {
    id: "3",
    title: 'Cultural Fest 2023 - "Harmony"',
    description:
      "Celebrate diversity through music, dance, drama, and literature. Open to all departments and students.",
    department: "Cultural Affairs",
    type: "arts",
    startAt: "2023-12-10T10:00:00",
    endAt: "2023-12-10T20:00:00",
    venue: "Main Auditorium",
    capacity: 500,
    registeredCount: 320,
    images: [],
    tags: ["Cultural", "Festival", "Performance"],
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    description:
      "Present your innovative business ideas to venture capitalists and win funding for your startup.",
    department: "Business",
    type: "business",
    startAt: "2024-01-15T14:00:00",
    endAt: "2024-01-15T18:00:00",
    venue: "Business Center Hall",
    capacity: 30,
    registeredCount: 18,
    images: [],
    tags: ["Startup", "Business", "Pitch"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Upcoming Events"
          subtitle="Join exciting events across different departments and expand your horizons."
          centered
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockEvents.map((event) => (
            <motion.div key={event.id} variants={item}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link to="/events">
            <Button
              color="primary"
              variant="bordered"
              size="lg"
              className="font-medium"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
