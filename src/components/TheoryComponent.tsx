
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TheoryPoint {
  text: string;
}

interface TheoryComponentProps {
  points: TheoryPoint[];
}

const TheoryComponent: React.FC<TheoryComponentProps> = ({ points }) => {
  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="theory">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-cyber-accent">
            Lý thuyết
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[300px] rounded-md border border-cyber-light p-4">
              <ul className="space-y-2">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-cyber-accent rounded-full mt-2 mr-2"></span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TheoryComponent;
