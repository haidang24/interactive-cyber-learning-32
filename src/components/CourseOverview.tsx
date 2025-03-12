import React from 'react';
import { Award, Terminal, Timer, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
const CourseOverview = () => {
  return <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          SOC Masterclass
        </h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Chương trình đào tạo chuyên sâu về vận hành Trung tâm An ninh mạng (SOC) với 7 ngày học từ cơ bản đến chuyên nghiệp
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-cyber-accent hover:bg-cyber-accentLight">
            <Link to="/day/1">
              Bắt đầu khóa học
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        

        <Card className="bg-cyber-medium border-cyber-light">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="bg-cyber-light p-3 rounded-md mr-3">
                <Award className="h-5 w-5 text-cyber-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Công nghệ tiên tiến</h3>
                <p className="text-muted-foreground text-sm">
                  Sử dụng Splunk (v9.4.1), ELK (v8.17.3), Volatility (v3.2.1.0), Autopsy (v4.21.0), Cortex XSOAR (v8.9).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        

        
      </div>
    </div>;
};
export default CourseOverview;