import React from 'react';
import { Card, CardBody, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for analytics
const registrationsByMonth = [
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

const eventsByDepartment = [
  { name: 'Computer Science', value: 12 },
  { name: 'Electronics', value: 8 },
  { name: 'Mechanical', value: 6 },
  { name: 'Business', value: 5 },
  { name: 'Cultural Affairs', value: 4 },
  { name: 'Fine Arts', value: 3 }
];

const eventsByType = [
  { name: 'Tech', value: 15 },
  { name: 'Workshop', value: 10 },
  { name: 'Seminar', value: 8 },
  { name: 'Cultural', value: 6 },
  { name: 'Competition', value: 5 }
];

const registrationsByDepartment = [
  { name: 'Computer Science', value: 220 },
  { name: 'Electronics', value: 180 },
  { name: 'Mechanical', value: 120 },
  { name: 'Business', value: 100 },
  { name: 'Fine Arts', value: 80 },
  { name: 'Others', value: 60 }
];

const COLORS = ['#FF5722', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('year');
  
  const handleTimeRangeChange = (key: string) => {
    setTimeRange(key);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
            >
              {timeRange === 'year' ? 'Last 12 Months' : 
               timeRange === 'quarter' ? 'Last 3 Months' : 
               'Last 30 Days'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Time range selection"
            selectionMode="single"
            selectedKeys={[timeRange]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              handleTimeRangeChange(selected);
            }}
          >
            <DropdownItem key="month">Last 30 Days</DropdownItem>
            <DropdownItem key="quarter">Last 3 Months</DropdownItem>
            <DropdownItem key="year">Last 12 Months</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Registrations Over Time */}
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Registrations Over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={registrationsByMonth}
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
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Registrations"
                    stroke="#FF5722" 
                    fillOpacity={1} 
                    fill="url(#colorRegistrations)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        {/* Events by Department */}
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Events by Department</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={eventsByDepartment}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8' }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#F8FAFC'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Events" 
                    fill="#FF5722" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by Type */}
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Events by Type</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#F8FAFC'
                    }}
                    formatter={(value, name) => [`${value} events`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        {/* Registrations by Department */}
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Registrations by Department</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={registrationsByDepartment}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8' }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
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
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Registrations" 
                    fill="#0088FE" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
