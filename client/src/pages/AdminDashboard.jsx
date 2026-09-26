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
import { LogOut, Plus, Edit2, Trash2, LayoutDashboard, Code, Briefcase, GraduationCap, Award, Star, Mail, CheckCircle, Circle, User } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <header className="bg-slate-800 border-b border-slate-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-white hidden sm:block">Admin</h1>
            <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar">
              <button onClick={() => setActiveTab('profile')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <User className="h-4 w-4" /> <span className="hidden md:inline">Profile</span>
              </button>
              <button onClick={() => setActiveTab('projects')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'projects' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <LayoutDashboard className="h-4 w-4" /> <span className="hidden md:inline">Projects</span>
              </button>
              <button onClick={() => setActiveTab('skills')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'skills' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Code className="h-4 w-4" /> <span className="hidden md:inline">Skills</span>
              </button>
              <button onClick={() => setActiveTab('experience')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'experience' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Briefcase className="h-4 w-4" /> <span className="hidden md:inline">Experience</span>
              </button>
              <button onClick={() => setActiveTab('education')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'education' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <GraduationCap className="h-4 w-4" /> <span className="hidden md:inline">Education</span>
              </button>
              <button onClick={() => setActiveTab('certifications')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'certifications' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Award className="h-4 w-4" /> <span className="hidden md:inline">Certs</span>
              </button>
              <button onClick={() => setActiveTab('achievements')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'achievements' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Star className="h-4 w-4" /> <span className="hidden md:inline">Achievements</span>
              </button>
              <button onClick={() => setActiveTab('messages')} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === 'messages' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Mail className="h-4 w-4" /> 
                <span className="hidden md:inline">Messages</span>
                {unreadMessagesCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors ml-4">
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-10 text-slate-400">Loading dashboard...</div>
        ) : (
          <>
            {activeTab === 'profile' && (
              <ProfileForm initialData={profile} onSaveSuccess={fetchData} />
            )}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Projects</h2>
                  <button
                    onClick={() => handleOpenProjectForm()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Project</span>
                  </button>
                </div>
                
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700">
                          <th className="px-6 py-4 font-semibold text-slate-300">Title</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Technologies</th>
                          <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {projects.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-slate-400">
                              No projects found.
                            </td>
                          </tr>
                        ) : (
                          projects.map((project) => (
                            <tr key={project._id} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                              <td className="px-6 py-4 text-slate-400">
                                {project.techStack?.join(', ') || '-'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenProjectForm(project)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(project._id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                  <h2 className="text-2xl font-bold text-white">Skills</h2>
                  <button
                    onClick={() => handleOpenSkillForm()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Skill</span>
                  </button>
                </div>
                
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700">
                          <th className="px-6 py-4 font-semibold text-slate-300">Name</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Category</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Proficiency</th>
                          <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {skills.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                              No skills found.
                            </td>
                          </tr>
                        ) : (
                          skills.map((skill) => (
                            <tr key={skill._id} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{skill.name}</td>
                              <td className="px-6 py-4 text-slate-400">
                                <span className="px-2 py-1 bg-slate-700 text-xs rounded-md">{skill.category}</span>
                              </td>
                              <td className="px-6 py-4 text-slate-400">
                                {skill.proficiency ? `${skill.proficiency}%` : '-'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenSkillForm(skill)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSkill(skill._id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                  <h2 className="text-2xl font-bold text-white">Experience</h2>
                  <button
                    onClick={() => handleOpenExperienceForm()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Experience</span>
                  </button>
                </div>
                
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700">
                          <th className="px-6 py-4 font-semibold text-slate-300">Company</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Role</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Dates</th>
                          <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {experience.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                              No experience records found.
                            </td>
                          </tr>
                        ) : (
                          experience.map((exp) => (
                            <tr key={exp._id} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{exp.company}</td>
                              <td className="px-6 py-4 text-slate-400">{exp.role}</td>
                              <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenExperienceForm(exp)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExperience(exp._id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                  <h2 className="text-2xl font-bold text-white">Education</h2>
                  <button
                    onClick={() => handleOpenEducationForm()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Education</span>
                  </button>
                </div>
                
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700">
                          <th className="px-6 py-4 font-semibold text-slate-300">Institution</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Degree</th>
                          <th className="px-6 py-4 font-semibold text-slate-300">Dates</th>
                          <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {education.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                              No education records found.
                            </td>
                          </tr>
                        ) : (
                          education.map((edu) => (
                            <tr key={edu._id} className="hover:bg-slate-700/30 transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{edu.institution}</td>
                              <td className="px-6 py-4 text-slate-400">{edu.degree}</td>
                              <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                {edu.startDate} - {edu.endDate || 'Present'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleOpenEducationForm(edu)}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEducation(edu._id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
                  <h2 className="text-2xl font-bold text-white">Certifications</h2>
                  <button onClick={() => handleOpenCertificationForm()} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus className="h-5 w-5" /> <span>Add Certification</span>
                  </button>
                </div>
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-slate-700">
                        <th className="px-6 py-4 font-semibold text-slate-300">Title</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">Issuer</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                        <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {certifications.length === 0 ? (
                        <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">No certifications found.</td></tr>
                      ) : certifications.map((cert) => (
                        <tr key={cert._id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{cert.title}</td>
                          <td className="px-6 py-4 text-slate-400">{cert.issuer}</td>
                          <td className="px-6 py-4 text-slate-400">{cert.date}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleOpenCertificationForm(cert)} className="p-2 text-slate-400 hover:text-blue-400"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteCertification(cert._id)} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
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
                  <h2 className="text-2xl font-bold text-white">Achievements</h2>
                  <button onClick={() => handleOpenAchievementForm()} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus className="h-5 w-5" /> <span>Add Achievement</span>
                  </button>
                </div>
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-slate-700">
                        <th className="px-6 py-4 font-semibold text-slate-300">Title</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">Description</th>
                        <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {achievements.length === 0 ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-400">No achievements found.</td></tr>
                      ) : achievements.map((ach) => (
                        <tr key={ach._id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{ach.title}</td>
                          <td className="px-6 py-4 text-slate-400">{ach.description}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleOpenAchievementForm(ach)} className="p-2 text-slate-400 hover:text-blue-400"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteAchievement(ach._id)} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
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
                  <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                </div>
                <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-slate-700">
                        <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">From</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">Subject</th>
                        <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                        <th className="px-6 py-4 font-semibold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {messages.length === 0 ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">No messages found.</td></tr>
                      ) : messages.map((msg) => (
                        <tr key={msg._id} className={`hover:bg-slate-700/30 transition-colors ${!msg.isRead ? 'bg-slate-700/20' : ''}`}>
                          <td className="px-6 py-4">
                            <button onClick={() => handleToggleMessageRead(msg)} className={`p-1 rounded-full ${msg.isRead ? 'text-slate-500 hover:text-slate-300' : 'text-blue-500 hover:text-blue-400'}`} title={msg.isRead ? "Mark as unread" : "Mark as read"}>
                              {msg.isRead ? <Circle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{msg.senderName}</div>
                            <div className="text-sm text-slate-400">{msg.senderEmail}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`font-medium ${!msg.isRead ? 'text-white' : 'text-slate-300'}`}>{msg.subject}</div>
                            <div className="text-sm text-slate-400 truncate max-w-xs">{msg.message}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteMessage(msg._id)} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
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
