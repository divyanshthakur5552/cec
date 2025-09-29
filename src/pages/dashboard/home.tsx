import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for dashboard
const eventStats = [
  { name: 'Total Events', value: 24, icon: 'lucide:calendar', color: 'primary' },
  { name: 'Upcoming Events', value: 8, icon: 'lucide:calendar-clock', color: 'success' },
  { name: 'Registrations', value: 512, icon: 'lucide:users', color: 'secondary' },
  { name: 'Departments', value: 6, icon: 'lucide:building', color: 'warning' }
];

const recentEvents = [
  { id: '1', title: 'AI & Machine Learning Workshop', date: '2023-10-15', registrations: 32, capacity: 50 },
  { id: '2', title: 'Robotics Innovation Challenge', date: '2023-11-22', registrations: 28, capacity: 40 },
  { id: '3', title: 'Cultural Fest 2023 - "Harmony"', date: '2023-12-10', registrations: 320, capacity: 500 }
];

const registrationData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 85 },
  { name: 'Mar', value: 120 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 145 },
  { name: 'Jul', value: 180 },
  { name: 'Aug', value: 120 },
  { name: 'Sep', value: 200 },
  { name: 'Oct', value: 250 },
  { name: 'Nov', value: 190 },
  { name: 'Dec', value: 220 }
];

const DashboardHome: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <Button 
          color="primary" 
          as={Link}
          to="/dashboard/events/create"
          startContent={<Icon icon="lucide:plus" />}
        >
          Create Event
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {eventStats.map((stat, index) => (
          <Card key={index} className="border border-divider bg-content1" shadow="none">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-400 text-sm">{stat.name}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}/10 p-3 rounded-full`}>
                  <Icon 
                    icon={stat.icon} 
                    className={`text-${stat.color}`} 
                    width={24} 
                    height={24} 
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="border border-divider bg-content1 lg:col-span-2" shadow="none">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Registration Trends</h2>
              <Button 
                variant="light" 
                color="default" 
                size="sm"
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
              >
                This Year
              </Button>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={registrationData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#F8FAFC'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FF5722" 
                    fillOpacity={1} 
                    fill="url(#colorRegistrations)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        {/* Recent Events */}
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Events</h2>
              <Link to="/dashboard/events" className="text-primary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="border-b border-divider pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                  <p className="text-foreground-400 text-sm mb-2">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric'
                    })}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground-400 text-xs">
                      <Icon icon="lucide:users" width={14} />
                      <span>{event.registrations}/{event.capacity}</span>
                    </div>
                    <Progress 
                      value={(event.registrations / event.capacity) * 100} 
                      color="primary"
                      size="sm"
                      className="w-24"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              color="primary" 
              variant="flat" 
              className="w-full mt-4"
              as={Link}
              to="/dashboard/events/create"
            >
              Create New Event
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
