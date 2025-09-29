import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import StatCard from '../ui/StatCard';

const stats = [
  { value: '500+', label: 'Students Registered' },
  { value: '50+', label: 'Events Hosted' },
  { value: '8', label: 'Departments' }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Join Our Community" 
          subtitle="Whether you're looking to learn new skills, network with peers, or showcase your talents, this is your platform for growth."
          centered
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <StatCard 
                value={stat.value}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
