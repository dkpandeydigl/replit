import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'classic' | 'minimal' | 'creative'
  onTemplateChange: (template: 'modern' | 'classic' | 'minimal' | 'creative') => void
}

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean and contemporary design with accent colors',
    preview: '🎨'
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: '📄'
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Simple and elegant design',
    preview: '✨'
  },
  {
    id: 'creative' as const,
    name: 'Creative',
    description: 'Bold and unique layout for creative professionals',
    preview: '🎭'
  }
]

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onTemplateChange(template.id)}
        >
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">{template.preview}</div>
            <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}