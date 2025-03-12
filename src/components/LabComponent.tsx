
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from 'lucide-react';

interface Lab {
  id: number;
  title: string;
  description: string;
}

interface LabComponentProps {
  labs: Lab[];
}

const LabComponent: React.FC<LabComponentProps> = ({ labs }) => {
  const [completedLabs, setCompletedLabs] = useState<number[]>([]);

  const toggleLabCompletion = (labId: number) => {
    if (completedLabs.includes(labId)) {
      setCompletedLabs(completedLabs.filter(id => id !== labId));
    } else {
      setCompletedLabs([...completedLabs, labId]);
    }
  };

  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="labs">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-cyber-accent">
            Bài lab
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[400px] rounded-md border border-cyber-light p-4">
              <div className="space-y-4">
                {labs.map((lab) => (
                  <div key={lab.id} className="lab-card">
                    <div className="flex justify-between">
                      <h4 className="font-medium flex items-start">
                        <button 
                          onClick={() => toggleLabCompletion(lab.id)}
                          className={`w-6 h-6 mr-2 rounded flex items-center justify-center ${
                            completedLabs.includes(lab.id) 
                              ? 'bg-cyber-accent text-white' 
                              : 'bg-cyber-medium text-muted-foreground border border-cyber-light'
                          }`}
                        >
                          {completedLabs.includes(lab.id) && <Check className="w-4 h-4" />}
                        </button>
                        Lab {lab.id}: {lab.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-muted-foreground">{lab.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LabComponent;
