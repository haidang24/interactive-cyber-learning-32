
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseOverview from '@/components/CourseOverview';
import CourseContent from '@/components/CourseContent';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CourseOverview />
        <CourseContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
