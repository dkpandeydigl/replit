import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skill } from '@/types/resume'
import { Plus, Trash2, Tag } from 'lucide-react'

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'technical' as Skill['category'],
    level: 'intermediate' as Skill['level']
  })

  const addSkill = () => {
    if (!newSkill.name.trim()) return

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level
    }

    onChange([...data, skill])
    setNewSkill({ name: '', category: 'technical', level: 'intermediate' })
  }

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id))
  }

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(data.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ))
  }

  const skillsByCategory = data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Languages',
    other: 'Other Skills'
  }

  const levelColors = {
    beginner: 'bg-red-100 text-red-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-blue-100 text-blue-800',
    expert: 'bg-green-100 text-green-800'
  }

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-2">
          <Label>Skill Name</Label>
          <Input
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="JavaScript, Leadership, etc."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addSkill()
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={newSkill.category}
            onValueChange={(value: Skill['category']) => 
              setNewSkill({ ...newSkill, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="soft">Soft Skills</SelectItem>
              <SelectItem value="language">Languages</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Level</Label>
          <Select
            value={newSkill.level}
            onValueChange={(value: Skill['level']) => 
              setNewSkill({ ...newSkill, level: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={addSkill} className="w-full flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Tag className="h-5 w-5" />
              <span>{categoryLabels[category as keyof typeof categoryLabels]}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium">{skill.name}</div>
                    {skill.level && (
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                        levelColors[skill.level] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Tag className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  )
}