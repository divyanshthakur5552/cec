import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-6">
          <Icon 
            icon="lucide:file-question" 
            className="mx-auto text-primary" 
            width={80} 
            height={80} 
          />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-foreground-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            color="primary" 
            as={Link}
            to="/"
            startContent={<Icon icon="lucide:home" />}
          >
            Go to Homepage
          </Button>
          
          <Button 
            variant="bordered" 
            color="default" 
            as={Link}
            to="/events"
            startContent={<Icon icon="lucide:calendar" />}
          >
            Browse Events
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
