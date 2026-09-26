import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

import { 
  getProfile, 
  getSkills, 
  getProjects, 
  getExperience, 
  getEducation,
  getCertifications,
  getAchievements
} from '../services/portfolioService';

const Home = () => {
  const [data, setData] = useState({
    profile: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    achievements: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, skills, projects, experience, education, certifications, achievements] = await Promise.all([
          getProfile().catch(err => {
            console.error('Failed to fetch profile', err);
            return null;
          }),
          getSkills().catch(err => {
            console.error('Failed to fetch skills', err);
            return [];
          }),
          getProjects().catch(err => {
            console.error('Failed to fetch projects', err);
            return [];
          }),
          getExperience().catch(err => {
            console.error('Failed to fetch experience', err);
            return [];
          }),
          getEducation().catch(err => {
            console.error('Failed to fetch education', err);
            return [];
          }),
          getCertifications().catch(err => {
            console.error('Failed to fetch certifications', err);
            return [];
          }),
          getAchievements().catch(err => {
            console.error('Failed to fetch achievements', err);
            return [];
          })
        ]);
        
        setData({
          profile,
          skills,
          projects,
          experience,
          education,
          certifications,
          achievements,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching portfolio data", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-brand-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen text-gray-100">
      <Navbar profile={data.profile} />
      <main>
        <HeroSection profile={data.profile} />
        <AboutSection profile={data.profile} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection experience={data.experience} education={data.education} />
        <CertificationsSection certifications={data.certifications} achievements={data.achievements} />
        <ContactSection profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
};

export default Home;
