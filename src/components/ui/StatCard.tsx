import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <Card className="border border-divider bg-content1" shadow="none">
      <CardBody className="flex flex-col items-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-4xl font-bold">{value}</span>
        </motion.div>
        <span className="text-foreground-400 text-sm mt-1">{label}</span>
      </CardBody>
    </Card>
  );
};

export default StatCard;
