# ResuMate

> AI-powered resume analysis and optimization for professionals

ResuMate is a modern web application that helps you sharpen your resume by providing instant ATS (Applicant Tracking System) scoring, actionable feedback, and AI-generated bullet rewrites. Built with a restrained editorial aesthetic inspired by Swiss design principles.

## Live Demo

[View Live Application](https://resumate.example.com)

## Features

### Core Functionality
- ATS Score Analysis - Get instant feedback on how well your resume matches ATS systems
- AI-Powered Rewrites - Leverage AI to generate stronger bullet points with quantified outcomes
- Keyword Optimization - Auto-match against job descriptions and identify missing keywords
- Version Control - Track all resume iterations with version history and score evolution
- Diff Comparison - See exactly what changed between versions line by line
- PDF Export - Export optimized resumes in ATS-friendly formats
- Analytics Dashboard - Track your resume improvement over time

### Design
- Swiss-Inspired Grid Layout - Minimalist editorial aesthetic with rigid structure
- Monochromatic Color Palette - Pure black and white with no gradients
- Serif Typography - Playfair Display for premium editorial feel
- Brutalist Minimalism - Thin borders, generous whitespace, no shadows
- Responsive Design - Optimized for desktop, tablet, and mobile

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (for backend)
- Google Gemini API key (for AI features)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yjhkdjsg/ResuMate.git
cd resumate
```

2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
resumate/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic (AI, PDF, parsing)
│   │   └── utils/           # Helper functions
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth, Theme, UI)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utility functions
│   │   └── styles/          # Global styles
│   ├── index.css            # Typography and theme variables
│   └── package.json
│
└── README.md
```

## Tech Stack

### Backend
- Runtime: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT
- AI: Google Gemini API
- File Processing: PDF parsing and generation
- Validation: Custom middleware

### Frontend
- Framework: React 19
- Build Tool: Vite
- Styling: Tailwind CSS with custom theme
- UI State: React Context + React Query
- Routing: React Router v7
- Forms: Controlled inputs with validation
- Charts: Recharts
- Icons: Lucide React
- Animations: Framer Motion

## API Documentation

### Authentication
```
POST /api/auth/register    - Create new account
POST /api/auth/login       - Sign in
```

### Resumes
```
GET  /api/resumes          - List all resumes
POST /api/resumes          - Upload new resume
GET  /api/resumes/:id      - Get resume details
DELETE /api/resumes/:id    - Delete resume
```

### Analysis
```
POST /api/resumes/:id/analyze  - Run ATS analysis
GET  /api/insights             - Get dashboard insights
```

### Versions
```
GET  /api/versions             - List all versions
POST /api/versions/:id/create  - Create new version
```

## Usage

### Upload & Analyze
1. Navigate to the Resumes page
2. Upload your resume (PDF format)
3. Wait for parsing and initial analysis
4. View your ATS score and recommendations

### Optimize
1. Review AI-generated bullet rewrites
2. Select the rewrites you want to apply
3. Create a new version with improvements
4. Compare versions side-by-side

### Track Progress
1. Visit the Dashboard
2. View your score evolution over time
3. Monitor keywords matched and issues resolved
4. Export optimized versions

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation on all endpoints
- Secure file upload handling

## Deployment

### Environment Variables

Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

Frontend (.env)
```
VITE_API_URL=your_backend_url
```

### Deployment Steps
```bash
# Build frontend
cd frontend
npm run build

# Backend ready for production
cd ../backend
npm run start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request