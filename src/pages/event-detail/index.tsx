import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Event } from '../../types';

// Mock event data
const mockEvent: Event = {
  id: '1',
  title: 'AI & Machine Learning Workshop',
  description: 'Join us for an immersive workshop on Artificial Intelligence and Machine Learning fundamentals. This hands-on session will cover the latest techniques in deep learning, neural networks, and practical applications in various industries.\n\nYou\'ll get to work on real-world projects under the guidance of industry experts from leading tech companies. Whether you\'re a beginner or have some experience, this workshop is designed to enhance your skills and provide valuable insights into the world of AI.\n\nTopics covered:\n- Introduction to AI & ML concepts\n- Neural Networks and Deep Learning\n- Computer Vision applications\n- Natural Language Processing\n- Hands-on projects with TensorFlow and PyTorch\n\nAll participants will receive certificates and project materials to continue learning after the workshop.',
  department: 'Computer Science',
  type: 'tech',
  startAt: '2023-10-15T10:00:00',
  endAt: '2023-10-15T16:00:00',
  venue: 'Computer Lab 201',
  capacity: 50,
  registeredCount: 32,
  images: ['https://img.heroui.chat/image/ai?w=1200&h=400&u=1'],
  tags: ['AI', 'Machine Learning', 'Workshop', 'Deep Learning', 'Neural Networks']
};

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [year, setYear] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false);
  
  // In a real app, fetch event by ID
  const event = mockEvent;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      onOpenChange(false);
      alert('Registration successful!');
    }, 1500);
  };
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="lucide:loader" className="mx-auto animate-spin text-primary" width={48} height={48} />
        <p className="mt-4 text-foreground-400">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-foreground-400 hover:text-primary">
                  <Icon icon="lucide:home" className="mr-2" width={16} />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <Icon icon="lucide:chevron-right" className="text-foreground-400" width={16} />
                  <Link to="/events" className="ml-1 text-sm font-medium text-foreground-400 hover:text-primary">
                    Events
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <Icon icon="lucide:chevron-right" className="text-foreground-400" width={16} />
                  <span className="ml-1 text-sm font-medium text-foreground-600 truncate max-w-[200px]">
                    {event.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Event Banner */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-80">
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <Chip 
              color={event.type === 'tech' ? 'success' : event.type === 'arts' ? 'secondary' : 'warning'} 
              variant="solid"
              size="sm"
              className="mb-2"
            >
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Chip>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{event.title}</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <Card className="border border-divider bg-content1" shadow="none">
              <CardBody className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                  
                  <div className="prose prose-sm max-w-none text-foreground-500">
                    {event.description.split('\n\n').map((paragraph, index) => {
                      if (paragraph.includes('Topics covered:')) {
                        const [title, ...items] = paragraph.split('\n- ');
                        return (
                          <div key={index} className="mb-4">
                            <p className="mb-2">{title}</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    })}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {event.tags.map((tag, index) => (
                      <Chip key={index} variant="flat" size="sm">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </motion.div>
              </CardBody>
            </Card>
          </div>
          
          {/* Event Info Sidebar */}
          <div>
            <Card className="border border-divider bg-content1 mb-6" shadow="none">
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:calendar" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Date</p>
                      <p className="text-foreground-400 text-sm">{formatDate(event.startAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:clock" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Time</p>
                      <p className="text-foreground-400 text-sm">
                        {formatTime(event.startAt)} - {formatTime(event.endAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:map-pin" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Venue</p>
                      <p className="text-foreground-400 text-sm">{event.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:users" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Capacity</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-default-100 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-foreground-400 text-xs">
                          {event.registeredCount}/{event.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:building" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Department</p>
                      <p className="text-foreground-400 text-sm">{event.department}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    color="primary" 
                    className="w-full font-medium"
                    onPress={onOpen}
                    endContent={<Icon icon="lucide:arrow-right" width={16} />}
                  >
                    Register Now
                  </Button>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="flat" 
                    color="default" 
                    size="sm"
                    startContent={<Icon icon="lucide:calendar-plus" width={16} />}
                  >
                    Add to Calendar
                  </Button>
                  
                  <Button 
                    variant="flat" 
                    color="default" 
                    size="sm"
                    startContent={<Icon icon="lucide:share-2" width={16} />}
                  >
                    Share
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider bg-content1" shadow="none">
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold mb-4">Organizer</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Icon icon="lucide:users" className="text-primary" width={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.department} Department</p>
                    <p className="text-foreground-400 text-xs">Event Organizer</p>
                  </div>
                </div>
                
                <Button 
                  variant="bordered" 
                  color="default" 
                  className="w-full"
                  startContent={<Icon icon="lucide:mail" width={16} />}
                >
                  Contact Organizer
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register for Event</ModalHeader>
              <ModalBody>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={name}
                  onValueChange={setName}
                  isRequired
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                  isRequired
                />
                <Input
                  label="Department"
                  placeholder="Enter your department"
                  value={department}
                  onValueChange={setDepartment}
                  isRequired
                />
                <Input
                  label="Year of Study"
                  placeholder="Enter your year of study"
                  value={year}
                  onValueChange={setYear}
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleRegister}
                  isLoading={isRegistering}
                >
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventDetailPage;
