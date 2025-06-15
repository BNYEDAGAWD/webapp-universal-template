# Universal Web App Template for WSL Ubuntu

This is the master template for all Brandon's web app projects developed in WSL Ubuntu with Cursor and Claude Code.

## Quick Start

1. Create new project: `new-webapp project-name`
2. Open in Cursor: `cursor project-name`
3. Start coding - Claude automatically knows the standards!

## Features

- ✅ WSL Ubuntu optimized development environment
- ✅ Cursor IDE with Claude Code integration
- ✅ Responsive Bootstrap 5 design
- ✅ Google Apps Script backend integration
- ✅ Gemini AI integration ready
- ✅ Automated GitHub Pages deployment
- ✅ Mobile-first responsive approach

## Local Development

```bash
# Start local server
npm start
# or
python3 -m http.server 8000

# Visit: http://localhost:8000
```

## Deployment

Automatic deployment to GitHub Pages via GitHub Actions on every push to main.

## Google Apps Script Setup

1. Go to [script.google.com](https://script.google.com)
2. Create new project
3. Copy code from `google-apps-script/Code.gs`
4. Add Gemini API key to Script Properties:
   - Project Settings → Script Properties
   - Add: `GEMINI_API_KEY` = your API key
5. Deploy as web app
6. Update `appsScriptUrl` in `js/app.js`

## WSL Development Commands

- `new-webapp project-name` - Create new project
- `cursor .` - Open current directory in Cursor
- `serve-local` - Start local development server
- `deploy-webapp` - Quick deploy to GitHub

## AI Integration

- **Claude Code** for development assistance in Cursor
- **Gemini** for runtime AI features via Apps Script
- **Automatic template recognition** by Claude

Built for the ultimate WSL Ubuntu + Cursor + Claude Code development experience! 🚀
