import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Eye, Edit3, Download } from 'lucide-react'

interface HeaderProps {
  currentView: 'builder' | 'preview'
  onViewChange: (view: 'builder' | 'preview') => void
  hasResume: boolean
}

export function Header({ currentView, onViewChange, hasResume }: HeaderProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>

          <nav className="flex items-center space-x-4">
            <Button
              variant={currentView === 'builder' ? 'default' : 'outline'}
              onClick={() => onViewChange('builder')}
              className="flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>Builder</span>
            </Button>

            <Button
              variant={currentView === 'preview' ? 'default' : 'outline'}
              onClick={() => onViewChange('preview')}
              disabled={!hasResume}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>

            {currentView === 'preview' && hasResume && (
              <Button
                onClick={handlePrint}
                className="flex items-center space-x-2"
                variant="secondary"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}