import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Certification } from '@/types/resume'
import { Plus, Trash2, GripVertical, Award, ExternalLink } from 'lucide-react'

interface CertificationsFormProps {
  data: Certification[]
  onChange: (data: Certification[]) => void
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    }
    onChange([...data, newCertification])
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ))
  }

  const removeCertification = (id: string) => {
    onChange(data.filter(cert => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      {data.map((certification, index) => (
        <Card key={certification.id} className="relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Certification {index + 1}</span>
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCertification(certification.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Certification Name *</Label>
                <Input
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <Label>Issuing Organization *</Label>
                <Input
                  value={certification.issuer}
                  onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="space-y-2">
                <Label>Issue Date *</Label>
                <Input
                  type="month"
                  value={certification.date}
                  onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="month"
                  value={certification.expiryDate || ''}
                  onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
                  placeholder="Leave empty if never expires"
                />
              </div>
              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input
                  value={certification.credentialId || ''}
                  onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                  placeholder="ABC123456789"
                />
              </div>
              <div className="space-y-2">
                <Label>Verification URL</Label>
                <div className="relative">
                  <Input
                    value={certification.url || ''}
                    onChange={(e) => updateCertification(certification.id, 'url', e.target.value)}
                    placeholder="https://verify.example.com/123456"
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addCertification}
        className="w-full flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Certification</span>
      </Button>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No certifications added yet. Add professional certifications to boost your resume!</p>
        </div>
      )}
    </div>
  )
}