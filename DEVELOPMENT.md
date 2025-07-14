# 🛠️ Development Guide

## 🚀 Quick Setup

1. **Initial Setup** (run once):
   ```bash
   ./setup.sh
   ```

2. **Start Development Servers**:
   ```bash
   ./dev.sh
   ```

## 📁 Project Structure

```
BHABIT CBMOONERS 2/
├── 📄 README.md              # Main documentation
├── 🔧 setup.sh              # One-time setup script
├── 🚀 dev.sh                # Development server starter
├── 📦 start_app.sh          # Production starter
├── ☁️ vercel.json           # Vercel deployment config
├── 🐍 backend/              # Python Flask API
│   ├── app.py               # Main Flask application
│   ├── config.py            # Configuration management
│   ├── requirements.txt     # Python dependencies
│   ├── health_endpoint.py   # Health check endpoint
│   ├── utils.py             # Utility functions
│   ├── logging_config.py    # Logging configuration
│   ├── test_app.py          # Backend tests
│   ├── Dockerfile           # Docker configuration
│   └── 📄 package.json      # Node.js dependencies
├── 🎨 frontend/             # React + Vite frontend
│   ├── 📄 package.json      # Dependencies and scripts
│   ├── 🎨 index.html        # HTML template
│   ├── 🎨 index.css         # Global styles
│   ├── ⚙️ vite.config.js    # Vite configuration
│   ├── 🎨 tailwind.config.js # Tailwind CSS config
│   ├── ⚙️ postcss.config.cjs # PostCSS configuration
│   ├── 📁 public/           # Static assets
│   │   ├── 🖼️ bhabit-logo.png
│   │   └── 🖼️ ...           # Other images
│   └── 📁 src/              # Source code
│       ├── 📄 main.jsx      # React entry point
│       ├── 📄 App.jsx       # Main App component
│       ├── 📄 api.js        # API integration
│       ├── 📁 components/   # React components
│       │   ├── GainersTable.jsx
│       │   ├── LosersTable.jsx
│       │   ├── TopBannerScroll.jsx
│       │   └── BottomBannerScroll.jsx
│       └── 📁 utils/        # Utility functions
│           └── formatters.js
└── 🗂️ .venv/               # Python virtual environment
```

## 🔧 Development Workflow

### Backend Development

1. **Activate virtual environment**:
   ```bash
   source .venv/bin/activate
   ```

2. **Run backend server**:
   ```bash
   cd backend
   python app.py
   ```

3. **Run tests**:
   ```bash
   cd backend
   pytest
   ```

4. **Add new dependencies**:
   ```bash
   pip install package_name
   pip freeze > requirements.txt
   ```

### Frontend Development

1. **Start development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Build for production**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Preview production build**:
   ```bash
   cd frontend
   npm run preview
   ```

4. **Add new dependencies**:
   ```bash
   cd frontend
   npm install package_name
   ```

## 🔗 API Endpoints

### Health & Status
- `GET /api` - API health check
- `GET /health` - Application health status

### Market Data
- `GET /api/gainers` - Top cryptocurrency gainers
- `GET /api/losers` - Top cryptocurrency losers  
- `GET /api/gainers-1min` - 1-minute timeframe gainers

## 🌐 Environment Variables

### Backend (.env.development)
```env
FLASK_ENV=development
FLASK_DEBUG=True
API_RATE_LIMIT=100
SENTRY_DSN=your_sentry_dsn_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
```

## 🚀 Deployment

### Frontend (Vercel)
- Automatically deploys from main branch
- Build command: `cd frontend && npm run build`
- Output directory: `frontend/dist`

### Backend (Render)
- Automatically deploys from main branch
- Build command: `pip install -r backend/requirements.txt`
- Start command: `cd backend && gunicorn app:app`

## 🧪 Testing

### Backend Tests
```bash
source .venv/bin/activate
cd backend
pytest -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🐛 Debugging

### Common Issues

1. **Port already in use**:
   ```bash
   lsof -ti:5001 | xargs kill -9  # Kill backend
   lsof -ti:5173 | xargs kill -9  # Kill frontend
   ```

2. **Dependencies not found**:
   ```bash
   ./setup.sh  # Re-run setup
   ```

3. **CORS errors**:
   - Check that both servers are running
   - Verify API_URL in frontend .env

### Logs

- **Backend logs**: Check terminal running `python app.py`
- **Frontend logs**: Check browser console (F12)
- **Build logs**: Check Vercel/Render dashboards

## 🎨 Styling Guide

### Tailwind CSS Classes
- Use utility classes for styling
- Follow mobile-first responsive design
- Use custom animations from `tailwindcss-animate`

### Component Structure
```jsx
// Component template
import React, { useState, useEffect } from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return (
    <div className="tailwind-classes">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---
*Happy coding! 🐰*
