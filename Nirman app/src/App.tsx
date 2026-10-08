import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Send, 
  Phone, 
  HardHat, 
  Wrench, 
  Briefcase, 
  Lock, 
  LogOut, 
  UserCheck, 
  Download,
  Key,
  Search,
  UserPlus,
  Clock,
  Sparkles,
  ExternalLink,
  Unlock,
  Building2,
  Calendar,
  AlertCircle,
  Trash2,
  Plus,
  FolderKanban,
  MapPin,
  DollarSign,
  User,
  Package,
  Receipt,
  FileText,
  Camera,
  Image as ImageIcon,
  Eye,
  TrendingUp,
  TrendingDown,
  Layers,
  FileCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquareShare
} from 'lucide-react';

// Types
export interface UserProfile {
  name: string;
  phone: string;
  companyName: string;
  role: 'Contractor' | 'Site Engineer' | 'Admin';
  isLoggedIn: boolean;
  isProfileComplete: boolean;
  joinedDate: string;
  trialExpireDate: string;
  subscriptionExpireDate: string;
  trxIdInput: string;
  paymentStatus: 'Pending' | 'Approved' | 'Expired';
  isLocked?: boolean;
}

export interface CalculationResult {
  estimateType: string;
  areaSqFt: number;
  bricks: number;
  cement: number;
  sand: number;
  iron: number;
  tiles: number;
  totalCost: number;
}

const DEFAULT_USERS: UserProfile[] = [
  {
    name: 'করিম চৌধুরী',
    phone: '01711223344',
    companyName: 'উত্তরা কনস্ট্রাকশন',
    role: 'Contractor',
    isLoggedIn: false,
    isProfileComplete: true,
    joinedDate: '2026-09-20',
    trialExpireDate: '2026-09-27',
    subscriptionExpireDate: '2026-10-08',
    trxIdInput: 'TRX99283719',
    paymentStatus: 'Pending',
    isLocked: false
  },
  {
    name: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    phone: '01819876543',
    companyName: 'প্রাইম ইঞ্জিনিয়ারিং',
    role: 'Site Engineer',
    isLoggedIn: false,
    isProfileComplete: true,
    joinedDate: '2026-10-01',
    trialExpireDate: '2026-10-08',
    subscriptionExpireDate: '2026-11-01',
    trxIdInput: 'TRX77889922',
    paymentStatus: 'Approved',
    isLocked: false
  },
  {
    name: 'মো. রফিকুল হাসান',
    phone: '01912345678',
    companyName: 'মেঘনা বিল্ডার্স লিমিটেড',
    role: 'Contractor',
    isLoggedIn: false,
    isProfileComplete: true,
    joinedDate: '2026-09-15',
    trialExpireDate: '2026-09-22',
    subscriptionExpireDate: '2026-09-22',
    trxIdInput: '',
    paymentStatus: 'Expired',
    isLocked: true
  },
  {
    name: 'আরিফুল ইসলাম',
    phone: '01611002233',
    companyName: 'রূপসী বাংলা ডেভেলপারস',
    role: 'Contractor',
    isLoggedIn: false,
    isProfileComplete: true,
    joinedDate: '2026-10-04',
    trialExpireDate: '2026-10-11',
    subscriptionExpireDate: '2026-10-11',
    trxIdInput: '',
    paymentStatus: 'Approved',
    isLocked: false
  }
];

export interface ProjectItem {
  id: string;
  name: string;
  ownerName: string;
  ownerPhone?: string;
  location: string;
  contractValue: number;
  materialCost: number;
  laborCost: number;
  status: 'চলমান' | 'সম্পন্ন' | 'স্থগিত';
  startDate: string;
  estimatedEndDate: string;
  notes?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-101',
    name: 'বনানী জি+৬ রেসিডেন্সিয়াল',
    ownerName: 'ইঞ্জিনিয়ার কামরুল হাসান',
    ownerPhone: '01712000001',
    location: 'রোড-১১, ব্লক-ডি, বনানী, ঢাকা',
    contractValue: 12000000,
    materialCost: 4250000,
    laborCost: 1280000,
    status: 'চলমান',
    startDate: '2026-08-01',
    estimatedEndDate: '2027-02-28',
    notes: 'পাইলিং ও বেইজমেন্ট সম্পন্ন, ৩য় তলার ছাদ ঢালাই চলছে।'
  },
  {
    id: 'PRJ-102',
    name: 'উত্তরা সেক্টর-৩ কমার্শিয়াল',
    ownerName: 'মো. রফিকুল ইসলাম',
    ownerPhone: '01915000002',
    location: 'সেক্টর-৩, রবীন্দ্র সরণি, উত্তরা, ঢাকা',
    contractValue: 8500000,
    materialCost: 2830000,
    laborCost: 850000,
    status: 'চলমান',
    startDate: '2026-09-10',
    estimatedEndDate: '2026-12-30',
    notes: 'প্লাস্টার ও ফ্লোর টাইলসের কাজ প্রক্রিয়াধীন।'
  }
];

export interface MaterialEntry {
  id: string;
  projectId: string;
  projectName: string;
  materialType: string;
  actionType: 'ইন (ক্রয়/রিসিভ)' | 'আউট (সাইটে ব্যবহার)' | 'ফেরত (Return)';
  quantity: number;
  unit: string;
  unitPrice: number;
  totalCost: number;
  workPhase: string;
  vendorName: string;
  challanNo: string;
  photoUrl?: string;
  date: string;
  notes?: string;
  submittedBy: string;
  status: 'অনুমোদিত' | 'অপেক্ষমাণ' | 'যাচাইকৃত';
}

const DEFAULT_MATERIALS: MaterialEntry[] = [
  {
    id: 'MAT-201',
    projectId: 'PRJ-101',
    projectName: 'বনানী জি+৬ রেসিডেন্সিয়াল',
    materialType: 'সিমেন্ট (Cement)',
    actionType: 'ইন (ক্রয়/রিসিভ)',
    quantity: 100,
    unit: 'ব্যাগ',
    unitPrice: 550,
    totalCost: 55000,
    workPhase: '৩য় তলার ছাদ ঢালাই',
    vendorName: 'মেসার্স শাহ সিমেন্ট এজেন্সি, গুলশান',
    challanNo: 'CH-4521',
    photoUrl: '',
    date: '2026-10-05',
    notes: 'পিসিসি সিমেন্ট ১০০ ব্যাগ সাইট গুদামে রিসিভ করা হয়েছে।',
    submittedBy: 'ইঞ্জিনিয়ার কামরুল হাসান',
    status: 'অনুমোদিত'
  },
  {
    id: 'MAT-202',
    projectId: 'PRJ-101',
    projectName: 'বনানী জি+৬ রেসিডেন্সিয়াল',
    materialType: 'রড / স্টিল (MS Rod)',
    actionType: 'ইন (ক্রয়/রিসিভ)',
    quantity: 2500,
    unit: 'কেজি',
    unitPrice: 95,
    totalCost: 237500,
    workPhase: '৩য় তলার বিম ও কলাম বাইন্ডিং',
    vendorName: 'বিএসআরএম স্টিল ডিপো, তেজগাঁও',
    challanNo: 'CH-4589',
    photoUrl: '',
    date: '2026-10-06',
    notes: '১৬ মিমি ও ১২ মিমি রড সরবরাহ করা হয়েছে। রডের ওজন স্কেলে মেপে নেওয়া হয়েছে।',
    submittedBy: 'মো. সাজ্জাদ (সাইট সুপারভাইজার)',
    status: 'অনুমোদিত'
  },
  {
    id: 'MAT-203',
    projectId: 'PRJ-102',
    projectName: 'উত্তরা সেক্টর-৩ কমার্শিয়াল',
    materialType: 'লাল ইট (১ম শ্রেণি)',
    actionType: 'ইন (ক্রয়/রিসিভ)',
    quantity: 5000,
    unit: 'পিচ',
    unitPrice: 12,
    totalCost: 60000,
    workPhase: '৪র্থ তলার দেয়াল গাঁথুনি',
    vendorName: 'সততা অটো ব্রিকস, টঙ্গী',
    challanNo: 'CH-7804',
    photoUrl: '',
    date: '2026-10-07',
    notes: 'ট্রাক নং ঢাকা মেট্রো-ট-১২৩৪ মারফত ইট ডেলিভারি হয়েছে।',
    submittedBy: 'ইঞ্জিনিয়ার তানভীর',
    status: 'অপেক্ষমাণ'
  },
  {
    id: 'MAT-204',
    projectId: 'PRJ-101',
    projectName: 'বনানী জি+৬ রেসিডেন্সিয়াল',
    materialType: 'সিমেন্ট (Cement)',
    actionType: 'আউট (সাইটে ব্যবহার)',
    quantity: 60,
    unit: 'ব্যাগ',
    unitPrice: 550,
    totalCost: 33000,
    workPhase: '৩য় তলার ছাদ ঢালাই মিক্সিং',
    vendorName: 'সাইট স্টোর রুম',
    challanNo: 'REQ-109',
    photoUrl: '',
    date: '2026-10-07',
    notes: 'মিক্সার মেশিনে ঢালাইয়ের কাজের জন্য স্টোর থেকে ইস্যু করা হলো।',
    submittedBy: 'ইঞ্জিনিয়ার কামরুল হাসান',
    status: 'যাচাইকৃত'
  },
  {
    id: 'MAT-205',
    projectId: 'PRJ-102',
    projectName: 'উত্তরা সেক্টর-৩ কমার্শিয়াল',
    materialType: 'ফ্লোর টাইলস (২৪"×২৪")',
    actionType: 'ইন (ক্রয়/রিসিভ)',
    quantity: 350,
    unit: 'স্কয়ার ফিট',
    unitPrice: 240,
    totalCost: 84000,
    workPhase: '২য় তলা ফ্লোরিং ফিনিশিং',
    vendorName: 'আকিজ সিরামিকস অথোরাইজড শোরুম',
    challanNo: 'CH-9012',
    photoUrl: '',
    date: '2026-10-07',
    notes: 'হালকা গ্রে শেড গ্লেজড ভিট্রিফাইড টাইলস।',
    submittedBy: 'মো. রফিকুল ইসলাম (মালিক)',
    status: 'অপেক্ষমাণ'
  }
];

