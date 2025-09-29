import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

// Mock data for registrations
interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  userName: string;
  userEmail: string;
  department: string;
  year: string;
  registrationDate: string;
  status: 'registered' | 'attended' | 'cancelled';
}

const mockRegistrations: Registration[] = [
  {
    id: '1',
    eventId: '1',
    eventName: 'AI & Machine Learning Workshop',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    department: 'Computer Science',
    year: '3rd Year',
    registrationDate: '2023-09-30T14:25:00',
    status: 'registered'
  },
  {
    id: '2',
    eventId: '1',
    eventName: 'AI & Machine Learning Workshop',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    department: 'Electronics',
    year: '2nd Year',
    registrationDate: '2023-10-01T09:15:00',
    status: 'registered'
  },
  {
    id: '3',
    eventId: '2',
    eventName: 'Robotics Innovation Challenge',
    userName: 'Mike Johnson',
    userEmail: 'mike.j@example.com',
    department: 'Mechanical',
    year: '4th Year',
    registrationDate: '2023-10-05T16:40:00',
    status: 'registered'
  },
  {
    id: '4',
    eventId: '3',
    eventName: 'Cultural Fest 2023 - "Harmony"',
    userName: 'Sarah Williams',
    userEmail: 'sarah.w@example.com',
    department: 'Fine Arts',
    year: '2nd Year',
    registrationDate: '2023-10-08T11:20:00',
    status: 'registered'
  },
  {
    id: '5',
    eventId: '1',
    eventName: 'AI & Machine Learning Workshop',
    userName: 'David Brown',
    userEmail: 'david.b@example.com',
    department: 'Computer Science',
    year: '3rd Year',
    registrationDate: '2023-10-02T13:45:00',
    status: 'cancelled'
  },
  {
    id: '6',
    eventId: '2',
    eventName: 'Robotics Innovation Challenge',
    userName: 'Emily Davis',
    userEmail: 'emily.d@example.com',
    department: 'Electronics',
    year: '1st Year',
    registrationDate: '2023-10-06T10:30:00',
    status: 'attended'
  },
  {
    id: '7',
    eventId: '3',
    eventName: 'Cultural Fest 2023 - "Harmony"',
    userName: 'Alex Wilson',
    userEmail: 'alex.w@example.com',
    department: 'Business Administration',
    year: '2nd Year',
    registrationDate: '2023-10-09T14:15:00',
    status: 'attended'
  }
];

// Event options
const eventOptions = [
  { key: 'all', name: 'All Events' },
  { key: '1', name: 'AI & Machine Learning Workshop' },
  { key: '2', name: 'Robotics Innovation Challenge' },
  { key: '3', name: 'Cultural Fest 2023 - "Harmony"' }
];

// Status options
const statusOptions = [
  { key: 'all', name: 'All Statuses' },
  { key: 'registered', name: 'Registered' },
  { key: 'attended', name: 'Attended' },
  { key: 'cancelled', name: 'Cancelled' }
];

const Registrations: React.FC = () => {
  const [registrations, setRegistrations] = React.useState<Registration[]>(mockRegistrations);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedEvent, setSelectedEvent] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const registrationsPerPage = 5;
  
  // Filter registrations based on search query and filters
  const filteredRegistrations = React.useMemo(() => {
    return registrations.filter(registration => {
      // Search query filter
      if (searchQuery && !registration.userName.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !registration.userEmail.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Event filter
      if (selectedEvent !== 'all' && registration.eventId !== selectedEvent) {
        return false;
      }
      
      // Status filter
      if (selectedStatus !== 'all' && registration.status !== selectedStatus) {
        return false;
      }
      
      return true;
    });
  }, [registrations, searchQuery, selectedEvent, selectedStatus]);
  
  // Paginate registrations
  const paginatedRegistrations = React.useMemo(() => {
    const startIndex = (currentPage - 1) * registrationsPerPage;
    return filteredRegistrations.slice(startIndex, startIndex + registrationsPerPage);
  }, [filteredRegistrations, currentPage]);
  
  const totalPages = Math.ceil(filteredRegistrations.length / registrationsPerPage);
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  
  const handleEventChange = (key: string) => {
    setSelectedEvent(key);
    setCurrentPage(1);
  };
  
  const handleStatusChange = (key: string) => {
    setSelectedStatus(key);
    setCurrentPage(1);
  };
  
  const handleExportCSV = () => {
    alert('Exporting registrations as CSV...');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
        return 'primary';
      case 'attended':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Registrations</h1>
        <Button 
          color="primary" 
          variant="flat"
          startContent={<Icon icon="lucide:download" />}
          onPress={handleExportCSV}
        >
          Export CSV
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onValueChange={handleSearch}
          startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
          className="flex-grow"
        />
        
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="w-full md:w-auto justify-between min-w-[180px]"
              endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
            >
              {eventOptions.find(e => e.key === selectedEvent)?.name || 'All Events'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Event selection"
            selectionMode="single"
            selectedKeys={[selectedEvent]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              handleEventChange(selected);
            }}
          >
            {eventOptions.map((event) => (
              <DropdownItem key={event.key}>{event.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="w-full md:w-auto justify-between min-w-[180px]"
              endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
            >
              {statusOptions.find(s => s.key === selectedStatus)?.name || 'All Statuses'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Status selection"
            selectionMode="single"
            selectedKeys={[selectedStatus]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              handleStatusChange(selected);
            }}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status.key}>{status.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      
      <Table 
        aria-label="Registrations table"
        removeWrapper
        className="border border-divider rounded-md overflow-hidden"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>EVENT</TableColumn>
          <TableColumn>DEPARTMENT</TableColumn>
          <TableColumn>REGISTRATION DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No registrations found">
          {paginatedRegistrations.map((registration) => (
            <TableRow key={registration.id}>
              <TableCell>{registration.userName}</TableCell>
              <TableCell>{registration.userEmail}</TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate" title={registration.eventName}>
                  {registration.eventName}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{registration.department}</span>
                  <span className="text-foreground-400 text-xs">{registration.year}</span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(registration.registrationDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </TableCell>
              <TableCell>
                <Chip 
                  color={getStatusColor(registration.status)} 
                  variant="flat"
                  size="sm"
                >
                  {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    isIconOnly 
                    variant="light" 
                    size="sm"
                    aria-label="View details"
                  >
                    <Icon icon="lucide:eye" width={16} />
                  </Button>
                  
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        isIconOnly 
                        variant="light" 
                        size="sm"
                        aria-label="More actions"
                      >
                        <Icon icon="lucide:more-vertical" width={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem>Send Email</DropdownItem>
                      <DropdownItem>Mark as Attended</DropdownItem>
                      <DropdownItem className="text-danger">Cancel Registration</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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

export default Registrations;
