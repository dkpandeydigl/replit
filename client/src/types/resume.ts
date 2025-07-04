export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  website?: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  gpa?: string
  description?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'other'
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  startDate?: string
  endDate?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Resume {
  id?: string
  personalInfo: PersonalInfo
  education: Education[]
  workExperience: WorkExperience[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  template: 'modern' | 'classic' | 'minimal' | 'creative'
  createdAt?: string
  updatedAt?: string
}

export interface ResumeFormData extends Omit<Resume, 'id' | 'createdAt' | 'updatedAt'> {}