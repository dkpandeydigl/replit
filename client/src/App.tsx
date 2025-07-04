import React, { useState } from 'react'
import { ResumeBuilder } from './components/ResumeBuilder'
import { ResumePreview } from './components/ResumePreview'
import { Header } from './components/Header'
import { Resume, ResumeFormData } from './types/resume'

function App() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [currentView, setCurrentView] = useState<'builder' | 'preview'>('builder')

  const handleResumeUpdate = (resumeData: ResumeFormData) => {
    const updatedResume: Resume = {
      ...resumeData,
      id: resume?.id || Date.now().toString(),
      createdAt: resume?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setResume(updatedResume)
  }

  const handleViewChange = (view: 'builder' | 'preview') => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
        hasResume={!!resume}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'builder' ? (
          <ResumeBuilder 
            resume={resume}
            onResumeUpdate={handleResumeUpdate}
            onPreview={() => setCurrentView('preview')}
          />
        ) : (
          <ResumePreview 
            resume={resume}
            onEdit={() => setCurrentView('builder')}
          />
        )}
      </main>
    </div>
  )
}

export default App