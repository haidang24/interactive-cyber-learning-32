
import React, { useState, useEffect } from 'react';
import { Shield, Plus, Save, X, Download, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DayEditor from '@/components/DayEditor';
import Header from '@/components/Header';
import { useCourseStore } from '@/store/courseStore';
import { useToast } from '@/hooks/use-toast';
import courseDataJson from '@/data/courseData.json';

const Dashboard = () => {
  const { days, setDays } = useCourseStore();
  const { toast } = useToast();
  const [showNewDay, setShowNewDay] = useState(false);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [newDayLevel, setNewDayLevel] = useState<'Cơ bản' | 'Chuyên sâu' | 'Senior'>('Cơ bản');
  
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Load data from courseData.json on component mount
  useEffect(() => {
    if (!isLoggedIn) return;
    
    // Transform the JSON data to match the store format
    const transformedData = Object.entries(courseDataJson).map(([dayNumber, dayData]) => ({
      id: parseInt(dayNumber),
      title: dayData.title,
      level: dayData.level as 'Cơ bản' | 'Chuyên sâu' | 'Senior',
      theory: dayData.theory.map((item, index) => ({
        id: `theory-${index}`,
        text: item.text
      })),
      labs: dayData.labs
    }));
    
    // Set the transformed data to the store
    setDays(transformedData);
  }, [setDays, isLoggedIn]);

  const handleLogin = () => {
    // Simple login validation - in a real app, this would be a proper authentication system
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setLoginError('');
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng đến với SOC Masterclass Dashboard",
      });
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không đúng');
      toast({
        title: "Đăng nhập thất bại",
        description: "Vui lòng kiểm tra lại thông tin đăng nhập",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setUsername('');
    setPassword('');
    toast({
      title: "Đã đăng xuất",
      description: "Bạn đã đăng xuất khỏi hệ thống",
    });
  };

  // Function to transform current state back to JSON format and save
  const saveToJsonFormat = () => {
    // Transform the current state back to the original JSON format
    const jsonFormat = days.reduce((acc, day) => {
      acc[day.id] = {
        title: day.title,
        level: day.level,
        objective: (courseDataJson as any)[day.id]?.objective || "",
        theory: day.theory.map(t => ({ text: t.text })),
        labs: day.labs,
        expectedResult: (courseDataJson as any)[day.id]?.expectedResult || "",
        icon: (courseDataJson as any)[day.id]?.icon || "Terminal"
      };
      return acc;
    }, {} as Record<string, any>);

    // Create a downloadable JSON file
    const jsonData = JSON.stringify(jsonFormat, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "courseData.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Xuất dữ liệu thành công",
      description: "Đã xuất dữ liệu khóa học thành file JSON. Hãy thay thế file courseData.json trong thư mục src/data/",
      duration: 5000,
    });
  };

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

  // Render login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-[400px] bg-cyber-medium">
            <CardHeader>
              <CardTitle className="text-xl font-bold">SOC Masterclass Dashboard</CardTitle>
              <CardDescription>Đăng nhập để quản lý nội dung khóa học</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">Tên đăng nhập</label>
                  <Input
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-cyber-dark"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-cyber-dark"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm">{loginError}</div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-cyber-accent hover:bg-cyber-accentLight"
                onClick={handleLogin}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

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
            <Button 
              variant="outline"
              className="bg-cyber-medium hover:bg-cyber-light"
              onClick={saveToJsonFormat}
            >
              <Download className="h-4 w-4 mr-2" />
              Lưu thay đổi vào JSON
            </Button>
            
            <Button 
              variant="outline"
              className="bg-cyber-medium hover:bg-cyber-light"
              onClick={handleLogout}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Đăng xuất
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
