import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    icon: "lucide:target",
    title: "Our Mission",
    description:
      "To connect students with exciting opportunities and foster a vibrant campus community through engaging departmental events.",
  },
  {
    icon: "lucide:users",
    title: "Community Driven",
    description:
      "Built by students, for students. We understand what makes college events meaningful and impactful.",
  },
  {
    icon: "lucide:award",
    title: "Excellence",
    description:
      "We partner with departments to bring you high-quality workshops, competitions, and cultural events.",
  },
  {
    icon: "lucide:lightbulb",
    title: "Innovation",
    description:
      "Stay ahead with cutting-edge events showcasing the latest trends in technology, arts, and business.",
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

const AboutEvents: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-16">
        <SectionTitle
          title="About Events"
          subtitle="Your gateway to discovering and participating in the most exciting events across all college departments."
          centered
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutEvents;
