import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkExperience } from '@/types/resume'
import { Plus, Trash2, GripVertical } from 'lucide-react'

interface WorkExperienceFormProps {
  data: WorkExperience[]
  onChange: (data: WorkExperience[]) => void
}

export function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const [achievements, setAchievements] = useState<{ [key: string]: string }>({})

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: []
    }
    onChange([...data, newExperience])
  }

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id))
  }

  const addAchievement = (expId: string) => {
    const achievementText = achievements[expId]?.trim()
    if (!achievementText) return

    const experience = data.find(exp => exp.id === expId)
    if (experience) {
      updateExperience(expId, 'achievements', [...experience.achievements, achievementText])
      setAchievements({ ...achievements, [expId]: '' })
    }
  }

  const removeAchievement = (expId: string, index: number) => {
    const experience = data.find(exp => exp.id === expId)
    if (experience) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index)
      updateExperience(expId, 'achievements', newAchievements)
    }
  }

  return (
    <div className="space-y-6">
      {data.map((experience, index) => (
        <Card key={experience.id} className="relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate || ''}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  placeholder="Leave empty if current position"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                placeholder="Describe your role and responsibilities..."
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Key Achievements</Label>
              {experience.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center space-x-2">
                  <div className="flex-1 text-sm bg-gray-50 p-2 rounded">
                    {achievement}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAchievement(experience.id, achIndex)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex space-x-2">
                <Input
                  value={achievements[experience.id] || ''}
                  onChange={(e) => setAchievements({ 
                    ...achievements, 
                    [experience.id]: e.target.value 
                  })}
                  placeholder="Add a key achievement..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addAchievement(experience.id)
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addAchievement(experience.id)}
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
        onClick={addExperience}
        className="w-full flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Work Experience</span>
      </Button>
    </div>
  )
}