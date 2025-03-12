
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TheoryPoint {
  id: string;
  text: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
}

export interface Day {
  id: number;
  title: string;
  level: 'Cơ bản' | 'Chuyên sâu' | 'Senior';
  theory: TheoryPoint[];
  labs: Lab[];
}

interface CourseState {
  days: Day[];
  setDays: (days: Day[]) => void;
  updateDay: (id: number, day: Partial<Day>) => void;
  addTheoryPoint: (dayId: number, text: string) => void;
  updateTheoryPoint: (dayId: number, pointId: string, text: string) => void;
  removeTheoryPoint: (dayId: number, pointId: string) => void;
  addLab: (dayId: number, title: string, description: string) => void;
  updateLab: (dayId: number, labId: string, title: string, description: string) => void;
  removeLab: (dayId: number, labId: string) => void;
}

// Initial course data
const initialDays: Day[] = [
  {
    id: 1,
    title: "NETWORKING & OPERATING SYSTEM FUNDAMENTALS",
    level: "Cơ bản",
    theory: [
      { id: "t1-1", text: "Giới thiệu mô hình OSI, TCP/IP và các giao thức quan trọng (HTTP/HTTPS, DNS, SMTP, SNMP)." },
      { id: "t1-2", text: "Kiến thức chi tiết về Linux (các lệnh: grep, tcpdump, netstat, iptables, systemctl) và Windows (Event Viewer, PowerShell, Task Manager, Windows Firewall)." },
      { id: "t1-3", text: "Phân tích cấu trúc gói tin: IP, TCP, UDP, ICMP và quy trình kết nối (TCP 3-way handshake)." },
      { id: "t1-4", text: "Giới thiệu kiến trúc zero-trust: Xác thực liên tục và kiểm soát truy cập." },
    ],
    labs: [
      { id: "l1-1", title: "Sử dụng Wireshark (phiên bản 4.2.3)", description: "Bắt gói tin HTTP/HTTPS, áp dụng bộ lọc nâng cao (ví dụ: http.request.method == 'POST') để phân tích luồng dữ liệu." },
      { id: "l1-2", title: "Thực hành trên Linux", description: "Kiểm tra cấu hình mạng (ifconfig, ip), xác định kết nối (netstat -tulnp), tạo luật lọc bằng iptables." },
      { id: "l1-3", title: "Trên Windows", description: "Dùng PowerShell để truy xuất log hệ thống (Get-EventLog), cấu hình Windows Firewall qua GUI và lệnh netsh." },
      { id: "l1-4", title: "Mô phỏng kiểm soát truy cập zero-trust", description: "Trên Linux bằng cách cấu hình iptables để chỉ cho phép kết nối từ IP cụ thể." },
    ],
  },
  {
    id: 2,
    title: "LOGGING & SIEM (SPLUNK, ELK, QRADAR)",
    level: "Cơ bản",
    theory: [
      { id: "t2-1", text: "Phân loại log: Syslog, JSON, Windows Event Log, CEF." },
      { id: "t2-2", text: "Kiến trúc SIEM: Xây dựng quy tắc (rule), dashboard và phân tích tương quan (correlation)." },
      { id: "t2-3", text: "Giới thiệu các công cụ: Splunk (v9.4.1), ELK Stack (v8.17.3), QRadar (v7.5.0 Update Package 8)." },
    ],
    labs: [
      { id: "l2-1", title: "Cài đặt Splunk/ELK", description: "Cấu hình forwarder trên Linux (/etc/syslog.conf) và Windows (Universal Forwarder) để thu thập log." },
      { id: "l2-2", title: "Xây dựng dashboard tùy chỉnh trong Splunk", description: "Theo dõi log từ tường lửa, IDS và máy chủ (ví dụ: biểu đồ số lần đăng nhập thất bại)." },
      { id: "l2-3", title: "Viết quy tắc correlation trong QRadar", description: "Phát hiện tấn công brute-force (ví dụ: 10 lần đăng nhập thất bại trong 5 phút)." },
      { id: "l2-4", title: "Phân tích log Windows Event", description: "Phát hiện các sự kiện đăng nhập đáng ngờ (ví dụ: Event ID 4624)." },
    ],
  },
  // Additional days...
  {
    id: 3,
    title: "MALWARE ANALYSIS & THREAT HUNTING",
    level: "Chuyên sâu",
    theory: [
      { id: "t3-1", text: "Kỹ thuật phân tích mã độc: Static (hash, strings) và Dynamic (sandbox, hành vi)." },
      { id: "t3-2", text: "Khái niệm IOC (Indicators of Compromise) và ứng dụng MITRE ATT&CK Framework (v14)." },
      { id: "t3-3", text: "Công cụ: ANY.RUN (v2025), VirusTotal, YARA (v4.5.0), Ghidra (v11.0)." },
    ],
    labs: [
      { id: "l3-1", title: "Phân tích file nghi vấn", description: "Qua ANY.RUN và VirusTotal, ghi nhận IOC (hash MD5, SHA256, C2 IP)." },
      { id: "l3-2", title: "Viết quy tắc YARA", description: "Phát hiện mã độc dựa trên chuỗi đặc trưng (ví dụ: $magic = {4D 5A})." },
      { id: "l3-3", title: "Xây dựng kịch bản threat hunting trong ELK", description: "So sánh log trước/sau tấn công, ánh xạ theo MITRE ATT&CK (T1078 – Valid Accounts)." },
      { id: "l3-4", title: "Sử dụng Ghidra", description: "Phân tích mã độc, xác định các hàm đáng ngờ và kỹ thuật mã hóa." },
    ],
  },
  {
    id: 4,
    title: "INCIDENT RESPONSE & DIGITAL FORENSICS",
    level: "Chuyên sâu",
    theory: [
      { id: "t4-1", text: "Quy trình Incident Response (NIST SP 800-61): Chuẩn bị, Phát hiện, Cách ly, Khắc phục, Phục hồi." },
      { id: "t4-2", text: "Pháp y số: Công cụ Volatility (v3.2.1.0), Autopsy (v4.21.0), FTK Imager (v4.7.3.81)." },
      { id: "t4-3", text: "Phản ứng sự cố trong đám mây (AWS CloudTrail, Azure Sentinel)." },
      { id: "t4-4", text: "Pháp y số trên thiết bị di động và IoT." },
    ],
    labs: [
      { id: "l4-1", title: "Thu thập và phân tích memory dump bằng Volatility", description: "vol.py -f memory.dmp pslist để phát hiện tiến trình nghi ngờ." },
      { id: "l4-2", title: "Sử dụng Autopsy", description: "Kiểm tra hệ thống file, truy xuất browser history và phân tích Windows Registry." },
      { id: "l4-3", title: "Phân tích log AWS CloudTrail", description: "Phát hiện truy cập trái phép, soạn báo cáo sự cố với khuyến nghị khắc phục." },
      { id: "l4-4", title: "Thu thập và phân tích dữ liệu từ thiết bị di động", description: "Ví dụ: Android bằng công cụ như ADB và Cellebrite." },
    ],
  },
  {
    id: 5,
    title: "SOC OPERATIONS & AUTOMATION (SOAR)",
    level: "Senior",
    theory: [
      { id: "t5-1", text: "Cấu trúc SOC hiện đại: Vai trò Tier 1, Tier 2, Tier 3 và luồng công việc." },
      { id: "t5-2", text: "SOAR: Lợi ích và công cụ như Cortex XSOAR (v8.9), Splunk SOAR." },
      { id: "t5-3", text: "Ứng dụng AI trong tự động hóa: Phát hiện bất thường bằng máy học." },
    ],
    labs: [
      { id: "l5-1", title: "Phát triển playbook Python tự động gửi email cảnh báo", description: "Khi phát hiện sự cố (dùng thư viện smtplib)." },
      { id: "l5-2", title: "Tích hợp cảnh báo từ Splunk vào Cortex XSOAR", description: "Tự động hóa điều tra (ví dụ: kiểm tra IP qua VirusTotal)." },
      { id: "l5-3", title: "Thiết lập script tự động phân tích log", description: "Đặt ngưỡng cảnh báo (ví dụ: >100 request/phút) và đề xuất can thiệp." },
      { id: "l5-4", title: "Sử dụng máy học", description: "Ví dụ: scikit-learn để phát hiện bất thường trong log truy cập web." },
    ],
  },
  {
    id: 6,
    title: "RED TEAM VS BLUE TEAM & ADVERSARY SIMULATION",
    level: "Senior",
    theory: [
      { id: "t6-1", text: "Phân tích TTPs (Tactics, Techniques, Procedures) của kẻ tấn công." },
      { id: "t6-2", text: "Công cụ tấn công: Metasploit (v6.4), Mimikatz, Cobalt Strike." },
      { id: "t6-3", text: "Công cụ phòng thủ: Sysmon (v15.14), EDR (CrowdStrike, SentinelOne)." },
      { id: "t6-4", text: "Mô phỏng tấn công vào thiết bị IoT." },
    ],
    labs: [
      { id: "l6-1", title: "Mô phỏng tấn công phishing và khai thác lỗ hổng", description: "Bằng Metasploit, theo dõi phản ứng từ SIEM." },
      { id: "l6-2", title: "Phân tích log tấn công qua Sysmon", description: "Xác định hành vi bất thường (ví dụ: mimikatz.exe chạy)." },
      { id: "l6-3", title: "Thực hành Atomic Red Team", description: "T1059 – Command and Scripting Interpreter, chạy playbook tự động phản ứng." },
      { id: "l6-4", title: "Mô phỏng tấn công vào thiết bị IoT", description: "Ví dụ: camera IP, phát hiện và phản ứng từ Blue Team." },
    ],
  },
  {
    id: 7,
    title: "CAPTURE THE FLAG (CTF) & CASE STUDIES",
    level: "Senior",
    theory: [
      { id: "t7-1", text: "Tổng kết qua case study: SolarWinds (chuỗi cung ứng, 2024), Log4j (vẫn khai thác, 2025), Hafnium." },
      { id: "t7-2", text: "Bài học: Quản lý chuỗi cung ứng, phát hiện sớm lỗ hổng." },
    ],
    labs: [
      { id: "l7-1", title: "Tham gia CTF", description: "Phân tích log, xác định dấu hiệu tấn công (ví dụ: shellcode trong log IIS)." },
      { id: "l7-2", title: "Soạn báo cáo phân tích case study SolarWinds", description: "Với khuyến nghị cải tiến SIEM." },
      { id: "l7-3", title: "Thảo luận nhóm", description: "So sánh kết quả, rút bài học và đề xuất giải pháp bảo mật." },
    ],
  },
];

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      days: initialDays,
      setDays: (days) => set({ days }),
      updateDay: (id, updatedDay) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === id);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = { ...newDays[dayIndex], ...updatedDay };
          set({ days: newDays });
        }
      },
      addTheoryPoint: (dayId, text) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          const newPoint = { id: `t${dayId}-${Date.now()}`, text };
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            theory: [...newDays[dayIndex].theory, newPoint]
          };
          set({ days: newDays });
        }
      },
      updateTheoryPoint: (dayId, pointId, text) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const theoryPoints = days[dayIndex].theory;
          const pointIndex = theoryPoints.findIndex(point => point.id === pointId);
          if (pointIndex !== -1) {
            const newDays = [...days];
            const newTheory = [...theoryPoints];
            newTheory[pointIndex] = { ...newTheory[pointIndex], text };
            newDays[dayIndex] = { ...newDays[dayIndex], theory: newTheory };
            set({ days: newDays });
          }
        }
      },
      removeTheoryPoint: (dayId, pointId) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            theory: newDays[dayIndex].theory.filter(point => point.id !== pointId)
          };
          set({ days: newDays });
        }
      },
      addLab: (dayId, title, description) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          const newLab = { id: `l${dayId}-${Date.now()}`, title, description };
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            labs: [...newDays[dayIndex].labs, newLab]
          };
          set({ days: newDays });
        }
      },
      updateLab: (dayId, labId, title, description) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const labs = days[dayIndex].labs;
          const labIndex = labs.findIndex(lab => lab.id === labId);
          if (labIndex !== -1) {
            const newDays = [...days];
            const newLabs = [...labs];
            newLabs[labIndex] = { ...newLabs[labIndex], title, description };
            newDays[dayIndex] = { ...newDays[dayIndex], labs: newLabs };
            set({ days: newDays });
          }
        }
      },
      removeLab: (dayId, labId) => {
        const days = get().days;
        const dayIndex = days.findIndex(day => day.id === dayId);
        if (dayIndex !== -1) {
          const newDays = [...days];
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            labs: newDays[dayIndex].labs.filter(lab => lab.id !== labId)
          };
          set({ days: newDays });
        }
      },
    }),
    {
      name: 'course-storage',
    }
  )
);
