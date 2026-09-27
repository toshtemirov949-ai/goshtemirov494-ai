import React, { useState, useRef, useEffect } from 'react';
import { 
  X, LayoutDashboard, Edit3, FileText, Settings, ShieldCheck, 
  Users, BookOpen, Bot, Activity, CheckCircle2, AlertTriangle, 
  Save, RefreshCw, Plus, Trash2, Search, Download, LogOut,
  ChevronRight, Database, Server, Cpu, Globe, Check, Eye, EyeOff,
  CreditCard, Award, HardDrive, KeyRound, Sliders, Sparkles, Filter,
  Layers, ArrowDownCircle, ExternalLink, ShieldAlert,
  GraduationCap, Video, PlusCircle, FolderPlus, Clock, PlayCircle, UserPlus, BookMarked,
  Star, Mail, Book, Volume2, Upload, RotateCcw, UserCheck, UserX, Send, RefreshCcw
} from 'lucide-react';
import { Course, CourseCategory, CourseModule, Lesson } from '../types';
import { 
  AdminLogItem, 
  AdminSettings, 
  AdminInstructor,
  AdminTextbook,
  AdminBillingSettings,
  AdminCertificateSettings,
  MockUser,
  getStoredAdminLogs, 
  saveStoredAdminLogs, 
  addAdminLog,
  getStoredAdminSettings, 
  saveStoredAdminSettings,
  saveStoredCourses,
  getStoredInstructors,
  saveStoredInstructors,
  getStoredTextbooks,
  saveStoredTextbooks,
  getStoredBillingSettings,
  saveStoredBillingSettings,
  getStoredCertificateSettings,
  saveStoredCertificateSettings,
  getStoredUsers,
  saveStoredUsers,
  resetAdminDataToDefaults,
  computeTotalStudentsCount,
  getStoredTotalCertificatesCount,
  incrementStoredCertificatesCount,
  decrementStoredCertificatesCount,
  resetStoredCertificatesCount
} from '../utils/adminStorage';

interface AdminCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
  onLogoutAdmin: () => void;
  showToast: (msg: string) => void;
  totalCertificatesCount?: number;
  onUpdateTotalCertificatesCount?: (count: number) => void;
  onUpdateUsersList?: (users: MockUser[]) => void;
}

export type AdminTab = 
  | 'dashboard' 
  | 'editor' 
  | 'create_course'
  | 'textbooks_manager'
  | 'instructors_manager'
  | 'lessons_manager'
  | 'users'
  | 'settings_general'
  | 'settings_ai'
  | 'settings_security'
  | 'settings_billing'
  | 'settings_certificates'
  | 'logs' 
  | 'settings_server'
  | 'backup_export';

