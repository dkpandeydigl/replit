# Resume Builder App

A modern, responsive resume builder application built with React, TypeScript, and Tailwind CSS. Create professional resumes with multiple templates and export them as PDF.

## 🌟 Features

### Core Functionality
- **Multiple Templates**: Choose from Modern, Classic, Minimal, and Creative templates
- **Real-time Preview**: See your resume update in real-time as you fill out the forms
- **PDF Export**: Print or save your resume as PDF using browser's print functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Resume Sections
- **Personal Information**: Name, contact details, social links, professional summary
- **Work Experience**: Company, position, dates, achievements with bullet points
- **Education**: Institution, degree, field of study, GPA, dates
- **Skills**: Categorized skills (Technical, Soft Skills, Languages, Other) with proficiency levels
- **Projects**: Project descriptions, technologies used, links to demos and GitHub
- **Certifications**: Professional certifications with verification links

### User Experience
- **Form Validation**: Ensures required fields are filled before preview
- **Drag & Drop**: Reorder sections and entries (UI ready for future implementation)
- **Auto-save**: Local storage persistence (ready for database integration)
- **Template Switching**: Change templates and see instant preview updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (if you have it in version control)
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form state management
- **Framer Motion** - Animations (ready for future enhancements)

### Backend
- **Express.js** - Web server
- **CORS** - Cross-origin resource sharing
- **Node.js** - Runtime environment

### Build Tools
- **Vite** - Fast build tool and dev server
- **ESBuild** - Fast bundler
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 📂 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   ├── forms/      # Form components
│   │   │   ├── Header.tsx
│   │   │   ├── ResumeBuilder.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   └── TemplateSelector.tsx
│   │   ├── types/          # TypeScript type definitions
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # App entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/                 # Express backend
│   └── index.ts            # Server entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎨 Templates

### Modern Template
- Clean design with blue accent colors
- Gradient header background
- Perfect for tech professionals

### Classic Template
- Traditional black and white layout
- Professional and conservative
- Ideal for corporate environments

### Minimal Template
- Simple and clean design
- Gray color scheme
- Great for any industry

### Creative Template
- Bold purple/pink gradient
- Eye-catching design
- Perfect for creative professionals

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with side-by-side editing and preview
- **Tablet**: Stacked layout with easy navigation between builder and preview
- **Mobile**: Optimized forms and preview for small screens

## 🖨️ PDF Export

- Use the "Download PDF" button in preview mode
- Leverages browser's native print functionality
- Optimized print styles ensure clean PDF output
- Print-specific CSS removes navigation and adds proper page breaks

## 🔮 Future Enhancements

### Database Integration
- User accounts and authentication
- Save multiple resumes
- Cloud synchronization
- Resume sharing and collaboration

### Advanced Features
- **AI-powered suggestions**: Content recommendations based on job descriptions
- **ATS optimization**: Ensure resumes pass Applicant Tracking Systems
- **More templates**: Additional professional templates
- **Custom themes**: User-defined color schemes
- **Export options**: Word, LaTeX, and other formats

### Enhanced UX
- **Drag & drop reordering**: Rearrange sections and entries
- **Real-time collaboration**: Multiple users editing simultaneously
- **Import from LinkedIn**: Auto-populate from social profiles
- **Job-specific resumes**: Tailor resumes for specific job applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Vite** for the blazing fast build tool

---

**Made with ❤️ for job seekers everywhere**

Build your professional resume with confidence and land your dream job! 🚀