import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')))

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resume Builder API is running' })
})

// Resume routes (for future database integration)
app.get('/api/resumes', (req, res) => {
  // TODO: Implement database integration
  res.json([])
})

app.post('/api/resumes', (req, res) => {
  // TODO: Implement database integration
  const resume = req.body
  res.json({ id: Date.now().toString(), ...resume })
})

app.put('/api/resumes/:id', (req, res) => {
  // TODO: Implement database integration
  const { id } = req.params
  const resume = req.body
  res.json({ id, ...resume })
})

app.delete('/api/resumes/:id', (req, res) => {
  // TODO: Implement database integration
  const { id } = req.params
  res.json({ message: `Resume ${id} deleted` })
})

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Resume Builder server running on port ${PORT}`)
  console.log(`📝 Open http://localhost:${PORT} to view the app`)
})