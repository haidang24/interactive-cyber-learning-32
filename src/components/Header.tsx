
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-cyber-medium border-b border-cyber-light">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-cyber-accent" />
          <span className="text-xl font-bold">SOC Roadmap </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-cyber-accent transition-colors">
            Tổng quan
          </Link>
          <Link to="/day/1" className="text-foreground hover:text-cyber-accent transition-colors">
            Nội dung khóa học
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-cyber-accent transition-colors flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="bg-cyber-accent hover:bg-cyber-accentLight text-white px-4 py-2 rounded-md transition-colors flex items-center">
            <Terminal className="mr-2 h-4 w-4" />
            <span>Bắt đầu</span>
          </div>
        </nav>
        <div className="md:hidden">
          <button className="text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
