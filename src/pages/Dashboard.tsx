import React from 'react';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DayEditor from '@/components/DayEditor';
import Header from '@/components/Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyber-accent" />
            <h1 className="text-2xl font-bold">SOC Masterclass Dashboard</h1>
          </div>
          <Button className="bg-cyber-accent hover:bg-cyber-accentLight">
            <Plus className="h-4 w-4 mr-2" />
            Thêm ngày học mới
          </Button>
        </div>
        <DayEditor />
      </main>
    </div>
  );
};

export default Dashboard;
