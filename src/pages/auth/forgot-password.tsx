import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
            {!isSubmitted ? (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password</h1>
                <p className="text-foreground-400 mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onValueChange={setEmail}
                    isRequired
                  />
                  
                  <Button 
                    type="submit" 
                    color="primary" 
                    className="w-full font-medium"
                    isLoading={isLoading}
                  >
                    Send Reset Link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="bg-primary/10 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <Icon icon="lucide:mail" className="text-primary" width={32} height={32} />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Check your email</h2>
                <p className="text-foreground-400 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>. 
                  Please check your inbox and follow the instructions.
                </p>
                <Button 
                  color="primary" 
                  variant="flat"
                  className="w-full font-medium"
                  as="a"
                  href="/login"
                >
                  Back to Login
                </Button>
              </div>
            )}
            
            <div className="text-center mt-6">
              <Link to="/login" className="text-primary text-sm hover:underline">
                <Icon icon="lucide:arrow-left" className="inline mr-1" width={14} />
                Back to login
              </Link>
            </div>
          </CardBody>
        </Card>
        
        <p className="text-center mt-6 text-foreground-400 text-xs">
          &copy; 2023 CEC Events. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
