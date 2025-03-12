
import React from 'react';
import { Terminal, Server, Search, Shield, Box, BarChart, Target, Trophy } from 'lucide-react';
import DayCard from './DayCard';

const CourseContent = () => {
  const days = [
    {
      day: 1,
      title: "NETWORKING & OPERATING SYSTEM FUNDAMENTALS",
      description: "Hiểu sâu về mô hình mạng, giao thức và lệnh hệ thống làm nền tảng cho phân tích sự cố.",
      level: "basic" as const,
      icon: <Terminal className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 2,
      title: "LOGGING & SIEM (SPLUNK, ELK, QRADAR)",
      description: "Nắm vững cách thu thập, lưu trữ và phân tích log để phát hiện sự kiện bất thường.",
      level: "basic" as const,
      icon: <Server className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 3,
      title: "MALWARE ANALYSIS & THREAT HUNTING",
      description: "Phát hiện, phân tích mã độc và áp dụng MITRE ATT&CK để săn mối đe dọa.",
      level: "advanced" as const,
      icon: <Search className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 4,
      title: "INCIDENT RESPONSE & DIGITAL FORENSICS",
      description: "Nắm quy trình phản ứng sự cố và áp dụng công cụ pháp y số để điều tra.",
      level: "advanced" as const,
      icon: <Shield className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 5,
      title: "SOC OPERATIONS & AUTOMATION (SOAR)",
      description: "Tích hợp và tự động hóa quy trình điều tra, nâng cao hiệu quả SOC.",
      level: "senior" as const,
      icon: <Box className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 6,
      title: "RED TEAM VS BLUE TEAM & ADVERSARY SIMULATION",
      description: "Hiểu chiến thuật tấn công của Red Team và phản ứng của Blue Team qua mô phỏng.",
      level: "senior" as const,
      icon: <Target className="h-5 w-5 text-cyber-accent" />,
    },
    {
      day: 7,
      title: "CAPTURE THE FLAG (CTF) & CASE STUDIES",
      description: "Tích hợp kiến thức qua CTF và phân tích case study thực tế.",
      level: "senior" as const,
      icon: <Trophy className="h-5 w-5 text-cyber-accent" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BarChart className="mr-2 text-cyber-accent" />
        Chi tiết chương trình
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day) => (
          <DayCard
            key={day.day}
            day={day.day}
            title={day.title}
            description={day.description}
            level={day.level}
            icon={day.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
