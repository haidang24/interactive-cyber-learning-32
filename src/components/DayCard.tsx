
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type SkillLevel = 'basic' | 'advanced' | 'senior';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  level: SkillLevel;
  icon: React.ReactNode;
}

const DayCard: React.FC<DayCardProps> = ({ day, title, description, level, icon }) => {
  const levelText = {
    'basic': 'Cơ bản',
    'advanced': 'Chuyên sâu',
    'senior': 'Senior'
  };
  
  const levelClass = {
    'basic': 'skill-basic',
    'advanced': 'skill-advanced',
    'senior': 'skill-senior'
  };

  return (
    <Link to={`/day/${day}`} className="block no-underline">
      <div className="course-day-card hover:translate-y-[-5px]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-cyber-light p-3 rounded-md mr-3">
              {icon}
            </div>
            <div>
              <span className={`skill-label ${levelClass[level]}`}>{levelText[level]}</span>
              <h3 className="text-xl font-bold mt-1">Ngày {day}: {title}</h3>
            </div>
          </div>
          <ChevronRight className="text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 text-cyber-accent font-medium flex items-center">
          <span>Xem chi tiết</span>
          <ChevronRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default DayCard;
