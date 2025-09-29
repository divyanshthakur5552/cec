import React from 'react';
import { Card, CardBody, Button, Avatar, Input, Textarea, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'student',
  department: 'Computer Science',
  year: '3rd Year',
  profilePic: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1'
};

// Mock registrations data
const mockRegistrations = [
  {
    id: '1',
    eventId: '1',
    eventName: 'AI & Machine Learning Workshop',
    eventDate: '2023-10-15T10:00:00',
    venue: 'Computer Lab 201',
    status: 'upcoming'
  },
  {
    id: '2',
    eventId: '2',
    eventName: 'Robotics Innovation Challenge',
    eventDate: '2023-11-22T09:00:00',
    venue: 'Engineering Workshop',
    status: 'upcoming'
  },
  {
    id: '3',
    eventId: '3',
    eventName: 'Web Development Bootcamp',
    eventDate: '2023-09-05T09:00:00',
    venue: 'Computer Lab 305',
    status: 'completed'
  }
];

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(mockUser.name);
  const [email, setEmail] = React.useState(mockUser.email);
  const [department, setDepartment] = React.useState(mockUser.department);
  const [year, setYear] = React.useState(mockUser.year);
  const [bio, setBio] = React.useState('Computer Science student passionate about AI and machine learning. Looking to connect with like-minded individuals and participate in tech events.');
  const [isSaving, setIsSaving] = React.useState(false);
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }, 1500);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-divider bg-content1" shadow="none">
                <CardBody className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar
                      src={mockUser.profilePic}
                      className="w-24 h-24 mb-4"
                      isBordered
                      color="primary"
                    />
                    <h1 className="text-xl font-bold text-foreground mb-1">{mockUser.name}</h1>
                    <p className="text-foreground-400 text-sm mb-4">{mockUser.email}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <Chip variant="flat" size="sm">{mockUser.department}</Chip>
                      <Chip variant="flat" size="sm">{mockUser.year}</Chip>
                      <Chip variant="flat" size="sm" color="primary">Student</Chip>
                    </div>
                    
                    {!isEditing && (
                      <Button 
                        color="primary" 
                        variant="flat"
                        className="w-full"
                        startContent={<Icon icon="lucide:edit" />}
                        onPress={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  {!isEditing && (
                    <div className="mt-6 pt-6 border-t border-divider">
                      <h2 className="text-md font-semibold text-foreground mb-2">About</h2>
                      <p className="text-foreground-400 text-sm">
                        {bio}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isEditing ? (
                <Card className="border border-divider bg-content1" shadow="none">
                  <CardBody className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Edit Profile</h2>
                    
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={name}
                        onValueChange={setName}
                      />
                      
                      <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                      />
                      
                      <Input
                        label="Department"
                        placeholder="Enter your department"
                        value={department}
                        onValueChange={setDepartment}
                      />
                      
                      <Input
                        label="Year of Study"
                        placeholder="Enter your year of study"
                        value={year}
                        onValueChange={setYear}
                      />
                      
                      <Textarea
                        label="Bio"
                        placeholder="Tell us about yourself"
                        value={bio}
                        onValueChange={setBio}
                        minRows={4}
                      />
                      
                      <div className="pt-4 flex justify-end gap-3">
                        <Button 
                          color="default" 
                          variant="flat"
                          onPress={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          color="primary" 
                          onPress={handleSaveProfile}
                          isLoading={isSaving}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <Card className="border border-divider bg-content1" shadow="none">
                  <CardBody className="p-0">
                    <Tabs 
                      aria-label="Profile tabs" 
                      color="primary"
                      variant="underlined"
                      classNames={{
                        tabList: "p-0 border-b border-divider",
                        cursor: "bg-primary",
                        tab: "px-6 py-4"
                      }}
                    >
                      <Tab 
                        key="registrations" 
                        title={
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:calendar" />
                            <span>My Registrations</span>
                          </div>
                        }
                      >
                        <div className="p-6">
                          <Table 
                            aria-label="My registrations"
                            removeWrapper
                          >
                            <TableHeader>
                              <TableColumn>EVENT</TableColumn>
                              <TableColumn>DATE</TableColumn>
                              <TableColumn>VENUE</TableColumn>
                              <TableColumn>STATUS</TableColumn>
                              <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {mockRegistrations.map((registration) => (
                                <TableRow key={registration.id}>
                                  <TableCell>
                                    <div className="font-medium text-foreground">
                                      {registration.eventName}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {new Date(registration.eventDate).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </TableCell>
                                  <TableCell>{registration.venue}</TableCell>
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
                                        size="sm" 
                                        variant="flat"
                                        color="primary"
                                        as="a"
                                        href={`/events/${registration.eventId}`}
                                      >
                                        View
                                      </Button>
                                      
                                      {registration.status === 'upcoming' && (
                                        <Button 
                                          size="sm" 
                                          variant="flat"
                                          color="danger"
                                        >
                                          Cancel
                                        </Button>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </Tab>
                      <Tab 
                        key="certificates" 
                        title={
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:award" />
                            <span>Certificates</span>
                          </div>
                        }
                      >
                        <div className="p-6 text-center">
                          <div className="py-12">
                            <Icon 
                              icon="lucide:award" 
                              className="mx-auto text-foreground-300 mb-4" 
                              width={64} 
                              height={64} 
                            />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No Certificates Yet</h3>
                            <p className="text-foreground-400 mb-6">
                              Complete events to earn certificates that will appear here.
                            </p>
                            <Button 
                              color="primary" 
                              variant="flat"
                              as="a"
                              href="/events"
                            >
                              Browse Events
                            </Button>
                          </div>
                        </div>
                      </Tab>
                      <Tab 
                        key="settings" 
                        title={
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:settings" />
                            <span>Settings</span>
                          </div>
                        }
                      >
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-md font-medium text-foreground mb-2">Email Notifications</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-foreground-500">Event reminders</span>
                                  <Button 
                                    size="sm" 
                                    color="primary"
                                    variant="flat"
                                  >
                                    Enabled
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-foreground-500">New events from followed departments</span>
                                  <Button 
                                    size="sm" 
                                    color="primary"
                                    variant="flat"
                                  >
                                    Enabled
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-foreground-500">Event updates</span>
                                  <Button 
                                    size="sm" 
                                    color="default"
                                    variant="flat"
                                  >
                                    Disabled
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-md font-medium text-foreground mb-2">Privacy</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-foreground-500">Show my profile to other students</span>
                                  <Button 
                                    size="sm" 
                                    color="primary"
                                    variant="flat"
                                  >
                                    Enabled
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-md font-medium text-foreground mb-2">Account</h4>
                              <div className="space-y-2">
                                <Button 
                                  color="danger" 
                                  variant="flat"
                                  size="sm"
                                  startContent={<Icon icon="lucide:lock" />}
                                >
                                  Change Password
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
