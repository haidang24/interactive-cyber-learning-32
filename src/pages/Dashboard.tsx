
import React, { useState, useRef } from 'react';
import { Shield, Plus, Save, X, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DayEditor from '@/components/DayEditor';
import Header from '@/components/Header';
import { useCourseStore } from '@/store/courseStore';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { days, setDays } = useCourseStore();
  const { toast } = useToast();
  const [showNewDay, setShowNewDay] = useState(false);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [newDayLevel, setNewDayLevel] = useState<'Cơ bản' | 'Chuyên sâu' | 'Senior'>('Cơ bản');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddDay = () => {
    if (newDayTitle.trim() === '') {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tiêu đề ngày học",
        variant: "destructive",
      });
      return;
    }

    const newDay = {
      id: days.length > 0 ? Math.max(...days.map(d => d.id)) + 1 : 1,
      title: newDayTitle,
      level: newDayLevel,
      theory: [],
      labs: []
    };

    setDays([...days, newDay]);
    setNewDayTitle('');
    setShowNewDay(false);
    toast({
      title: "Thêm thành công",
      description: `Đã thêm Ngày ${newDay.id}: ${newDayTitle}`,
    });
  };

  const handleExportToJson = () => {
    const jsonData = JSON.stringify(days, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "soc_masterclass_content.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Xuất dữ liệu thành công",
      description: "Đã xuất dữ liệu khóa học thành file JSON",
    });
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        if (Array.isArray(importedData)) {
          setDays(importedData);
          toast({
            title: "Nhập dữ liệu thành công",
            description: `Đã nhập ${importedData.length} ngày học từ file JSON`,
          });
        } else {
          throw new Error("Dữ liệu không đúng định dạng");
        }
      } catch (error) {
        toast({
          title: "Lỗi nhập dữ liệu",
          description: "File JSON không đúng định dạng",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset input để có thể chọn lại cùng một file
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyber-accent" />
            <h1 className="text-2xl font-bold">SOC Masterclass Dashboard</h1>
          </div>
          
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".json"
              className="hidden"
            />
            
            <Button 
              variant="outline"
              className="bg-cyber-medium hover:bg-cyber-light"
              onClick={handleImportClick}
            >
              <Upload className="h-4 w-4 mr-2" />
              Nhập file JSON
            </Button>
            
            <Button 
              variant="outline"
              className="bg-cyber-medium hover:bg-cyber-light"
              onClick={handleExportToJson}
            >
              <Download className="h-4 w-4 mr-2" />
              Xuất dữ liệu JSON
            </Button>
            
            {showNewDay ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Tiêu đề ngày học mới"
                  value={newDayTitle}
                  onChange={(e) => setNewDayTitle(e.target.value)}
                  className="w-64 bg-cyber-medium"
                />
                <Select value={newDayLevel} onValueChange={(value: any) => setNewDayLevel(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cơ bản">Cơ bản</SelectItem>
                    <SelectItem value="Chuyên sâu">Chuyên sâu</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    setShowNewDay(false);
                    setNewDayTitle('');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  className="bg-cyber-accent hover:bg-cyber-accentLight"
                  onClick={handleAddDay}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Lưu
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-cyber-accent hover:bg-cyber-accentLight"
                onClick={() => setShowNewDay(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm ngày học mới
              </Button>
            )}
          </div>
        </div>
        <DayEditor />
      </main>
    </div>
  );
};

export default Dashboard;
