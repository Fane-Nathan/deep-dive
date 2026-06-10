export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'mobile' | 'ai-ml' | 'systems';
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  features: string[];
  imageUrl: string;
  academicContext?: string; // e.g., COMP6047 Software Engineering Project
}

export interface Course {
  code: string;
  name: string;
  semester: number;
  credits: number;
  grade: string;
  description: string;
  skillsAcquired: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'data-science' | 'management' | 'core';
}

export interface EnrichmentTrack {
  id: string;
  title: string;
  description: string;
  duration: string;
  partnerCompany?: string;
  role?: string;
  keyResponsibilities: string[];
  outcomes: string[];
  iconName: string;
}

export interface AcademicTimeline {
  year: string;
  semesterText: string;
  gpa: number;
  achievements: string[];
}