export default function App() {
  // Navigation tabs: 'calculator' | 'projects' | 'materials' | 'profile' | 'subscription' | 'admin'
  const [activeTab, setActiveTab] = useState<'calculator' | 'projects' | 'materials' | 'profile' | 'subscription' | 'admin'>('calculator');

  // Deferred PWA Prompt
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstallPrompt(null);
        }
      });
    }
  };

  // User Profile & Authentication State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nirman_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return {
      name: '',
      phone: '',
      companyName: '',
      role: 'Contractor',
      isLoggedIn: false,
      isProfileComplete: false,
      joinedDate: now.toISOString().split('T')[0],
      trialExpireDate: trialEnd.toISOString().split('T')[0],
      subscriptionExpireDate: trialEnd.toISOString().split('T')[0],
      trxIdInput: '',
      paymentStatus: 'Approved',
      isLocked: false
    };
  });

  // Auth form states
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Admin passkey state for profile setup
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminKeyError, setAdminKeyError] = useState(false);

  // Calculator State
  const [estimateType, setEstimateType] = useState<string>('৫" ইটের গাঁথুনি');
  const [areaSqFt, setAreaSqFt] = useState<number | ''>(1000);
  const [notification, setNotification] = useState<string | null>(null);

  // Subscription payment input
  const [trxInput, setTrxInput] = useState('');
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState(false);

  // All users database for Admin Panel (persisted in localStorage)
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('nirman_all_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_USERS;
  });

  // Admin Panel states
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilter, setAdminFilter] = useState<'all' | 'pending' | 'active' | 'expired'>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    phone: '',
    companyName: '',
    role: 'Contractor' as 'Contractor' | 'Site Engineer',
    daysToAdd: 30
  });

  // Preview Mode for Admin to test Contractor experience
  const [viewAsContractor, setViewAsContractor] = useState(false);

  // Projects Management state
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('nirman_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_PROJECTS;
  });

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<'all' | 'চলমান' | 'সম্পন্ন' | 'স্থগিত'>('all');
  const [newProjectData, setNewProjectData] = useState({
    id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    ownerName: '',
    ownerPhone: '',
    location: '',
    contractValue: 0,
    materialCost: 0,
    laborCost: 0,
    status: 'চলমান' as 'চলমান' | 'সম্পন্ন' | 'স্থগিত',
    startDate: new Date().toISOString().split('T')[0],
    estimatedEndDate: '',
    notes: ''
  });

  // Materials / Material Box state
  const [materials, setMaterials] = useState<MaterialEntry[]>(() => {
    const saved = localStorage.getItem('nirman_materials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_MATERIALS;
  });

  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [materialSearch, setMaterialSearch] = useState('');
  const [materialProjectFilter, setMaterialProjectFilter] = useState<string>('all');
  const [materialActionFilter, setMaterialActionFilter] = useState<'all' | 'ইন (ক্রয়/রিসিভ)' | 'আউট (সাইটে ব্যবহার)' | 'ফেরত (Return)'>('all');
  const [materialStatusFilter, setMaterialStatusFilter] = useState<'all' | 'অনুমোদিত' | 'অপেক্ষমাণ' | 'যাচাইকৃত'>('all');
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<{ url: string; title: string; challanNo: string; vendor: string; date: string } | null>(null);

  const [newMaterialData, setNewMaterialData] = useState({
    projectId: 'PRJ-101',
    materialType: 'সিমেন্ট (Cement)',
    customMaterialType: '',
    actionType: 'ইন (ক্রয়/রিসিভ)' as 'ইন (ক্রয়/রিসিভ)' | 'আউট (সাইটে ব্যবহার)' | 'ফেরত (Return)',
    quantity: 50,
    unit: 'ব্যাগ',
    unitPrice: 550,
    totalCost: 27500,
    workPhase: 'ছাদ ঢালাই',
    customWorkPhase: '',
    vendorName: '',
    challanNo: '',
    photoUrl: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('nirman_user_session', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nirman_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('nirman_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nirman_materials', JSON.stringify(materials));
  }, [materials]);

  // Tab Navigation Drag & Scroll support for Tablet, Mobile & Desktop
  const tabNavRef = useRef<HTMLDivElement>(null);
  const [isNavDragging, setIsNavDragging] = useState(false);
  const [navStartX, setNavStartX] = useState(0);
  const [navScrollLeft, setNavScrollLeft] = useState(0);

  const handleNavMouseDown = (e: React.MouseEvent) => {
    if (!tabNavRef.current) return;
    setIsNavDragging(true);
    setNavStartX(e.pageX - tabNavRef.current.offsetLeft);
    setNavScrollLeft(tabNavRef.current.scrollLeft);
  };

  const handleNavMouseMove = (e: React.MouseEvent) => {
    if (!isNavDragging || !tabNavRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabNavRef.current.offsetLeft;
    const walk = (x - navStartX) * 1.5;
    tabNavRef.current.scrollLeft = navScrollLeft - walk;
  };

  const handleNavMouseUp = () => setIsNavDragging(false);
  const handleNavMouseLeave = () => setIsNavDragging(false);

  const scrollNav = (direction: 'left' | 'right') => {
    if (tabNavRef.current) {
      tabNavRef.current.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
    }
  };

  // Show auto-dismiss notification
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Quick switch to Admin mode
  const makeMeAdmin = () => {
    setUser(prev => ({
      ...prev,
      role: 'Admin',
      name: prev.name || 'সুপার অ্যাডমিন (মালিক)',
      companyName: prev.companyName || 'নির্মাণ প্ল্যাটফর্ম হেডকোয়ার্টার',
      isProfileComplete: true,
      isLoggedIn: true,
      paymentStatus: 'Approved',
      isLocked: false
    }));
    triggerNotification('👑 আপনি সফলভাবে অ্যাডমিন এক্সেস সক্রিয় করেছেন!');
    setActiveTab('admin');
  };

  // Handle Authentication (Phone + Password)
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authPhone || !authPassword) {
      triggerNotification('দয়া করে ফোন নম্বর ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // If logging in as admin test credential or special number
    const isAdminUser = 
      (authPhone === '01716994333' && authPassword === 'admin123') ||
      authPassword === 'admin123' ||
      authPassword === 'admin7788';

    setUser(prev => ({
      ...prev,
      phone: authPhone,
      isLoggedIn: true,
      role: isAdminUser ? 'Admin' : prev.role || 'Contractor',
      name: isAdminUser ? (prev.name || 'সুপার অ্যাডমিন (মালিক)') : prev.name,
      companyName: isAdminUser ? (prev.companyName || 'নির্মাণ হেডকোয়ার্টার') : prev.companyName,
      isProfileComplete: isAdminUser ? true : false,
      joinedDate: prev.joinedDate || now.toISOString().split('T')[0],
      trialExpireDate: prev.trialExpireDate || trialEnd.toISOString().split('T')[0],
      subscriptionExpireDate: prev.subscriptionExpireDate || trialEnd.toISOString().split('T')[0],
      isLocked: false
    }));

    if (isAdminUser) {
      triggerNotification('অ্যাডমিন একাউন্টে লগইন সফল হয়েছে!');
      setActiveTab('admin');
    } else {
      triggerNotification('সাইন-আপ সফল! অনুগ্রহ করে প্রোফাইল তথ্য পূরণ করুন।');
      setActiveTab('profile');
    }
  };

  // Sign out
  const handleLogout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    triggerNotification('সফলভাবে লগআউট হয়েছেন');
  };

  // Calculate days remaining for a user
  const getDaysRemaining = (expireDateStr: string) => {
    const exp = new Date(expireDateStr).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysRemaining = getDaysRemaining(user.subscriptionExpireDate);
  const isExpired = user.role !== 'Admin' && (daysRemaining <= 0 || user.isLocked);

  // Live calculation logic
  const calculateMaterials = (): CalculationResult => {
    const area = typeof areaSqFt === 'number' && !isNaN(areaSqFt) ? areaSqFt : 0;
    let bricks = 0;
    let cement = 0;
    let sand = 0;
    let iron = 0;
    let tiles = 0;

    // Check estimateType
    if (estimateType.includes('গাঁথুনি')) {
      bricks = Math.round(area * 5);
      cement = Math.round(area * 0.02);
      sand = Math.round(area * 0.10);
      iron = 0;
      tiles = 0;
    } else if (estimateType.includes('ছাদ ঢালাই')) {
      bricks = 0;
      cement = Math.round(area * 0.08);
      sand = Math.round(area * 0.18);
      iron = Math.round(area * 1.6);
      tiles = 0;
    } else if (estimateType.includes('প্লাস্টার')) {
      bricks = 0;
      cement = Math.round(area * 0.015);
      sand = Math.round(area * 0.075);
      iron = 0;
      tiles = 0;
    } else if (estimateType.includes('টাইলস')) {
      bricks = 0;
      tiles = Math.round((area / 4) * 1.05);
      cement = Math.round(area * 0.015);
      sand = Math.round(area * 0.07);
      iron = 0;
    }

    // Market prices
    const brickPrice = 12;
    const cementPrice = 550;
    const sandPrice = 50;
    const ironPrice = 95;
    const tilesPrice = 240;

    const totalCost = (bricks * brickPrice) + (cement * cementPrice) + (sand * sandPrice) + (iron * ironPrice) + (tiles * tilesPrice);

    return {
      estimateType,
      areaSqFt: area,
      bricks,
      cement,
      sand,
      iron,
      tiles,
      totalCost
    };
  };

  const results = calculateMaterials();

  // Reset calculator
  const handleReset = () => {
    setAreaSqFt(0);
    triggerNotification('হিসাব রিসেট করা হয়েছে');
  };

  // Submit payment from Subscription tab
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxInput.trim()) return;

    const currentTrx = trxInput.trim();
    setUser(prev => ({
      ...prev,
      trxIdInput: currentTrx,
      paymentStatus: 'Pending'
    }));

    // Update in allUsers list too
    setAllUsers(prev => {
      const exists = prev.find(u => u.phone === user.phone);
      if (exists) {
        return prev.map(u => u.phone === user.phone ? { ...u, trxIdInput: currentTrx, paymentStatus: 'Pending' } : u);
      } else {
        return [
          {
            ...user,
            trxIdInput: currentTrx,
            paymentStatus: 'Pending'
          },
          ...prev
        ];
      }
    });

    setPaymentSuccessMsg(true);
    triggerNotification('আপনার পেমেন্ট রিকোয়েস্ট জমা হয়েছে। ১০-১৫ মিনিটে অ্যাডমিন অনুমোদন করবেন।');
  };

  // Admin approves user subscription (+30 days)
  const handleApproveUser = (targetPhone: string) => {
    const now = new Date();
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setAllUsers(prev => prev.map(u => {
      if (u.phone === targetPhone) {
        return {
          ...u,
          paymentStatus: 'Approved',
          subscriptionExpireDate: nextMonth,
          isLocked: false
        };
      }
      return u;
    }));

    if (user.phone === targetPhone) {
      setUser(prev => ({
        ...prev,
        paymentStatus: 'Approved',
        subscriptionExpireDate: nextMonth,
        isLocked: false
      }));
    }

    triggerNotification(`ইউজারের পেমেন্ট অনুমোদিত ও মেয়াদ ৩০ দিন বাড়ানো হয়েছে!`);
  };

  // Admin extends custom days (+7 or +90)
  const handleExtendDays = (targetPhone: string, daysToAdd: number) => {
    setAllUsers(prev => prev.map(u => {
      if (u.phone === targetPhone) {
        const baseDate = new Date(u.subscriptionExpireDate).getTime() > new Date().getTime() 
          ? new Date(u.subscriptionExpireDate) 
          : new Date();
        const newExp = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        return {
          ...u,
          paymentStatus: 'Approved',
          subscriptionExpireDate: newExp,
          isLocked: false
        };
      }
      return u;
    }));

    if (user.phone === targetPhone) {
      const baseDate = new Date(user.subscriptionExpireDate).getTime() > new Date().getTime() 
        ? new Date(user.subscriptionExpireDate) 
        : new Date();
      const newExp = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setUser(prev => ({
        ...prev,
        paymentStatus: 'Approved',
        subscriptionExpireDate: newExp,
        isLocked: false
      }));
    }

    triggerNotification(`সফলভাবে +${daysToAdd} দিন মেয়াদ বৃদ্ধি করা হয়েছে!`);
  };

  // Admin toggles lock
  const handleToggleLock = (targetPhone: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.phone === targetPhone) {
        const nextState = !u.isLocked;
        return {
          ...u,
          isLocked: nextState,
          paymentStatus: nextState ? 'Expired' : u.paymentStatus
        };
      }
      return u;
    }));
    triggerNotification('ইউজারের একাউন্ট লক/আনলক স্ট্যাটাস আপডেট হয়েছে');
  };

  // Admin manually adds a user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.phone || !newUserData.name) {
      triggerNotification('দয়া করে নাম ও ফোন নম্বর লিখুন');
      return;
    }

    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const subEnd = new Date(now.getTime() + newUserData.daysToAdd * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newUser: UserProfile = {
      name: newUserData.name,
      phone: newUserData.phone,
      companyName: newUserData.companyName || 'কন্ট্রাকশন ফার্ম',
      role: newUserData.role,
      isLoggedIn: false,
      isProfileComplete: true,
      joinedDate: now.toISOString().split('T')[0],
      trialExpireDate: trialEnd,
      subscriptionExpireDate: subEnd,
      trxIdInput: '',
      paymentStatus: 'Approved',
      isLocked: false
    };

    setAllUsers(prev => [newUser, ...prev]);
    setShowAddUserModal(false);
    setNewUserData({ name: '', phone: '', companyName: '', role: 'Contractor', daysToAdd: 30 });
    triggerNotification('নতুন ইউজার সফলভাবে ডাটাবেজে যুক্ত করা হয়েছে!');
  };

  // Admin deletes a user
  const handleDeleteUser = (targetPhone: string, userName: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${userName}" (${targetPhone}) কে তালিকা থেকে মুছে ফেলতে চান?`)) {
      setAllUsers(prev => prev.filter(u => u.phone !== targetPhone));
      triggerNotification(`ইউজার "${userName}" কে সফলভাবে মুছে ফেলা হয়েছে!`);
    }
  };

  // Project management handlers
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectData.name.trim() || !newProjectData.ownerName.trim()) {
      triggerNotification('দয়া করে প্রজেক্টের নাম ও মালিকের নাম লিখুন');
      return;
    }

    const newProject: ProjectItem = {
      id: newProjectData.id.trim() || `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: newProjectData.name.trim(),
      ownerName: newProjectData.ownerName.trim(),
      ownerPhone: newProjectData.ownerPhone.trim(),
      location: newProjectData.location.trim() || 'সাইট লোকেশন অনির্দিষ্ট',
      contractValue: Number(newProjectData.contractValue) || 0,
      materialCost: Number(newProjectData.materialCost) || 0,
      laborCost: Number(newProjectData.laborCost) || 0,
      status: newProjectData.status,
      startDate: newProjectData.startDate || new Date().toISOString().split('T')[0],
      estimatedEndDate: newProjectData.estimatedEndDate || '',
      notes: newProjectData.notes.trim()
    };

    setProjects(prev => [newProject, ...prev]);
    setShowAddProjectModal(false);
    setNewProjectData({
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      ownerName: '',
      ownerPhone: '',
      location: '',
      contractValue: 0,
      materialCost: 0,
      laborCost: 0,
      status: 'চলমান',
      startDate: new Date().toISOString().split('T')[0],
      estimatedEndDate: '',
      notes: ''
    });
    triggerNotification(`নতুন প্রজেক্ট "${newProject.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (window.confirm(`আপনি কি "${projectName}" প্রজেক্টটি মুছে ফেলতে চান?`)) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      triggerNotification(`প্রজেক্ট "${projectName}" মুছে ফেলা হয়েছে!`);
    }
  };

  // ================= MATERIAL HANDLERS =================
  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const prj = projects.find(p => p.id === newMaterialData.projectId);
    const finalMaterialType = newMaterialData.materialType === 'অন্যান্য' && newMaterialData.customMaterialType
      ? newMaterialData.customMaterialType
      : newMaterialData.materialType;
    const finalWorkPhase = newMaterialData.workPhase === 'অন্যান্য' && newMaterialData.customWorkPhase
      ? newMaterialData.customWorkPhase
      : newMaterialData.workPhase;

    const qty = Number(newMaterialData.quantity) || 0;
    const price = Number(newMaterialData.unitPrice) || 0;
    const total = Number(newMaterialData.totalCost) || (qty * price);

    const newEntry: MaterialEntry = {
      id: `MAT-${Math.floor(100 + Math.random() * 900)}`,
      projectId: newMaterialData.projectId,
      projectName: prj ? prj.name : 'সাইট প্রজেক্ট',
      materialType: finalMaterialType,
      actionType: newMaterialData.actionType,
      quantity: qty,
      unit: newMaterialData.unit,
      unitPrice: price,
      totalCost: total,
      workPhase: finalWorkPhase,
      vendorName: newMaterialData.vendorName || 'লোকাল সরবরাহকারী',
      challanNo: newMaterialData.challanNo || `CH-${Math.floor(1000 + Math.random() * 9000)}`,
      photoUrl: newMaterialData.photoUrl,
      date: newMaterialData.date,
      notes: newMaterialData.notes,
      submittedBy: user.name || (user.role === 'Admin' ? 'সুপার অ্যাডমিন' : 'সাইট ইঞ্জিনিয়ার'),
      status: user.role === 'Admin' ? 'অনুমোদিত' : 'অপেক্ষমাণ'
    };

    setMaterials(prev => [newEntry, ...prev]);

    // If stock in, sync with project materialCost
    if (newEntry.actionType === 'ইন (ক্রয়/রিসিভ)') {
      setProjects(prev => prev.map(p => {
        if (p.id === newEntry.projectId) {
          return {
            ...p,
            materialCost: (p.materialCost || 0) + newEntry.totalCost
          };
        }
        return p;
      }));
    }

    setShowAddMaterialModal(false);
    setNewMaterialData({
      projectId: projects[0]?.id || 'PRJ-101',
      materialType: 'সিমেন্ট (Cement)',
      customMaterialType: '',
      actionType: 'ইন (ক্রয়/রিসিভ)',
      quantity: 50,
      unit: 'ব্যাগ',
      unitPrice: 550,
      totalCost: 27500,
      workPhase: 'ছাদ ঢালাই',
      customWorkPhase: '',
      vendorName: '',
      challanNo: '',
      photoUrl: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });

    triggerNotification(
      user.role === 'Admin'
        ? `মালামাল এন্ট্রি "${newEntry.materialType}" অনুমোদিতভাবে যুক্ত হয়েছে!`
        : `মালামালের চালান এন্ট্রি সফল! অ্যাডমিন অনুমোদনের জন্য অপেক্ষমাণ।`
    );
  };

  const handleDeleteMaterial = (id: string, matName: string) => {
    if (window.confirm(`আপনি কি "${matName}" এর চালান এন্ট্রিটি মুছে ফেলতে চান?`)) {
      setMaterials(prev => prev.filter(m => m.id !== id));
      triggerNotification(`চালান রেকর্ড মুছে ফেলা হয়েছে!`);
    }
  };

  const handleApproveMaterial = (id: string) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, status: 'অনুমোদিত' } : m));
    triggerNotification(`চালানটি অ্যাডমিন কর্তৃক অনুমোদিত হয়েছে!`);
  };

  const handleVerifyMaterial = (id: string) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, status: 'যাচাইকৃত' } : m));
    triggerNotification(`চালানটি সাইটে যাচাইকৃত হিসেবে চিহ্নিত করা হয়েছে!`);
  };

  // ================= 1. AUTH SCREEN (LOGIN / SIGNUP) =================
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Logo with uploaded Architect Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 p-1 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/15">
              <img 
                src="/architect-icon.png" 
                alt="NIRMAN লোগো" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-wider text-slate-100 font-mono">NIRMAN</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono tracking-wider">PRO</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">কনস্ট্রাকশন সাইট ও কন্ট্রাক্টর ম্যানেজমেন্ট সিস্টেম</p>
          </div>

          {/* Toggle Login / Signup */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2 rounded-lg transition ${
                authMode === 'signup' ? 'bg-amber-500 text-slate-950 shadow font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              নতুন সাইন-আপ (৭ দিন ফ্রি)
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2 rounded-lg transition ${
                authMode === 'login' ? 'bg-amber-500 text-slate-950 shadow font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              লগইন করুন
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                মোবাইল নম্বর (Phone Number)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 01716994333"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm font-mono"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2 mt-2"
            >
              <UserCheck className="w-4 h-4" />
              {authMode === 'signup' ? 'সাইন-আপ করে শুরু করুন' : 'লগইন করুন'}
            </button>
          </form>

          {/* Quick Admin Access Card for App Owner */}
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={makeMeAdmin}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              👑 আপনি কি অ্যাপের মালিক? সরাসরি অ্যাডমিন মোডে প্রবেশ করুন
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              *সাধারণ ইউজাররা ৭ দিন ফ্রি ট্রায়াল পাবেন, আর অ্যাডমিন ব্যাকএন্ড থেকে পুরো সিস্টেম নিয়ন্ত্রণ করবেন।
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. PROFILE INCOMPLETE SCREEN =================
  if (user.isLoggedIn && !user.isProfileComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 p-1 flex-shrink-0">
              <img src="/architect-icon.png" alt="লোগো" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                ধাপ ২: প্রোফাইল ও ভূমিকা নির্বাচন
              </div>
              <h2 className="text-xl font-bold text-slate-100">আপনার তথ্য ও দায়িত্ব নির্বাচন করুন</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                কন্ট্রাক্টর, সাইট ইঞ্জিনিয়ার অথবা প্ল্যাটফর্ম অ্যাডমিন হিসেবে প্রোফাইল সেট করুন।
              </p>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!user.name || !user.companyName) {
                triggerNotification('অনুগ্রহ করে নাম ও প্রতিষ্ঠানের নাম লিখুন');
                return;
              }

              // If selecting admin role, verify key
              if (user.role === 'Admin') {
                if (adminKeyInput !== 'admin123' && adminKeyInput !== 'admin7788' && adminKeyInput !== '') {
                  setAdminKeyError(true);
                  triggerNotification('ভুল অ্যাডমিন পাসকি! অনুগ্রহ করে সঠিক কি লিখুন।');
                  return;
                }
              }

              setUser(prev => ({
                ...prev,
                isProfileComplete: true
              }));
              triggerNotification(user.role === 'Admin' ? '👑 অ্যাডমিন হিসেবে প্রোফাইল তৈরি হয়েছে!' : 'প্রোফাইল সম্পন্ন হয়েছে! স্বাগতম নির্মাণে।');
              setActiveTab(user.role === 'Admin' ? 'admin' : 'calculator');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                আপনার পূর্ণ নাম
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: মো. নিয়াজ মোরশেদ"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                প্রতিষ্ঠানের নাম / কনস্ট্রাকশন ফার্ম
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: নির্মাণ বিল্ডার্স লিমিটেড"
                value={user.companyName}
                onChange={(e) => setUser({ ...user, companyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                আপনার পেশা / ভূমিকা (Role)
              </label>
              <select
                value={user.role}
                onChange={(e) => {
                  const newRole = e.target.value as any;
                  setUser({ ...user, role: newRole });
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm font-medium"
              >
                <option value="Contractor">👷 কন্ট্রাক্টর (Contractor - সাইট ও মালামাল হিসাব)</option>
                <option value="Site Engineer">📐 সাইট ইঞ্জিনিয়ার (Site Engineer - ড্রয়িং ও কাজ তদারকি)</option>
                <option value="Admin">👑 অ্যাডমিন (Admin - অ্যাপের মালিক ও ব্যাকএন্ড কন্ট্রোল)</option>
              </select>
            </div>

            {/* Secret Admin Passkey Input if Admin is selected */}
            {user.role === 'Admin' && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Key className="w-4 h-4" />
                  অ্যাডমিন সিকিউরিটি কী (Admin Master Key)
                </div>
                <input
                  type="password"
                  placeholder="ডিফল্ট পাসকি: admin123"
                  value={adminKeyInput}
                  onChange={(e) => {
                    setAdminKeyInput(e.target.value);
                    setAdminKeyError(false);
                  }}
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-lg px-3 py-2 text-slate-100 text-xs font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-slate-400">
                  *মালিক হিসেবে সিস্টেমে ঢুকতে <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">admin123</code> লিখুন (অথবা খালি রাখলেও অনুমতি মিলবে)।
                </p>
                {adminKeyError && (
                  <p className="text-[11px] text-red-400 font-medium">ভুল পাসকি! সঠিক কোডটি দিন।</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-4 h-4" />
              প্রোফাইল সেভ করে অ্যাপে প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= 3. MAIN APP INTERFACE =================
  const effectiveRole = viewAsContractor ? 'Contractor' : user.role;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 p-0.5 flex items-center justify-center flex-shrink-0 shadow-md">
              <img 
                src="/architect-icon.png" 
                alt="NIRMAN লোগো" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base sm:text-lg text-slate-100 tracking-wider font-mono">NIRMAN</h1>
                <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono">
                  {user.role === 'Admin' ? 'ADMIN' : 'PRO'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-none">
                {user.companyName || 'কনস্ট্রাকশন সাইট ম্যানেজমেন্ট'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {installPrompt && (
              <button
                onClick={handleInstallClick}
                className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">মোবাইলে</span> ইন্সটল
              </button>
            )}

            {/* Role indicator */}
            <span className={`text-xs px-2.5 py-1 rounded-md border font-medium hidden sm:flex items-center gap-1 ${
              user.role === 'Admin' 
                ? 'bg-amber-950/60 border-amber-600/50 text-amber-300 font-bold' 
                : 'bg-slate-800/80 border-slate-700 text-slate-300'
            }`}>
              {user.role === 'Admin' ? '👑 অ্যাডমিন' : user.role === 'Contractor' ? '👷 কন্ট্রাক্টর' : '📐 ইঞ্জিনিয়ার'}
            </span>

            {/* Subscription status */}
            {user.role !== 'Admin' && (
              <span className={`text-xs px-2 py-1 rounded-md font-mono flex items-center gap-1.5 border ${
                isExpired 
                  ? 'bg-red-950/80 border-red-800 text-red-300 animate-pulse' 
                  : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}`}></span>
                {isExpired ? 'লকড' : `${daysRemaining} দিন`}
              </span>
            )}

            {/* If user is not admin, provide 1-click Switch to Admin button */}
            {user.role !== 'Admin' && (
              <button
                onClick={makeMeAdmin}
                title="মালিক হিসেবে অ্যাডমিন মোড অন করুন"
                className="text-[11px] bg-slate-800 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-lg transition"
              >
                👑 অ্যাডমিন সুইচ
              </button>
            )}

            <button
              onClick={handleLogout}
              title="লগআউট"
              className="text-xs text-slate-400 hover:text-red-400 p-1.5 rounded-lg border border-slate-800 hover:border-red-900 bg-slate-900 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar with Scroll Buttons & Drag-to-Scroll */}
        <div className="max-w-5xl mx-auto px-2 sm:px-4 border-t border-slate-800/60 pt-1 pb-1">
          <div className="flex items-center gap-1">
            {/* Scroll Left Button for Tablet/Desktop */}
            <button
              type="button"
              onClick={() => scrollNav('left')}
              title="বামে স্ক্রল করুন"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 flex-shrink-0 transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable & Draggable Tabs Track */}
            <div
              ref={tabNavRef}
              onMouseDown={handleNavMouseDown}
              onMouseMove={handleNavMouseMove}
              onMouseUp={handleNavMouseUp}
              onMouseLeave={handleNavMouseLeave}
              className={`flex-1 flex gap-1.5 overflow-x-auto py-1 scroll-smooth select-none cursor-grab active:cursor-grabbing text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent ${
                isNavDragging ? 'cursor-grabbing' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'calculator' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>নির্মাণ ক্যালকুলেটর</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'projects' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>সাইট ও প্রজেক্ট</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 border ${
                  activeTab === 'materials' 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/25' 
                    : 'text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border-amber-500/40 bg-amber-500/5'
                }`}
              >
                <Package className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>মালামাল খাতা</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                  activeTab === 'materials' ? 'bg-slate-950/20 text-slate-900' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  Box
                </span>
                {materials.filter(m => m.status === 'অপেক্ষমাণ').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" title="অপেক্ষমাণ ভাউচার আছে"></span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'profile' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>প্রোফাইল সেটআপ</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('subscription')}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'subscription' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>সাবস্ক্রিপশন</span>
              </button>

              {user.role === 'Admin' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'admin' 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' 
                      : 'text-amber-300 hover:bg-slate-800/60 border border-amber-500/40 bg-amber-500/10'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>অ্যাডমিন প্যানেল</span>
                </button>
              )}
            </div>

            {/* Scroll Right Button for Tablet/Desktop */}
            <button
              type="button"
              onClick={() => scrollNav('right')}
              title="ডানে স্ক্রল করুন"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 flex-shrink-0 transition shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900/95 text-emerald-100 border border-emerald-500/60 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* LOCKOUT OVERLAY FOR REGULAR USERS IF TRIAL IS EXPIRED */}
      {isExpired && activeTab !== 'subscription' && activeTab !== 'profile' && (
        <div className="max-w-4xl mx-auto w-full p-4 mt-2">
          <div className="bg-red-950/60 border border-red-500/50 rounded-2xl p-5 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-red-200">
              আপনার ৭ দিনের ফ্রি ট্রায়ালের মেয়াদ শেষ হয়েছে!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              ক্যালকুলেটর ও সাইট ম্যানেজমেন্ট ফিচারগুলো পুনরায় ব্যবহার করতে অনুগ্রহ করে সাবস্ক্রিপশন রিনিউ করুন।
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setActiveTab('subscription')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                পেমেন্ট করে রিনিউ করুন (৳১,০০০)
              </button>
              <button
                onClick={makeMeAdmin}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2.5 rounded-xl transition"
              >
                👑 আমি মালিক (আনলক করুন)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6 pb-28 md:pb-8">
        
        {/* ================= CALCULATOR TAB ================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-amber-400">🏗️</span> স্মার্ট সাইট এস্টিমেটর
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    কাজের ধরন ও মোট স্কয়ার ফিট অনুযায়ী মালামাল ও খরচের নিখুঁত গাণিতিক হিসাব।
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs text-amber-400/80 block">বাজারদর ফর্মুলা</span>
                  <span className="text-xs text-slate-500">ইট: ৳১২ · সিমেন্ট: ৳৫৫০ · বালি: ৳৫০ · রড: ৳৯৫ · টাইলস: ৳২৪০/পিস</span>
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-800">
                {/* Choice: Estimate Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    কাজের ধরন নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: '৫" ইটের গাঁথুনি', icon: '🧱' },
                      { label: 'ছাদ ঢালাই (RCC)', icon: '🏢' },
                      { label: 'দেয়াল প্লাস্টার', icon: '🪣' },
                      { label: 'ফ্লোর টাইলস', icon: '🟦' }
                    ].map(item => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setEstimateType(item.label)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition text-center flex flex-col items-center justify-center gap-1 ${
                          estimateType === item.label
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="truncate w-full">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number Entry: Total Area */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    কাজের মোট পরিমাণ (Square Feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={areaSqFt === '' ? '' : areaSqFt}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAreaSqFt(val === '' ? '' : parseFloat(val));
                      }}
                      placeholder="যেমন: ১০০০ বা ১২০০"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-base font-mono"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 pointer-events-none">
                      sq.ft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Title */}
            <div className="flex items-center justify-between pt-2">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <span>📊</span> প্রয়োজনীয় মালামালের বিবরণ ({estimateType})
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                নতুন হিসাব করুন (Reset)
              </button>
            </div>

            {/* Result Cards Grid - 5 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-3.5">
              {/* Bricks Card */}
              <div className="bg-slate-900/90 border border-red-500/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-red-500/40 transition">
                <div className="flex items-center justify-between text-xs text-red-400 font-medium mb-2.5">
                  <span className="truncate">ইটের পরিমাণ (Brick)</span>
                  <span className="text-base">🧱</span>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-red-100 tracking-tight">
                    {results.bricks.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">টি ইট</div>
                </div>
              </div>

              {/* Cement Card */}
              <div className="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-emerald-500/40 transition">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-2.5">
                  <span className="truncate">সিমেন্ট (Cement)</span>
                  <span className="text-base">🪵</span>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-100 tracking-tight">
                    {results.cement.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">ব্যাগ সিমেন্ট</div>
                </div>
              </div>

              {/* Sand Card */}
              <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-amber-500/40 transition">
                <div className="flex items-center justify-between text-xs text-amber-400 font-medium mb-2.5">
                  <span className="truncate">বালির পরিমাণ (Sand)</span>
                  <span className="text-base">⏳</span>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-amber-100 tracking-tight">
                    {results.sand.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">সি.এফ.টি (cft) বালি</div>
                </div>
              </div>

              {/* Iron / Rod Card */}
              <div className="bg-slate-900/90 border border-blue-500/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between text-xs text-blue-400 font-medium mb-2.5">
                  <span className="truncate">রডের পরিমাণ (Rod)</span>
                  <span className="text-base">🔩</span>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-blue-100 tracking-tight">
                    {results.iron.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">কেজি রড</div>
                </div>
              </div>

              {/* Floor Tiles Card */}
              <div className="bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-medium mb-2.5">
                  <span className="truncate">টাইলস (Floor Tiles)</span>
                  <span className="text-base">🟦</span>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-cyan-100 tracking-tight">
                    {results.tiles.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">পিস (24"x24")</div>
                </div>
              </div>
            </div>

            {/* Total Budget Card */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase flex items-center gap-1.5">
                  <span>💰</span> আনুমানিক মোট বাজেট (Approx Total Cost)
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  বর্তমান বাজারদরের ভিত্তিতে সম্পূর্ণ কাজের মেটেরিয়াল খরচের যোগফল
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight">
                  ৳ {results.totalCost.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">টাকা (ভ্যাট ও লেবার ব্যতীত)</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROFILE TAB ================= */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-100">ইউজার প্রোফাইল বিবরণ</h2>
                  <p className="text-xs text-slate-400">আপনার ব্যক্তিগত ও প্রতিষ্ঠানের তথ্য হালনাগাদ রাখুন</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 p-1">
                  <img src="/architect-icon.png" alt="লোগো" className="w-full h-full object-contain" />
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerNotification('প্রোফাইল তথ্য সফলভাবে সেভ করা হয়েছে');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user.phone}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 font-mono text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    প্রতিষ্ঠানের নাম
                  </label>
                  <input
                    type="text"
                    value={user.companyName}
                    onChange={(e) => setUser({ ...user, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    আপনার ভূমিকা (Role)
                  </label>
                  <select
                    value={user.role}
                    onChange={(e) => {
                      const newR = e.target.value as any;
                      setUser({ ...user, role: newR });
                      triggerNotification(`রোল পরিবর্তন হয়ে '${newR}' হয়েছে`);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                  >
                    <option value="Contractor">👷 কন্ট্রাক্টর (Contractor)</option>
                    <option value="Site Engineer">📐 সাইট ইঞ্জিনিয়ার (Site Engineer)</option>
                    <option value="Admin">👑 অ্যাডমিন (Admin / প্ল্যাটফর্ম মালিক)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    তথ্য সংরক্ষণ করুন
                  </button>

                  {user.role === 'Admin' ? (
                    <button
                      type="button"
                      onClick={() => setViewAsContractor(!viewAsContractor)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 rounded-xl text-xs font-medium transition"
                    >
                      {viewAsContractor ? '👁️ অ্যাডমিন ভিউতে ফিরুন' : '👷 কন্ট্রাক্টর ভিউ প্রিভিউ'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={makeMeAdmin}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-4 py-3 rounded-xl text-xs font-bold transition"
                    >
                      👑 অ্যাডমিন হোন
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= SUBSCRIPTION TAB ================= */}
        {activeTab === 'subscription' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <CreditCard className="w-6 h-6 flex-shrink-0" />
                <h2 className="text-lg font-bold text-slate-100">
                  নির্মাণ সাবস্ক্রিপশন ও পেমেন্ট রিনিউয়াল
                </h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                নির্মাণ প্ল্যাটফর্মের হিসাব, মাল্টি-সাইট প্রজেক্ট ও এস্টিমেটর চালু রাখতে পরবর্তী ১ মাসের জন্য <strong>৳১,০০০ টাকা</strong> সাবস্ক্রিপশন ফি পরিশোধ করুন।
              </p>

              {/* Payment Details Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 my-5 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">বিকাশ পার্সোনাল নম্বর:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">01716994333</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">নগদ পার্সোনাল নম্বর:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">01716994333</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">বর্তমান মেয়াদের শেষ তারিখ:</span>
                  <span className="font-mono text-emerald-400 font-bold">{user.subscriptionExpireDate}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">পেমেন্ট অনুমোদন স্ট্যাটাস:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    user.paymentStatus === 'Approved'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : user.paymentStatus === 'Pending'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {user.paymentStatus === 'Approved' ? 'অনুমোদিত (Approved)' : user.paymentStatus === 'Pending' ? 'পেন্ডিং (যাচাই চলছে)' : 'মেয়াদ শেষ'}
                  </span>
                </div>
              </div>

              {/* TrxID Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    টাকা পাঠানোর পর বিকাশ / নগদ TrxID দিন
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: TRX99283719"
                    value={trxInput}
                    onChange={(e) => setTrxInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 font-mono placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!trxInput.trim()}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                    trxInput.trim()
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  পেমেন্টের তথ্য জমা দিন (Submit Payment)
                </button>
              </form>

              {paymentSuccessMsg && (
                <div className="mt-4 p-3.5 bg-emerald-950/80 border border-emerald-600/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  আপনার পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করে ১০-১৫ মিনিটে সক্রিয় করবেন।
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ADMIN BACKEND PANEL TAB ================= */}
        {activeTab === 'admin' && user.role === 'Admin' && (
          <div className="space-y-6">
            {/* Header + Add user button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-bold text-slate-100">
                    অ্যাডমিন কন্ট্রোল সেন্টার (Backend Hub)
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  এখানে আপনি দেখতে পাবেন কে টাকা দিল, কার মেয়াদের কত দিন বাকি, এবং ১-ক্লিকে সাবস্ক্রিপশন অনুমোদন করতে পারবেন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  + নতুন ইউজার যুক্ত করুন
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] text-slate-400 block font-medium">মোট ইউজার</span>
                <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">
                  {allUsers.length}
                </span>
                <span className="text-[10px] text-slate-500">ডাটাবেজে নিবন্ধিত</span>
              </div>

              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-amber-400 block font-medium">⏳ পেন্ডিং রিকোয়েস্ট</span>
                <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
                  {allUsers.filter(u => u.paymentStatus === 'Pending').length}
                </span>
                <span className="text-[10px] text-amber-300/80">যাচাইয়ের অপেক্ষায়</span>
              </div>

              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-emerald-400 block font-medium">🟢 সক্রিয় সাবস্ক্রাইবার</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  {allUsers.filter(u => u.paymentStatus === 'Approved' && !u.isLocked).length}
                </span>
                <span className="text-[10px] text-emerald-500">নিয়মিত সেবা পাচ্ছেন</span>
              </div>

              <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-red-400 block font-medium">🔒 মেয়াদ শেষ / লকড</span>
                <span className="text-2xl font-bold font-mono text-red-400 mt-1 block">
                  {allUsers.filter(u => u.paymentStatus === 'Expired' || u.isLocked).length}
                </span>
                <span className="text-[10px] text-red-400/80">লক হয়ে আছে</span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="নাম, ফোন বা প্রতিষ্ঠান খুঁজুন..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                {[
                  { key: 'all', label: 'সকল ইউজার' },
                  { key: 'pending', label: 'পেন্ডিং TrxID' },
                  { key: 'active', label: 'সক্রিয়' },
                  { key: 'expired', label: 'মেয়াদ শেষ' }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setAdminFilter(f.key as any)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                      adminFilter === f.key
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Users List Table / Cards */}
            <div className="space-y-3">
              {allUsers
                .filter(u => {
                  if (adminFilter === 'pending') return u.paymentStatus === 'Pending';
                  if (adminFilter === 'active') return u.paymentStatus === 'Approved' && !u.isLocked;
                  if (adminFilter === 'expired') return u.paymentStatus === 'Expired' || u.isLocked;
                  return true;
                })
                .filter(u => {
                  if (!adminSearch) return true;
                  const q = adminSearch.toLowerCase();
                  return (
                    u.name.toLowerCase().includes(q) ||
                    u.phone.includes(q) ||
                    u.companyName.toLowerCase().includes(q) ||
                    (u.trxIdInput && u.trxIdInput.toLowerCase().includes(q))
                  );
                })
                .map((u) => {
                  const days = getDaysRemaining(u.subscriptionExpireDate);
                  const isUserLocked = u.isLocked || days <= 0;
                  const waMessage = encodeURIComponent(
                    `আসসালামু আলাইকুম ${u.name} সাহেব। আপনার প্রতিষ্ঠান "${u.companyName}" এর সাইট হিসাব ও NIRMAN অ্যাপের মেয়াদের আর মাত্র ${days} দিন বাকি আছে। নিরবচ্ছিন্ন সেবা পেতে অনুগ্রহ করে মাসিক সাবস্ক্রিপশন ফি পরিশোধ করুন। বিকাশ/নগদ: 01716994333। ধন্যবাদ - NIRMAN প্ল্যাটফর্ম।`
                  );
                  const waUrl = `https://wa.me/88${u.phone}?text=${waMessage}`;

                  return (
                    <div
                      key={u.phone}
                      className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-sm ${
                        u.paymentStatus === 'Pending'
                          ? 'border-amber-500/50 bg-amber-950/10'
                          : isUserLocked
                          ? 'border-red-900/50 bg-red-950/10'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-100 text-base">{u.name}</h4>
                          <span className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {u.role === 'Contractor' ? '👷 কন্ট্রাক্টর' : '📐 সাইট ইঞ্জিনিয়ার'}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            u.paymentStatus === 'Approved' && !isUserLocked
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400' 
                              : u.paymentStatus === 'Pending'
                              ? 'bg-amber-950 border-amber-800 text-amber-400 animate-pulse'
                              : 'bg-red-950 border-red-800 text-red-400'
                          }`}>
                            {u.paymentStatus === 'Pending' ? 'পেন্ডিং TrxID' : isUserLocked ? 'লকড / মেয়াদ শেষ' : 'অনুমোদিত'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 mt-1">
                          🏢 <strong className="text-slate-300">{u.companyName}</strong> · 📞 <span className="font-mono text-slate-300">{u.phone}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                          {u.trxIdInput ? (
                            <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                              TrxID: <strong>{u.trxIdInput}</strong>
                            </span>
                          ) : (
                            <span className="text-slate-600">কোনো TrxID নেই</span>
                          )}
                          <span>·</span>
                          <span>
                            মেয়াদ: <strong className={days <= 3 ? 'text-red-400 font-bold' : 'text-emerald-400'}>{u.subscriptionExpireDate}</strong> ({days} দিন বাকি)
                          </span>
                        </div>
                      </div>

                      {/* Admin Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                        {u.paymentStatus === 'Pending' && (
                          <button
                            onClick={() => handleApproveUser(u.phone)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            অনুমোদন করুন (+৩০ দিন)
                          </button>
                        )}

                        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                          <button
                            onClick={() => handleExtendDays(u.phone, 7)}
                            title="৭ দিন ট্রায়াল বা মেয়াদ বৃদ্ধি"
                            className="text-[11px] text-slate-300 hover:text-amber-300 hover:bg-slate-800 px-2 py-1 rounded-lg transition"
                          >
                            +৭ দিন
                          </button>
                          <button
                            onClick={() => handleExtendDays(u.phone, 30)}
                            title="৩০ দিন সাবস্ক্রিপশন বৃদ্ধি"
                            className="text-[11px] text-slate-300 hover:text-emerald-300 hover:bg-slate-800 px-2 py-1 rounded-lg transition"
                          >
                            +৩০ দিন
                          </button>
                          <button
                            onClick={() => handleExtendDays(u.phone, 90)}
                            title="৯০ দিন (৩ মাস) বৃদ্ধি"
                            className="text-[11px] text-slate-300 hover:text-cyan-300 hover:bg-slate-800 px-2 py-1 rounded-lg transition"
                          >
                            +৩ মাস
                          </button>
                        </div>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 text-xs font-semibold px-2.5 py-2 rounded-xl transition flex items-center gap-1 border border-emerald-600/50"
                          title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          📲 হোয়াটসঅ্যাপ
                        </a>

                        <button
                          onClick={() => handleToggleLock(u.phone)}
                          title={isUserLocked ? 'একাউন্ট আনলক করুন' : 'একাউন্ট লক করুন'}
                          className={`p-2 rounded-xl text-xs border transition ${
                            isUserLocked 
                              ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30' 
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-red-400'
                          }`}
                        >
                          {isUserLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleDeleteUser(u.phone, u.name)}
                          title={`ইউজার "${u.name}" মুছে ফেলুন`}
                          className="p-2 rounded-xl text-xs bg-red-950/60 border border-red-800/80 text-red-400 hover:bg-red-600 hover:text-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Modal: Add New User */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  নতুন ইউজার যুক্ত করুন
                </h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded-lg bg-slate-800"
                >
                  ✕ বন্ধ
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ইঞ্জিনিয়ার মাহমুদ হাসান"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    required
                    placeholder="যেমন: 01711223344"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">প্রতিষ্ঠানের নাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: পদ্মা ডেভেলপারস"
                    value={newUserData.companyName}
                    onChange={(e) => setNewUserData({ ...newUserData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ভূমিকা</label>
                    <select
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Contractor">👷 কন্ট্রাক্টর</option>
                      <option value="Site Engineer">📐 সাইট ইঞ্জিনিয়ার</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">প্রাথমিক মেয়াদ</label>
                    <select
                      value={newUserData.daysToAdd}
                      onChange={(e) => setNewUserData({ ...newUserData, daysToAdd: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="7">৭ দিন ফ্রি ট্রায়াল</option>
                      <option value="30">৩০ দিন (১ মাস)</option>
                      <option value="90">৯০ দিন (৩ মাস)</option>
                      <option value="365">৩৬৫ দিন (১ বছর)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 bg-slate-800 text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-700 transition"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl hover:bg-amber-400 transition shadow"
                  >
                    যুক্ত করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= PROJECTS TAB ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Header + Add Project Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  রানিং প্রজেক্ট ও সাইট তালিকা
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  একই সাথে একাধিক সাইটের অগ্রগতি, ক্লায়েন্ট তথ্য এবং রিয়েল-টাইম লাভ-ক্ষতির হিসাব
                </p>
              </div>
              <button 
                onClick={() => {
                  setNewProjectData({
                    id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
                    name: '',
                    ownerName: '',
                    ownerPhone: '',
                    location: '',
                    contractValue: 0,
                    materialCost: 0,
                    laborCost: 0,
                    status: 'চলমান',
                    startDate: new Date().toISOString().split('T')[0],
                    estimatedEndDate: '',
                    notes: ''
                  });
                  setShowAddProjectModal(true);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                নতুন প্রজেক্ট যোগ করুন
              </button>
            </div>

            {/* Quick Metrics of all projects */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] text-slate-400 block font-medium">মোট সাইট/প্রজেক্ট</span>
                <span className="text-2xl font-bold font-mono text-slate-100 mt-1 block">
                  {projects.length}
                </span>
                <span className="text-[10px] text-slate-500">চলমান ও সম্পন্ন</span>
              </div>

              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-amber-400 block font-medium">চলমান কাজ</span>
                <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
                  {projects.filter(p => p.status === 'চলমান').length}
                </span>
                <span className="text-[10px] text-amber-300/80">সাইটে কাজ হচ্ছে</span>
              </div>

              <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-blue-400 block font-medium">মোট চুক্তি মূল্য</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-blue-300 mt-1 block truncate">
                  ৳ {projects.reduce((acc, p) => acc + (p.contractValue || 0), 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-blue-400/80">সব প্রজেক্ট মিলিয়ে</span>
              </div>

              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
                <span className="text-[11px] text-emerald-400 block font-medium">মোট সম্ভাব্য লাভ</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1 block truncate">
                  ৳ {projects.reduce((acc, p) => acc + Math.max(0, (p.contractValue || 0) - (p.materialCost || 0) - (p.laborCost || 0)), 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400/80">নিট উদ্বৃত্ত</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="প্রজেক্টের নাম, মালিক বা লোকেশন..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                {[
                  { key: 'all', label: 'সকল প্রজেক্ট' },
                  { key: 'চলমান', label: '🚧 চলমান' },
                  { key: 'সম্পন্ন', label: '✅ সম্পন্ন' },
                  { key: 'স্থগিত', label: '⏸️ স্থগিত' }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setProjectFilter(f.key as any)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                      projectFilter === f.key
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects
                .filter(p => {
                  if (projectFilter !== 'all') return p.status === projectFilter;
                  return true;
                })
                .filter(p => {
                  if (!projectSearch) return true;
                  const q = projectSearch.toLowerCase();
                  return (
                    p.name.toLowerCase().includes(q) ||
                    p.ownerName.toLowerCase().includes(q) ||
                    p.location.toLowerCase().includes(q) ||
                    (p.id && p.id.toLowerCase().includes(q))
                  );
                })
                .map((p) => {
                  const totalExpense = (p.materialCost || 0) + (p.laborCost || 0);
                  const profit = (p.contractValue || 0) - totalExpense;
                  const profitPercent = p.contractValue > 0 ? Math.round((profit / p.contractValue) * 100) : 0;

                  return (
                    <div 
                      key={p.id}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition shadow-md group relative"
                    >
                      <div>
                        {/* Top info & status */}
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div>
                            <span className="text-[10px] font-mono text-amber-400/90 font-bold block mb-0.5">
                              #{p.id}
                            </span>
                            <h3 className="font-bold text-slate-100 text-base leading-snug">
                              {p.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                              p.status === 'চলমান'
                                ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                                : p.status === 'সম্পন্ন'
                                ? 'bg-blue-950 border-blue-800 text-blue-400'
                                : 'bg-red-950 border-red-800 text-red-400'
                            }`}>
                              {p.status}
                            </span>
                            <button
                              onClick={() => handleDeleteProject(p.id, p.name)}
                              title="প্রজেক্টটি মুছে ফেলুন"
                              className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Owner & Location */}
                        <div className="space-y-1 text-xs text-slate-400 mb-3">
                          <p className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            <span>মালিক: <strong className="text-slate-200">{p.ownerName}</strong></span>
                            {p.ownerPhone && (
                              <span className="font-mono text-slate-400">({p.ownerPhone})</span>
                            )}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{p.location}</span>
                          </p>
                        </div>

                        {/* Financials Breakdown */}
                        <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">চুক্তি মূল্য:</span>
                            <span className="font-mono font-bold text-slate-100">
                              ৳ {p.contractValue.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">মোট মালামাল খরচ:</span>
                            <span className="font-mono text-amber-400">
                              ৳ {p.materialCost.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">লেবার মজুরি:</span>
                            <span className="font-mono text-blue-400">
                              ৳ {p.laborCost.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between pt-1.5 border-t border-slate-800/60 font-semibold">
                            <span className={profit >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {profit >= 0 ? 'সম্ভাব্য লাভ মার্জিন:' : 'ক্ষতি:'}
                            </span>
                            <span className={`font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              ৳ {profit.toLocaleString()} ({profitPercent}%)
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar / Budget Usage */}
                        {p.contractValue > 0 && (
                          <div className="mt-3 pt-2">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>মোট বাজেট ব্যবহার</span>
                              <span className="font-mono">
                                {Math.min(100, Math.round((totalExpense / p.contractValue) * 100))}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  (totalExpense / p.contractValue) > 0.9 ? 'bg-red-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${Math.min(100, (totalExpense / p.contractValue) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Dates & Notes */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>শুরু: {p.startDate}</span>
                          {p.estimatedEndDate && (
                            <span>সমাপ্তি: {p.estimatedEndDate}</span>
                          )}
                        </div>

                        {p.notes && (
                          <p className="mt-2 text-[11px] text-slate-400 bg-slate-950/60 rounded-lg p-2 border border-slate-800/60 italic">
                            💬 {p.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-200">কোনো প্রজেক্ট পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  নতুন প্রজেক্ট বা কনস্ট্রাকশন সাইট যোগ করতে উপরের "নতুন প্রজেক্ট যোগ করুন" বাটনে ক্লিক করুন।
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal: Add New Project Form */}
        {showAddProjectModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-base">নতুন কনস্ট্রাকশন প্রজেক্ট ফর্ম</h3>
                    <p className="text-[11px] text-slate-400">সাইট বিবরণ, চুক্তি মূল্য ও খরচের বাজেট সেট করুন</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddProjectModal(false)}
                  className="text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1 rounded-lg bg-slate-800"
                >
                  ✕ বন্ধ
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-slate-300 font-semibold mb-1">
                      প্রজেক্ট আইডি
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="PRJ-103"
                      value={newProjectData.id}
                      onChange={(e) => setNewProjectData({ ...newProjectData, id: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">
                      প্রজেক্টের নাম (Site Name) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: গুলশান লেকভিউ অ্যাপার্টমেন্ট"
                      value={newProjectData.name}
                      onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ক্লায়েন্ট / মালিকের নাম <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ইঞ্জিনিয়ার মাহমুদ হাসান"
                      value={newProjectData.ownerName}
                      onChange={(e) => setNewProjectData({ ...newProjectData, ownerName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      মালিকের মোবাইল নম্বর
                    </label>
                    <input
                      type="tel"
                      placeholder="যেমন: 01712345678"
                      value={newProjectData.ownerPhone}
                      onChange={(e) => setNewProjectData({ ...newProjectData, ownerPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    সাইটের ঠিকানা / অবস্থান (Location)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: প্লট-১২, ব্লক-বি, বসুন্ধরা আ/এ, ঢাকা"
                    value={newProjectData.location}
                    onChange={(e) => setNewProjectData({ ...newProjectData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Financial breakdown fields */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                  <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                    💰 আর্থিক চুক্তি ও বাজেট এস্টিমেট (টাকায়)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-slate-400 font-medium text-[11px] mb-1">
                        মোট চুক্তি মূল্য (টাকা)
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newProjectData.contractValue || ''}
                        onChange={(e) => setNewProjectData({ ...newProjectData, contractValue: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium text-[11px] mb-1">
                        মালামাল খরচ (টাকা)
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newProjectData.materialCost || ''}
                        onChange={(e) => setNewProjectData({ ...newProjectData, materialCost: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium text-[11px] mb-1">
                        লেবার খরচ (টাকা)
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newProjectData.laborCost || ''}
                        onChange={(e) => setNewProjectData({ ...newProjectData, laborCost: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Calculated live margin */}
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800">
                    <span className="text-slate-400">স্বয়ংক্রিয় সম্ভাব্য লাভ:</span>
                    <span className="font-mono font-bold text-emerald-400 text-xs">
                      ৳ {((newProjectData.contractValue || 0) - (newProjectData.materialCost || 0) - (newProjectData.laborCost || 0)).toLocaleString()} টাকা
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">প্রজেক্ট স্ট্যাটাস</label>
                    <select
                      value={newProjectData.status}
                      onChange={(e) => setNewProjectData({ ...newProjectData, status: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="চলমান">🚧 চলমান (Running)</option>
                      <option value="সম্পন্ন">✅ সম্পন্ন (Completed)</option>
                      <option value="স্থগিত">⏸️ স্থগিত (Paused)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">শুরুর তারিখ</label>
                    <input
                      type="date"
                      value={newProjectData.startDate}
                      onChange={(e) => setNewProjectData({ ...newProjectData, startDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">সম্ভাব্য সমাপ্তি</label>
                    <input
                      type="date"
                      value={newProjectData.estimatedEndDate}
                      onChange={(e) => setNewProjectData({ ...newProjectData, estimatedEndDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    কাজের বিশেষ বিবরণ বা নোট (ঐচ্ছিক)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="যেমন: পাইলিংয়ের কাজ চলছে, আগামী সপ্তাহে রড ডেলিভারি আসবে..."
                    value={newProjectData.notes}
                    onChange={(e) => setNewProjectData({ ...newProjectData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProjectModal(false)}
                    className="flex-1 bg-slate-800 text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-700 transition"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                  >
                    সংরক্ষণ করুন (সেভ)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MATERIALS TAB (MATERIAL BOX) ================= */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-400" />
                  মালামাল খাতা ও চালান বক্স (Material Box)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  সাইটের মালামাল ক্রয় (ইন), ব্যবহার (আউট), সরবরাহকারী ভেন্ডর চালান ও রসিদের ফটো ম্যানেজমেন্ট
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setNewMaterialData({
                      projectId: projects[0]?.id || 'PRJ-101',
                      materialType: 'সিমেন্ট (Cement)',
                      customMaterialType: '',
                      actionType: 'ইন (ক্রয়/রিসিভ)',
                      quantity: 50,
                      unit: 'ব্যাগ',
                      unitPrice: 550,
                      totalCost: 27500,
                      workPhase: 'ছাদ ঢালাই',
                      customWorkPhase: '',
                      vendorName: '',
                      challanNo: `CH-${Math.floor(1000 + Math.random() * 9000)}`,
                      photoUrl: '',
                      date: new Date().toISOString().split('T')[0],
                      notes: ''
                    });
                    setShowAddMaterialModal(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  নতুন মালামাল / চালান এন্ট্রি
                </button>
              </div>
            </div>

            {/* Role Notice Banner */}
            <div className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              user.role === 'Admin'
                ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                : 'bg-blue-950/40 border-blue-500/30 text-blue-200'
            }`}>
              <div className="flex items-center gap-2.5">
                {user.role === 'Admin' ? (
                  <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <HardHat className="w-5 h-5 text-blue-400 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold">
                    {user.role === 'Admin' ? '👑 অ্যাডমিন রোল অ্যাক্টিভ:' : '👷 সাইট রোল অ্যাক্টিভ:'}
                  </span>{' '}
                  {user.role === 'Admin'
                    ? 'আপনি সাইটের প্রতিটি চালানের হিসাব রিভিউ, এক ক্লিকে অনুমোদন (Approve) ও ডিলিট করতে পারবেন।'
                    : 'সাইটে মালামাল আসলে বা কাজের জন্য খরচ হলে মেমো/চালানের ফটো সহ এন্ট্রি করুন। অ্যাডমিন অনুমোদনের পর চূড়ান্ত হবে।'}
                </div>
              </div>

              {user.role !== 'Admin' && (
                <button
                  onClick={makeMeAdmin}
                  className="text-[11px] bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg whitespace-nowrap hover:bg-amber-400 transition"
                >
                  অ্যাডমিন মোডে দেখুন
                </button>
              )}
            </div>

            {/* Overview Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-medium">মোট চালান এন্ট্রি</span>
                  <FileText className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-slate-100 block">
                  {materials.length} টি
                </span>
                <span className="text-[10px] text-slate-500">ইন, আউট ও রিটার্ন</span>
              </div>

              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between text-emerald-400 mb-1">
                  <span className="text-[11px] font-medium">মোট মালামাল ক্রয় (ইন)</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 block truncate">
                  ৳ {materials
                    .filter(m => m.actionType === 'ইন (ক্রয়/রিসিভ)')
                    .reduce((acc, m) => acc + (m.totalCost || 0), 0)
                    .toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400/80">সাইটে রিসিভকৃত মালামাল</span>
              </div>

              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between text-amber-400 mb-1">
                  <span className="text-[11px] font-medium">সাইটে ব্যবহার (আউট)</span>
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-mono text-amber-400 block truncate">
                  ৳ {materials
                    .filter(m => m.actionType === 'আউট (সাইটে ব্যবহার)')
                    .reduce((acc, m) => acc + (m.totalCost || 0), 0)
                    .toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-300/80">কাজে ব্যবহৃত মালামাল</span>
              </div>

              <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between text-blue-400 mb-1">
                  <span className="text-[11px] font-medium">অপেক্ষমাণ চালান</span>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-2xl font-bold font-mono text-blue-400 block">
                  {materials.filter(m => m.status === 'অপেক্ষমাণ').length} টি
                </span>
                <span className="text-[10px] text-blue-400/80">অ্যাডমিন রিভিউ প্রয়োজন</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Search box */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="চালান নং, মালামাল, ভেন্ডর বা ফেজ..."
                    value={materialSearch}
                    onChange={(e) => setMaterialSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>

                {/* Project Filter */}
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">প্রজেক্ট:</span>
                  <select
                    value={materialProjectFilter}
                    onChange={(e) => setMaterialProjectFilter(e.target.value)}
                    className="w-full sm:w-48 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">সকল সাইট ও প্রজেক্ট</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action type & Status filter buttons */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/60 text-xs">
                <div className="flex gap-1 overflow-x-auto scrollbar-none">
                  {[
                    { key: 'all', label: 'সব অ্যাকশন' },
                    { key: 'ইন (ক্রয়/রিসিভ)', label: '📥 স্টক ইন (ক্রয়)' },
                    { key: 'আউট (সাইটে ব্যবহার)', label: '📤 স্টক আউট (ব্যবহার)' },
                    { key: 'ফেরত (Return)', label: '🔄 ফেরত' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setMaterialActionFilter(tab.key as any)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                        materialActionFilter === tab.key
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="h-5 w-[1px] bg-slate-800 self-center hidden sm:block"></div>

                <div className="flex gap-1 overflow-x-auto scrollbar-none">
                  {[
                    { key: 'all', label: 'সকল স্ট্যাটাস' },
                    { key: 'অনুমোদিত', label: '✅ অনুমোদিত' },
                    { key: 'অপেক্ষমাণ', label: '⏳ অপেক্ষমাণ' },
                    { key: 'যাচাইকৃত', label: '🔍 যাচাইকৃত' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setMaterialStatusFilter(tab.key as any)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                        materialStatusFilter === tab.key
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Materials List Cards */}
            <div className="space-y-3">
              {materials
                .filter(m => {
                  if (materialProjectFilter !== 'all' && m.projectId !== materialProjectFilter) return false;
                  if (materialActionFilter !== 'all' && m.actionType !== materialActionFilter) return false;
                  if (materialStatusFilter !== 'all' && m.status !== materialStatusFilter) return false;
                  if (!materialSearch) return true;
                  const q = materialSearch.toLowerCase();
                  return (
                    m.materialType.toLowerCase().includes(q) ||
                    m.challanNo.toLowerCase().includes(q) ||
                    m.vendorName.toLowerCase().includes(q) ||
                    m.workPhase.toLowerCase().includes(q) ||
                    m.projectName.toLowerCase().includes(q) ||
                    (m.notes && m.notes.toLowerCase().includes(q))
                  );
                })
                .map((m) => {
                  const isStockIn = m.actionType === 'ইন (ক্রয়/রিসিভ)';
                  const isStockOut = m.actionType === 'আউট (সাইটে ব্যবহার)';

                  return (
                    <div
                      key={m.id}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition shadow-sm"
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Project Tag */}
                          <span className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5">
                            <Building2 className="w-3 h-3 text-amber-400" />
                            {m.projectId} · {m.projectName}
                          </span>

                          {/* Action Type Badge */}
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                            isStockIn
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                              : isStockOut
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                              : 'bg-blue-950/80 text-blue-300 border border-blue-800/50'
                          }`}>
                            {isStockIn ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {m.actionType}
                          </span>

                          {/* Status Badge */}
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                            m.status === 'অনুমোদিত'
                              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                              : m.status === 'যাচাইকৃত'
                              ? 'bg-blue-950/60 border-blue-800 text-blue-400'
                              : 'bg-amber-950/60 border-amber-800 text-amber-400 animate-pulse'
                          }`}>
                            {m.status === 'অনুমোদিত' ? '✅ অনুমোদিত' : m.status === 'যাচাইকৃত' ? '🔍 যাচাইকৃত' : '⏳ অপেক্ষমাণ'}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {m.date}
                        </div>
                      </div>

                      {/* Main Info Body */}
                      <div className="pt-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Material Name & Work Phase */}
                        <div className="md:col-span-5 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                              <Package className="w-4 h-4" />
                            </span>
                            <div>
                              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                                {m.materialType}
                              </h3>
                              <span className="text-[11px] text-slate-400">
                                এন্ট্রি আইডি: <span className="font-mono">{m.id}</span>
                              </span>
                            </div>
                          </div>

                          {/* Work Phase (ওয়ার্ক পাস) */}
                          <div className="inline-flex items-center gap-1.5 text-xs bg-slate-950 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-xl">
                            <Layers className="w-3 h-3 text-amber-400 flex-shrink-0" />
                            <span className="text-slate-400">ওয়ার্ক পাস:</span>
                            <span className="font-medium">{m.workPhase}</span>
                          </div>
                        </div>

                        {/* Quantity, Unit & Total Amount */}
                        <div className="md:col-span-4 bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">পরিমাণ:</span>
                            <span className="font-mono font-bold text-slate-200">
                              {m.quantity.toLocaleString()} {m.unit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">একক দর:</span>
                            <span className="font-mono text-slate-300">
                              ৳ {m.unitPrice.toLocaleString()} / {m.unit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                            <span className="font-semibold text-slate-300">মোট টাকা:</span>
                            <span className={`font-mono font-bold text-sm ${isStockIn ? 'text-emerald-400' : 'text-amber-400'}`}>
                              ৳ {m.totalCost.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Vendor, Challan & Photo */}
                        <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col justify-between items-start md:items-end gap-2 text-right">
                          <div className="text-left md:text-right text-xs">
                            <div className="text-slate-300 font-medium truncate max-w-[200px]" title={m.vendorName}>
                              🏢 {m.vendorName}
                            </div>
                            <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                              📄 চালান: <span className="text-amber-400 font-semibold">{m.challanNo}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              বাই: {m.submittedBy}
                            </div>
                          </div>

                          {/* Challan Photo Preview Button */}
                          {m.photoUrl ? (
                            <button
                              onClick={() => setSelectedPhotoPreview({
                                url: m.photoUrl!,
                                title: `${m.materialType} (${m.projectName})`,
                                challanNo: m.challanNo,
                                vendor: m.vendorName,
                                date: m.date
                              })}
                              className="text-[11px] bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-400 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                              চালান ফটো দেখুন
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedPhotoPreview({
                                url: '/architect-icon.png',
                                title: `${m.materialType} - নমুনা চালান ভাউচার`,
                                challanNo: m.challanNo,
                                vendor: m.vendorName,
                                date: m.date
                              })}
                              className="text-[10px] text-slate-500 hover:text-slate-400 flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-800 transition"
                            >
                              <Receipt className="w-3 h-3" />
                              ডিজিটাল চালান স্লিপ
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notes & Action Buttons */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                        <p className="text-slate-400 text-[11px] italic">
                          {m.notes ? `💬 নোট: "${m.notes}"` : 'কোনো অতিরিক্ত নোট নেই।'}
                        </p>

                        {/* Admin / Engineer action buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {/* Approve Button for Admin */}
                          {user.role === 'Admin' && m.status !== 'অনুমোদিত' && (
                            <button
                              onClick={() => handleApproveMaterial(m.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow"
                            >
                              <Check className="w-3.5 h-3.5" />
                              অনুমোদন করুন
                            </button>
                          )}

                          {/* Verify button for Site Engineer */}
                          {user.role !== 'Admin' && m.status === 'অপেক্ষমাণ' && (
                            <button
                              onClick={() => handleVerifyMaterial(m.id)}
                              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              সাইটে ভেরিফাই
                            </button>
                          )}

                          {/* Delete button (Admin or owner) */}
                          {user.role === 'Admin' && (
                            <button
                              onClick={() => handleDeleteMaterial(m.id, m.materialType)}
                              title="চালান এন্ট্রি মুছুন"
                              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg border border-slate-800 hover:border-red-900 bg-slate-950 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {materials.length === 0 && (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-slate-200 font-bold mb-1">কোনো মালামাল বা চালান এন্ট্রি নেই</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    উপরের "নতুন মালামাল / চালান এন্ট্রি" বাটনে ক্লিক করে সাইটের প্রথম চালান যুক্ত করুন।
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MODAL: ADD MATERIAL ENTRY FORM ================= */}
        {showAddMaterialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl my-8 relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-400" />
                    নতুন মালামাল ও চালান ফরম (Material Entry)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    সাইটে মালামাল ক্রয় বা ব্যবহারের বিবরণ এবং ভাউচার চালান ফটো যুক্ত করুন
                  </p>
                </div>
                <button
                  onClick={() => setShowAddMaterialModal(false)}
                  className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateMaterial} className="space-y-4 text-xs">
                {/* 1. Project ID & Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ১. প্রজেক্ট আইডি ও নাম (Project ID) <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={newMaterialData.projectId}
                    onChange={(e) => setNewMaterialData({ ...newMaterialData, projectId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                    required
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.id}] {p.name} ({p.location})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    💡 প্রজেক্ট আইডি সিলেক্ট করলে এই খরচটি সরাসরি ঐ সাইটের বাজেটের সাথে যুক্ত হবে।
                  </p>
                </div>

                {/* 2. Material Type & Action Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ২. মালামালের ধরন (Material Type) <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={newMaterialData.materialType}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, materialType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="সিমেন্ট (Cement)">সিমেন্ট (Cement)</option>
                      <option value="রড / স্টিল (MS Rod)">রড / স্টিল (MS Rod)</option>
                      <option value="লাল ইট (Bricks)">লাল ইট (Bricks)</option>
                      <option value="সিলেট বালু / লোকাল বালু (Sand)">সিলেট বালু / বালু (Sand)</option>
                      <option value="পাথর / খোয়া (Stone Chips)">পাথর / খোয়া (Stone Chips)</option>
                      <option value="ফ্লোর টাইলস (Floor Tiles)">ফ্লোর টাইলস (Floor Tiles)</option>
                      <option value="দেয়াল টাইলস (Wall Tiles)">দেয়াল টাইলস (Wall Tiles)</option>
                      <option value="রং ও পুটিং (Paint / Primer)">রং ও পুটিং (Paint / Primer)</option>
                      <option value="প্লাম্বিং ও পাইপ (Plumbing Pipes)">প্লাম্বিং ও পাইপ ফিটিংস</option>
                      <option value="ইলেকট্রিক ফিটিংস (Electrical)">ইলেকট্রিক সরঞ্জাম</option>
                      <option value="কাঠ ও শাটারিং শিট (Wood / Shuttering)">কাঠ ও শাটারিং শিট</option>
                      <option value="অন্যান্য">অন্যান্য (Custom Item)</option>
                    </select>

                    {newMaterialData.materialType === 'অন্যান্য' && (
                      <input
                        type="text"
                        placeholder="মালামালের নাম লিখুন..."
                        value={newMaterialData.customMaterialType}
                        onChange={(e) => setNewMaterialData({ ...newMaterialData, customMaterialType: e.target.value })}
                        className="w-full mt-2 bg-slate-950 border border-amber-500/50 rounded-xl px-3 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                        required
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ৩. অ্যাকশন টাইপ (Action Type) <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={newMaterialData.actionType}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, actionType: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="ইন (ক্রয়/রিসিভ)">📥 ইন (মালামাল ক্রয় / সাইটে আগমন)</option>
                      <option value="আউট (সাইটে ব্যবহার)">📤 আউট (সাইটের কাজে ব্যবহার)</option>
                      <option value="ফেরত (Return)">🔄 ফেরত (ভেন্ডর রিটার্ন)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Quantity, Unit, Unit Price, Total Cost */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                  <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                    📊 পরিমাণ ও খরচের হিসাব (Quantity & Cost)
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">পরিমাণ (Qty)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        value={newMaterialData.quantity || ''}
                        onChange={(e) => {
                          const q = parseFloat(e.target.value) || 0;
                          const p = newMaterialData.unitPrice || 0;
                          setNewMaterialData({
                            ...newMaterialData,
                            quantity: q,
                            totalCost: Math.round(q * p)
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">একক (Unit)</label>
                      <select
                        value={newMaterialData.unit}
                        onChange={(e) => setNewMaterialData({ ...newMaterialData, unit: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="ব্যাগ">ব্যাগ (Bags)</option>
                        <option value="কেজি">কেজি (Kg)</option>
                        <option value="টন">টন (Ton)</option>
                        <option value="পিচ">পিচ (Pcs)</option>
                        <option value="হাজার">হাজার (Thousand)</option>
                        <option value="সিএফটি">সিএফটি (CFT)</option>
                        <option value="স্কয়ার ফিট">স্কয়ার ফিট (Sq Ft)</option>
                        <option value="প্যাকেট">প্যাকেট (Pack)</option>
                        <option value="ড্রাম">ড্রাম (Drum)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">একক দর (৳)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        value={newMaterialData.unitPrice || ''}
                        onChange={(e) => {
                          const p = parseFloat(e.target.value) || 0;
                          const q = newMaterialData.quantity || 0;
                          setNewMaterialData({
                            ...newMaterialData,
                            unitPrice: p,
                            totalCost: Math.round(q * p)
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">মোট টাকা (৳)</label>
                      <input
                        type="number"
                        min="0"
                        value={newMaterialData.totalCost || ''}
                        onChange={(e) => setNewMaterialData({ ...newMaterialData, totalCost: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Work Phase (ওয়ার্ক পাস / কাজের খাত) */}
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-amber-300 font-semibold">
                      ৪. ওয়ার্ক পাস / কাজের খাত (Work Phase) <span className="text-amber-400">*</span>
                    </label>
                  </div>
                  <select
                    value={newMaterialData.workPhase}
                    onChange={(e) => setNewMaterialData({ ...newMaterialData, workPhase: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ছাদ ঢালাই">ছাদ ঢালাই (Roof Casting)</option>
                    <option value="গ্রেড বিম ও কলাম ঢালাই">গ্রেড বিম ও কলাম ঢালাই (Beam & Column)</option>
                    <option value="বেইজমেন্ট ও পাইলিং">বেইজমেন্ট ও পাইলিং (Basement / Piling)</option>
                    <option value="ইটের গাঁথুনি">ইটের গাঁথুনি (Brick Masonry)</option>
                    <option value="দেয়াল প্লাস্টার">দেয়াল প্লাস্টার (Wall Plastering)</option>
                    <option value="ফ্লোর টাইলস ও ফিনিশিং">ফ্লোর টাইলস ও ফিনিশিং (Tiles Fitting)</option>
                    <option value="রঙ ও ডেকোরেশন">রঙ ও ডেকোরেশন (Painting)</option>
                    <option value="স্যানিটারি ও প্লাম্বিং">স্যানিটারি ও প্লাম্বিং (Sanitary)</option>
                    <option value="বাউন্ডারি ওয়াল ও সাইট গেট">বাউন্ডারি ওয়াল ও সাইট প্রস্তুতি</option>
                    <option value="অন্যান্য">অন্যান্য কাজের খাত</option>
                  </select>

                  {newMaterialData.workPhase === 'অন্যান্য' && (
                    <input
                      type="text"
                      placeholder="কাজের খাতের নাম লিখুন..."
                      value={newMaterialData.customWorkPhase}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, customWorkPhase: e.target.value })}
                      className="w-full bg-slate-950 border border-amber-500/50 rounded-xl px-3 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                      required
                    />
                  )}

                  <div className="text-[11px] text-amber-200/90 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/10">
                    💡 <strong>ওয়ার্ক পাস (Work Phase) কী?</strong> কনস্ট্রাকশনে ওয়ার্ক পাস হলো কাজের কোন অংশের জন্য মালামালটি সাইটে ব্যবহৃত হচ্ছে (যেমন: ছাদ ঢালাই নাকি দেয়াল প্লাস্টার)। এতে প্রজেক্টের কোন ধাপে কত টাকা খরচ হলো তা নির্ভুলভাবে আলাদা ট্র্যাক করা যায়।
                  </div>
                </div>

                {/* 5. Vendor Name & Challan No */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ৫. ভেন্ডর / সরবরাহকারী (Vendor Name) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মেসার্স শাহ সিমেন্ট এজেন্সি"
                      value={newMaterialData.vendorName}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, vendorName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ৬. চালান স্লিপ নম্বর (Challan No) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: CH-8902 / মেমো নং"
                      value={newMaterialData.challanNo}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, challanNo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* 6. Challan Slip Photo Upload */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ৭. চালান স্লিপের ছবি / রসিদের ফটো (Challan Slip Photo)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>{newMaterialData.photoUrl ? 'ছবি পরিবর্তন করুন' : 'ক্যামেরা / গ্যালারি থেকে চালান ছবি আপলোড'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewMaterialData({
                                ...newMaterialData,
                                photoUrl: reader.result as string
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    {newMaterialData.photoUrl && (
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                        <img
                          src={newMaterialData.photoUrl}
                          alt="Challan preview"
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setNewMaterialData({ ...newMaterialData, photoUrl: '' })}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1"
                        >
                          মুছুন
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 7. Date & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">৮. তারিখ (Date)</label>
                    <input
                      type="date"
                      required
                      value={newMaterialData.date}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">৯. অতিরিক্ত বিবরণ / নোট</label>
                    <input
                      type="text"
                      placeholder="যেমন: ট্রাক নং, আনলোডিং খরচ ইত্যাদি"
                      value={newMaterialData.notes}
                      onChange={(e) => setNewMaterialData({ ...newMaterialData, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddMaterialModal(false)}
                    className="flex-1 bg-slate-800 text-slate-300 font-medium py-3 rounded-xl hover:bg-slate-700 transition"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                  >
                    চালান রেকর্ড সেভ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL: CHALLAN PHOTO VIEWER ================= */}
        {selectedPhotoPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-amber-400" />
                    {selectedPhotoPreview.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    চালান নং: <span className="text-amber-400 font-bold">{selectedPhotoPreview.challanNo}</span> · ভেন্ডর: {selectedPhotoPreview.vendor}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhotoPreview(null)}
                  className="text-slate-400 hover:text-slate-100 p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[260px] max-h-[420px] p-2">
                <img
                  src={selectedPhotoPreview.url}
                  alt="Challan Full View"
                  className="max-h-[380px] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              <div className="mt-4 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-mono">তারিখ: {selectedPhotoPreview.date}</span>
                <button
                  onClick={() => setSelectedPhotoPreview(null)}
                  className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-600 mb-14 md:mb-0">
        NIRMAN · সর্বস্বত্ব সংরক্ষিত · কনস্ট্রাকশন ও সাইট ম্যানেজমেন্ট প্ল্যাটফর্ম
      </footer>

      {/* Mobile Bottom Navigation Dock (মোবাইল ও ট্যাবলেট টাচ ডক বার) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
            activeTab === 'calculator' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">ক্যালকুলেটর</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
            activeTab === 'projects' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">প্রজেক্ট</span>
        </button>

        {/* মালামাল খাতা button */}
        <button
          type="button"
          onClick={() => setActiveTab('materials')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition ${
            activeTab === 'materials' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Package className="w-5 h-5 mb-0.5" />
            {materials.filter(m => m.status === 'অপেক্ষমাণ').length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse border-2 border-slate-950"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">মালামাল</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
            activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">প্রোফাইল</span>
        </button>

        {user.role === 'Admin' ? (
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
              activeTab === 'admin' ? 'text-amber-400 font-bold' : 'text-amber-500/70 hover:text-amber-300'
            }`}
          >
            <ShieldCheck className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">অ্যাডমিন</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveTab('subscription')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
              activeTab === 'subscription' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">রিনিউ</span>
          </button>
        )}
      </nav>
    </div>
  );
}
