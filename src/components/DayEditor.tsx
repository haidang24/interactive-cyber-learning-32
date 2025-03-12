
import React, { useState } from 'react';
import { PenSquare, Trash2, ChevronDown, Plus, Save, X } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCourseStore } from '@/store/courseStore';
import { useToast } from '@/hooks/use-toast';

const DayEditor = () => {
  const { days, addTheoryPoint, updateTheoryPoint, removeTheoryPoint, addLab, updateLab, removeLab } = useCourseStore();
  const { toast } = useToast();
  
  const [editingTheory, setEditingTheory] = useState<string | null>(null);
  const [editingLab, setEditingLab] = useState<string | null>(null);
  const [theoryText, setTheoryText] = useState('');
  const [labTitle, setLabTitle] = useState('');
  const [labDescription, setLabDescription] = useState('');
  
  const [newTheoryText, setNewTheoryText] = useState('');
  const [newLabTitle, setNewLabTitle] = useState('');
  const [newLabDescription, setNewLabDescription] = useState('');
  const [showNewTheory, setShowNewTheory] = useState(false);
  const [showNewLab, setShowNewLab] = useState(false);

  const handleEditTheory = (dayId: number, pointId: string, text: string) => {
    setEditingTheory(`${dayId}-${pointId}`);
    setTheoryText(text);
  };

  const handleSaveTheory = (dayId: number, pointId: string) => {
    updateTheoryPoint(dayId, pointId, theoryText);
    setEditingTheory(null);
    setTheoryText('');
    toast({
      title: "Lưu thành công",
      description: "Đã cập nhật nội dung lý thuyết",
    });
  };

  const handleDeleteTheory = (dayId: number, pointId: string) => {
    removeTheoryPoint(dayId, pointId);
    toast({
      title: "Xóa thành công",
      description: "Đã xóa mục lý thuyết",
    });
  };

  const handleAddTheory = (dayId: number) => {
    if (newTheoryText.trim() === '') {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung lý thuyết",
        variant: "destructive",
      });
      return;
    }
    
    addTheoryPoint(dayId, newTheoryText);
    setNewTheoryText('');
    setShowNewTheory(false);
    toast({
      title: "Thêm thành công",
      description: "Đã thêm mục lý thuyết mới",
    });
  };

  const handleEditLab = (dayId: number, labId: string, title: string, description: string) => {
    setEditingLab(`${dayId}-${labId}`);
    setLabTitle(title);
    setLabDescription(description);
  };

  const handleSaveLab = (dayId: number, labId: string) => {
    updateLab(dayId, labId, labTitle, labDescription);
    setEditingLab(null);
    setLabTitle('');
    setLabDescription('');
    toast({
      title: "Lưu thành công",
      description: "Đã cập nhật bài lab",
    });
  };

  const handleDeleteLab = (dayId: number, labId: string) => {
    removeLab(dayId, labId);
    toast({
      title: "Xóa thành công", 
      description: "Đã xóa bài lab",
    });
  };

  const handleAddLab = (dayId: number) => {
    if (newLabTitle.trim() === '' || newLabDescription.trim() === '') {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tiêu đề và mô tả",
        variant: "destructive",
      });
      return;
    }
    
    addLab(dayId, newLabTitle, newLabDescription);
    setNewLabTitle('');
    setNewLabDescription('');
    setShowNewLab(false);
    toast({
      title: "Thêm thành công",
      description: "Đã thêm bài lab mới",
    });
  };

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <Card key={day.id} className="bg-cyber-medium border-cyber-light">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Ngày {day.id}: {day.title}</CardTitle>
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
            <Accordion type="multiple" className="w-full">
              <AccordionItem value={`theory-${day.id}`}>
                <AccordionTrigger>Lý thuyết</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-4">
                    {day.theory.map((point) => (
                      <div key={point.id} className="group relative">
                        {editingTheory === `${day.id}-${point.id}` ? (
                          <div className="flex flex-col gap-2">
                            <Textarea 
                              value={theoryText} 
                              onChange={(e) => setTheoryText(e.target.value)}
                              className="min-h-20 bg-cyber-dark"
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingTheory(null)}
                              >
                                <X className="h-4 w-4 mr-1" /> Hủy
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleSaveTheory(day.id, point.id)}
                              >
                                <Save className="h-4 w-4 mr-1" /> Lưu
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start group">
                            <p className="flex-grow">• {point.text}</p>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => handleEditTheory(day.id, point.id, point.text)}
                              >
                                <PenSquare className="h-3 w-3 text-cyber-accent" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7"
                                onClick={() => handleDeleteTheory(day.id, point.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {showNewTheory ? (
                      <div className="mt-4">
                        <Textarea 
                          placeholder="Nhập nội dung lý thuyết mới..." 
                          value={newTheoryText} 
                          onChange={(e) => setNewTheoryText(e.target.value)}
                          className="min-h-20 bg-cyber-dark"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setShowNewTheory(false);
                              setNewTheoryText('');
                            }}
                          >
                            <X className="h-4 w-4 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleAddTheory(day.id)}
                          >
                            <Save className="h-4 w-4 mr-1" /> Thêm
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setShowNewTheory(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm mục
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value={`labs-${day.id}`}>
                <AccordionTrigger>Bài lab</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    {day.labs.map((lab) => (
                      <div key={lab.id} className="group relative bg-cyber-dark p-4 rounded border border-cyber-light">
                        {editingLab === `${day.id}-${lab.id}` ? (
                          <div className="flex flex-col gap-2">
                            <Input 
                              value={labTitle} 
                              onChange={(e) => setLabTitle(e.target.value)}
                              className="bg-cyber-medium"
                              placeholder="Tiêu đề lab"
                            />
                            <Textarea 
                              value={labDescription} 
                              onChange={(e) => setLabDescription(e.target.value)}
                              className="min-h-20 bg-cyber-medium"
                              placeholder="Mô tả chi tiết"
                            />
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingLab(null)}
                              >
                                <X className="h-4 w-4 mr-1" /> Hủy
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleSaveLab(day.id, lab.id)}
                              >
                                <Save className="h-4 w-4 mr-1" /> Lưu
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg font-medium">{lab.title}</h4>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7"
                                  onClick={() => handleEditLab(day.id, lab.id, lab.title, lab.description)}
                                >
                                  <PenSquare className="h-3 w-3 text-cyber-accent" />
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteLab(day.id, lab.id)}
                                >
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-2 text-muted-foreground">{lab.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {showNewLab ? (
                      <div className="mt-4 bg-cyber-dark p-4 rounded border border-cyber-light">
                        <Input 
                          placeholder="Tiêu đề bài lab" 
                          value={newLabTitle} 
                          onChange={(e) => setNewLabTitle(e.target.value)}
                          className="bg-cyber-medium mb-2"
                        />
                        <Textarea 
                          placeholder="Mô tả chi tiết bài lab..." 
                          value={newLabDescription} 
                          onChange={(e) => setNewLabDescription(e.target.value)}
                          className="min-h-20 bg-cyber-medium"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setShowNewLab(false);
                              setNewLabTitle('');
                              setNewLabDescription('');
                            }}
                          >
                            <X className="h-4 w-4 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleAddLab(day.id)}
                          >
                            <Save className="h-4 w-4 mr-1" /> Thêm
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setShowNewLab(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm bài lab
                      </Button>
                    )}
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
