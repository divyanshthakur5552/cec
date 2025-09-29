import React from 'react';
import { Card, CardBody, Input, Textarea, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const ContactSection: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
      alert('Message sent successfully!');
    }, 1500);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Have questions about events or want to organize one? We're here to help you connect and engage."
          centered
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border border-divider bg-content1 h-full" shadow="none">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:mail" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-foreground-400 text-sm">events@cec.edu.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:phone" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <p className="text-foreground-400 text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:map-pin" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Address</p>
                      <p className="text-foreground-400 text-sm">
                        Block-A, CEC Campus,<br />
                        High-Tech City, Hyderabad
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon icon="lucide:clock" className="text-primary" width={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Office Hours</p>
                      <p className="text-foreground-400 text-sm">
                        Monday - Friday: 9:15 AM - 4:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border border-divider bg-content1 h-full" shadow="none">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Your full name"
                    placeholder="John Doe"
                    value={name}
                    onValueChange={setName}
                    isRequired
                  />
                  
                  <Input
                    label="Email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={email}
                    onValueChange={setEmail}
                    isRequired
                  />
                  
                  <Textarea
                    label="Message"
                    placeholder="Tell us how we can help you..."
                    value={message}
                    onValueChange={setMessage}
                    minRows={4}
                    isRequired
                  />
                  
                  <Button 
                    type="submit" 
                    color="primary" 
                    className="w-full font-medium"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
