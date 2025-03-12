
import React from 'react';
import { Terminal, Server, Search, Shield, Box, BarChart, Target, Trophy } from 'lucide-react';
import DayCard from './DayCard';
import courseData from '@/data/courseData.json';

const CourseContent = () => {
  // Function to map level from JSON to component level format
  const mapLevel = (level: string) => {
    switch(level) {
      case 'Cơ bản': return 'basic' as const;
      case 'Chuyên sâu': return 'advanced' as const;
      case 'Senior': return 'senior' as const;
      default: return 'basic' as const;
    }
  };

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Terminal': return <Terminal className="h-5 w-5 text-cyber-accent" />;
      case 'Server': return <Server className="h-5 w-5 text-cyber-accent" />;
      case 'Search': return <Search className="h-5 w-5 text-cyber-accent" />;
      case 'Shield': return <Shield className="h-5 w-5 text-cyber-accent" />;
      case 'Box': return <Box className="h-5 w-5 text-cyber-accent" />;
      case 'Target': return <Target className="h-5 w-5 text-cyber-accent" />;
      case 'Trophy': return <Trophy className="h-5 w-5 text-cyber-accent" />;
      default: return <Terminal className="h-5 w-5 text-cyber-accent" />;
    }
  };

  // Transform JSON data to the format needed by DayCard
  const days = Object.entries(courseData).map(([dayNumber, dayData]) => ({
    day: parseInt(dayNumber),
    title: dayData.title,
    description: dayData.objective,
    level: mapLevel(dayData.level),
    icon: getIconComponent(dayData.icon)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BarChart className="mr-2 text-cyber-accent" />
        Chi tiết chương trình
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day) => (
          <DayCard
            key={day.day}
            day={day.day}
            title={day.title}
            description={day.description}
            level={day.level}
            icon={day.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