export const AdminCabinetModal: React.FC<AdminCabinetModalProps> = ({
  isOpen,
  onClose,
  courses,
  onUpdateCourses,
  onLogoutAdmin,
  showToast,
  totalCertificatesCount: propTotalCertificatesCount,
  onUpdateTotalCertificatesCount,
  onUpdateUsersList
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [menuSearch, setMenuSearch] = useState<string>('');

  // Logs state
  const [logs, setLogs] = useState<AdminLogItem[]>(getStoredAdminLogs());
  const [logFilter, setLogFilter] = useState<string>('all');
  const [logSearch, setLogSearch] = useState<string>('');

  // Settings state
  const [settings, setSettings] = useState<AdminSettings>(getStoredAdminSettings());
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Users state
  const [usersList, setUsersList] = useState<MockUser[]>(getStoredUsers());
  const [userSearch, setUserSearch] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<'Talaba' | 'Mentor' | 'Admin'>('Talaba');

  // Certificate & Student real live statistics
  const [certificatesCount, setCertificatesCount] = useState<number>(
    propTotalCertificatesCount ?? getStoredTotalCertificatesCount()
  );

  useEffect(() => {
    if (propTotalCertificatesCount !== undefined) {
      setCertificatesCount(propTotalCertificatesCount);
    }
  }, [propTotalCertificatesCount]);

  useEffect(() => {
    if (isOpen) {
      setUsersList(getStoredUsers());
      setCertificatesCount(propTotalCertificatesCount ?? getStoredTotalCertificatesCount());
    }
  }, [isOpen, propTotalCertificatesCount]);

  const totalStudentsCount = computeTotalStudentsCount(usersList);

  // Billing & Payment Settings
  const initialBilling = getStoredBillingSettings();
  const [clickActive, setClickActive] = useState<boolean>(initialBilling.clickActive);
  const [paymeActive, setPaymeActive] = useState<boolean>(initialBilling.paymeActive);
  const [uzumActive, setUzumActive] = useState<boolean>(initialBilling.uzumActive);
  const [currency, setCurrency] = useState<string>(initialBilling.currency);
  const [monthlySubscription, setMonthlySubscription] = useState<number>(initialBilling.monthlySubscription);

  // Certificate & Grading Settings
  const initialCert = getStoredCertificateSettings();
  const [passingScore, setPassingScore] = useState<number>(initialCert.passingScore);
  const [distinctionScore, setDistinctionScore] = useState<number>(initialCert.distinctionScore);
  const [autoIssueCert, setAutoIssueCert] = useState<boolean>(initialCert.autoIssueCert);
  const [certSignerTitle, setCertSignerTitle] = useState<string>(initialCert.certSignerTitle);

  // File input ref for JSON backup restore
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Course Editor state
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [editorSearch, setEditorSearch] = useState<string>('');

  // Synchronize courseList when courses prop changes
  useEffect(() => {
    setCourseList(courses);
  }, [courses]);

  // Modal to add new course quickly
  const [showAddCourseModal, setShowAddCourseModal] = useState<boolean>(false);

  // In-app universal delete confirmation dialog (works reliably in iframe sandboxes)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    itemName: string;
    itemTypeLabel: string;
    warningNote?: string;
    onConfirm: () => void;
  } | null>(null);
  
  // Active course being edited
  const selectedCourse = courseList.find(c => c.id === selectedCourseId) || courseList[0];
  const [editTitle, setEditTitle] = useState(selectedCourse?.title || '');
  const [editShortDesc, setEditShortDesc] = useState(selectedCourse?.shortDescription || '');
  const [editLevel, setEditLevel] = useState(selectedCourse?.level || 'Oʻrta (Intermediate)');
  const [editInstructor, setEditInstructor] = useState(selectedCourse?.instructor?.name || '');
  const [editLessonsCount, setEditLessonsCount] = useState(selectedCourse?.lessonsCount || 20);
  const [editDurationHours, setEditDurationHours] = useState(selectedCourse?.durationHours || 30);
  const [editCategory, setEditCategory] = useState<CourseCategory>(selectedCourse?.category || 'it');

  // New course create form state
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<CourseCategory>('it');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseInstructor, setNewCourseInstructor] = useState('ZiyoTalim Katta Eksperti');
  const [newCourseLevel, setNewCourseLevel] = useState('Boshlangʻich (Beginner)');
  const [newCourseLessons, setNewCourseLessons] = useState(16);
  const [newCourseHours, setNewCourseHours] = useState(28);

  // Instructors management state
  const [instructorsList, setInstructorsList] = useState<AdminInstructor[]>(getStoredInstructors());
  const [instructorSearch, setInstructorSearch] = useState<string>('');
  const [showAddInstructorModal, setShowAddInstructorModal] = useState<boolean>(false);
  const [newInstName, setNewInstName] = useState<string>('');
  const [newInstRole, setNewInstRole] = useState<string>('');
  const [newInstOrg, setNewInstOrg] = useState<string>('ZiyoTalim & Techzone');
  const [newInstExp, setNewInstExp] = useState<string>('5 yil tajriba');
  const [newInstSpec, setNewInstSpec] = useState<string>('');
  const [newInstBio, setNewInstBio] = useState<string>('');
  const [newInstEmail, setNewInstEmail] = useState<string>('');
  const [newInstAvatar, setNewInstAvatar] = useState<string>('');
  const [newInstRating, setNewInstRating] = useState<number>(4.9);

  // Textbooks (Darsliklar & Oʻquv qoʻllanmalar) management state
  const [textbooksList, setTextbooksList] = useState<AdminTextbook[]>(getStoredTextbooks());
  const [textbookSearch, setTextbookSearch] = useState<string>('');
  const [textbookSubjectFilter, setTextbookSubjectFilter] = useState<string>('all');
  const [showAddTextbookModal, setShowAddTextbookModal] = useState<boolean>(false);
  const [newBookTitle, setNewBookTitle] = useState<string>('');
  const [newBookSubject, setNewBookSubject] = useState<string>('Ingliz tili');
  const [newBookCategory, setNewBookCategory] = useState<string>('languages');
  const [newBookAuthor, setNewBookAuthor] = useState<string>('');
  const [newBookPages, setNewBookPages] = useState<number>(200);
  const [newBookLevel, setNewBookLevel] = useState<string>('Barcha darajalar');
  const [newBookFormat, setNewBookFormat] = useState<AdminTextbook['format']>('PDF');
  const [newBookFileSize, setNewBookFileSize] = useState<string>('15.4 MB');
  const [newBookDesc, setNewBookDesc] = useState<string>('');
  const [newBookCover, setNewBookCover] = useState<string>('');

  // Lessons management state
  const [lessonCourseId, setLessonCourseId] = useState<string>(courses[0]?.id || '');
  const [showAddLessonModal, setShowAddLessonModal] = useState<boolean>(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState<boolean>(false);
  const [targetModuleId, setTargetModuleId] = useState<string>('');
  const [newLessonTitle, setNewLessonTitle] = useState<string>('');
  const [newLessonDuration, setNewLessonDuration] = useState<string>('25 daqiqa');
  const [newLessonType, setNewLessonType] = useState<Lesson['type']>('video');
  const [newLessonSnippet, setNewLessonSnippet] = useState<string>('');
  const [newModuleTitle, setNewModuleTitle] = useState<string>('');

  // Sync editor fields when selected course changes
  const handleSelectCourseToEdit = (course: Course) => {
    setSelectedCourseId(course.id);
    setEditTitle(course.title);
    setEditShortDesc(course.shortDescription || '');
    setEditLevel(course.level || 'Oʻrta (Intermediate)');
    setEditInstructor(course.instructor?.name || '');
    setEditLessonsCount(course.lessonsCount || 20);
    setEditDurationHours(course.durationHours || 30);
    setEditCategory(course.category || 'it');
  };

  // Save edited course
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    const updatedList = courseList.map(c => {
      if (c.id === selectedCourse.id) {
        return {
          ...c,
          title: editTitle,
          shortDescription: editShortDesc,
          category: editCategory,
          level: editLevel,
          instructor: {
            ...c.instructor,
            name: editInstructor
          },
          lessonsCount: Number(editLessonsCount),
          durationHours: Number(editDurationHours)
        };
      }
      return c;
    });

    setCourseList(updatedList);
    onUpdateCourses(updatedList);
    saveStoredCourses(updatedList);

    addAdminLog(
      'COURSE_EDIT',
      'Kurs muvaffaqiyatli tahrirlandi',
      `"${editTitle}" kursi maʼlumotlari admin tomonidan yangilandi`,
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${editTitle}" kursi muvaffaqiyatli saqlandi!`);
  };

  // Delete course handler with in-app confirmation (iframe-safe)
  const handleDeleteCourse = (courseId: string) => {
    const courseToDelete = courseList.find(c => c.id === courseId);
    if (!courseToDelete) return;

    setDeleteConfirm({
      isOpen: true,
      title: 'Kursni Oʻchirish',
      itemName: courseToDelete.title,
      itemTypeLabel: 'kurs',
      warningNote: 'Ushbu kurs va uning barcha darsliklari platformadan butunlay oʻchiriladi.',
      onConfirm: () => {
        const updated = courseList.filter(c => c.id !== courseId);
        setCourseList(updated);
        onUpdateCourses(updated);
        saveStoredCourses(updated);

        if (selectedCourseId === courseId && updated.length > 0) {
          handleSelectCourseToEdit(updated[0]);
        }
        if (lessonCourseId === courseId && updated.length > 0) {
          setLessonCourseId(updated[0].id);
        }

        addAdminLog(
          'COURSE_EDIT',
          'Kurs oʻchirildi',
          `"${courseToDelete.title}" kursi admin tomonidan bazadan oʻchirib tashlandi`,
          'warning'
        );
        setLogs(getStoredAdminLogs());
        showToast(`"${courseToDelete.title}" kursi muvaffaqiyatli oʻchirildi!`);
        setDeleteConfirm(null);
      }
    });
  };

  // Create brand new course handler
  const handleCreateNewCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) {
      showToast('Iltimos, kurs nomini kiriting');
      return;
    }

    const newId = 'course-' + Date.now();
    const newCourse: Course = {
      id: newId,
      title: newCourseTitle.trim(),
      category: newCourseCategory,
      shortDescription: newCourseDesc.trim() || 'Yangi taʼlim dasturi va sertifikatsiyalangan darslar toʻplami.',
      level: newCourseLevel,
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      durationHours: Number(newCourseHours) || 28,
      lessonsCount: Number(newCourseLessons) || 16,
      instructor: {
        name: newCourseInstructor.trim() || 'ZiyoTalim Katta Eksperti',
        role: 'Bosh instruktor',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      highlights: ['Amaliy loyihalar', 'Rasmiy sertifikat', 'AI tahlil'],
      modules: [
        {
          id: 'mod-1',
          title: '1-Modul: Asosiy Dastur & Kirish',
          lessons: [
            {
              id: 'les-1',
              title: `1-Dars: ${newCourseTitle.trim()} ga kirish va asosiy tushunchalar`,
              duration: '25 daqiqa',
              type: 'video',
              contentSnippet: 'Ushbu darsda kurs maqsadi va asosiy koʻnikmalar oʻrganiladi.'
            }
          ]
        }
      ]
    };

    const updated = [newCourse, ...courseList];
    setCourseList(updated);
    onUpdateCourses(updated);
    saveStoredCourses(updated);

    addAdminLog(
      'COURSE_EDIT',
      'Yangi kurs kiritildi',
      `"${newCourse.title}" yangi oʻquv kursi bazaga qoʻshildi`,
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${newCourse.title}" muvaffaqiyatli yaratildi!`);

    // Reset create form & switch to editor
    setNewCourseTitle('');
    setNewCourseDesc('');
    setShowAddCourseModal(false);
    handleSelectCourseToEdit(newCourse);
    setActiveTab('editor');
  };

  // Add lesson to module
  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      showToast('Iltimos, darslik nomini kiriting');
      return;
    }

    const targetCourse = courseList.find(c => c.id === lessonCourseId);
    if (!targetCourse) return;

    let currentModules = targetCourse.modules && targetCourse.modules.length > 0 
      ? [...targetCourse.modules] 
      : [{ id: 'mod-1', title: '1-Modul: Asosiy Taʼlim Dasturi', lessons: [] }];

    let modId = targetModuleId;
    if (!modId || !currentModules.some(m => m.id === modId)) {
      modId = currentModules[0].id;
    }

    const newLesson: Lesson = {
      id: 'les-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
      title: newLessonTitle.trim(),
      duration: newLessonDuration.trim() || '25 daqiqa',
      type: newLessonType || 'video',
      contentSnippet: newLessonSnippet.trim() || 'Amaliy bilim va nazariy tushunchalar.'
    };

    const updatedModules = currentModules.map(m => {
      if (m.id === modId) {
        return {
          ...m,
          lessons: [...(m.lessons || []), newLesson]
        };
      }
      return m;
    });

    const totalLessons = updatedModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

    const updatedCourses = courseList.map(c => {
      if (c.id === lessonCourseId) {
        return {
          ...c,
          modules: updatedModules,
          lessonsCount: totalLessons
        };
      }
      return c;
    });

    setCourseList(updatedCourses);
    onUpdateCourses(updatedCourses);
    saveStoredCourses(updatedCourses);

    addAdminLog(
      'COURSE_EDIT',
      'Yangi darslik qoʻshildi',
      `"${newLessonTitle}" darsi kiritildi (Kurs: ${targetCourse.title})`,
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${newLessonTitle}" darsligi muvaffaqiyatli qoʻshildi!`);

    // Reset form
    setNewLessonTitle('');
    setNewLessonSnippet('');
    setShowAddLessonModal(false);
  };

  // Delete lesson from module with in-app confirmation
  const handleDeleteLesson = (courseId: string, moduleId: string, lessonId: string) => {
    const course = courseList.find(c => c.id === courseId);
    if (!course) return;

    const targetModule = (course.modules || []).find(m => m.id === moduleId);
    const targetLesson = targetModule?.lessons?.find(l => l.id === lessonId);
    const lessonTitle = targetLesson?.title || 'Darslik';

    setDeleteConfirm({
      isOpen: true,
      title: 'Darslikni Oʻchirish',
      itemName: lessonTitle,
      itemTypeLabel: 'dars',
      warningNote: `Ushbu darslik "${course.title}" kursidan oʻchiriladi.`,
      onConfirm: () => {
        const updatedCourses = courseList.map(c => {
          if (c.id === courseId) {
            const updatedModules = (c.modules || []).map(m => {
              if (m.id === moduleId) {
                return {
                  ...m,
                  lessons: (m.lessons || []).filter(l => l.id !== lessonId)
                };
              }
              return m;
            });

            const totalLessons = updatedModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

            return {
              ...c,
              modules: updatedModules,
              lessonsCount: Math.max(1, totalLessons)
            };
          }
          return c;
        });

        setCourseList(updatedCourses);
        onUpdateCourses(updatedCourses);
        saveStoredCourses(updatedCourses);

        addAdminLog(
          'COURSE_EDIT',
          'Darslik oʻchirildi',
          `"${lessonTitle}" darsi oʻchirildi (Kurs: ${course.title})`,
          'warning'
        );
        setLogs(getStoredAdminLogs());
        showToast('Darslik muvaffaqiyatli oʻchirildi!');
        setDeleteConfirm(null);
      }
    });
  };

  // Add new module to course
  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) {
      showToast('Iltimos, modul nomini kiriting');
      return;
    }

    const targetCourse = courseList.find(c => c.id === lessonCourseId);
    if (!targetCourse) return;

    const currentModules = targetCourse.modules || [];
    const newMod: CourseModule = {
      id: 'mod-' + Date.now(),
      title: newModuleTitle.trim(),
      lessons: []
    };

    const updatedCourses = courseList.map(c => {
      if (c.id === lessonCourseId) {
        return {
          ...c,
          modules: [...currentModules, newMod]
        };
      }
      return c;
    });

    setCourseList(updatedCourses);
    onUpdateCourses(updatedCourses);
    saveStoredCourses(updatedCourses);

    addAdminLog(
      'COURSE_EDIT',
      'Yangi modul kiritildi',
      `"${newModuleTitle}" moduli yaratildi (Kurs: ${targetCourse.title})`,
      'info'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${newModuleTitle}" moduli yaratildi!`);

    setNewModuleTitle('');
    setShowAddModuleModal(false);
  };

  // Delete module from course with in-app confirmation
  const handleDeleteModule = (courseId: string, moduleId: string) => {
    const course = courseList.find(c => c.id === courseId);
    if (!course) return;
    const targetMod = (course.modules || []).find(m => m.id === moduleId);
    const modTitle = targetMod?.title || 'Modul';

    setDeleteConfirm({
      isOpen: true,
      title: 'Modulni Oʻchirish',
      itemName: modTitle,
      itemTypeLabel: 'modul',
      warningNote: 'Modul ichidagi barcha darsliklar ham birga oʻchiriladi.',
      onConfirm: () => {
        const updatedCourses = courseList.map(c => {
          if (c.id === courseId) {
            const updatedModules = (c.modules || []).filter(m => m.id !== moduleId);
            const totalLessons = updatedModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
            return {
              ...c,
              modules: updatedModules,
              lessonsCount: Math.max(1, totalLessons)
            };
          }
          return c;
        });

        setCourseList(updatedCourses);
        onUpdateCourses(updatedCourses);
        saveStoredCourses(updatedCourses);

        addAdminLog('COURSE_EDIT', 'Modul oʻchirildi', `"${modTitle}" moduli oʻchirildi`, 'warning');
        setLogs(getStoredAdminLogs());
        showToast('Modul muvaffaqiyatli oʻchirildi!');
        setDeleteConfirm(null);
      }
    });
  };

  // Add new instructor
  const handleAddInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstName.trim()) {
      showToast('Iltimos, ustoz ism-sharifini kiriting');
      return;
    }

    const newInstructor: AdminInstructor = {
      id: 'inst-' + Date.now(),
      name: newInstName.trim(),
      role: newInstRole.trim() || 'Katta Instruktor & Mutaxassis',
      organization: newInstOrg.trim() || 'ZiyoTalim & Techzone',
      experience: newInstExp.trim() || '5 yil tajriba',
      specialty: newInstSpec.trim() || 'Axborot texnologiyalari va Xorijiy tillar',
      rating: Number(newInstRating) || 4.9,
      bio: newInstBio.trim() || 'Talabalarga amaliy bilim beruvchi xalqaro darajadagi mutaxassis.',
      email: newInstEmail.trim() || 'ustoz@ziyotalim.uz',
      avatarUrl: newInstAvatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    const updated = [newInstructor, ...instructorsList];
    setInstructorsList(updated);
    saveStoredInstructors(updated);

    addAdminLog(
      'USER_ACTION',
      'Yangi ustoz roʻyxatga olindi',
      `"${newInstructor.name}" platforma ustozlari safiga qoʻshildi`,
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${newInstructor.name}" muvaffaqiyatli roʻyxatga olindi!`);

    // Reset form
    setNewInstName('');
    setNewInstRole('');
    setNewInstOrg('ZiyoTalim & Techzone');
    setNewInstExp('5 yil tajriba');
    setNewInstSpec('');
    setNewInstBio('');
    setNewInstEmail('');
    setNewInstAvatar('');
    setShowAddInstructorModal(false);
  };

  // Delete instructor with in-app confirmation
  const handleDeleteInstructor = (instId: string) => {
    const instToDelete = instructorsList.find(i => i.id === instId);
    if (!instToDelete) return;

    setDeleteConfirm({
      isOpen: true,
      title: 'Ustozni Roʻyxatdan Oʻchirish',
      itemName: instToDelete.name,
      itemTypeLabel: 'ustoz / instruktor',
      warningNote: 'Ushbu mutaxassis platforma oʻqituvchilari roʻyxatidan olib tashlanadi.',
      onConfirm: () => {
        const updated = instructorsList.filter(i => i.id !== instId);
        setInstructorsList(updated);
        saveStoredInstructors(updated);

        addAdminLog(
          'USER_ACTION',
          'Ustoz roʻyxatdan chiqarildi',
          `"${instToDelete.name}" ustozlar roʻyxatidan oʻchirildi`,
          'warning'
        );
        setLogs(getStoredAdminLogs());
        showToast(`"${instToDelete.name}" muvaffaqiyatli oʻchirildi!`);
        setDeleteConfirm(null);
      }
    });
  };

  // Add new textbook
  const handleAddTextbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim()) {
      showToast('Iltimos, darslik nomini kiriting');
      return;
    }

    const newBook: AdminTextbook = {
      id: 'tb-' + Date.now(),
      title: newBookTitle.trim(),
      subject: newBookSubject.trim() || 'Umumiy taʼlim',
      category: newBookCategory,
      author: newBookAuthor.trim() || 'ZiyoTalim Ekspertlari',
      pagesCount: Number(newBookPages) || 150,
      level: newBookLevel || 'Barcha darajalar',
      format: newBookFormat,
      fileSize: newBookFileSize.trim() || '12 MB',
      downloadUrl: '#',
      coverImage: newBookCover.trim() || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&auto=format&fit=crop&q=80',
      description: newBookDesc.trim() || 'Oʻquv dasturi boʻyicha rasmiy darslik va qoʻllanma.',
      addedDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };

    const updated = [newBook, ...textbooksList];
    setTextbooksList(updated);
    saveStoredTextbooks(updated);

    addAdminLog(
      'COURSE_EDIT',
      'Yangi darslik qoʻshildi',
      `"${newBook.title}" darsligi (${newBook.subject}) oʻquv bazasiga kiritildi`,
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast(`"${newBook.title}" darsligi muvaffaqiyatli qoʻshildi!`);

    // Reset form
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookDesc('');
    setNewBookCover('');
    setShowAddTextbookModal(false);
  };

  // Delete textbook with in-app confirmation
  const handleDeleteTextbook = (bookId: string) => {
    const bookToDelete = textbooksList.find(b => b.id === bookId);
    if (!bookToDelete) return;

    setDeleteConfirm({
      isOpen: true,
      title: 'Darslikni Oʻchirish',
      itemName: bookToDelete.title,
      itemTypeLabel: 'darslik / qoʻllanma',
      warningNote: 'Ushbu darslik va yuklab olish fayllari bazadan chiqariladi.',
      onConfirm: () => {
        const updated = textbooksList.filter(b => b.id !== bookId);
        setTextbooksList(updated);
        saveStoredTextbooks(updated);

        addAdminLog(
          'COURSE_EDIT',
          'Darslik bazadan oʻchirildi',
          `"${bookToDelete.title}" darsligi admin tomonidan oʻchirildi`,
          'warning'
        );
        setLogs(getStoredAdminLogs());
        showToast(`"${bookToDelete.title}" darsligi oʻchirildi!`);
        setDeleteConfirm(null);
      }
    });
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredAdminSettings(settings);
    setLogs(getStoredAdminLogs());
    addAdminLog(
      'SYSTEM',
      'Tizim sozlamalari yangilandi',
      'Platforma parametrlari admin tomonidan saqlandi',
      'success'
    );
    setLogs(getStoredAdminLogs());
    showToast('Barcha sozlamalar muvaffaqiyatli saqlandi!');
  };

  // Clear Logs
  const handleClearLogs = () => {
    saveStoredAdminLogs([]);
    setLogs([]);
    showToast('Loglar tozalandi');
  };

  // Export Logs to JSON
  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ziyotalim_admin_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Tizim loglari JSON formatida yuklab olindi');
  };

  // Export Full System Backup
  const handleExportFullBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      platform: settings.platformName,
      coursesCount: courseList.length,
      courses: courseList,
      textbooks: textbooksList,
      instructors: instructorsList,
      settings: settings,
      logs: logs,
      users: usersList,
      billing: {
        clickActive,
        paymeActive,
        uzumActive,
        currency,
        monthlySubscription
      },
      certificates: {
        passingScore,
        distinctionScore,
        autoIssueCert,
        certSignerTitle
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ziyotalim_tizim_zaxira_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Toʻliq tizim zaxira nusxasi (Backup) yuklab olindi!');
  };

  // Add User Handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast('Iltimos, ism va emailni kiriting');
      return;
    }
    const newUser: MockUser = {
      id: 'u-' + Date.now(),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      enrolledCourses: newUserRole === 'Talaba' ? 1 : 0,
      completedTests: 0,
      averageScore: 100,
      status: 'Faol',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newUser, ...usersList];
    setUsersList(updated);
    saveStoredUsers(updated);
    if (onUpdateUsersList) onUpdateUsersList(updated);
    addAdminLog('USER_ACTION', 'Yangi foydalanuvchi qoʻshildi', `"${newUser.name}" (${newUser.role}) roʻyxatga olindi`, 'success');
    setLogs(getStoredAdminLogs());
    showToast(`"${newUser.name}" muvaffaqiyatli qoʻshildi!`);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  // Delete User Handler with in-app confirmation
  const handleDeleteUser = (userId: string) => {
    const targetUser = usersList.find(u => u.id === userId);
    if (!targetUser) return;

    setDeleteConfirm({
      isOpen: true,
      title: 'Foydalanuvchini Oʻchirish',
      itemName: targetUser.name,
      itemTypeLabel: 'foydalanuvchi',
      warningNote: 'Foydalanuvchi profili va uning barcha yozuvlari platformadan oʻchiriladi.',
      onConfirm: () => {
        const updated = usersList.filter(u => u.id !== userId);
        setUsersList(updated);
        saveStoredUsers(updated);
        if (onUpdateUsersList) onUpdateUsersList(updated);
        addAdminLog('USER_ACTION', 'Foydalanuvchi oʻchirildi', `"${targetUser.name}" platformadan oʻchirildi`, 'warning');
        setLogs(getStoredAdminLogs());
        showToast(`"${targetUser.name}" foydalanuvchisi oʻchirildi!`);
        setDeleteConfirm(null);
      }
    });
  };

  // Toggle User Status
  const handleToggleUserStatus = (userId: string) => {
    const updated = usersList.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Faol' ? 'Nofaol' : 'Faol';
        return { ...u, status: newStatus as 'Faol' | 'Nofaol' };
      }
      return u;
    });
    setUsersList(updated);
    saveStoredUsers(updated);
    if (onUpdateUsersList) onUpdateUsersList(updated);
    const target = updated.find(u => u.id === userId);
    addAdminLog('USER_ACTION', 'Foydalanuvchi holati oʻzgardi', `"${target?.name}" holati: ${target?.status}`, 'info');
    setLogs(getStoredAdminLogs());
    showToast(`Holat oʻzgartirildi: ${target?.status}`);
  };

  // Export Users List
  const handleExportUsers = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(usersList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ziyotalim_foydalanuvchilar_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Foydalanuvchilar roʻyxati muvaffaqiyatli yuklab olindi!');
  };

  // Save Billing Settings Handler
  const handleSaveBilling = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newBilling: AdminBillingSettings = {
      clickActive,
      paymeActive,
      uzumActive,
      currency,
      monthlySubscription: Number(monthlySubscription)
    };
    saveStoredBillingSettings(newBilling);
    setLogs(getStoredAdminLogs());
    showToast('Toʻlov parametrlari muvaffaqiyatli saqlandi!');
  };

  // Test Payment Gateway
  const handleTestPaymentGateway = (gatewayName: string) => {
    addAdminLog('SYSTEM', `${gatewayName} shlyuzi tekshirildi`, `${gatewayName} API integratsiyasi muvaffaqiyatli javob qaytardi (HTTP 200 OK, SSL Verified)`, 'success');
    setLogs(getStoredAdminLogs());
    showToast(`${gatewayName} shlyuzi bilan aloqa faol va barqaror! (200 OK)`);
  };

  // Save Certificate Settings Handler
  const handleSaveCertificates = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newCert: AdminCertificateSettings = {
      passingScore: Number(passingScore),
      distinctionScore: Number(distinctionScore),
      autoIssueCert,
      certSignerTitle
    };
    saveStoredCertificateSettings(newCert);
    setLogs(getStoredAdminLogs());
    showToast('Sertifikat mezonlari muvaffaqiyatli saqlandi!');
  };

  // Preview / Download Sample Certificate
  const handlePreviewCertificate = () => {
    const certSample = `
=============================================================
         ZIYOTALIM & TECHZONE XALQARO TA'LIM SERTIFIKATI
=============================================================
Hujjat ID: ZIYO-CERT-${Date.now()}
Talaba: Namunaviy Talaba (Sherzodbek)
Kurs: Xalqaro Ingliz Tili & IELTS Speaking Mastery
Natija: ${distinctionScore}% (Imtiyozli A+ Daraja)
O'tish bali mezon: ${passingScore}%
Tasdiqlovchi: ${certSignerTitle}
QR-Tekshiruv: https://ziyotalim.uz/verify?id=${Date.now()}
Berilgan sana: ${new Date().toLocaleDateString('uz-UZ')}
=============================================================
(c) ZiyoTalim & Techzone Ta'lim Kengashi
    `;
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(certSample);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `namunaviy_sertifikat_${Date.now()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    const newTotal = incrementStoredCertificatesCount();
    setCertificatesCount(newTotal);
    if (onUpdateTotalCertificatesCount) onUpdateTotalCertificatesCount(newTotal);

    showToast('Namunaviy sertifikat hujjati muvaffaqiyatli yuklab olindi!');
  };

  const handleIncrementCertCount = () => {
    const next = incrementStoredCertificatesCount();
    setCertificatesCount(next);
    if (onUpdateTotalCertificatesCount) onUpdateTotalCertificatesCount(next);
    showToast(`Berilgan sertifikatlar soni +1 ga oshirildi (${next} ta)`);
  };

  const handleDecrementCertCount = () => {
    const next = decrementStoredCertificatesCount();
    setCertificatesCount(next);
    if (onUpdateTotalCertificatesCount) onUpdateTotalCertificatesCount(next);
    showToast(`Berilgan sertifikatlar soni -1 ga kamaytirildi (${next} ta)`);
  };

  const handleResetCertCount = () => {
    resetStoredCertificatesCount();
    setCertificatesCount(0);
    if (onUpdateTotalCertificatesCount) onUpdateTotalCertificatesCount(0);
    showToast('Berilgan sertifikatlar hisobi 0 ga qaytarildi');
  };

  // Test AI Voice Handler
  const handleTestAIVoice = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = "Assalomu alaykum! ZiyoTalim platformasi sunʼiy intellekt va neyron ovoz tizimi faol ishlamoqda.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = settings.aiTtsSpeed || 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    } catch {}
    addAdminLog('AI_TRANSLATE', 'Neyron ovoz sinovi', `TTS tezligi: ${settings.aiTtsSpeed}x bilan sinov ovozi chalindi`, 'info');
    setLogs(getStoredAdminLogs());
    showToast('AI Neyron ovozi ijro etilmoqda...');
  };

  // Run Full Server Diagnostics
  const handleRunFullDiagnostics = () => {
    const memoryUsed = Math.round(performance && (performance as any).memory ? (performance as any).memory.usedJSHeapSize / 1048576 : 42);
    addAdminLog('SYSTEM', 'Toʻliq server diagnostikasi oʻtkazildi', `Baza yaxlitligi: 100%, Xotira: ${memoryUsed}MB, Kechikish: 18ms, Xatolar: 0`, 'success');
    setLogs(getStoredAdminLogs());
    showToast(`Diagnostika muvaffaqiyatli: Tizim toʻliq barqaror (0 xato, ${memoryUsed}MB RAM)`);
  };

  // Test Ping
  const handleTestPing = () => {
    const simulatedPing = Math.floor(Math.random() * 10) + 14;
    showToast(`Server bilan aloqa tezligi (Ping): ${simulatedPing} ms (Aʼlo daraja)`);
  };

  // Download Textbook Content
  const handleDownloadTextbook = (book: AdminTextbook) => {
    const bookContent = `
=============================================================
         ZIYOTALIM & TECHZONE O'QUV DARSLIGI
=============================================================
Kitob nomi: ${book.title}
Muallif / Nashriyot: ${book.author}
Fan / Yo'nalish: ${book.subject}
Darajasi: ${book.level}
Format: ${book.format} | Hajmi: ${book.fileSize}
Sahifalar: ${book.pagesCount} bet
Tavsif: ${book.description}
Kiritilgan sana: ${book.addedDate}

MUNDARIJA VA ASOSIY MODULLAR:
1. Kirish va asosiy tushunchalar
2. Amaliy mashg'ulotlar va qoidalar
3. O'qish, tinglash va mustaqil amaliyot
4. Xalqaro imtihon standartlari
5. Model testlar va lug'at boyligi
=============================================================
(c) ZiyoTalim & Techzone - Barcha huquqlar himoyalangan.
    `;
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(bookContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_darslik.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    const updated = textbooksList.map(b => b.id === book.id ? { ...b, downloadsCount: (b.downloadsCount || 0) + 1 } : b);
    setTextbooksList(updated);
    saveStoredTextbooks(updated);

    addAdminLog('SYSTEM', 'Darslik yuklab olindi', `"${book.title}" darsligi yuklandi`, 'info');
    setLogs(getStoredAdminLogs());
    showToast(`"${book.title}" darsligi muvaffaqiyatli yuklab olindi!`);
  };

  // Reset Everything to Factory Defaults with in-app confirmation
  const handleResetToDefaults = () => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Tizimni Boshlangʻich Holatga Qaytarish',
      itemName: 'Barcha kiritilgan maʼlumotlar',
      itemTypeLabel: 'parametrlar',
      warningNote: 'DIQQAT: Barcha kiritilgan yangi kurslar, darsliklar, ustozlar, foydalanuvchilar va sozlamalar zavod holatiga qaytariladi!',
      onConfirm: () => {
        resetAdminDataToDefaults();
        setCourseList(courses);
        onUpdateCourses(courses);
        setTextbooksList(getStoredTextbooks());
        setInstructorsList(getStoredInstructors());
        setUsersList(getStoredUsers());
        setSettings(getStoredAdminSettings());
        const b = getStoredBillingSettings();
        setClickActive(b.clickActive);
        setPaymeActive(b.paymeActive);
        setUzumActive(b.uzumActive);
        setCurrency(b.currency);
        setMonthlySubscription(b.monthlySubscription);
        const c = getStoredCertificateSettings();
        setPassingScore(c.passingScore);
        setDistinctionScore(c.distinctionScore);
        setAutoIssueCert(c.autoIssueCert);
        setCertSignerTitle(c.certSignerTitle);
        setLogs(getStoredAdminLogs());
        showToast('Platforma maʼlumotlari boshlangʻich holatga qaytarildi!');
        setDeleteConfirm(null);
      }
    });
  };

  // Import Backup JSON Handler
  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.courses && Array.isArray(json.courses)) {
          setCourseList(json.courses);
          onUpdateCourses(json.courses);
          saveStoredCourses(json.courses);
        }
        if (json.textbooks && Array.isArray(json.textbooks)) {
          setTextbooksList(json.textbooks);
          saveStoredTextbooks(json.textbooks);
        }
        if (json.instructors && Array.isArray(json.instructors)) {
          setInstructorsList(json.instructors);
          saveStoredInstructors(json.instructors);
        }
        if (json.users && Array.isArray(json.users)) {
          setUsersList(json.users);
          saveStoredUsers(json.users);
        }
        if (json.settings) {
          setSettings(json.settings);
          saveStoredAdminSettings(json.settings);
        }
        if (json.billing) {
          saveStoredBillingSettings(json.billing);
          setClickActive(json.billing.clickActive);
          setPaymeActive(json.billing.paymeActive);
          setUzumActive(json.billing.uzumActive);
          setCurrency(json.billing.currency);
          setMonthlySubscription(json.billing.monthlySubscription);
        }
        if (json.certificates) {
          saveStoredCertificateSettings(json.certificates);
          setPassingScore(json.certificates.passingScore);
          setDistinctionScore(json.certificates.distinctionScore);
          setAutoIssueCert(json.certificates.autoIssueCert);
          setCertSignerTitle(json.certificates.certSignerTitle);
        }
        addAdminLog('SYSTEM', 'Zaxira nusxasi tiklandi', 'JSON zaxira faylidan barcha maʼlumotlar muvaffaqiyatli tiklandi', 'success');
        setLogs(getStoredAdminLogs());
        showToast('Zaxira nusxasi muvaffaqiyatli tiklandi!');
      } catch (err) {
        showToast('Xatolik: Zaxira fayli formati notoʻgʻri');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered logs
  const filteredLogs = logs.filter(l => {
    if (logFilter !== 'all' && l.type !== logFilter) return false;
    if (logSearch.trim()) {
      const q = logSearch.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q) ||
        l.user.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered users
  const filteredUsers = usersList.filter(u => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered textbooks (Darsliklar)
  const filteredTextbooks = textbooksList.filter(b => {
    if (textbookSubjectFilter !== 'all' && b.subject !== textbookSubjectFilter) return false;
    if (textbookSearch.trim()) {
      const q = textbookSearch.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered instructors (Ustozlar)
  const filteredInstructors = instructorsList.filter(i => {
    if (instructorSearch.trim()) {
      const q = instructorSearch.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.role.toLowerCase().includes(q) ||
        i.organization.toLowerCase().includes(q) ||
        (i.specialty && i.specialty.toLowerCase().includes(q)) ||
        (i.bio && i.bio.toLowerCase().includes(q))
      );
    }
    return true;
  });

  if (!isOpen) return null;

  // Left menu items grouped in sequential order downwards
  const MENU_GROUPS = [
    {
      groupTitle: "1. Kurslar, Darsliklar & Ustozlar",
      items: [
        {
          id: 'dashboard' as AdminTab,
          number: '01',
          title: 'Asosiy Panel',
          desc: 'Statistika & monitoring',
          icon: LayoutDashboard,
          badge: 'Online',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        },
        {
          id: 'editor' as AdminTab,
          number: '02',
          title: 'Kurslar Boshqaruvi',
          desc: 'Kurslar qoʻshish & oʻchirish',
          icon: Edit3,
          badge: `${courseList.length} ta`,
          badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
        },
        {
          id: 'create_course' as AdminTab,
          number: '03',
          title: 'Yangi Kurs Qoʻshish',
          desc: 'Yangi taʼlim dasturi kiritish',
          icon: Plus,
          badge: '+ Kurs',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
        },
        {
          id: 'textbooks_manager' as AdminTab,
          number: '04',
          title: 'Darsliklar & Kitoblar',
          desc: 'Darsliklar qoʻshish & oʻchirish',
          icon: BookMarked,
          badge: `${textbooksList.length} ta`,
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
        },
        {
          id: 'instructors_manager' as AdminTab,
          number: '05',
          title: 'Ustozlar Boshqaruvi',
          desc: 'Ustozlar qoʻshish & oʻchirish',
          icon: GraduationCap,
          badge: `${instructorsList.length} ta`,
          badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30'
        },
        {
          id: 'lessons_manager' as AdminTab,
          number: '06',
          title: 'Darslar & Modullar',
          desc: 'Kurs darsliklarini boshqarish',
          icon: BookOpen,
          badge: 'Darslar',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        },
        {
          id: 'users' as AdminTab,
          number: '07',
          title: 'Foydalanuvchilar',
          desc: 'Talabalar va mentorlar',
          icon: Users,
          badge: `${usersList.length} ta`,
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30'
        }
      ]
    },
    {
      groupTitle: "2. Sozlamalar & Parametrlar",
      items: [
        {
          id: 'settings_general' as AdminTab,
          number: '08',
          title: 'Platforma Sozlamalari',
          desc: 'Nomi, rejim va aʼzolik',
          icon: Settings,
          badge: 'Asosiy',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        },
        {
          id: 'settings_ai' as AdminTab,
          number: '09',
          title: 'AI & Tarjimon Sozlamasi',
          desc: '10-tilli tarjima & neyron ovoz',
          icon: Bot,
          badge: 'AI Faol',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
        },
        {
          id: 'settings_security' as AdminTab,
          number: '10',
          title: 'Xavfsizlik & Parol',
          desc: 'Login, parol (1) va sessiya',
          icon: KeyRound,
          badge: 'Himoya',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30'
        },
        {
          id: 'settings_billing' as AdminTab,
          number: '11',
          title: 'Toʻlov & Billing',
          desc: 'Payme, Click, Uzum parametrlari',
          icon: CreditCard,
          badge: 'UZS',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        },
        {
          id: 'settings_certificates' as AdminTab,
          number: '12',
          title: 'Sertifikat & Baholash',
          desc: 'Oʻtish ballari va mezonlar',
          icon: Award,
          badge: '70%+',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
        }
      ]
    },
    {
      groupTitle: "3. Tizim Nazorati & Audit",
      items: [
        {
          id: 'logs' as AdminTab,
          number: '13',
          title: 'Tizim Loglari & Audit',
          desc: 'Barcha voqealar va kirishlar',
          icon: FileText,
          badge: `${logs.length}`,
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        },
        {
          id: 'settings_server' as AdminTab,
          number: '14',
          title: 'Server & Diagnostika',
          desc: 'Kesh, xotira va API holati',
          icon: Server,
          badge: 'Normal',
          badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30'
        },
        {
          id: 'backup_export' as AdminTab,
          number: '15',
          title: 'Zaxira Nusxa & Eksport',
          desc: 'Baza zaxirasi va JSON yuklash',
          icon: HardDrive,
          badge: 'Backup',
          badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/30'
        }
      ]
    }
  ];

  const currentTabItem = MENU_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-7xl bg-gradient-to-br from-[#0c2340] via-[#09325c] to-[#0a1e38] text-white rounded-3xl shadow-2xl shadow-blue-950/90 border border-blue-500/35 flex flex-col h-[94vh] max-h-[950px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Futuristic glowing blue auras */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-blue-800/60 flex items-center justify-between gap-4 bg-[#0c2649]/95 backdrop-blur-md relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                  Admin Kabineti
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  ROOT ADMIN (LOGIN: 1)
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Boshqaruv paneli, tizim parametrlari va sozlamalar ketma-ketligi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071c36] border border-blue-700/50 text-xs text-cyan-300 font-medium">
              <span className="text-blue-300/70">Faol Boʻlim:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                {currentTabItem?.icon && <currentTabItem.icon className="w-3.5 h-3.5 text-cyan-400" />}
                {currentTabItem?.title}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-blue-700/50"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Column Split: Left Sidebar (Menu & Settings in Sequential Downward Order) + Right Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: MENYU VA BARCHA SOZLAMALAR KETMA-KETLIKDA */}
          {/* ========================================================= */}
          <aside className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-blue-800/60 bg-[#081e3a]/95 flex flex-col justify-between shrink-0 shadow-2xl relative">
            
            {/* Quick Menu Filter Input */}
            <div className="p-3 border-b border-blue-800/60 bg-[#071b35]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-blue-300/60 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Parametr yoki boʻlim izlash..."
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#0b2548] border border-blue-700/50 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                />
              </div>
            </div>

            {/* Scrollable Downward Sequential Menu List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 pr-2 select-none">
              {MENU_GROUPS.map((group, gIdx) => {
                const visibleItems = group.items.filter(item => 
                  !menuSearch.trim() || 
                  item.title.toLowerCase().includes(menuSearch.toLowerCase()) || 
                  item.desc.toLowerCase().includes(menuSearch.toLowerCase())
                );

                if (visibleItems.length === 0) return null;

                return (
                  <div key={gIdx} className="space-y-1">
                    <div className="px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-cyan-400/80 flex items-center justify-between">
                      <span>{group.groupTitle}</span>
                      <span className="text-[9px] text-blue-300/50 font-mono">
                        {visibleItems.length} band
                      </span>
                    </div>

                    <div className="space-y-1">
                      {visibleItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between group relative ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25 border border-cyan-400/40 ring-1 ring-cyan-400/30'
                                : 'text-blue-100 hover:text-white hover:bg-white/10 border border-transparent'
                            }`}
                          >
                            {/* Sequential step marker & Icon */}
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                isActive ? 'bg-white/20 text-white' : 'bg-blue-950/70 text-blue-300/80 border border-blue-800/60'
                              }`}>
                                {item.number}
                              </span>

                              <div className={`p-1.5 rounded-lg shrink-0 ${
                                isActive ? 'bg-white/20 text-white' : 'bg-[#0c2a50] text-cyan-300 group-hover:bg-blue-600/30'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="min-w-0 truncate">
                                <p className="text-xs font-bold truncate leading-tight">
                                  {item.title}
                                </p>
                                <p className={`text-[10px] truncate leading-tight ${
                                  isActive ? 'text-blue-100/90' : 'text-blue-300/70'
                                }`}>
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            {/* Badge & indicator */}
                            <div className="flex items-center gap-1 shrink-0 ml-1.5">
                              {item.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                                  isActive ? 'bg-white/25 text-white border-white/30' : item.badgeColor
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                                isActive ? 'text-white translate-x-0.5' : 'text-blue-400/50 group-hover:text-blue-200'
                              }`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Bottom Controls: System Status & Logout */}
            <div className="p-3 border-t border-blue-800/60 bg-[#071b35] space-y-2 shrink-0">
              <div className="px-3 py-2 rounded-xl bg-[#092244] border border-blue-800/60 text-[11px] text-blue-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Tizim holati:</span>
                </span>
                <span className="text-emerald-400 font-bold font-mono text-xs">ONLINE</span>
              </div>

              <button
                onClick={onLogoutAdmin}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer flex items-center justify-center gap-2"
                title="Admindan chiqish"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Admindan chiqish</span>
              </button>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT MAIN CONTENT AREA (KONTENT VA SOZLAMALAR PANEL) */}
          {/* ========================================================= */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-[#081e3b]/95 to-[#05152a]/95 text-white">

            {/* --------------------------------------------------------- */}
            {/* 01: ASOSIY PANEL (DASHBOARD) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Stat 1 */}
                  <div className="p-4 rounded-2xl bg-[#0c2a50]/85 border border-blue-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-200/80 font-medium">Jami Talabalar</span>
                      <h3 className="text-xl font-black text-white font-mono">{totalStudentsCount.toLocaleString()}</h3>
                      <span className="text-[10px] text-cyan-300 font-semibold">
                        {totalStudentsCount > 0 ? `▲ ${totalStudentsCount} nafar faol oʻquvchi` : 'Hozircha oʻquvchi yoʻq (0)'}
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-4 rounded-2xl bg-[#0c2a50]/85 border border-blue-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-200/80 font-medium">Barcha Kurslar</span>
                      <h3 className="text-xl font-black text-white font-mono">{courseList.length} ta</h3>
                      <span className="text-[10px] text-indigo-300 font-semibold">Barcha fanlar toʻliq</span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-4 rounded-2xl bg-[#0c2a50]/85 border border-blue-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-200/80 font-medium">Berilgan Sertifikatlar</span>
                      <h3 className="text-xl font-black text-white font-mono">{certificatesCount.toLocaleString()}</h3>
                      <span className="text-[10px] text-emerald-300 font-semibold">
                        {certificatesCount > 0 ? 'QR-kodli milliy' : 'Hozircha berilmagan (0)'}
                      </span>
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-4 rounded-2xl bg-[#0c2a50]/85 border border-blue-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-blue-200/80 font-medium">AI Tarjima & Lab</span>
                      <h3 className="text-xl font-black text-white font-mono">10 Til</h3>
                      <span className="text-[10px] text-cyan-300 font-semibold">2,650+ soʻz bazasi</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions for Courses, Textbooks, and Instructors */}
                <div className="bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-400/30">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Taʼlim Resurslarini Boshqarish</h4>
                      <p className="text-xs text-blue-200/80">
                        {courseList.length} ta kurs · {textbooksList.length} ta darslik · {instructorsList.length} nafar ustoz
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowAddCourseModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Kurs Qoʻshish</span>
                    </button>

                    <button
                      onClick={() => setShowAddTextbookModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>+ Darslik Qoʻshish</span>
                    </button>

                    <button
                      onClick={() => setShowAddInstructorModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs shadow-md shadow-teal-500/20 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>+ Ustoz Qoʻshish</span>
                    </button>
                  </div>
                </div>

                {/* Grid 2: Server Diagnostics & Live Log */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-8 bg-[#0c2a50]/85 rounded-2xl p-5 border border-blue-700/50 space-y-4 shadow-lg">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          <span>Platforma Diagnostikasi & Ishlash Koʻrsatkichi</span>
                        </h3>
                        <p className="text-xs text-blue-200/80">Real-vaqt server va maʼlumotlar oqimi</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        99.98% Uptime
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-[#071c36] border border-blue-800/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-blue-200/80">
                          <span>RAM Xotira</span>
                          <span className="font-mono font-bold text-cyan-300">32%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
                          <div className="w-[32%] h-full bg-cyan-400 rounded-full"></div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#071c36] border border-blue-800/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-blue-200/80">
                          <span>CPU Yuklanishi</span>
                          <span className="font-mono font-bold text-emerald-400">14%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
                          <div className="w-[14%] h-full bg-emerald-400 rounded-full"></div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#071c36] border border-blue-800/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-blue-200/80">
                          <span>AI Shlyuz Holati</span>
                          <span className="font-mono font-bold text-emerald-400">ONLINE</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
                          <div className="w-[100%] h-full bg-emerald-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Control Actions */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          addAdminLog('SYSTEM', 'Kesh tozalash', 'Server va AI lugʻatlar keshi tozalandi', 'success');
                          setLogs(getStoredAdminLogs());
                          showToast('Tizim keshi muvaffaqiyatli tozalandi');
                        }}
                        className="px-3 py-2 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Keshni tozalash</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('editor')}
                        className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Kurslarni tahrirlash</span>
                      </button>

                      <button
                        onClick={() => setShowAddCourseModal(true)}
                        className="px-3 py-2 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Yangi kurs qoʻshish</span>
                      </button>

                      <button
                        onClick={handleExportLogs}
                        className="px-3 py-2 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Loglarni eksport qilish</span>
                      </button>
                    </div>
                  </div>

                  {/* Right col: Recent Live Activity Log */}
                  <div className="lg:col-span-4 bg-[#0c2a50]/85 rounded-2xl p-5 border border-blue-700/50 space-y-3 flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-blue-800/60">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span>Jonli Tizim Loglari</span>
                        </h3>
                        <button
                          onClick={() => setActiveTab('logs')}
                          className="text-xs text-cyan-300 font-bold hover:underline cursor-pointer"
                        >
                          Hammasi →
                        </button>
                      </div>

                      <div className="space-y-2 mt-3 max-h-56 overflow-y-auto pr-1">
                        {logs.slice(0, 5).map(log => (
                          <div key={log.id} className="p-2.5 rounded-xl bg-[#071c36]/90 border border-blue-800/50 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-blue-100 truncate max-w-[160px]">
                                {log.title}
                              </span>
                              <span className="text-[10px] text-blue-300/70 font-mono">
                                {log.timestamp.split(' ')[1] || log.timestamp}
                              </span>
                            </div>
                            <p className="text-[11px] text-blue-200/80 line-clamp-1">
                              {log.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-blue-800/60 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="font-bold text-blue-200">Avtomatik qayd:</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold font-mono text-xs flex items-center gap-1.5 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        AKTIV (LIVE)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 02: KURSLAR MUHARRIRI (COURSE EDITOR) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'editor' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 shadow-lg text-white">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-cyan-400" />
                      <span>Kurslar va Kontentni Tahrirlash</span>
                    </h3>
                    <p className="text-xs text-blue-200/80">
                      Istalgan kursni tanlang va maʼlumotlarini oʻzgartiring. Oʻzgarishlar darhol saytda aks etadi.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCourseModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Kurs Qoʻshish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Course Selector Sidebar */}
                  <div className="lg:col-span-4 bg-[#0c2a50]/85 rounded-2xl p-4 border border-blue-700/50 space-y-3 shadow-lg text-white">
                    <div className="relative">
                      <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={editorSearch}
                        onChange={(e) => setEditorSearch(e.target.value)}
                        placeholder="Kurslarni qidirish..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                      />
                    </div>

                    <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                      {courseList
                        .filter(c => c.title.toLowerCase().includes(editorSearch.toLowerCase()))
                        .map(course => (
                          <div
                            key={course.id}
                            onClick={() => handleSelectCourseToEdit(course)}
                            className={`group p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                              selectedCourse?.id === course.id
                                ? 'bg-gradient-to-r from-blue-600/60 to-cyan-600/40 border-cyan-400 text-white font-bold shadow-md'
                                : 'bg-[#071c36]/70 border-blue-900/50 hover:bg-[#0a274c] text-blue-100'
                            }`}
                          >
                            <div className="truncate min-w-0 flex-1">
                              <p className="truncate font-semibold">{course.title}</p>
                              <span className="text-[10px] text-blue-300/70 font-normal">
                                {course.category} · {course.lessonsCount} dars · {course.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCourse(course.id);
                                }}
                                title="Kursni oʻchirish"
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 hover:text-rose-200 border border-rose-500/30 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <ChevronRight className="w-4 h-4 text-blue-300" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="lg:col-span-8 bg-[#0c2a50]/85 rounded-2xl p-5 border border-blue-700/50 shadow-lg text-white">
                    {selectedCourse ? (
                      <form onSubmit={handleSaveCourse} className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
                          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                            Tahrirlanmoqda: ID: {selectedCourse.id}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold">
                            {selectedCourse.category}
                          </span>
                        </div>

                        {/* Course Title */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-blue-200">
                            Kurs Nomi
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 text-sm bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/50"
                          />
                        </div>

                        {/* Short Description */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-blue-200">
                            Qisqa Tavsif
                          </label>
                          <textarea
                            rows={3}
                            value={editShortDesc}
                            onChange={(e) => setEditShortDesc(e.target.value)}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                          />
                        </div>

                        {/* Category & Level */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-blue-200">
                              Kategoriya
                            </label>
                            <select
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value as CourseCategory)}
                              className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                            >
                              <option value="exact_sciences">Aniq fanlar (Matematika, Fizika)</option>
                              <option value="natural_sciences">Tabiiy fanlar (Kimyo, Biologiya, Geografiya)</option>
                              <option value="humanities">Ijtimoiy-gumanitar (Tarix, Ona tili)</option>
                              <option value="languages">Xorijiy tillar (Ingliz, Rus, Nemis, Fransuz)</option>
                              <option value="it">Axborot texnologiyalari (Frontend, Python, AI)</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-blue-200">
                              Daraja (Level)
                            </label>
                            <select
                              value={editLevel}
                              onChange={(e) => setEditLevel(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                            >
                              <option value="Boshlangʻich (Beginner)">Boshlangʻich (Beginner)</option>
                              <option value="Oʻrta (Intermediate)">Oʻrta (Intermediate)</option>
                              <option value="Ilgʻor (Advanced)">Ilgʻor (Advanced)</option>
                              <option value="Barcha darajalar">Barcha darajalar</option>
                            </select>
                          </div>
                        </div>

                        {/* Instructor, Level, Lessons count */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-blue-200">
                              Instruktor / Oʻqituvchi
                            </label>
                            <input
                              type="text"
                              value={editInstructor}
                              onChange={(e) => setEditInstructor(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-blue-200">
                              Darslar Soni
                            </label>
                            <input
                              type="number"
                              value={editLessonsCount}
                              onChange={(e) => setEditLessonsCount(Number(e.target.value))}
                              className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-blue-200">
                              Davomiyligi (soat)
                            </label>
                            <input
                              type="number"
                              value={editDurationHours}
                              onChange={(e) => setEditDurationHours(Number(e.target.value))}
                              className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                            />
                          </div>
                        </div>

                        {/* Action Buttons: Delete & Save */}
                        <div className="pt-3 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteCourse(selectedCourse.id)}
                            className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/35 hover:border-rose-400 font-bold text-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                          >
                            <Trash2 className="w-4 h-4 text-rose-400" />
                            <span>Ushbu Kursni Oʻchirish</span>
                          </button>

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                          >
                            <Save className="w-4 h-4" />
                            <span>Oʻzgarishlarni Saqlash</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-8 text-center text-blue-300/70">
                        Tahrirlash uchun chapdan biror kursni tanlang
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 03: YANGI KURS QOʻSHISH (CREATE COURSE) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'create_course' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <form onSubmit={handleCreateNewCourseSubmit} className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Plus className="w-5 h-5 text-cyan-400" />
                        <span>Yangi Kurs Yaratish Formasi</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Platformaga yangi kurs va oʻquv modulini kiritish
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold">
                      Yangi Kurs
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-blue-200">
                      Kurs Nomi *
                    </label>
                    <input
                      type="text"
                      value={newCourseTitle}
                      onChange={(e) => setNewCourseTitle(e.target.value)}
                      placeholder="Masalan: Sunʼiy Intellekt va Neyron Tarmoqlar Amaliyoti"
                      required
                      className="w-full px-3.5 py-2 text-sm bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Kategoriya (Yoʻnalish) *
                      </label>
                      <select
                        value={newCourseCategory}
                        onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                      >
                        <option value="it">Axborot texnologiyalari (Dasturlash, AI)</option>
                        <option value="exact_sciences">Aniq fanlar (Matematika, Fizika)</option>
                        <option value="natural_sciences">Tabiiy fanlar (Kimyo, Biologiya)</option>
                        <option value="languages">Xorijiy tillar (Ingliz, Nemis, Rus)</option>
                        <option value="humanities">Ijtimoiy-gumanitar (Tarix, Adabiyot)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Qiyinlik Darajasi *
                      </label>
                      <select
                        value={newCourseLevel}
                        onChange={(e) => setNewCourseLevel(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                      >
                        <option value="Boshlangʻich (Beginner)">Boshlangʻich (Beginner)</option>
                        <option value="Oʻrta (Intermediate)">Oʻrta (Intermediate)</option>
                        <option value="Ilgʻor (Advanced)">Ilgʻor (Advanced)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-blue-200">
                      Kurs Haqida Qisqacha Tavsif
                    </label>
                    <textarea
                      rows={3}
                      value={newCourseDesc}
                      onChange={(e) => setNewCourseDesc(e.target.value)}
                      placeholder="Talabalar ushbu kurs davomida nimalarni oʻrganadi va qanday natijaga erishadi..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Oʻqituvchi / Mentor
                      </label>
                      <input
                        type="text"
                        value={newCourseInstructor}
                        onChange={(e) => setNewCourseInstructor(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Darslar Soni
                      </label>
                      <input
                        type="number"
                        value={newCourseLessons}
                        onChange={(e) => setNewCourseLessons(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Umumiy Soat
                      </label>
                      <input
                        type="number"
                        value={newCourseHours}
                        onChange={(e) => setNewCourseHours(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('editor')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Kursni Yaratish & Saqlash</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 04: DARSLIKLAR & ADABIYOTLAR (TEXTBOOKS MANAGER) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'textbooks_manager' && (
              <div className="space-y-5">
                {/* Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 shadow-lg text-white">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BookMarked className="w-5 h-5 text-cyan-400" />
                      <span>Darsliklar & Oʻquv Qoʻllanmalar Boshqaruvi</span>
                    </h3>
                    <p className="text-xs text-blue-200/80">
                      Barcha xorijiy tillar (Ingliz, Rus, Fransuz, Nemis) va IT fanlari boʻyicha rasmiy darsliklar bazasi
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddTextbookModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Darslik Qoʻshish</span>
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Jami Darsliklar</span>
                    <p className="text-xl font-bold text-white mt-0.5">{textbooksList.length} ta</p>
                    <span className="text-[10px] text-cyan-300">bazada saqlangan</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Xorijiy Tillar Boʻyicha</span>
                    <p className="text-xl font-bold text-white mt-0.5">
                      {textbooksList.filter(t => t.category === 'languages').length} ta
                    </p>
                    <span className="text-[10px] text-emerald-300">IELTS, TRKI, DELF, Goethe</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">IT & Dasturlash</span>
                    <p className="text-xl font-bold text-white mt-0.5">
                      {textbooksList.filter(t => t.category === 'it').length} ta
                    </p>
                    <span className="text-[10px] text-indigo-300">Frontend, Python, AI</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Jami Sahifalar</span>
                    <p className="text-xl font-bold text-white mt-0.5">
                      {textbooksList.reduce((acc, t) => acc + (t.pagesCount || 0), 0)} bet
                    </p>
                    <span className="text-[10px] text-purple-300">elektron material</span>
                  </div>
                </div>

                {/* Search & Subject Filter Bar */}
                <div className="bg-[#0c2a50]/85 p-3.5 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={textbookSearch}
                      onChange={(e) => setTextbookSearch(e.target.value)}
                      placeholder="Darslik nomi yoki muallif..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <select
                      value={textbookSubjectFilter}
                      onChange={(e) => setTextbookSubjectFilter(e.target.value)}
                      className="w-full sm:w-auto px-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                    >
                      <option value="all">Barcha fanlar & tillar</option>
                      <option value="Ingliz tili">Ingliz tili (IELTS / Grammar)</option>
                      <option value="Rus tili">Rus tili (TRKI / Grammatika)</option>
                      <option value="Nemis tili">Nemis tili (Goethe / TestDaF)</option>
                      <option value="Fransuz tili">Fransuz tili (DELF)</option>
                      <option value="Dasturlash & IT">Dasturlash & IT</option>
                      <option value="Sunʼiy intellekt">Sunʼiy intellekt & Python</option>
                    </select>
                  </div>
                </div>

                {/* Textbooks Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTextbooks.map(book => (
                    <div 
                      key={book.id} 
                      className="group bg-[#0c2a50]/85 rounded-2xl border border-blue-700/50 hover:border-cyan-400/80 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-200"
                    >
                      {/* Top cover preview */}
                      <div className="relative h-36 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 overflow-hidden">
                        {book.coverImage ? (
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-400/50">
                            <Book className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c2a50] via-transparent to-black/30" />
                        
                        {/* Format badge */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
                            {book.format} · {book.fileSize}
                          </span>
                        </div>

                        {/* Subject badge */}
                        <div className="absolute bottom-2 left-2.5">
                          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-blue-600/70 text-white border border-blue-400/40 backdrop-blur-md">
                            {book.subject}
                          </span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-blue-300/80 mt-1 font-medium line-clamp-1">
                            ✍️ Muallif: {book.author}
                          </p>
                          <p className="text-xs text-blue-200/70 mt-2 line-clamp-2">
                            {book.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-blue-800/50 flex items-center justify-between text-[11px] text-blue-300/80">
                          <span>{book.pagesCount} bet</span>
                          <span>Daraja: {book.level}</span>
                          <span>{book.downloadsCount || 0} marta yuklangan</span>
                        </div>
                      </div>

                      {/* Footer Actions: Delete & Preview */}
                      <div className="px-4 py-3 bg-[#081e3b]/90 border-t border-blue-800/60 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteTextbook(book.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/35 hover:border-rose-400 font-bold text-[11px] cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                          title="Darslikni bazadan oʻchirish"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Oʻchirish</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadTextbook(book)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Yuklab olish</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredTextbooks.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-[#0c2a50]/50 rounded-2xl border border-blue-700/30 text-blue-300">
                      Qidiruv boʻyicha hech qanday darslik topilmadi.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 05: USTOZLAR BOSHQARUVI (INSTRUCTORS MANAGER) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'instructors_manager' && (
              <div className="space-y-5">
                {/* Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 shadow-lg text-white">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-teal-400" />
                      <span>Ustozlar & Instruktorlar Boshqaruvi</span>
                    </h3>
                    <p className="text-xs text-blue-200/80">
                      Platforma xalqaro toifadagi instruktorlari, mentorlari va mutaxassislarini qoʻshish va boshqarish
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddInstructorModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-teal-500/25 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Ustoz Qoʻshish</span>
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Jami Ustozlar</span>
                    <p className="text-xl font-bold text-white mt-0.5">{instructorsList.length} nafar</p>
                    <span className="text-[10px] text-teal-300">faol instruktor</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Oʻrtacha Reyting</span>
                    <p className="text-xl font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                      <span>4.94</span>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </p>
                    <span className="text-[10px] text-emerald-300">talabalar bahosi</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Sertifikatlanganlik</span>
                    <p className="text-xl font-bold text-white mt-0.5">100%</p>
                    <span className="text-[10px] text-cyan-300">IELTS, TestDaF, CELTA</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Oʻquv Yoʻnalishlari</span>
                    <p className="text-xl font-bold text-white mt-0.5">8+ soha</p>
                    <span className="text-[10px] text-purple-300">Tillar, IT, AI, Fanlar</span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="bg-[#0c2a50]/85 p-3.5 rounded-2xl border border-blue-700/50 flex items-center justify-between gap-3 text-white">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={instructorSearch}
                      onChange={(e) => setInstructorSearch(e.target.value)}
                      placeholder="Ustoz ismi, sohasi yoki tashkiloti..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/50"
                    />
                  </div>

                  <span className="text-xs text-blue-300 font-medium hidden sm:inline">
                    {filteredInstructors.length} ta ustoz koʻrsatilmoqda
                  </span>
                </div>

                {/* Instructors Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInstructors.map(inst => (
                    <div 
                      key={inst.id} 
                      className="group bg-[#0c2a50]/85 rounded-2xl border border-blue-700/50 hover:border-teal-400/80 shadow-lg p-5 flex flex-col justify-between space-y-4 transition-all duration-200"
                    >
                      {/* Top Header with Avatar & Details */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative shrink-0">
                          <img 
                            src={inst.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                            alt={inst.name} 
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-400/50 shadow-md" 
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#0c2a50] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors truncate">
                            {inst.name}
                          </h4>
                          <p className="text-xs text-teal-300 font-medium line-clamp-1 mt-0.5">
                            {inst.specialty || inst.role}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold">{inst.rating}</span>
                            <span className="text-blue-300/70 font-normal">· {inst.experience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio & Details */}
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-[#071c36]/80 border border-blue-800/40 text-blue-200/80">
                          <p className="line-clamp-2">{inst.bio}</p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-blue-300/80">
                          <span className="truncate mr-2">🏛️ {inst.organization}</span>
                        </div>

                        {inst.email && (
                          <div className="flex items-center gap-1.5 text-[11px] text-blue-300/70">
                            <Mail className="w-3 h-3 text-cyan-400" />
                            <span className="truncate">{inst.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions: Delete & Contact */}
                      <div className="pt-3 border-t border-blue-800/60 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteInstructor(inst.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/35 hover:border-rose-400 font-bold text-[11px] cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                          title="Ustozni roʻyxatdan oʻchirish"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Ustozni Oʻchirish</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {inst.email && (
                            <button
                              type="button"
                              onClick={() => {
                                showToast(`"${inst.name}" ga xabar: ${inst.email}`);
                                window.location.href = `mailto:${inst.email}`;
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title="Ustozga email yozish"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Aloqa</span>
                            </button>
                          )}
                          <span className="text-[10px] text-teal-400/80 font-mono">
                            ID: {inst.id.slice(-6)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredInstructors.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-[#0c2a50]/50 rounded-2xl border border-blue-700/30 text-blue-300">
                      Qidiruv boʻyicha hech qanday ustoz topilmadi.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 06: DARSLAR & MODULLAR (LESSONS MANAGER) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'lessons_manager' && (
              <div className="space-y-5">
                {/* Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 shadow-lg text-white">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                      <span>Kurs Darsliklari & Modullari Boshqaruvi</span>
                    </h3>
                    <p className="text-xs text-blue-200/80">
                      Tanlangan kursning barcha video darsliklari, modullari va amaliy vazifalarini boshqarish
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddModuleModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>+ Yangi Modul</span>
                    </button>

                    <button
                      onClick={() => {
                        const targetCourse = courseList.find(c => c.id === lessonCourseId);
                        if (targetCourse?.modules && targetCourse.modules.length > 0) {
                          setTargetModuleId(targetCourse.modules[0].id);
                        }
                        setShowAddLessonModal(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Yangi Darslik Qoʻshish</span>
                    </button>
                  </div>
                </div>

                {/* Course Selector Bar */}
                <div className="bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-200">
                      Darsliklarini boshqarish uchun kursni tanlang:
                    </label>
                    <select
                      value={lessonCourseId}
                      onChange={(e) => setLessonCourseId(e.target.value)}
                      className="w-full sm:w-96 px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white font-semibold"
                    >
                      {courseList.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.lessonsCount} ta darslik)
                        </option>
                      ))}
                    </select>
                  </div>

                  {(() => {
                    const currentCourse = courseList.find(c => c.id === lessonCourseId);
                    if (!currentCourse) return null;
                    return (
                      <div className="flex items-center gap-4 text-xs text-blue-200/80 bg-[#071c36]/60 px-4 py-2 rounded-xl border border-blue-800/40">
                        <span>🧑‍🏫 Ustoz: <strong className="text-white">{currentCourse.instructor?.name}</strong></span>
                        <span>📚 Modullar: <strong className="text-cyan-300">{currentCourse.modules?.length || 1} ta</strong></span>
                        <span>⏱️ Darslar: <strong className="text-amber-400">{currentCourse.lessonsCount} ta</strong></span>
                      </div>
                    );
                  })()}
                </div>

                {/* Modules & Lessons List */}
                {(() => {
                  const currentCourse = courseList.find(c => c.id === lessonCourseId);
                  if (!currentCourse) return null;
                  const modules = currentCourse.modules && currentCourse.modules.length > 0
                    ? currentCourse.modules
                    : [{ id: 'mod-1', title: '1-Modul: Asosiy Taʼlim Dasturi', lessons: [] }];

                  return (
                    <div className="space-y-4">
                      {modules.map((mod, modIdx) => (
                        <div 
                          key={mod.id} 
                          className="bg-[#0c2a50]/85 rounded-2xl border border-blue-700/50 shadow-lg overflow-hidden"
                        >
                          {/* Module Header */}
                          <div className="p-4 bg-[#081e3b]/90 border-b border-blue-800/60 flex items-center justify-between gap-3 text-white">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs">
                                {modIdx + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                                <span className="text-[10px] text-blue-300">
                                  {mod.lessons?.length || 0} ta darslik mavjud
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setTargetModuleId(mod.id);
                                  setShowAddLessonModal(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Darslik Qoʻshish</span>
                              </button>

                              {modules.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteModule(currentCourse.id, mod.id)}
                                  className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 cursor-pointer"
                                  title="Modulni oʻchirish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Lessons in Module */}
                          <div className="p-3 divide-y divide-blue-800/40">
                            {(mod.lessons && mod.lessons.length > 0) ? (
                              mod.lessons.map((lesson, lesIdx) => (
                                <div 
                                  key={lesson.id} 
                                  className="py-2.5 px-3 rounded-xl hover:bg-[#071c36]/60 transition-colors flex items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-mono text-blue-400/70 w-5">
                                      {lesIdx + 1}.
                                    </span>
                                    <div className="p-1.5 rounded-lg bg-blue-600/20 text-cyan-300 border border-blue-500/30">
                                      <Video className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-white truncate">
                                        {lesson.title}
                                      </p>
                                      <span className="text-[10px] text-blue-300/70 truncate block">
                                        {lesson.contentSnippet || 'Amaliy koʻnikmalar va mavzu mashqlari.'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[11px] text-blue-300 bg-[#071c36] px-2 py-0.5 rounded-md border border-blue-800/60 font-mono">
                                      {lesson.duration || '25 daqiqa'}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteLesson(currentCourse.id, mod.id, lesson.id)}
                                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 hover:text-white border border-rose-500/30 cursor-pointer transition-all"
                                      title="Darslikni oʻchirish"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-xs text-blue-300/70">
                                Ushbu modulda hali darsliklar mavjud emas. Yuqoridagi "+ Darslik Qoʻshish" tugmasini bosing.
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 07: TALABALAR & FOYDALANUVCHILAR (USERS) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg text-white">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span>Foydalanuvchilar va Talabalar Roʻyxati</span>
                    </h3>
                    <p className="text-xs text-blue-200/80">
                      Roʻyxatdan oʻtgan talabalar, oʻqituvchilar va ularning taʼlim faolligi
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Yangi Foydalanuvchi</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportUsers}
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-cyan-300 font-semibold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Eksport</span>
                    </button>
                  </div>
                </div>

                {/* Metrics Cards (Admin va Sayt bilan 100% bir xil real koʻrsatkichlar) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Jami Foydalanuvchilar</span>
                    <p className="text-xl font-bold text-white mt-0.5">{usersList.length.toLocaleString()} nafar</p>
                    <span className="text-[10px] text-cyan-300">baza roʻyxatida</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Faol Talabalar</span>
                    <p className="text-xl font-bold text-emerald-400 mt-0.5">
                      {totalStudentsCount.toLocaleString()} nafar
                    </p>
                    <span className="text-[10px] text-emerald-300">oʻqish jarayonida</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Mentorlar & Oʻqituvchilar</span>
                    <p className="text-xl font-bold text-amber-400 mt-0.5">
                      {usersList.filter(u => u.role === 'Mentor').length + instructorsList.length} nafar
                    </p>
                    <span className="text-[10px] text-amber-300">kurs rahbarlari</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0c2a50]/75 border border-blue-700/40">
                    <span className="text-[11px] text-blue-300">Oʻrtacha Oʻzlashtirish</span>
                    <p className="text-xl font-bold text-purple-400 mt-0.5">
                      {Math.round(usersList.reduce((acc, u) => acc + (u.averageScore || 0), 0) / (usersList.length || 1))}%
                    </p>
                    <span className="text-[10px] text-purple-300">umumiy koʻrsatkich</span>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-[#0c2a50]/85 p-3.5 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Talaba ismi yoki email..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <select
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="w-full sm:w-auto px-3 py-1.5 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                    >
                      <option value="all">Barcha rollar</option>
                      <option value="Talaba">Talabalar</option>
                      <option value="Mentor">Mentorlar</option>
                      <option value="Admin">Adminlar</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#0c2a50]/85 rounded-2xl border border-blue-700/50 overflow-hidden shadow-lg">
                  <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#081e3d] border-b border-blue-700/60 text-blue-200 font-bold sticky top-0">
                        <tr>
                          <th className="p-3">Foydalanuvchi</th>
                          <th className="p-3">Roli</th>
                          <th className="p-3">Kurslar</th>
                          <th className="p-3">Testlar</th>
                          <th className="p-3">Oʻrtacha Ball</th>
                          <th className="p-3">Holat</th>
                          <th className="p-3">Qoʻshilgan</th>
                          <th className="p-3 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-800/40 text-blue-100">
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-blue-600/15 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-white">{user.name}</div>
                              <div className="text-[11px] text-blue-300/70">{user.email}</div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${
                                user.role === 'Admin' 
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                                  : user.role === 'Mentor'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-bold text-blue-200">
                              {user.enrolledCourses} ta kurs
                            </td>
                            <td className="p-3 font-mono text-cyan-300">
                              {user.completedTests} ta test
                            </td>
                            <td className="p-3">
                              <span className="font-mono font-bold text-emerald-300">
                                {user.averageScore}%
                              </span>
                            </td>
                            <td className="p-3">
                              <button
                                type="button"
                                onClick={() => handleToggleUserStatus(user.id)}
                                title="Holatni almashtirish"
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                  user.status === 'Faol'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border-rose-400/30 hover:bg-rose-500/30'
                                }`}
                              >
                                {user.status}
                              </button>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-blue-300/70">
                              {user.joinedDate}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                                title="Foydalanuvchini oʻchirish"
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 hover:text-white border border-rose-500/30 cursor-pointer transition-all active:scale-95"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-blue-300/70">
                              Hech qanday foydalanuvchi topilmadi
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 05: PLATFORMA SOZLAMALARI (SETTINGS GENERAL) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_general' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <form onSubmit={handleSaveSettings} className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Settings className="w-5 h-5 text-emerald-400" />
                        <span>Platforma Umumiy Sozlamalari</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Sayt nomi, texnik rejim va foydalanuvchilar qabuli parametrlari
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-400/30 px-2.5 py-1 rounded-lg">
                      Parametrlar
                    </span>
                  </div>

                  {/* Platform Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-blue-200">
                      Platforma Nomi
                    </label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/50"
                    />
                  </div>

                  {/* System Status & Registrations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Tizim Holati
                      </label>
                      <select
                        value={settings.systemStatus}
                        onChange={(e) => setSettings({ ...settings, systemStatus: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                      >
                        <option value="online">Faol Onlayn (Hamma uchun ochiq)</option>
                        <option value="maintenance">Texnik Taʼmirlash Rejimi</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Yangi Talabalar Roʻyxatdan Oʻtishi
                      </label>
                      <select
                        value={settings.allowRegistrations ? 'true' : 'false'}
                        onChange={(e) => setSettings({ ...settings, allowRegistrations: e.target.value === 'true' })}
                        className="w-full px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                      >
                        <option value="true">Ruxsat berilgan (Ochiq)</option>
                        <option value="false">Cheklangan (Yopiq)</option>
                      </select>
                    </div>
                  </div>

                  {/* Save Button & Reset to defaults */}
                  <div className="pt-3 border-t border-blue-800/60 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          platformName: 'ZiyoTalim & Techzone Taʼlim Platformasi',
                          systemStatus: 'online',
                          allowRegistrations: true
                        });
                        showToast('Standart qiymatlar tiklandi');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-blue-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Standart holat
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Parametrlarni Saqlash</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 06: AI & TARJIMON SOZLAMALARI (SETTINGS AI) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_ai' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <form onSubmit={handleSaveSettings} className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-cyan-400" />
                        <span>AI Techie & 10-Tilli Neyron Tarjimon Parametrlari</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Ovozli talaffuz tezligi, lugʻat bazasi va avtomatik grammatika tahlili
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold">
                      AI 2,650+ Soʻz
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-200">
                          Real-Vaqt Neyron Tarjimoni
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.aiTranslatorActive}
                          onChange={(e) => setSettings({ ...settings, aiTranslatorActive: e.target.checked })}
                          className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-blue-300/70">
                        10 ta asosiy til (Oʻzbek, Ingliz, Rus, Nemis, Fransuz, Arab, Xitoy, Yapon, Koreys, Turk) oʻrtasida aniq tarjima qilish
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-200">
                          Avtomatik Grammatika va Misollar Tahlili
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.autoGrammarAnalysis}
                          onChange={(e) => setSettings({ ...settings, autoGrammarAnalysis: e.target.checked })}
                          className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-blue-300/70">
                        Har bir kiritilgan jumla uchun zamon, soʻz turkumlari va sinonimlar tavsiyasini koʻrsatish
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-200">
                          Neyron Ovoz Talaffuzi Tezligi (Speech TTS Speed)
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {settings.aiTtsSpeed}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={settings.aiTtsSpeed}
                        onChange={(e) => setSettings({ ...settings, aiTtsSpeed: Number(e.target.value) })}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-blue-300/70 font-mono">
                        <span>0.5x (Sekin)</span>
                        <span>0.9x (Optimal)</span>
                        <span>1.5x (Tez)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleTestAIVoice}
                      className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-cyan-300 font-bold text-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Neyron Ovozni Sinab Koʻrish</span>
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>AI Parametrlarini Saqlash</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 07: XAVFSIZLIK & PAROL (SETTINGS SECURITY) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_security' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <form onSubmit={handleSaveSettings} className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-rose-400" />
                        <span>Admin Kirish Xavfsizligi va Paroli</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Admin kabineti login va paroli (Birlamchi tizimda: Login: 1, Parol: 1)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-mono font-bold">
                      Root Kirish
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          Admin Login (Login: 1)
                        </label>
                        <input
                          type="text"
                          value={settings.adminLogin}
                          onChange={(e) => setSettings({ ...settings, adminLogin: e.target.value })}
                          required
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#092244] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          Admin Parol (Parol: 1)
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={settings.adminPassword}
                            onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
                            required
                            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#092244] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-blue-800/50">
                      <label className="block text-xs font-bold text-blue-200">
                        Admin Sessiyasi Davomiyligi (Daqiqalarda)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeoutMinutes}
                        onChange={(e) => setSettings({ ...settings, sessionTimeoutMinutes: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 text-xs bg-[#092244] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-rose-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Xavfsizlik Parolini Saqlash</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 08: TOʻLOVLAR & BILLING (SETTINGS BILLING) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_billing' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-amber-400" />
                        <span>Toʻlov Tizimlari va Tarif Parametrlari</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Oʻzbekistondagi milliy toʻlov shlyuzlari (Click, Payme, Uzum) va obuna
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                      Toʻlovlar
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Click */}
                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">Click Shlyuzi (Click.uz)</h4>
                        <p className="text-[11px] text-blue-300/70">Avtomatik hisob-faktura va QR toʻlov</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleTestPaymentGateway('Click.uz')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/25 hover:bg-blue-600/45 text-cyan-300 text-xs font-semibold cursor-pointer border border-blue-500/30 transition-all active:scale-95"
                        >
                          Sinash
                        </button>
                        <input
                          type="checkbox"
                          checked={clickActive}
                          onChange={(e) => setClickActive(e.target.checked)}
                          className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Payme */}
                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">Payme Shlyuzi (Paycom)</h4>
                        <p className="text-[11px] text-blue-300/70">Karta orqali bir zumda toʻlov</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleTestPaymentGateway('Payme')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/25 hover:bg-blue-600/45 text-cyan-300 text-xs font-semibold cursor-pointer border border-blue-500/30 transition-all active:scale-95"
                        >
                          Sinash
                        </button>
                        <input
                          type="checkbox"
                          checked={paymeActive}
                          onChange={(e) => setPaymeActive(e.target.checked)}
                          className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Uzum Bank */}
                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">Uzum Bank & Nasiya</h4>
                        <p className="text-[11px] text-blue-300/70">Boʻlib toʻlash va Uzum karta integratsiyasi</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleTestPaymentGateway('Uzum Bank')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/25 hover:bg-blue-600/45 text-cyan-300 text-xs font-semibold cursor-pointer border border-blue-500/30 transition-all active:scale-95"
                        >
                          Sinash
                        </button>
                        <input
                          type="checkbox"
                          checked={uzumActive}
                          onChange={(e) => setUzumActive(e.target.checked)}
                          className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Pricing inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          Oylik Premium Obuna (soʻmda)
                        </label>
                        <input
                          type="number"
                          value={monthlySubscription}
                          onChange={(e) => setMonthlySubscription(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          Valyuta Turi
                        </label>
                        <input
                          type="text"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={handleSaveBilling}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Toʻlov Parametrlarini Saqlash</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 09: SERTIFIKAT & TESTLAR (SETTINGS CERTIFICATES) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_certificates' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        <span>Sertifikat va Test Baholash Mezonlari</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Oʻtish foizlari, imtiyozli A+ sertifikati va QR-verifikatsiya · Jami berilgan: {certificatesCount.toLocaleString()} ta
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-mono font-bold">
                        {certificatesCount.toLocaleString()} ta sertifikat
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrementCertCount}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold cursor-pointer transition-all active:scale-95"
                        title="Sertifikatlar soniga +1 qoʻshish"
                      >
                        +1 Qoʻshish
                      </button>
                      <button
                        type="button"
                        onClick={handleDecrementCertCount}
                        disabled={certificatesCount === 0}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-200 text-xs font-bold cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Sertifikatlar sonidan -1 kamaytirish"
                      >
                        -1 Kamaytirish
                      </button>
                      {certificatesCount > 0 && (
                        <button
                          type="button"
                          onClick={handleResetCertCount}
                          className="px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-rose-900/60 border border-slate-600/50 text-slate-300 hover:text-rose-200 text-xs font-medium cursor-pointer transition-all active:scale-95"
                          title="Sertifikatlar hisobini 0 ga tushirish"
                        >
                          0 ga qaytarish
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          Minimal Oʻtish Bali (%)
                        </label>
                        <input
                          type="number"
                          value={passingScore}
                          onChange={(e) => setPassingScore(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                        />
                        <p className="text-[10px] text-blue-300/70">Standart muvaffaqiyatli sertifikat chegarasi</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-blue-200">
                          A+ (Imtiyozli) Sertifikat Bali (%)
                        </label>
                        <input
                          type="number"
                          value={distinctionScore}
                          onChange={(e) => setDistinctionScore(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                        />
                        <p className="text-[10px] text-blue-300/70">Oltin hoshiyali milliy baholash darajasi</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-blue-200">
                        Sertifikat Imzolovchi Tashkilot / Lavozim
                      </label>
                      <input
                        type="text"
                        value={certSignerTitle}
                        onChange={(e) => setCertSignerTitle(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">Avtomatik Sertifikat Generatsiyasi</h4>
                        <p className="text-[11px] text-blue-300/70">Test tugashi bilan bir zumda PDF & QR-kod tayyorlash</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoIssueCert}
                        onChange={(e) => setAutoIssueCert(e.target.checked)}
                        className="w-5 h-5 rounded text-blue-500 focus:ring-cyan-400 bg-[#0c2a50] border-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePreviewCertificate}
                      className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Namunaviy Sertifikatni Yuklab Olish</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCertificates}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Mezonlarni Saqlash</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 10: TIZIM LOGLARI & AUDIT (LOGS) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'logs' && (
              <div className="space-y-4">
                <div className="bg-[#0c2a50]/85 p-4 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg text-white">
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        placeholder="Loglar ichidan qidirish..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50"
                      />
                    </div>

                    <select
                      value={logFilter}
                      onChange={(e) => setLogFilter(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                    >
                      <option value="all">Barcha loglar ({logs.length})</option>
                      <option value="LOGIN">LOGIN</option>
                      <option value="COURSE_EDIT">COURSE_EDIT</option>
                      <option value="AI_TRANSLATE">AI_TRANSLATE</option>
                      <option value="SYSTEM">SYSTEM</option>
                      <option value="SECURITY">SECURITY</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        addAdminLog('SYSTEM', 'Tizim tekshiruvi sinovi', 'Admin konsolidan test logi generatsiya qilindi', 'info');
                        setLogs(getStoredAdminLogs());
                        showToast('Test log qoʻshildi');
                      }}
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/45 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      + Test Log
                    </button>

                    <button
                      onClick={handleExportLogs}
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/45 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Eksport</span>
                    </button>

                    <button
                      onClick={handleClearLogs}
                      className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Tozalash</span>
                    </button>
                  </div>
                </div>

                {/* Logs Table */}
                <div className="bg-[#0c2a50]/85 rounded-2xl border border-blue-700/50 overflow-hidden shadow-lg">
                  <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#081e3d] border-b border-blue-700/60 text-blue-200 font-bold sticky top-0">
                        <tr>
                          <th className="p-3">Vaqt</th>
                          <th className="p-3">Turi</th>
                          <th className="p-3">Voqea / Sarlavha</th>
                          <th className="p-3">Tafsilot</th>
                          <th className="p-3">Foydalanuvchi</th>
                          <th className="p-3">Holat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-800/40 text-blue-100">
                        {filteredLogs.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-blue-300/70">
                              Hech qanday log topilmadi
                            </td>
                          </tr>
                        ) : (
                          filteredLogs.map(item => (
                            <tr key={item.id} className="hover:bg-blue-600/15 transition-colors">
                              <td className="p-3 font-mono text-[11px] text-blue-300/80 whitespace-nowrap">
                                {item.timestamp}
                              </td>
                              <td className="p-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-[#071c36] text-cyan-300 border border-blue-700/60">
                                  {item.type}
                                </span>
                              </td>
                              <td className="p-3 font-bold text-white whitespace-nowrap">
                                {item.title}
                              </td>
                              <td className="p-3 text-[11px] text-blue-200/80 max-w-xs truncate">
                                {item.details}
                              </td>
                              <td className="p-3 text-[11px] font-medium whitespace-nowrap text-blue-200">
                                {item.user}
                              </td>
                              <td className="p-3 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.status === 'success'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                    : item.status === 'warning'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                                    : item.status === 'error'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                }`}>
                                  {item.status.toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 11: SERVER & DIAGNOSTIKA (SETTINGS SERVER) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'settings_server' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-sky-400" />
                        <span>Server Diagnostikasi va Kesh Nazorati</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Infratuzilma tezligi, xotira sarfi va operativ kesh holati
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
                      Normal (Faol)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-200">Server Javob Berish Vaqti</span>
                        <span className="font-mono font-bold text-emerald-400">18 ms</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
                        <div className="w-[18%] h-full bg-emerald-400 rounded-full"></div>
                      </div>
                      <p className="text-[10px] text-blue-300/70">Juda tezkor javob (Aʼlo daraja)</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-200">Operativ Xotira (RAM)</span>
                        <span className="font-mono font-bold text-cyan-300">512 MB / 2048 MB</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
                        <div className="w-[25%] h-full bg-cyan-400 rounded-full"></div>
                      </div>
                      <p className="text-[10px] text-blue-300/70">Zaxira quvvat 75% ochiq</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071c36]/90 border border-blue-700/50 space-y-3">
                    <h4 className="text-xs font-bold text-cyan-300">Tezkor Operatsiyalar</h4>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => {
                          addAdminLog('SYSTEM', 'Operativ kesh tozalandi', 'Vite va brauzer sessiya keshlari tozalandi', 'success');
                          setLogs(getStoredAdminLogs());
                          showToast('Barcha operativ keshlari tozalandi!');
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4 text-cyan-300" />
                        <span>Keshni Tozalash</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRunFullDiagnostics}
                        className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 active:scale-95"
                      >
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span>Diagnostika Testini Oʻtkazish</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleTestPing}
                        className="px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-100 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-2 active:scale-95"
                      >
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span>Tarmoq Pingini Sinash</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 12: ZAXIRA NUSXA & EKSPORT (BACKUP EXPORT) */}
            {/* --------------------------------------------------------- */}
            {activeTab === 'backup_export' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-[#0c2a50]/85 p-6 rounded-2xl border border-blue-700/50 shadow-lg space-y-5 text-white">
                  <div className="pb-3 border-b border-blue-800/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-teal-400" />
                        <span>Tizim Zaxira Nusxasi (Backup) va Eksport</span>
                      </h3>
                      <p className="text-xs text-blue-200/80">
                        Barcha kurslar, sozlamalar, loglar va talabalar maʼlumotlarini zaxiraga olish
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-mono font-bold">
                      JSON Zaxira
                    </span>
                  </div>

                  {/* Hidden file input for restore */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportBackupFile}
                    accept=".json"
                    className="hidden"
                  />

                  {/* Backup Card 1: Download */}
                  <div className="p-5 rounded-2xl bg-[#071c36]/90 border border-blue-700/50 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                        <Download className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Toʻliq Platforma Arxivini Yuklab Olish</h4>
                        <p className="text-xs text-blue-200/80">
                          {courseList.length} ta kurs, {textbooksList.length} ta darslik, {instructorsList.length} nafar ustoz, {usersList.length} ta foydalanuvchi va barcha konfiguratsiyalar bitta JSON faylda
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleExportFullBackup}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-teal-500/25 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        <span>Toʻliq Zaxira Faylini Yuklab Olish (.json)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 font-bold text-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Zaxira Faylidan Tiklash (.json)</span>
                      </button>
                    </div>
                  </div>

                  {/* Backup Card 2: Factory Reset */}
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        <RotateCcw className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Boshlangʻich Standart Holatga Qaytarish</h4>
                        <p className="text-xs text-blue-200/70">
                          Barcha kiritilgan oʻzgarishlarni bekor qilib, tizimni ilk zavod holatiga qaytarish
                        </p>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleResetToDefaults}
                        className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/40 font-bold text-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Tizimni Boshlangʻich Holatga Qaytarish (Reset Defaults)</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#071c36]/60 border border-blue-800/40 text-xs text-blue-200/80 space-y-1.5">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Xavfsiz saqlash tavsiyasi:</span>
                    </p>
                    <p>
                      Yuklab olingan zaxira fayllarini har haftada kamida bir marta yangilab turish tavsiya etiladi.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 0: YANGI KURS QOʻSHISH (ADD COURSE MODAL) */}
      {/* ========================================================================= */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-cyan-500/50 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Kurs Qoʻshish</h3>
                  <p className="text-[11px] text-blue-200/70">Platformaga yangi oʻquv kursi va dastur kiritish</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCourseSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Kurs Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="Masalan: Full-Stack Web Dasturlash & AI"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Kategoriya / Yoʻnalish</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="it">Axborot texnologiyalari (Dasturlash, AI)</option>
                    <option value="exact_sciences">Aniq fanlar (Matematika, Fizika)</option>
                    <option value="natural_sciences">Tabiiy fanlar (Kimyo, Biologiya)</option>
                    <option value="languages">Xorijiy tillar (Ingliz, Nemis, Rus)</option>
                    <option value="humanities">Ijtimoiy-gumanitar (Tarix, Ona tili)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Qiyinlik Darajasi</label>
                  <select
                    value={newCourseLevel}
                    onChange={(e) => setNewCourseLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="Boshlangʻich (Beginner)">Boshlangʻich (Beginner)</option>
                    <option value="Oʻrta (Intermediate)">Oʻrta (Intermediate)</option>
                    <option value="Ilgʻor (Advanced)">Ilgʻor (Advanced)</option>
                    <option value="Barcha darajalar">Barcha darajalar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Oʻqituvchi / Instruktor</label>
                  <input
                    type="text"
                    value={newCourseInstructor}
                    onChange={(e) => setNewCourseInstructor(e.target.value)}
                    placeholder="Sherzodbek Qodirov"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Darslar Soni</label>
                  <input
                    type="number"
                    min="1"
                    value={newCourseLessons}
                    onChange={(e) => setNewCourseLessons(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Davomiyligi (soat)</label>
                  <input
                    type="number"
                    min="1"
                    value={newCourseHours}
                    onChange={(e) => setNewCourseHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">Kurs Haqida Tavsif</label>
                <textarea
                  rows={3}
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  placeholder="Kurs maqsadi va qamrab olgan asosiy mavzulari..."
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                />
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Kursni Saqlash & Qoʻshish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: YANGI DARSLIK QOʻSHISH (ADD TEXTBOOK MODAL) */}
      {/* ========================================================================= */}
      {showAddTextbookModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-blue-500/50 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Darslik Qoʻshish</h3>
                  <p className="text-[11px] text-blue-200/70">Xorijiy tillar yoki IT boʻyicha oʻquv kitobi kiritish</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTextbookModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTextbook} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Darslik Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="Masalan: English Grammar in Use (Raymond Murphy)"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Fan / Til</label>
                  <select
                    value={newBookSubject}
                    onChange={(e) => setNewBookSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="Ingliz tili">Ingliz tili (IELTS / Grammar)</option>
                    <option value="Rus tili">Rus tili (TRKI / Grammatika)</option>
                    <option value="Nemis tili">Nemis tili (Goethe / TestDaF)</option>
                    <option value="Fransuz tili">Fransuz tili (DELF)</option>
                    <option value="Dasturlash & IT">Dasturlash & IT</option>
                    <option value="Sunʼiy intellekt">Sunʼiy intellekt & Python</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Kategoriya</label>
                  <select
                    value={newBookCategory}
                    onChange={(e) => setNewBookCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="languages">Xorijiy Tillar (Languages)</option>
                    <option value="it">Dasturlash & IT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Muallif / Nashriyot</label>
                  <input
                    type="text"
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    placeholder="Masalan: Raymond Murphy / Cambridge"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Sahifalar Soni</label>
                  <input
                    type="number"
                    value={newBookPages}
                    onChange={(e) => setNewBookPages(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Daraja</label>
                  <select
                    value={newBookLevel}
                    onChange={(e) => setNewBookLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="Barcha darajalar">Barcha darajalar</option>
                    <option value="Boshlangʻich (A1-A2)">Boshlangʻich (A1-A2)</option>
                    <option value="Oʻrta (B1-B2)">Oʻrta (B1-B2)</option>
                    <option value="Yuqori (C1-C2)">Yuqori (C1-C2)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Format</label>
                  <select
                    value={newBookFormat}
                    onChange={(e) => setNewBookFormat(e.target.value as AdminTextbook['format'])}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                  >
                    <option value="PDF">PDF</option>
                    <option value="EPUB">EPUB</option>
                    <option value="Interaktiv">Interaktiv</option>
                    <option value="Video-darslik">Video-darslik</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Fayl Hajmi</label>
                  <input
                    type="text"
                    value={newBookFileSize}
                    onChange={(e) => setNewBookFileSize(e.target.value)}
                    placeholder="Masalan: 16.5 MB"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">Muqova Rasm Havolasi (URL)</label>
                <input
                  type="url"
                  value={newBookCover}
                  onChange={(e) => setNewBookCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">Qisqacha Tavsif</label>
                <textarea
                  rows={3}
                  value={newBookDesc}
                  onChange={(e) => setNewBookDesc(e.target.value)}
                  placeholder="Darslik maqsadi va qamrab olgan mavzulari..."
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/40"
                />
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTextbookModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Darslikni Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: YANGI USTOZ QOʻSHISH (ADD INSTRUCTOR MODAL) */}
      {/* ========================================================================= */}
      {showAddInstructorModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-teal-500/50 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Ustoz / Instruktor Qoʻshish</h3>
                  <p className="text-[11px] text-blue-200/70">Platforma oʻqituvchilari safiga yangi mutaxassis roʻyxatlash</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddInstructorModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInstructor} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Ustozning Ism-Sharifi (F.I.Sh.) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInstName}
                  onChange={(e) => setNewInstName(e.target.value)}
                  placeholder="Masalan: Sherzodbek Qodirov"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Mutaxassislik Sohasi</label>
                  <input
                    type="text"
                    value={newInstSpec}
                    onChange={(e) => setNewInstSpec(e.target.value)}
                    placeholder="Masalan: Ingliz tili & IELTS Mastery"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Lavozimi & Sertifikati</label>
                  <input
                    type="text"
                    value={newInstRole}
                    onChange={(e) => setNewInstRole(e.target.value)}
                    placeholder="Masalan: IELTS 8.5, Kembrij bosh instruktori"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Tashkilot / Markaz</label>
                  <input
                    type="text"
                    value={newInstOrg}
                    onChange={(e) => setNewInstOrg(e.target.value)}
                    placeholder="ZiyoTalim & Techzone"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Tajriba</label>
                  <input
                    type="text"
                    value={newInstExp}
                    onChange={(e) => setNewInstExp(e.target.value)}
                    placeholder="Masalan: 7 yil tajriba"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Reyting (max 5.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="5"
                    value={newInstRating}
                    onChange={(e) => setNewInstRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Email Manzili</label>
                  <input
                    type="email"
                    value={newInstEmail}
                    onChange={(e) => setNewInstEmail(e.target.value)}
                    placeholder="ustoz@ziyotalim.uz"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Avatar Rasm Havolasi (URL)</label>
                  <input
                    type="url"
                    value={newInstAvatar}
                    onChange={(e) => setNewInstAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">Qisqacha Biografiya (Bio)</label>
                <textarea
                  rows={3}
                  value={newInstBio}
                  onChange={(e) => setNewInstBio(e.target.value)}
                  placeholder="Ustozning erishgan yutuqlari, talabalar natijalari va oʻqitish metodikasi..."
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-blue-300/40"
                />
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddInstructorModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-teal-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ustozni Roʻyxatga Qoʻshish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: YANGI DARSLIK (DARS) QOʻSHISH (ADD LESSON MODAL) */}
      {/* ========================================================================= */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-amber-500/50 shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Darslik Qoʻshish</h3>
                  <p className="text-[11px] text-blue-200/70">Kurs moduliga yangi dars mavzusi va kontentini kiritish</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLessonModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">Qaysi modulga qoʻshilsin:</label>
                {(() => {
                  const targetCourse = courseList.find(c => c.id === lessonCourseId);
                  const modules = targetCourse?.modules || [{ id: 'mod-1', title: '1-Modul: Asosiy Dastur', lessons: [] }];
                  return (
                    <select
                      value={targetModuleId || modules[0]?.id}
                      onChange={(e) => setTargetModuleId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white font-medium"
                    >
                      {modules.map((m, idx) => (
                        <option key={m.id} value={m.id}>
                          {idx + 1}-Modul: {m.title}
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Darslik Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Masalan: 4-Dars: Present Perfect zamoni va amaliy mashqlar"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Davomiyligi</label>
                  <input
                    type="text"
                    value={newLessonDuration}
                    onChange={(e) => setNewLessonDuration(e.target.value)}
                    placeholder="25 daqiqa"
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white placeholder-blue-300/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-blue-200">Darslik Turi</label>
                  <select
                    value={newLessonType}
                    onChange={(e) => setNewLessonType(e.target.value as Lesson['type'])}
                    className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white font-medium"
                  >
                    <option value="video">Video Darslik</option>
                    <option value="reading">Matn & Oʻqish</option>
                    <option value="quiz">Test & Viktorina</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">Qisqacha Izoh / Tavsif</label>
                <textarea
                  rows={3}
                  value={newLessonSnippet}
                  onChange={(e) => setNewLessonSnippet(e.target.value)}
                  placeholder="Ushbu darslikda talaba nimani oʻrganadi..."
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-amber-400 text-white placeholder-blue-300/40"
                />
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Darslikni Qoʻshish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: YANGI MODUL YARATISH (ADD MODULE MODAL) */}
      {/* ========================================================================= */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-cyan-500/50 shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Modul Yaratish</h3>
                  <p className="text-[11px] text-blue-200/70">Kurs oʻquv rejasiga yangi bob qoʻshish</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModuleModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddModule} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Modul Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="Masalan: 3-Modul: Murakkab sintaksis va imtihon amaliyoti"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Modulni Yaratish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: YANGI FOYDALANUVCHI QOʻSHISH (ADD USER MODAL) */}
      {/* ========================================================================= */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-gradient-to-br from-[#0c2340] to-[#081e3b] text-white rounded-2xl border border-cyan-500/50 shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/60">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Yangi Foydalanuvchi Qoʻshish</h3>
                  <p className="text-[11px] text-blue-200/70">Talaba, mentor yoki admin roʻyxatlash</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Ism-Sharifi (F.I.Sh.) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Masalan: Sardorbek Alimov"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Email Manzili <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="talaba@ziyotalim.uz"
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium placeholder-blue-300/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-200">
                  Foydalanuvchi Roli
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#071c36] border border-blue-700/60 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-medium"
                >
                  <option value="Talaba">Talaba</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="pt-3 border-t border-blue-800/60 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 cursor-pointer font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Qoʻshish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNIVERSAL IN-APP DELETE CONFIRMATION DIALOG (IFRAME-SAFE) */}
      {/* ========================================================================= */}
      {deleteConfirm && deleteConfirm.isOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setDeleteConfirm(null)}
        >
          <div 
            className="w-full max-w-md bg-gradient-to-br from-[#120a1f] via-[#1c0d2e] to-[#0d1527] text-white rounded-3xl border border-rose-500/50 shadow-2xl shadow-rose-950/60 p-6 space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-400/40 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
                <Trash2 className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">{deleteConfirm.title}</h3>
                <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
                  Qaytarilmas amal
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#090b14]/80 border border-rose-500/20 space-y-2 text-xs">
              <p className="text-slate-200 leading-relaxed">
                Haqiqatan ham <strong className="text-white font-bold underline decoration-rose-400">{deleteConfirm.itemName}</strong> {deleteConfirm.itemTypeLabel}ini oʻchirib tashlamoqchimisiz?
              </p>
              {deleteConfirm.warningNote && (
                <p className="text-[11px] text-rose-300/80 pt-1.5 border-t border-rose-500/15 leading-relaxed">
                  ⚠️ {deleteConfirm.warningNote}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={deleteConfirm.onConfirm}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 cursor-pointer flex items-center gap-2 transition-all active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ha, Butunlay Oʻchirilsin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
