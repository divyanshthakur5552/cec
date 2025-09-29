import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Input, Button, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const departments = [
  { key: 'computer-science', name: 'Computer Science' },
  { key: 'electronics', name: 'Electronics' },
  { key: 'mechanical', name: 'Mechanical' },
  { key: 'civil', name: 'Civil Engineering' },
  { key: 'electrical', name: 'Electrical Engineering' },
  { key: 'biotechnology', name: 'Biotechnology' },
  { key: 'business', name: 'Business Administration' },
  { key: 'arts', name: 'Fine Arts' }
];

const years = [
  { key: '1', name: '1st Year' },
  { key: '2', name: '2nd Year' },
  { key: '3', name: '3rd Year' },
  { key: '4', name: '4th Year' }
];

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [year, setYear] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <span className="font-bold text-white">CEC</span>
            </div>
            <p className="font-semibold text-foreground">
              Department Events Portal
            </p>
          </Link>
        </div>
        
        <Card className="border border-divider bg-content1" shadow="none">
          <CardBody className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Create an account</h1>
            <p className="text-foreground-400 mb-6">Sign up to join events and connect with your community</p>
            
            <form onSubmit={handleSignup} className="space-y-4">
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
                label="Password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                value={password}
                onValueChange={setPassword}
                isRequired
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <Icon icon="lucide:eye-off" className="text-foreground-400" />
                    ) : (
                      <Icon icon="lucide:eye" className="text-foreground-400" />
                    )}
                  </button>
                }
              />
              
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                isRequired
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <Icon icon="lucide:eye-off" className="text-foreground-400" />
                    ) : (
                      <Icon icon="lucide:eye" className="text-foreground-400" />
                    )}
                  </button>
                }
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {year ? years.find(y => y.key === year)?.name : 'Select Year'}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Year selection"
                    selectionMode="single"
                    selectedKeys={year ? [year] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setYear(selected);
                    }}
                  >
                    {years.map((y) => (
                      <DropdownItem key={y.key}>{y.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              
              <Button 
                type="submit" 
                color="primary" 
                className="w-full font-medium"
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </form>
            
            <div className="flex items-center my-6">
              <Divider className="flex-grow" />
              <span className="px-4 text-foreground-400 text-sm">OR</span>
              <Divider className="flex-grow" />
            </div>
            
            <Button 
              variant="bordered" 
              className="w-full"
              startContent={<Icon icon="logos:google-icon" width={18} />}
            >
              Continue with Google
            </Button>
            
            <p className="text-center mt-6 text-foreground-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </CardBody>
        </Card>
        
        <p className="text-center mt-6 text-foreground-400 text-xs">
          &copy; 2023 CEC Events. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
