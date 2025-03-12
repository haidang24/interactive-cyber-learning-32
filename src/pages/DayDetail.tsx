
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Terminal, Server, Search, Shield, Box, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TheoryComponent from '@/components/TheoryComponent';
import LabComponent from '@/components/LabComponent';
import { Card, CardContent } from '@/components/ui/card';

interface DayData {
  title: string;
  level: 'Cơ bản' | 'Chuyên sâu' | 'Senior';
  objective: string;
  theory: { text: string }[];
  labs: { id: number; title: string; description: string }[];
  expectedResult: string;
  icon: React.ReactNode;
}

const DayDetail = () => {
  const { day } = useParams<{ day: string }>();
  const dayNumber = parseInt(day || '1');
  
  const courseData: Record<number, DayData> = {
    1: {
      title: "NETWORKING & OPERATING SYSTEM FUNDAMENTALS",
      level: "Cơ bản",
      objective: "Hiểu sâu về mô hình mạng, giao thức và lệnh hệ thống làm nền tảng cho phân tích sự cố.",
      theory: [
        { text: "Giới thiệu mô hình OSI, TCP/IP và các giao thức quan trọng (HTTP/HTTPS, DNS, SMTP, SNMP)." },
        { text: "Kiến thức chi tiết về Linux (các lệnh: grep, tcpdump, netstat, iptables, systemctl) và Windows (Event Viewer, PowerShell, Task Manager, Windows Firewall)." },
        { text: "Phân tích cấu trúc gói tin: IP, TCP, UDP, ICMP và quy trình kết nối (TCP 3-way handshake)." },
        { text: "Giới thiệu kiến trúc zero-trust: Xác thực liên tục và kiểm soát truy cập." },
      ],
      labs: [
        { id: 1, title: "Sử dụng Wireshark (phiên bản 4.2.3)", description: "Bắt gói tin HTTP/HTTPS, áp dụng bộ lọc nâng cao (ví dụ: http.request.method == 'POST') để phân tích luồng dữ liệu." },
        { id: 2, title: "Thực hành trên Linux", description: "Kiểm tra cấu hình mạng (ifconfig, ip), xác định kết nối (netstat -tulnp), tạo luật lọc bằng iptables." },
        { id: 3, title: "Trên Windows", description: "Dùng PowerShell để truy xuất log hệ thống (Get-EventLog), cấu hình Windows Firewall qua GUI và lệnh netsh." },
        { id: 4, title: "Mô phỏng kiểm soát truy cập zero-trust", description: "Trên Linux bằng cách cấu hình iptables để chỉ cho phép kết nối từ IP cụ thể." },
      ],
      expectedResult: "Học viên có thể phân tích gói tin, kiểm tra cấu hình mạng và áp dụng biện pháp bảo mật cơ bản.",
      icon: <Terminal className="h-6 w-6 text-cyber-accent" />,
    },
    2: {
      title: "LOGGING & SIEM (SPLUNK, ELK, QRADAR)",
      level: "Cơ bản",
      objective: "Nắm vững cách thu thập, lưu trữ và phân tích log để phát hiện sự kiện bất thường.",
      theory: [
        { text: "Phân loại log: Syslog, JSON, Windows Event Log, CEF." },
        { text: "Kiến trúc SIEM: Xây dựng quy tắc (rule), dashboard và phân tích tương quan (correlation)." },
        { text: "Giới thiệu các công cụ: Splunk (v9.4.1), ELK Stack (v8.17.3), QRadar (v7.5.0 Update Package 8)." },
      ],
      labs: [
        { id: 1, title: "Cài đặt Splunk/ELK", description: "Cấu hình forwarder trên Linux (/etc/syslog.conf) và Windows (Universal Forwarder) để thu thập log." },
        { id: 2, title: "Xây dựng dashboard tùy chỉnh trong Splunk", description: "Theo dõi log từ tường lửa, IDS và máy chủ (ví dụ: biểu đồ số lần đăng nhập thất bại)." },
        { id: 3, title: "Viết quy tắc correlation trong QRadar", description: "Phát hiện tấn công brute-force (ví dụ: 10 lần đăng nhập thất bại trong 5 phút)." },
        { id: 4, title: "Phân tích log Windows Event", description: "Phát hiện các sự kiện đăng nhập đáng ngờ (ví dụ: Event ID 4624)." },
      ],
      expectedResult: "Học viên tự tin triển khai SIEM, phân tích log và tạo báo cáo giám sát an ninh.",
      icon: <Server className="h-6 w-6 text-cyber-accent" />,
    },
    3: {
      title: "MALWARE ANALYSIS & THREAT HUNTING",
      level: "Chuyên sâu",
      objective: "Phát hiện, phân tích mã độc và áp dụng MITRE ATT&CK để săn mối đe dọa.",
      theory: [
        { text: "Kỹ thuật phân tích mã độc: Static (hash, strings) và Dynamic (sandbox, hành vi)." },
        { text: "Khái niệm IOC (Indicators of Compromise) và ứng dụng MITRE ATT&CK Framework (v14)." },
        { text: "Công cụ: ANY.RUN (v2025), VirusTotal, YARA (v4.5.0), Ghidra (v11.0)." },
      ],
      labs: [
        { id: 1, title: "Phân tích file nghi vấn", description: "Qua ANY.RUN và VirusTotal, ghi nhận IOC (hash MD5, SHA256, C2 IP)." },
        { id: 2, title: "Viết quy tắc YARA", description: "Phát hiện mã độc dựa trên chuỗi đặc trưng (ví dụ: $magic = {4D 5A})." },
        { id: 3, title: "Xây dựng kịch bản threat hunting trong ELK", description: "So sánh log trước/sau tấn công, ánh xạ theo MITRE ATT&CK (T1078 – Valid Accounts)." },
        { id: 4, title: "Sử dụng Ghidra", description: "Phân tích mã độc, xác định các hàm đáng ngờ và kỹ thuật mã hóa." },
      ],
      expectedResult: "Học viên xác định mã độc, xây dựng quy tắc phát hiện và ứng dụng framework săn mối đe dọa.",
      icon: <Search className="h-6 w-6 text-cyber-accent" />,
    },
    4: {
      title: "INCIDENT RESPONSE & DIGITAL FORENSICS",
      level: "Chuyên sâu",
      objective: "Nắm quy trình phản ứng sự cố và áp dụng công cụ pháp y số để điều tra.",
      theory: [
        { text: "Quy trình Incident Response (NIST SP 800-61): Chuẩn bị, Phát hiện, Cách ly, Khắc phục, Phục hồi." },
        { text: "Pháp y số: Công cụ Volatility (v3.2.1.0), Autopsy (v4.21.0), FTK Imager (v4.7.3.81)." },
        { text: "Phản ứng sự cố trong đám mây (AWS CloudTrail, Azure Sentinel)." },
        { text: "Pháp y số trên thiết bị di động và IoT." },
      ],
      labs: [
        { id: 1, title: "Thu thập và phân tích memory dump bằng Volatility", description: "vol.py -f memory.dmp pslist để phát hiện tiến trình nghi ngờ." },
        { id: 2, title: "Sử dụng Autopsy", description: "Kiểm tra hệ thống file, truy xuất browser history và phân tích Windows Registry." },
        { id: 3, title: "Phân tích log AWS CloudTrail", description: "Phát hiện truy cập trái phép, soạn báo cáo sự cố với khuyến nghị khắc phục." },
        { id: 4, title: "Thu thập và phân tích dữ liệu từ thiết bị di động", description: "Ví dụ: Android bằng công cụ như ADB và Cellebrite." },
      ],
      expectedResult: "Học viên thu thập chứng cứ, phân tích dữ liệu pháp y và soạn báo cáo điều tra chuyên nghiệp.",
      icon: <Shield className="h-6 w-6 text-cyber-accent" />,
    },
    5: {
      title: "SOC OPERATIONS & AUTOMATION (SOAR)",
      level: "Senior",
      objective: "Tích hợp và tự động hóa quy trình điều tra, nâng cao hiệu quả SOC.",
      theory: [
        { text: "Cấu trúc SOC hiện đại: Vai trò Tier 1, Tier 2, Tier 3 và luồng công việc." },
        { text: "SOAR: Lợi ích và công cụ như Cortex XSOAR (v8.9), Splunk SOAR." },
        { text: "Ứng dụng AI trong tự động hóa: Phát hiện bất thường bằng máy học." },
      ],
      labs: [
        { id: 1, title: "Phát triển playbook Python tự động gửi email cảnh báo", description: "Khi phát hiện sự cố (dùng thư viện smtplib)." },
        { id: 2, title: "Tích hợp cảnh báo từ Splunk vào Cortex XSOAR", description: "Tự động hóa điều tra (ví dụ: kiểm tra IP qua VirusTotal)." },
        { id: 3, title: "Thiết lập script tự động phân tích log", description: "Đặt ngưỡng cảnh báo (ví dụ: >100 request/phút) và đề xuất can thiệp." },
        { id: 4, title: "Sử dụng máy học", description: "Ví dụ: scikit-learn để phát hiện bất thường trong log truy cập web." },
      ],
      expectedResult: "Học viên xây dựng giải pháp tự động hóa, giảm thời gian phản ứng và nâng cao hiệu quả SOC.",
      icon: <Box className="h-6 w-6 text-cyber-accent" />,
    },
    6: {
      title: "RED TEAM VS BLUE TEAM & ADVERSARY SIMULATION",
      level: "Senior",
      objective: "Hiểu chiến thuật tấn công của Red Team và phản ứng của Blue Team qua mô phỏng.",
      theory: [
        { text: "Phân tích TTPs (Tactics, Techniques, Procedures) của kẻ tấn công." },
        { text: "Công cụ tấn công: Metasploit (v6.4), Mimikatz, Cobalt Strike." },
        { text: "Công cụ phòng thủ: Sysmon (v15.14), EDR (CrowdStrike, SentinelOne)." },
        { text: "Mô phỏng tấn công vào thiết bị IoT." },
      ],
      labs: [
        { id: 1, title: "Mô phỏng tấn công phishing và khai thác lỗ hổng", description: "Bằng Metasploit, theo dõi phản ứng từ SIEM." },
        { id: 2, title: "Phân tích log tấn công qua Sysmon", description: "Xác định hành vi bất thường (ví dụ: mimikatz.exe chạy)." },
        { id: 3, title: "Thực hành Atomic Red Team", description: "T1059 – Command and Scripting Interpreter, chạy playbook tự động phản ứng." },
        { id: 4, title: "Mô phỏng tấn công vào thiết bị IoT", description: "Ví dụ: camera IP, phát hiện và phản ứng từ Blue Team." },
      ],
      expectedResult: "Học viên hiểu quy trình tấn công – phòng thủ, phát triển kỹ năng phân tích và đề xuất giải pháp kịp thời.",
      icon: <Target className="h-6 w-6 text-cyber-accent" />,
    },
    7: {
      title: "CAPTURE THE FLAG (CTF) & CASE STUDIES",
      level: "Senior",
      objective: "Tích hợp kiến thức qua CTF và phân tích case study thực tế.",
      theory: [
        { text: "Tổng kết qua case study: SolarWinds (chuỗi cung ứng, 2024), Log4j (vẫn khai thác, 2025), Hafnium." },
        { text: "Bài học: Quản lý chuỗi cung ứng, phát hiện sớm lỗ hổng." },
      ],
      labs: [
        { id: 1, title: "Tham gia CTF", description: "Phân tích log, xác định dấu hiệu tấn công (ví dụ: shellcode trong log IIS)." },
        { id: 2, title: "Soạn báo cáo phân tích case study SolarWinds", description: "Với khuyến nghị cải tiến SIEM." },
        { id: 3, title: "Thảo luận nhóm", description: "So sánh kết quả, rút bài học và đề xuất giải pháp bảo mật." },
      ],
      expectedResult: "Học viên ứng dụng kiến thức vào thực tiễn, soạn báo cáo chuyên nghiệp và cải thiện hệ thống bảo mật.",
      icon: <Trophy className="h-6 w-6 text-cyber-accent" />,
    },
  };

  const currentDay = courseData[dayNumber];
  
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
              {currentDay.icon}
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
