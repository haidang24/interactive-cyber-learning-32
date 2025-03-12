
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Terminal, Server, Search, Shield, Box, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TheoryComponent from '@/components/TheoryComponent';
import LabComponent from '@/components/LabComponent';
import { Card, CardContent } from '@/components/ui/card';
import courseDataJson from '@/data/courseData.json';

interface DayData {
  title: string;
  level: 'Cơ bản' | 'Chuyên sâu' | 'Senior';
  objective: string;
  theory: { text: string }[];
  labs: { id: number; title: string; description: string }[];
  expectedResult: string;
  icon: string;
}

const DayDetail = () => {
  const { day } = useParams<{ day: string }>();
  const dayNumber = parseInt(day || '1');
  
  // Convert the imported JSON to the correct type
  const courseData: Record<number, DayData> = courseDataJson as unknown as Record<number, DayData>;

  const currentDay = courseData[dayNumber];
  
  // Map icon string to React component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="h-6 w-6 text-cyber-accent" />;
      case 'Server': return <Server className="h-6 w-6 text-cyber-accent" />;
      case 'Search': return <Search className="h-6 w-6 text-cyber-accent" />;
      case 'Shield': return <Shield className="h-6 w-6 text-cyber-accent" />;
      case 'Box': return <Box className="h-6 w-6 text-cyber-accent" />;
      case 'Target': return <Target className="h-6 w-6 text-cyber-accent" />;
      case 'Trophy': return <Trophy className="h-6 w-6 text-cyber-accent" />;
      default: return <Terminal className="h-6 w-6 text-cyber-accent" />;
    }
  };
  
  // Navigate to prev/next day
  const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
  const nextDay = dayNumber < 7 ? dayNumber + 1 : null;

  if (!currentDay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy ngày học</h2>
          <Button asChild>
            <Link to="/">Quay lại trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-cyber-accent hover:underline flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Quay lại tổng quan
            </Link>
            <div className="flex">
              {prevDay && (
                <Button variant="outline" size="sm" asChild className="mr-2">
                  <Link to={`/day/${prevDay}`}>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Ngày {prevDay}
                  </Link>
                </Button>
              )}
              {nextDay && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/day/${nextDay}`}>
                    Ngày {nextDay}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="bg-cyber-light p-3 rounded-full mr-3">
              {getIconComponent(currentDay.icon)}
            </div>
            <div>
              <div className="mb-1">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded mr-2 ${
                  currentDay.level === 'Cơ bản' ? 'bg-blue-900 text-blue-100' : 
                  currentDay.level === 'Chuyên sâu' ? 'bg-purple-900 text-purple-100' : 
                  'bg-red-900 text-red-100'
                }`}>
                  {currentDay.level}
                </span>
                <span className="text-muted-foreground">Ngày {dayNumber}/7</span>
              </div>
              <h1 className="text-2xl font-bold">{currentDay.title}</h1>
            </div>
          </div>

          <Card className="bg-cyber-medium border-cyber-light mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2">Mục tiêu</h2>
              <p>{currentDay.objective}</p>
            </CardContent>
          </Card>

          <TheoryComponent points={currentDay.theory} />
          <LabComponent labs={currentDay.labs} />

          <Card className="bg-cyber-medium border-cyber-light mt-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2">Kết quả mong đợi</h2>
              <p>{currentDay.expectedResult}</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DayDetail;
