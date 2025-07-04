import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/types/resume'
import { Plus, Trash2, GripVertical, ExternalLink, Github } from 'lucide-react'

interface ProjectsFormProps {
  data: Project[]
  onChange: (data: Project[]) => void
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [technologies, setTechnologies] = useState<{ [key: string]: string }>({})

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    }
    onChange([...data, newProject])
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ))
  }

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id))
  }

  const addTechnology = (projectId: string) => {
    const techText = technologies[projectId]?.trim()
    if (!techText) return

    const project = data.find(p => p.id === projectId)
    if (project) {
      updateProject(projectId, 'technologies', [...project.technologies, techText])
      setTechnologies({ ...technologies, [projectId]: '' })
    }
  }

  const removeTechnology = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId)
    if (project) {
      const newTechnologies = project.technologies.filter((_, i) => i !== index)
      updateProject(projectId, 'technologies', newTechnologies)
    }
  }

  return (
    <div className="space-y-6">
      {data.map((project, index) => (
        <Card key={project.id} className="relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <CardTitle className="text-lg">Project {index + 1}</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="My Awesome Project"
                />
              </div>
              <div className="space-y-2">
                <Label>Live Demo URL</Label>
                <div className="relative">
                  <Input
                    value={project.link || ''}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="https://myproject.com"
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>GitHub Repository</Label>
                <div className="relative">
                  <Input
                    value={project.github || ''}
                    onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                  <Github className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="month"
                    value={project.startDate || ''}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    placeholder="Start"
                  />
                  <Input
                    type="month"
                    value={project.endDate || ''}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    placeholder="End (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe what this project does, your role, and the impact it had..."
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    <span>{tech}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTechnology(project.id, techIndex)}
                      className="h-4 w-4 p-0 text-blue-600 hover:text-blue-800"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={technologies[project.id] || ''}
                  onChange={(e) => setTechnologies({ 
                    ...technologies, 
                    [project.id]: e.target.value 
                  })}
                  placeholder="React, Node.js, Python, etc."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTechnology(project.id)
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addTechnology(project.id)}
                  size="sm"
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Project</span>
      </Button>
    </div>
  )
}