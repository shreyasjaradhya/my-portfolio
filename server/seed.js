const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const mockProjects = [
  {
    title: 'File Path Organizer',
    description: 'Developed a Python-based automated file organizer that scans a directory and categorizes files into folders based on their extensions. Implemented a safe file movement system (safe_move) to prevent overwriting by automatically renaming duplicate files. Utilized Python built-in modules (os, shutil) to manage file operations and directory creation.',
    techStack: ['Python', 'OS Module', 'Shutil'],
    githubUrl: '',
    liveUrl: '',
    date: 'Dec 2025'
  },
  {
    title: 'Digital Timer Design using FPGA',
    description: 'Developed modular timer using combinational and sequential logic concepts. Validated functionality through simulation and implemented in FPGA.',
    techStack: ['Verilog', 'FPGA', 'Digital Logic'],
    githubUrl: '',
    liveUrl: '',
    date: 'Nov 2025'
  },
  {
    title: 'Traffic Light Controller',
    description: 'Implemented state-based traffic signal controller using sequential logic principles. Verified operation through simulation and implemented in FPGA.',
    techStack: ['Verilog', 'FPGA', 'Sequential Logic'],
    githubUrl: '',
    liveUrl: '',
    date: 'Oct 2025'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');
    
    // Seed Profile
    const Profile = require('./models/Profile');
    const mockProfile = {
      name: 'J Shreyas Aradhya',
      title: 'Electronics and Communication Engineering Student | Aspiring VLSI Design Engineer',
      bio: 'I aspire to build a career in VLSI design by applying my knowledge of digital electronics, semiconductor fundamentals, and hardware description languages such as Verilog. As an Electronics and Communication Engineering student, I aim to develop strong skills in digital system design, FPGA-based implementation, and hardware verification. My goal is to contribute to the design and development of efficient, reliable, and high-performance integrated circuits while continuously expanding my understanding of modern VLSI technologies and design methodologies.',
      email: 'shreyasjaradhya@gmail.com',
      github: '',
      linkedin: 'https://www.linkedin.com/in/shreyas-aradhya-0b9592321',
      phone: '+91 9483316921',
      resumeUrl: '#'
    };

    await Profile.updateOne(
      { email: mockProfile.email },
      { $set: mockProfile },
      { upsert: true }
    );
    console.log('Profile seeded successfully');

    // Use upsert to avoid duplicates if run multiple times
    for (const project of mockProjects) {
      await Project.updateOne(
        { title: project.title }, 
        { $set: project }, 
        { upsert: true }
      );
    }
    
    console.log('Projects seeded successfully without duplicates');

    // Seed Skills
    const Skill = require('./models/Skill');
    const mockSkills = [
      { name: 'Python', category: 'Languages', proficiency: 85 },
      { name: 'C', category: 'Languages', proficiency: 80 },
      { name: 'Verilog / System Verilog', category: 'Languages', proficiency: 75 },
      { name: 'HTML', category: 'Languages', proficiency: 90 },
      { name: 'Digital Electronics', category: 'Electronics & Hardware', proficiency: 85 },
      { name: 'Embedded Systems', category: 'Electronics & Hardware', proficiency: 80 },
      { name: 'PCB Design', category: 'Electronics & Hardware', proficiency: 75 },
      { name: 'FPGA', category: 'Electronics & Hardware', proficiency: 70 },
      { name: 'Microcontrollers', category: 'Electronics & Hardware', proficiency: 80 },
      { name: 'Sensor Integration', category: 'Electronics & Hardware', proficiency: 75 },
      { name: 'Xilinx Vivado', category: 'Tools', proficiency: 80 },
      { name: 'KiCad', category: 'Tools', proficiency: 75 },
      { name: 'MATLAB', category: 'Tools', proficiency: 70 },
      { name: 'LTSpice', category: 'Tools', proficiency: 80 },
      { name: 'Arduino IDE', category: 'Tools', proficiency: 85 },
    ];

    for (const skill of mockSkills) {
      await Skill.updateOne(
        { name: skill.name },
        { $set: skill },
        { upsert: true }
      );
    }
    console.log('Skills seeded successfully without duplicates');

    // Seed Experience
    const Experience = require('./models/Experience');
    const mockExperience = [
      {
        company: 'Project / Research Experience',
        role: 'Electronics & Algorithm Developer',
        startDate: '2025-01-01',
        endDate: '2025-05-01',
        description: 'Gained hands-on exposure to electronics prototyping and innovation workflows. Built a Python engine for Sun-Moon angular separation. Applied spherical trigonometry and Haversine formulas for coordinates. Used ephemeris libraries for geolocation and refraction adjustments, and benchmarked results against astronomical datasets to ensure precision.'
      }
    ];

    for (const exp of mockExperience) {
      await Experience.updateOne(
        { company: exp.company, role: exp.role },
        { $set: exp },
        { upsert: true }
      );
    }
    console.log('Experience seeded successfully without duplicates');

    // Seed Education
    const Education = require('./models/Education');
    const mockEducation = [
      {
        institution: 'NMAM Institute of Technology, Nitte, Karnataka',
        degree: 'BTech in Electronics and Communication Engineering',
        startDate: '2024-07-01',
        endDate: '2028-09-01',
        description: 'Currently pursuing B.Tech in ECE.'
      }
    ];

    for (const edu of mockEducation) {
      await Education.updateOne(
        { institution: edu.institution, degree: edu.degree },
        { $set: edu },
        { upsert: true }
      );
    }
    console.log('Education seeded successfully without duplicates');

    // Seed Certifications
    const Certification = require('./models/Certification');
    const mockCertifications = [
      { title: 'MATLAB Onramp', issuer: 'Mathworks', date: 'Jan 2026' },
      { title: 'C for Everyone', issuer: 'University of Michigan, Coursera', date: 'Aug 2024' }
    ];

    for (const cert of mockCertifications) {
      await Certification.updateOne(
        { title: cert.title, issuer: cert.issuer },
        { $set: cert },
        { upsert: true }
      );
    }
    console.log('Certifications seeded successfully without duplicates');

    // Seed Achievements
    const Achievement = require('./models/Achievement');
    const mockAchievements = [
      { title: 'Sub Core Member at EPC Club', description: 'Designed and built a Line follower robot. (Nitte, India | 2024 - 2025)' },
      { title: 'Blood Donation Volunteer', description: 'Actively participated in Blood donation camps and community service initiatives. (Nitte, India | July 2025)' }
    ];

    for (const ach of mockAchievements) {
      await Achievement.updateOne(
        { title: ach.title },
        { $set: ach },
        { upsert: true }
      );
    }
    console.log('Achievements seeded successfully without duplicates');

    // Seed Admin User
    const User = require('./models/User');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ username: 'shreyasadmin' });
    if (!adminExists) {
      await User.create({
        username: 'shreyasadmin',
        password: 'adminpassword123'
      });
      console.log('Admin user seeded successfully');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
