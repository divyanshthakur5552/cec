import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Pagination } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Event } from '../../types';
import CreateEvent from './create-event';
import EditEvent from './edit-event';

// Mock data for events
const mockEvents: Event[] = [
  {
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
    images: [],
    tags: ['AI', 'Machine Learning', 'Workshop'],
    isPublished: true
  },
  {
    id: '2',
    title: 'Robotics Innovation Challenge',
    description: 'Build and program autonomous robots to solve real-world problems. Compete for prizes with your innovative solutions.',
    department: 'Electronics',
    type: 'tech',
    startAt: '2023-11-22T09:00:00',
    endAt: '2023-11-22T18:00:00',
    venue: 'Engineering Workshop',
    capacity: 40,
    registeredCount: 28,
    images: [],
    tags: ['Robotics', 'Innovation', 'Competition'],
    isPublished: true
  },
  {
    id: '3',
    title: 'Cultural Fest 2023 - "Harmony"',
    description: 'Celebrate diversity through music, dance, drama, and literature. Open to all departments and students.',
    department: 'Cultural Affairs',
    type: 'arts',
    startAt: '2023-12-10T10:00:00',
    endAt: '2023-12-10T20:00:00',
    venue: 'Main Auditorium',
    capacity: 500,
    registeredCount: 320,
    images: [],
    tags: ['Cultural', 'Festival', 'Performance'],
    isPublished: true
  },
  {
    id: '4',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative business ideas to venture capitalists and win funding for your startup.',
    department: 'Business',
    type: 'business',
    startAt: '2024-01-15T14:00:00',
    endAt: '2024-01-15T18:00:00',
    venue: 'Business Center Hall',
    capacity: 30,
    registeredCount: 18,
    images: [],
    tags: ['Startup', 'Business', 'Pitch'],
    isPublished: false
  },
  {
    id: '5',
    title: 'Web Development Bootcamp',
    description: 'Learn modern web development with React, Node.js, and MongoDB in this intensive bootcamp.',
    department: 'Computer Science',
    type: 'tech',
    startAt: '2023-11-05T09:00:00',
    endAt: '2023-11-07T17:00:00',
    venue: 'Computer Lab 305',
    capacity: 35,
    registeredCount: 29,
    images: [],
    tags: ['Web Development', 'React', 'Bootcamp'],
    isPublished: true
  }
];

const EventsList: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const eventsPerPage = 5;
  
  // Filter events based on search query
  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      return event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             event.department.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [events, searchQuery]);
  
  // Paginate events
  const paginatedEvents = React.useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage]);
  
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  
  const handlePublishToggle = (id: string) => {
    setEvents(events.map(event => {
      if (event.id === id) {
        return { ...event, isPublished: !event.isPublished };
      }
      return event;
    }));
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };
  
  const getStatusColor = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.startAt);
    const endDate = new Date(event.endAt);
    
    if (!event.isPublished) return 'default';
    if (now < startDate) return 'primary';
    if (now >= startDate && now <= endDate) return 'success';
    return 'danger';
  };
  
  const getStatusText = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.startAt);
    const endDate = new Date(event.endAt);
    
    if (!event.isPublished) return 'Draft';
    if (now < startDate) return 'Upcoming';
    if (now >= startDate && now <= endDate) return 'Ongoing';
    return 'Completed';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Manage Events</h1>
        <Button 
          color="primary" 
          as={Link}
          to="/dashboard/events/create"
          startContent={<Icon icon="lucide:plus" />}
        >
          Create Event
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onValueChange={handleSearch}
          startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
        />
      </div>
      
      <Table 
        aria-label="Events table"
        removeWrapper
        className="border border-divider rounded-md overflow-hidden"
      >
        <TableHeader>
          <TableColumn>EVENT NAME</TableColumn>
          <TableColumn>DEPARTMENT</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>REGISTRATIONS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No events found">
          {paginatedEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-foreground font-medium">{event.title}</span>
                  <span className="text-foreground-400 text-xs">{event.venue}</span>
                </div>
              </TableCell>
              <TableCell>{event.department}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-foreground-600 text-xs">
                    {new Date(event.startAt).toLocaleDateString()}
                  </span>
                  <span className="text-foreground-400 text-xs">
                    {new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Chip 
                  color={getStatusColor(event)} 
                  variant="flat"
                  size="sm"
                >
                  {getStatusText(event)}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="text-foreground">{event.registeredCount}/{event.capacity}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    isIconOnly 
                    variant="light" 
                    size="sm"
                    as={Link}
                    to={`/dashboard/events/edit/${event.id}`}
                    aria-label="Edit event"
                  >
                    <Icon icon="lucide:edit" width={16} />
                  </Button>
                  
                  <Button 
                    isIconOnly 
                    variant="light" 
                    size="sm"
                    color={event.isPublished ? 'danger' : 'success'}
                    onPress={() => handlePublishToggle(event.id)}
                    aria-label={event.isPublished ? 'Unpublish event' : 'Publish event'}
                  >
                    <Icon 
                      icon={event.isPublished ? 'lucide:eye-off' : 'lucide:eye'} 
                      width={16} 
                    />
                  </Button>
                  
                  <Button 
                    isIconOnly 
                    variant="light" 
                    size="sm"
                    color="danger"
                    onPress={() => handleDelete(event.id)}
                    aria-label="Delete event"
                  >
                    <Icon icon="lucide:trash" width={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination 
            total={totalPages} 
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
            color="primary"
            showControls
          />
        </div>
      )}
    </div>
  );
};

const ManageEvents: React.FC = () => {
  return (
    <Routes>
      <Route index element={<EventsList />} />
      <Route path="create" element={<CreateEvent />} />
      <Route path="edit/:id" element={<EditEvent />} />
    </Routes>
  );
};

export default ManageEvents;
