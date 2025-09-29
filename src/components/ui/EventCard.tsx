import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit',
    });
  };

  const getTagColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tech':
        return 'success';
      case 'arts':
        return 'secondary';
      case 'business':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="border border-divider bg-content1 h-full"
        shadow="none"
      >
        <CardBody className="p-0 flex flex-col">
          <div className="relative">
            <img 
              src={event.images[0] || `https://img.heroui.chat/image/ai?w=400&h=200&u=${event.id}`} 
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-3 left-3">
              <Chip 
                color={getTagColor(event.type)} 
                variant="solid"
                size="sm"
                className="text-xs font-medium"
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Chip>
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-foreground font-semibold text-lg mb-2">{event.title}</h3>
            <p className="text-foreground-400 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
            
            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                <Icon icon="lucide:calendar" width={16} />
                <span>{formatDate(event.startAt)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                <Icon icon="lucide:clock" width={16} />
                <span>{new Date(event.startAt).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}</span>
              </div>
              
              <div className="flex items-center gap-2 text-foreground-400 text-sm">
                <Icon icon="lucide:map-pin" width={16} />
                <span>{event.venue}</span>
              </div>
              
              <Link to={`/events/${event.id}`} className="block w-full mt-4">
                <Button 
                  color="primary" 
                  className="w-full font-medium"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default EventCard;
