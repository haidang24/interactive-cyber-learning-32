
import React from 'react';
import { PenSquare, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const DayEditor = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
        <Card key={day} className="bg-cyber-medium border-cyber-light">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Ngày {day}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <PenSquare className="h-4 w-4 text-cyber-accent" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="theory">
                <AccordionTrigger>Lý thuyết</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <p>• Giới thiệu mô hình OSI, TCP/IP</p>
                    <p>• Kiến thức chi tiết về Linux</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm mục
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="labs">
                <AccordionTrigger>Bài lab</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    <p>• Lab 1: Sử dụng Wireshark</p>
                    <p>• Lab 2: Thực hành trên Linux</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm bài lab
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DayEditor;
