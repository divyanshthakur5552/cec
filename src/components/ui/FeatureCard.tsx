import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="border border-divider bg-content1 h-full" shadow="none">
      <CardBody className="flex flex-col items-center text-center p-6">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Icon icon={icon} className="text-primary" width={28} height={28} />
        </div>
        <h3 className="text-foreground font-semibold text-lg mb-2">{title}</h3>
        <p className="text-foreground-400 text-sm">{description}</p>
      </CardBody>
    </Card>
  );
};

export default FeatureCard;
