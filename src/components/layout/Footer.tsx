import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-divider pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1 rounded-md">
                <span className="font-bold text-white">CEC</span>
              </div>
              <p className="font-semibold text-foreground">
                Department Events Portal
              </p>
            </Link>
            <p className="text-foreground-400 text-sm mb-4">
              Connecting students with opportunities, fostering community, and building the future through engaging events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground-400 hover:text-primary transition-colors">
                <Icon icon="lucide:facebook" width={20} height={20} />
              </a>
              <a href="#" className="text-foreground-400 hover:text-primary transition-colors">
                <Icon icon="lucide:twitter" width={20} height={20} />
              </a>
              <a href="#" className="text-foreground-400 hover:text-primary transition-colors">
                <Icon icon="lucide:instagram" width={20} height={20} />
              </a>
              <a href="#" className="text-foreground-400 hover:text-primary transition-colors">
                <Icon icon="lucide:linkedin" width={20} height={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Departments</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/departments/computer-science" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link to="/departments/electronics" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/departments/mechanical" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Mechanical
                </Link>
              </li>
              <li>
                <Link to="/departments/biotechnology" className="text-foreground-400 hover:text-primary transition-colors text-sm">
                  Biotechnology
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon icon="lucide:mail" className="text-foreground-400 mt-0.5" width={18} />
                <span className="text-foreground-400 text-sm">events@cec.edu.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="lucide:phone" className="text-foreground-400 mt-0.5" width={18} />
                <span className="text-foreground-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="lucide:map-pin" className="text-foreground-400 mt-0.5" width={18} />
                <span className="text-foreground-400 text-sm">
                  Block-A, CEC Campus,<br />
                  High-Tech City, Hyderabad
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-divider mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground-400 text-xs mb-4 md:mb-0">
            © 2023 CEC Events. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-foreground-400 hover:text-primary transition-colors text-xs">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-foreground-400 hover:text-primary transition-colors text-xs">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
