import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Resume, ResumeFormData } from '@/types/resume'
import { PersonalInfoForm } from './forms/PersonalInfoForm'
import { EducationForm } from './forms/EducationForm'
import { WorkExperienceForm } from './forms/WorkExperienceForm'
import { SkillsForm } from './forms/SkillsForm'
import { ProjectsForm } from './forms/ProjectsForm'
import { CertificationsForm } from './forms/CertificationsForm'
import { TemplateSelector } from './TemplateSelector'
import { Eye } from 'lucide-react'

interface ResumeBuilderProps {
  resume: Resume | null
  onResumeUpdate: (resume: ResumeFormData) => void
  onPreview: () => void
}

export function ResumeBuilder({ resume, onResumeUpdate, onPreview }: ResumeBuilderProps) {
  const [formData, setFormData] = useState<ResumeFormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
      summary: ''
    },
    education: [],
    workExperience: [],
    skills: [],
    projects: [],
    certifications: [],
    template: 'modern'
  })

  useEffect(() => {
    if (resume) {
      setFormData({
        personalInfo: resume.personalInfo,
        education: resume.education,
        workExperience: resume.workExperience,
        skills: resume.skills,
        projects: resume.projects,
        certifications: resume.certifications,
        template: resume.template
      })
    }
  }, [resume])

  const updateFormData = (section: keyof ResumeFormData, data: any) => {
    const updatedData = { ...formData, [section]: data }
    setFormData(updatedData)
    onResumeUpdate(updatedData)
  }

  const isFormValid = () => {
    return formData.personalInfo.fullName && 
           formData.personalInfo.email && 
           formData.personalInfo.phone
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Build Your Professional Resume</h2>
        <p className="text-gray-600">Fill out the sections below to create your personalized resume</p>
      </div>

      <div className="grid gap-8">
        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Template</CardTitle>
          </CardHeader>
          <CardContent>
            <TemplateSelector
              selectedTemplate={formData.template}
              onTemplateChange={(template) => updateFormData('template', template)}
            />
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalInfoForm
              data={formData.personalInfo}
              onChange={(data) => updateFormData('personalInfo', data)}
            />
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkExperienceForm
              data={formData.workExperience}
              onChange={(data) => updateFormData('workExperience', data)}
            />
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <EducationForm
              data={formData.education}
              onChange={(data) => updateFormData('education', data)}
            />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsForm
              data={formData.skills}
              onChange={(data) => updateFormData('skills', data)}
            />
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsForm
              data={formData.projects}
              onChange={(data) => updateFormData('projects', data)}
            />
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <CertificationsForm
              data={formData.certifications}
              onChange={(data) => updateFormData('certifications', data)}
            />
          </CardContent>
        </Card>

        {/* Preview Button */}
        <div className="flex justify-center">
          <Button
            onClick={onPreview}
            disabled={!isFormValid()}
            size="lg"
            className="flex items-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>Preview Resume</span>
          </Button>
        </div>
      </div>
    </div>
  )
}