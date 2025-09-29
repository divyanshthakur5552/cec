import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, Input, Textarea, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';

// Mock event data
const mockEvent: Event = {
  id: '1',
  title: 'AI & Machine Learning Workshop',
  description: 'Deep dive into modern AI techniques and hands-on machine learning projects with industry experts.',
  department: 'Computer Science',
  type: 'tech',
  startAt: '2023-10-15T10:00:00',
  endAt: '2023-10-15T16:00:00',
  venue: 'Computer Lab 201',
  capacity: 50,
  registeredCount: 32,
  images: ['https://img.heroui.chat/image/ai?w=1200&h=400&u=1'],
  tags: ['AI', 'Machine Learning', 'Workshop'],
  isPublished: true
};

const eventTypes = [
  { key: 'tech', name: 'Tech' },
  { key: 'arts', name: 'Arts' },
  { key: 'business', name: 'Business' },
  { key: 'workshop', name: 'Workshop' },
  { key: 'seminar', name: 'Seminar' },
  { key: 'competition', name: 'Competition' },
  { key: 'cultural', name: 'Cultural' }
];

const departments = [
  { key: 'computer-science', name: 'Computer Science' },
  { key: 'electronics', name: 'Electronics' },
  { key: 'mechanical', name: 'Mechanical' },
  { key: 'civil', name: 'Civil Engineering' },
  { key: 'electrical', name: 'Electrical Engineering' },
  { key: 'biotechnology', name: 'Biotechnology' },
  { key: 'business', name: 'Business Administration' },
  { key: 'cultural-affairs', name: 'Cultural Affairs' },
  { key: 'fine-arts', name: 'Fine Arts' }
];

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, fetch event by ID
  const event = mockEvent;
  
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [department, setDepartment] = React.useState(event.department.toLowerCase().replace(' ', '-'));
  const [eventType, setEventType] = React.useState(event.type);
  const [venue, setVenue] = React.useState(event.venue);
  const [capacity, setCapacity] = React.useState(event.capacity.toString());
  
  const startDate = new Date(event.startAt);
  const endDate = new Date(event.endAt);
  
  const [startDateValue, setStartDateValue] = React.useState(
    startDate.toISOString().split('T')[0]
  );
  const [startTimeValue, setStartTimeValue] = React.useState(
    startDate.toTimeString().split(' ')[0].substring(0, 5)
  );
  const [endDateValue, setEndDateValue] = React.useState(
    endDate.toISOString().split('T')[0]
  );
  const [endTimeValue, setEndTimeValue] = React.useState(
    endDate.toTimeString().split(' ')[0].substring(0, 5)
  );
  
  const [tags, setTags] = React.useState<string[]>(event.tags);
  const [currentTag, setCurrentTag] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/events');
      alert('Event updated successfully!');
    }, 1500);
  };

  if (!event) {
    return (
      <div className="text-center py-16">
        <Icon icon="lucide:loader" className="mx-auto animate-spin text-primary" width={48} height={48} />
        <p className="mt-4 text-foreground-400">Loading event details...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/dashboard/events" className="text-foreground-400 hover:text-primary">
          <Icon icon="lucide:arrow-left" width={20} />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
      </div>
      
      <Card className="border border-divider bg-content1" shadow="none">
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Event Title"
                  placeholder="Enter event title"
                  value={title}
                  onValueChange={setTitle}
                  isRequired
                />
              </div>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="w-full justify-between"
                    endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                  >
                    {department ? departments.find(d => d.key === department)?.name : 'Select Department'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Department selection"
                  selectionMode="single"
                  selectedKeys={department ? [department] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setDepartment(selected);
                  }}
                >
                  {departments.map((dept) => (
                    <DropdownItem key={dept.key}>{dept.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="w-full justify-between"
                    endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                  >
                    {eventType ? eventTypes.find(t => t.key === eventType)?.name : 'Select Event Type'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Event type selection"
                  selectionMode="single"
                  selectedKeys={eventType ? [eventType] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setEventType(selected);
                  }}
                >
                  {eventTypes.map((type) => (
                    <DropdownItem key={type.key}>{type.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              
              <div className="md:col-span-2">
                <Textarea
                  label="Event Description"
                  placeholder="Enter event description"
                  value={description}
                  onValueChange={setDescription}
                  minRows={5}
                  isRequired
                />
              </div>
              
              <Input
                label="Venue"
                placeholder="Enter event venue"
                value={venue}
                onValueChange={setVenue}
                isRequired
              />
              
              <Input
                label="Capacity"
                placeholder="Enter maximum capacity"
                type="number"
                value={capacity}
                onValueChange={setCapacity}
                isRequired
              />
              
              <div>
                <Input
                  label="Start Date"
                  placeholder="Select start date"
                  type="date"
                  value={startDateValue}
                  onValueChange={setStartDateValue}
                  isRequired
                />
              </div>
              
              <div>
                <Input
                  label="Start Time"
                  placeholder="Select start time"
                  type="time"
                  value={startTimeValue}
                  onValueChange={setStartTimeValue}
                  isRequired
                />
              </div>
              
              <div>
                <Input
                  label="End Date"
                  placeholder="Select end date"
                  type="date"
                  value={endDateValue}
                  onValueChange={setEndDateValue}
                  isRequired
                />
              </div>
              
              <div>
                <Input
                  label="End Time"
                  placeholder="Select end time"
                  type="time"
                  value={endTimeValue}
                  onValueChange={setEndTimeValue}
                  isRequired
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      onClose={() => handleRemoveTag(tag)}
                      variant="flat"
                      size="sm"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tags"
                    value={currentTag}
                    onValueChange={setCurrentTag}
                    onKeyDown={handleKeyDown}
                    className="flex-grow"
                  />
                  <Button 
                    color="primary" 
                    variant="flat"
                    onPress={handleAddTag}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Event Banner
                </label>
                <div className="mb-4">
                  <img 
                    src={event.images[0]} 
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <div className="border-2 border-dashed border-divider rounded-md p-6 text-center">
                  <Icon icon="lucide:upload" className="mx-auto text-foreground-400 mb-2" width={32} />
                  <p className="text-foreground-400 text-sm mb-2">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-foreground-300 text-xs">
                    Recommended size: 1200 x 400px. Max file size: 5MB
                  </p>
                  <input type="file" className="hidden" />
                  <Button 
                    color="primary" 
                    variant="flat"
                    size="sm"
                    className="mt-4"
                  >
                    Upload New Image
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between gap-3 pt-4 border-t border-divider">
              <Button 
                color="danger" 
                variant="flat"
              >
                Delete Event
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  color="default" 
                  variant="flat"
                  as={Link}
                  to="/dashboard/events"
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditEvent;
