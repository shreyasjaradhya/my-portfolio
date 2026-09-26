import api from './api';

// ACTUAL RESUME DATA
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.url; // Returns the file path
};

export const mockSkills = [
  // Languages
  { _id: '1', name: 'Python', category: 'Languages', proficiency: 85 },
  { _id: '2', name: 'C', category: 'Languages', proficiency: 80 },
  { _id: '3', name: 'Verilog / System Verilog', category: 'Languages', proficiency: 75 },
  { _id: '4', name: 'HTML', category: 'Languages', proficiency: 90 },
  
  // Electronics & Hardware
  { _id: '5', name: 'Digital Electronics', category: 'Electronics & Hardware', proficiency: 85 },
  { _id: '6', name: 'Embedded Systems', category: 'Electronics & Hardware', proficiency: 80 },
  { _id: '7', name: 'PCB Design', category: 'Electronics & Hardware', proficiency: 75 },
  { _id: '8', name: 'FPGA', category: 'Electronics & Hardware', proficiency: 70 },
  { _id: '9', name: 'Microcontrollers', category: 'Electronics & Hardware', proficiency: 80 },
  { _id: '10', name: 'Sensor Integration', category: 'Electronics & Hardware', proficiency: 75 },
  
  // Tools
  { _id: '11', name: 'Xilinx Vivado', category: 'Tools', proficiency: 80 },
  { _id: '12', name: 'KiCad', category: 'Tools', proficiency: 75 },
  { _id: '13', name: 'MATLAB', category: 'Tools', proficiency: 70 },
  { _id: '14', name: 'LTSpice', category: 'Tools', proficiency: 80 },
  { _id: '15', name: 'Arduino IDE', category: 'Tools', proficiency: 85 },
];

export const mockProjects = [
  {
    _id: '1',
    title: 'File Path Organizer',
    description: 'Developed a Python-based automated file organizer that scans a directory and categorizes files into folders based on their extensions. Implemented a safe file movement system (safe_move) to prevent overwriting by automatically renaming duplicate files. Utilized Python built-in modules (os, shutil) to manage file operations and directory creation.',
    techStack: ['Python', 'OS Module', 'Shutil'],
    githubUrl: '',
    liveUrl: '',
    date: 'Dec 2025'
  },
  {
    _id: '2',
    title: 'Digital Timer Design using FPGA',
    description: 'Developed modular timer using combinational and sequential logic concepts. Validated functionality through simulation and implemented in FPGA.',
    techStack: ['Verilog', 'FPGA', 'Digital Logic'],
    githubUrl: '',
    liveUrl: '',
    date: 'Nov 2025'
  },
  {
    _id: '3',
    title: 'Traffic Light Controller',
    description: 'Implemented state-based traffic signal controller using sequential logic principles. Verified operation through simulation and implemented in FPGA.',
    techStack: ['Verilog', 'FPGA', 'Sequential Logic'],
    githubUrl: '',
    liveUrl: '',
    date: 'Oct 2025'
  }
];

export const mockExperience = [
  {
    _id: '1',
    company: 'Project / Research Experience',
    role: 'Electronics & Algorithm Developer',
    startDate: '2025-01-01',
    endDate: '2025-05-01',
    description: 'Gained hands-on exposure to electronics prototyping and innovation workflows. Built a Python engine for Sun-Moon angular separation. Applied spherical trigonometry and Haversine formulas for coordinates. Used ephemeris libraries for geolocation and refraction adjustments, and benchmarked results against astronomical datasets to ensure precision.'
  }
];



export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills from backend:', error);
    throw error;
  }
};

export const createSkill = async (skillData) => {
  const response = await api.post('/skills', skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects from backend:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const getExperience = async () => {
  try {
    const response = await api.get('/experience');
    return response.data;
  } catch (error) {
    console.error('Error fetching experience from backend:', error);
    throw error;
  }
};

export const createExperience = async (expData) => {
  const response = await api.post('/experience', expData);
  return response.data;
};

export const updateExperience = async (id, expData) => {
  const response = await api.put(`/experience/${id}`, expData);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await api.delete(`/experience/${id}`);
  return response.data;
};

export const getEducation = async () => {
  try {
    const response = await api.get('/education');
    return response.data;
  } catch (error) {
    console.error('Error fetching education from backend:', error);
    throw error;
  }
};

export const createEducation = async (eduData) => {
  const response = await api.post('/education', eduData);
  return response.data;
};

export const updateEducation = async (id, eduData) => {
  const response = await api.put(`/education/${id}`, eduData);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await api.delete(`/education/${id}`);
  return response.data;
};

export const getCertifications = async () => {
  try {
    const response = await api.get('/certifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching certifications from backend:', error);
    throw error;
  }
};

export const createCertification = async (data) => {
  const response = await api.post('/certifications', data);
  return response.data;
};

export const updateCertification = async (id, data) => {
  const response = await api.put(`/certifications/${id}`, data);
  return response.data;
};

export const deleteCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}`);
  return response.data;
};

export const getAchievements = async () => {
  try {
    const response = await api.get('/achievements');
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements from backend:', error);
    throw error;
  }
};

export const createAchievement = async (data) => {
  const response = await api.post('/achievements', data);
  return response.data;
};

export const updateAchievement = async (id, data) => {
  const response = await api.put(`/achievements/${id}`, data);
  return response.data;
};

export const deleteAchievement = async (id) => {
  const response = await api.delete(`/achievements/${id}`);
  return response.data;
};

export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};

export const createMessage = async (data) => {
  const response = await api.post('/messages', data);
  return response.data;
};

export const updateMessageStatus = async (id, isRead) => {
  const response = await api.put(`/messages/${id}/read`, { isRead });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};
