import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 h-[100vh] bg-black z-0 h-fil "></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-8 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-3 rounded-full"
            >
              <Icon
                icon="lucide:calendar"
                className="text-primary"
                width={24}
                height={24}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-primary/10 p-3 rounded-full"
            >
              <Icon
                icon="lucide:users"
                className="text-primary"
                width={24}
                height={24}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-primary/10 p-3 rounded-full"
            >
              <Icon
                icon="lucide:rocket"
                className="text-primary"
                width={24}
                height={24}
              />
            </motion.div>
          </div>

          <motion.h1
            className="text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Upcoming{" "}
            <span className="text-primary">Department Events</span>
          </motion.h1>

          <motion.p
            className="text-foreground-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with workshops, hackathons, and fests. Join your
            community and never miss an opportunity to learn and grow.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/events">
              <Button color="primary" size="lg" className="font-medium">
                View Events
              </Button>
            </Link>
            <Button
              variant="bordered"
              color="default"
              size="lg"
              className="text-foreground font-medium"
              startContent={<Icon icon="lucide:bell" />}
            >
              Get event updates
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <Icon
          icon="lucide:chevron-down"
          className="text-foreground-400"
          width={24}
          height={24}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
