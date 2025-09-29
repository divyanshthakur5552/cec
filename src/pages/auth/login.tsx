import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Input, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-foreground-400 mb-6">Log in to your account to continue</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Enter your password"
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
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                color="primary" 
                className="w-full font-medium"
                isLoading={isLoading}
              >
                Log In
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
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

export default LoginPage;
