import React from 'react'
import { Button } from '@/components/ui/button'
import { Resume } from '@/types/resume'
import { formatDateRange } from '@/lib/utils'
import { Edit3, Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, Award } from 'lucide-react'

interface ResumePreviewProps {
  resume: Resume | null
  onEdit: () => void
}

export function ResumePreview({ resume, onEdit }: ResumePreviewProps) {
  if (!resume) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No resume data available</p>
        <Button onClick={onEdit} variant="outline">
          Go to Builder
        </Button>
      </div>
    )
  }

  const { personalInfo, education, workExperience, skills, projects, certifications } = resume

  const getTemplateStyles = () => {
    switch (resume.template) {
      case 'modern':
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white',
          accent: 'text-blue-600 border-blue-600',
          section: 'border-l-4 border-blue-600'
        }
      case 'classic':
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-gray-800 text-white',
          accent: 'text-gray-700 border-gray-700',
          section: 'border-l-4 border-gray-700'
        }
      case 'minimal':
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-gray-50 text-gray-900 border-b-2 border-gray-200',
          accent: 'text-gray-600 border-gray-600',
          section: 'border-l-4 border-gray-400'
        }
      case 'creative':
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          accent: 'text-purple-600 border-purple-600',
          section: 'border-l-4 border-purple-600'
        }
      default:
        return {
          container: 'bg-white text-gray-900',
          header: 'bg-blue-600 text-white',
          accent: 'text-blue-600 border-blue-600',
          section: 'border-l-4 border-blue-600'
        }
    }
  }

  const styles = getTemplateStyles()

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Controls */}
      <div className="no-print mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <div className="flex space-x-4">
          <Button onClick={onEdit} variant="outline" className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4" />
            <span>Edit Resume</span>
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className={`print-page shadow-lg ${styles.container}`}>
        {/* Header */}
        <header className={`p-8 ${styles.header}`}>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            {personalInfo.email && (
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-1">
                <Linkedin className="h-4 w-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center space-x-1">
                <Github className="h-4 w-4" />
                <span>{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Work Experience</h2>
              <div className="space-y-6">
                {workExperience.map((exp) => (
                  <div key={exp.id} className={`pl-4 ${styles.section}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <p className="text-lg text-gray-700">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-600 md:text-right">
                        <p>{formatDateRange(exp.startDate, exp.endDate)}</p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className={`pl-4 ${styles.section}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-lg text-gray-700">{edu.institution}</p>
                        {edu.field && <p className="text-gray-600">{edu.field}</p>}
                        {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{formatDateRange(edu.startDate, edu.endDate)}</p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Skills</h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-2 capitalize">{category} Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {skill.name}
                          {skill.level && ` (${skill.level})`}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className={`pl-4 ${styles.section}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <div className="flex space-x-4 mt-1">
                          {project.link && (
                            <a href={project.link} className="text-blue-600 hover:underline text-sm flex items-center space-x-1">
                              <ExternalLink className="h-3 w-3" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {project.github && (
                            <a href={project.github} className="text-blue-600 hover:underline text-sm flex items-center space-x-1">
                              <Github className="h-3 w-3" />
                              <span>GitHub</span>
                            </a>
                          )}
                        </div>
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="text-sm text-gray-600">
                          <p>{formatDateRange(project.startDate!, project.endDate)}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className={`text-2xl font-bold mb-4 ${styles.accent}`}>Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className={`pl-4 ${styles.section}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold flex items-center space-x-2">
                          <Award className="h-5 w-5" />
                          <span>{cert.name}</span>
                        </h3>
                        <p className="text-lg text-gray-700">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="text-gray-600 text-sm">Credential ID: {cert.credentialId}</p>
                        )}
                        {cert.url && (
                          <a href={cert.url} className="text-blue-600 hover:underline text-sm flex items-center space-x-1 mt-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>Verify</span>
                          </a>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Issued: {formatDateRange(cert.date, null).split(' - ')[0]}</p>
                        {cert.expiryDate && (
                          <p>Expires: {formatDateRange(cert.expiryDate, null).split(' - ')[0]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}