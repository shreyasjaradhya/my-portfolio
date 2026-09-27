import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { 
  getProjects, createProject, updateProject, deleteProject, 
  getSkills, createSkill, updateSkill, deleteSkill,
  getExperience, createExperience, updateExperience, deleteExperience,
  getEducation, createEducation, updateEducation, deleteEducation,
  getCertifications, createCertification, updateCertification, deleteCertification,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  getMessages, updateMessageStatus, deleteMessage,
  getProfile
} from '../services/portfolioService';
import { LogOut, Plus, Edit2, Trash2, LayoutDashboard, Code, Briefcase, GraduationCap, Award, Star, Mail, CheckCircle, Circle, User, Sun, Moon } from 'lucide-react';
import ProjectForm from '../components/admin/ProjectForm';
import SkillForm from '../components/admin/SkillForm';
import ExperienceForm from '../components/admin/ExperienceForm';
import EducationForm from '../components/admin/EducationForm';
import CertificationForm from '../components/admin/CertificationForm';
import AchievementForm from '../components/admin/AchievementForm';
import ProfileForm from '../components/admin/ProfileForm';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  // States
  const [profile, setProfile] = useState(null);

  const [projects, setProjects] = useState([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [skills, setSkills] = useState([]);
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [experience, setExperience] = useState([]);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [education, setEducation] = useState([]);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const [certifications, setCertifications] = useState([]);
  const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [isAchievementFormOpen, setIsAchievementFormOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [
        profileData, projectsData, skillsData, experienceData, 
        educationData, certsData, achievementsData, messagesData
      ] = await Promise.all([
        getProfile().catch(() => null),
        getProjects(), getSkills(), getExperience(), 
        getEducation(), getCertifications(), getAchievements(),
        getMessages()
      ]);
      setProfile(profileData);
      setProjects(projectsData);
      setSkills(skillsData);
      setExperience(experienceData);
      setEducation(educationData);
      setCertifications(certsData);
      setAchievements(achievementsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // --- Handlers ---
  const handleOpenProjectForm = (project = null) => { setEditingProject(project); setIsProjectFormOpen(true); };
  const handleCloseProjectForm = () => { setEditingProject(null); setIsProjectFormOpen(false); };
  const handleSubmitProject = async (projectData) => {
    try {
      if (editingProject) await updateProject(editingProject._id, projectData);
      else await createProject(projectData);
      handleCloseProjectForm(); fetchData();
    } catch (error) { alert('Failed to save project.'); }
  };
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try { await deleteProject(id); setProjects(projects.filter(p => p._id !== id)); } catch (error) { alert('Failed to delete project.'); }
    }
  };

  const handleOpenSkillForm = (skill = null) => { setEditingSkill(skill); setIsSkillFormOpen(true); };
  const handleCloseSkillForm = () => { setEditingSkill(null); setIsSkillFormOpen(false); };
  const handleSubmitSkill = async (skillData) => {
    try {
      if (editingSkill) await updateSkill(editingSkill._id, skillData);
      else await createSkill(skillData);
      handleCloseSkillForm(); fetchData();
    } catch (error) { alert('Failed to save skill.'); }
  };
  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try { await deleteSkill(id); setSkills(skills.filter(s => s._id !== id)); } catch (error) { alert('Failed to delete skill.'); }
    }
  };

  const handleOpenExperienceForm = (exp = null) => { setEditingExperience(exp); setIsExperienceFormOpen(true); };
  const handleCloseExperienceForm = () => { setEditingExperience(null); setIsExperienceFormOpen(false); };
  const handleSubmitExperience = async (expData) => {
    try {
      if (editingExperience) await updateExperience(editingExperience._id, expData);
      else await createExperience(expData);
      handleCloseExperienceForm(); fetchData();
    } catch (error) { alert('Failed to save experience.'); }
  };
  const handleDeleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try { await deleteExperience(id); setExperience(experience.filter(e => e._id !== id)); } catch (error) { alert('Failed to delete experience.'); }
    }
  };

  const handleOpenEducationForm = (edu = null) => { setEditingEducation(edu); setIsEducationFormOpen(true); };
  const handleCloseEducationForm = () => { setEditingEducation(null); setIsEducationFormOpen(false); };
  const handleSubmitEducation = async (eduData) => {
    try {
      if (editingEducation) await updateEducation(editingEducation._id, eduData);
      else await createEducation(eduData);
      handleCloseEducationForm(); fetchData();
    } catch (error) { alert('Failed to save education.'); }
  };
  const handleDeleteEducation = async (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try { await deleteEducation(id); setEducation(education.filter(e => e._id !== id)); } catch (error) { alert('Failed to delete education.'); }
    }
  };

  const handleOpenCertificationForm = (cert = null) => { setEditingCertification(cert); setIsCertificationFormOpen(true); };
  const handleCloseCertificationForm = () => { setEditingCertification(null); setIsCertificationFormOpen(false); };
  const handleSubmitCertification = async (certData) => {
    try {
      if (editingCertification) await updateCertification(editingCertification._id, certData);
      else await createCertification(certData);
      handleCloseCertificationForm(); fetchData();
    } catch (error) { alert('Failed to save certification.'); }
  };
  const handleDeleteCertification = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try { await deleteCertification(id); setCertifications(certifications.filter(c => c._id !== id)); } catch (error) { alert('Failed to delete certification.'); }
    }
  };

  const handleOpenAchievementForm = (ach = null) => { setEditingAchievement(ach); setIsAchievementFormOpen(true); };
  const handleCloseAchievementForm = () => { setEditingAchievement(null); setIsAchievementFormOpen(false); };
  const handleSubmitAchievement = async (achData) => {
    try {
      if (editingAchievement) await updateAchievement(editingAchievement._id, achData);
      else await createAchievement(achData);
      handleCloseAchievementForm(); fetchData();
    } catch (error) { alert('Failed to save achievement.'); }
  };
  const handleDeleteAchievement = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try { await deleteAchievement(id); setAchievements(achievements.filter(a => a._id !== id)); } catch (error) { alert('Failed to delete achievement.'); }
    }
  };

  const handleToggleMessageRead = async (msg) => {
    try {
      await updateMessageStatus(msg._id, !msg.isRead);
      fetchData();
    } catch (error) { alert('Failed to update message status.'); }
  };
  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try { await deleteMessage(id); setMessages(messages.filter(m => m._id !== id)); } catch (error) { alert('Failed to delete message.'); }
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="bg-bg-card border-b border-border-subtle shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-text-primary hidden sm:block">Admin</h1>
            <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar">
              <button onClick={() => setActiveTab('profile')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'profile' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <User className="h-4 w-4" /> <span className="hidden md:inline">Profile</span>
              </button>
              <button onClick={() => setActiveTab('projects')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'projects' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <LayoutDashboard className="h-4 w-4" /> <span className="hidden md:inline">Projects</span>
              </button>
              <button onClick={() => setActiveTab('skills')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'skills' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <Code className="h-4 w-4" /> <span className="hidden md:inline">Skills</span>
              </button>
              <button onClick={() => setActiveTab('experience')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'experience' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <Briefcase className="h-4 w-4" /> <span className="hidden md:inline">Experience</span>
              </button>
              <button onClick={() => setActiveTab('education')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'education' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <GraduationCap className="h-4 w-4" /> <span className="hidden md:inline">Education</span>
              </button>
              <button onClick={() => setActiveTab('certifications')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'certifications' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <Award className="h-4 w-4" /> <span className="hidden md:inline">Certs</span>
              </button>
              <button onClick={() => setActiveTab('achievements')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'achievements' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <Star className="h-4 w-4" /> <span className="hidden md:inline">Achievements</span>
              </button>
              <button onClick={() => setActiveTab('messages')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300 ${activeTab === 'messages' ? 'bg-border-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-subtle/50'}`}>
                <Mail className="h-4 w-4" /> 
                <span className="hidden md:inline">Messages</span>
                {unreadMessagesCount > 0 && (
                  <span className="bg-brand-secondary text-btn-text text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2 text-text-secondary hover:text-brand-secondary transition-colors duration-300 focus:outline-none">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-text-primary hover:text-text-primary bg-border-subtle/50 hover:bg-border-subtle px-4 py-2 rounded-lg transition-colors duration-300 ml-4">
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
            </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-10 text-text-secondary">Loading dashboard...</div>
        ) : (
          <>
            {activeTab === 'profile' && (
              <ProfileForm initialData={profile} onSaveSuccess={fetchData} />
            )}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Projects</h2>
                  <button
                    onClick={() => handleOpenProjectForm()}
                    className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Project</span>
                  </button>
                </div>
                
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-bg-base/50 border-b border-border-subtle">
                          <th className="px-6 py-4 font-semibold text-text-primary">Title</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Technologies</th>
                          <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {projects.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-text-secondary">
                              No projects found.
                            </td>
                          </tr>
                        ) : (
                          projects.map((project) => (
                            <tr key={project._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                              <td className="px-6 py-4 font-medium text-text-primary">{project.title}</td>
                              <td className="px-6 py-4 text-text-secondary">
                                {project.techStack?.join(', ') || '-'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenProjectForm(project)}
                                    className="p-2 text-text-secondary hover:text-brand-primary hover:bg-blue-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(project._id)}
                                    className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
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

            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Skills</h2>
                  <button
                    onClick={() => handleOpenSkillForm()}
                    className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Skill</span>
                  </button>
                </div>
                
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-bg-base/50 border-b border-border-subtle">
                          <th className="px-6 py-4 font-semibold text-text-primary">Name</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Category</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Proficiency</th>
                          <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {skills.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-text-secondary">
                              No skills found.
                            </td>
                          </tr>
                        ) : (
                          skills.map((skill) => (
                            <tr key={skill._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                              <td className="px-6 py-4 font-medium text-text-primary">{skill.name}</td>
                              <td className="px-6 py-4 text-text-secondary">
                                <span className="px-2 py-1 bg-border-subtle text-xs rounded-md">{skill.category}</span>
                              </td>
                              <td className="px-6 py-4 text-text-secondary">
                                {skill.proficiency ? `${skill.proficiency}%` : '-'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenSkillForm(skill)}
                                    className="p-2 text-text-secondary hover:text-brand-primary hover:bg-blue-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSkill(skill._id)}
                                    className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
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
            {activeTab === 'experience' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Experience</h2>
                  <button
                    onClick={() => handleOpenExperienceForm()}
                    className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Experience</span>
                  </button>
                </div>
                
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-bg-base/50 border-b border-border-subtle">
                          <th className="px-6 py-4 font-semibold text-text-primary">Company</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Role</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Dates</th>
                          <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {experience.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-text-secondary">
                              No experience records found.
                            </td>
                          </tr>
                        ) : (
                          experience.map((exp) => (
                            <tr key={exp._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                              <td className="px-6 py-4 font-medium text-text-primary">{exp.company}</td>
                              <td className="px-6 py-4 text-text-secondary">{exp.role}</td>
                              <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenExperienceForm(exp)}
                                    className="p-2 text-text-secondary hover:text-brand-primary hover:bg-blue-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExperience(exp._id)}
                                    className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
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
            {activeTab === 'education' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Education</h2>
                  <button
                    onClick={() => handleOpenEducationForm()}
                    className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Education</span>
                  </button>
                </div>
                
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-bg-base/50 border-b border-border-subtle">
                          <th className="px-6 py-4 font-semibold text-text-primary">Institution</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Degree</th>
                          <th className="px-6 py-4 font-semibold text-text-primary">Dates</th>
                          <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {education.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-text-secondary">
                              No education records found.
                            </td>
                          </tr>
                        ) : (
                          education.map((edu) => (
                            <tr key={edu._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                              <td className="px-6 py-4 font-medium text-text-primary">{edu.institution}</td>
                              <td className="px-6 py-4 text-text-secondary">{edu.degree}</td>
                              <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                                {edu.startDate} - {edu.endDate || 'Present'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenEducationForm(edu)}
                                    className="p-2 text-text-secondary hover:text-brand-primary hover:bg-blue-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEducation(edu._id)}
                                    className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
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
            {activeTab === 'certifications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Certifications</h2>
                  <button onClick={() => handleOpenCertificationForm()} className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300">
                    <Plus className="h-5 w-5" /> <span>Add Certification</span>
                  </button>
                </div>
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-bg-base/50 border-b border-border-subtle">
                        <th className="px-6 py-4 font-semibold text-text-primary">Title</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">Issuer</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">Date</th>
                        <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {certifications.length === 0 ? (
                        <tr><td colSpan="4" className="px-6 py-8 text-center text-text-secondary">No certifications found.</td></tr>
                      ) : certifications.map((cert) => (
                        <tr key={cert._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                          <td className="px-6 py-4 font-medium text-text-primary">{cert.title}</td>
                          <td className="px-6 py-4 text-text-secondary">{cert.issuer}</td>
                          <td className="px-6 py-4 text-text-secondary">{cert.date}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleOpenCertificationForm(cert)} className="p-2 text-text-secondary hover:text-brand-primary"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteCertification(cert._id)} className="p-2 text-text-secondary hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Achievements</h2>
                  <button onClick={() => handleOpenAchievementForm()} className="flex items-center space-x-2 bg-brand-secondary text-btn-text px-4 py-2 rounded-lg transition-colors duration-300">
                    <Plus className="h-5 w-5" /> <span>Add Achievement</span>
                  </button>
                </div>
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-bg-base/50 border-b border-border-subtle">
                        <th className="px-6 py-4 font-semibold text-text-primary">Title</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">Description</th>
                        <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {achievements.length === 0 ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-text-secondary">No achievements found.</td></tr>
                      ) : achievements.map((ach) => (
                        <tr key={ach._id} className="hover:bg-border-subtle/30 transition-colors duration-300">
                          <td className="px-6 py-4 font-medium text-text-primary">{ach.title}</td>
                          <td className="px-6 py-4 text-text-secondary">{ach.description}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleOpenAchievementForm(ach)} className="p-2 text-text-secondary hover:text-brand-primary"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteAchievement(ach._id)} className="p-2 text-text-secondary hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'messages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Contact Messages</h2>
                </div>
                <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-bg-base/50 border-b border-border-subtle">
                        <th className="px-6 py-4 font-semibold text-text-primary">Status</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">From</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">Subject</th>
                        <th className="px-6 py-4 font-semibold text-text-primary">Date</th>
                        <th className="px-6 py-4 font-semibold text-text-primary text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {messages.length === 0 ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-text-secondary">No messages found.</td></tr>
                      ) : messages.map((msg) => (
                        <tr key={msg._id} className={`hover:bg-border-subtle/30 transition-colors duration-300 ${!msg.isRead ? 'bg-border-subtle/20' : ''}`}>
                          <td className="px-6 py-4">
                            <button onClick={() => handleToggleMessageRead(msg)} className={`p-1 rounded-full ${msg.isRead ? 'text-text-muted hover:text-text-primary' : 'text-brand-secondary hover:text-brand-primary'}`} title={msg.isRead ? "Mark as unread" : "Mark as read"}>
                              {msg.isRead ? <Circle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-text-primary">{msg.senderName}</div>
                            <div className="text-sm text-text-secondary">{msg.senderEmail}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`font-medium ${!msg.isRead ? 'text-text-primary' : 'text-text-primary'}`}>{msg.subject}</div>
                            <div className="text-sm text-text-secondary truncate max-w-xs">{msg.message}</div>
                          </td>
                          <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteMessage(msg._id)} className="p-2 text-text-secondary hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {isProjectFormOpen && <ProjectForm initialData={editingProject} onSubmit={handleSubmitProject} onClose={handleCloseProjectForm} />}
      {isSkillFormOpen && <SkillForm initialData={editingSkill} onSubmit={handleSubmitSkill} onClose={handleCloseSkillForm} />}
      {isExperienceFormOpen && <ExperienceForm initialData={editingExperience} onSubmit={handleSubmitExperience} onClose={handleCloseExperienceForm} />}
      {isEducationFormOpen && <EducationForm initialData={editingEducation} onSubmit={handleSubmitEducation} onClose={handleCloseEducationForm} />}
      {isCertificationFormOpen && <CertificationForm initialData={editingCertification} onSubmit={handleSubmitCertification} onClose={handleCloseCertificationForm} />}
      {isAchievementFormOpen && <AchievementForm initialData={editingAchievement} onSubmit={handleSubmitAchievement} onClose={handleCloseAchievementForm} />}
    </div>
  );
};

export default AdminDashboard;
