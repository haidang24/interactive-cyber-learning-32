import React from 'react';
import { Shield } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-cyber-medium border-t border-cyber-light mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-cyber-accent mr-2" />
            <span className="text-lg font-semibold">SOC Masterclass</span>
          </div>
          
        </div>
      </div>
    </footer>;
};
export default Footer;