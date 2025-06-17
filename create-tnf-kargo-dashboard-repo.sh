#!/bin/bash

# TNF 2025 Kargo Partnership Dashboard - GitHub Repository Setup and Deployment Script
# This script creates a new repository, builds the dashboard, and deploys to GitHub Pages

echo "🏈 TNF 2025 Kargo Partnership Dashboard - Repository Setup"
echo "========================================================="

# Configuration
REPO_NAME="tnf-2025-kargo-dashboard"
GITHUB_USERNAME=""
PROJECT_DIR="tnf-2025-kargo-dashboard"

# Check if GitHub username is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your GitHub username as an argument"
    echo "Usage: ./create-tnf-kargo-dashboard-repo.sh <github-username>"
    exit 1
fi

GITHUB_USERNAME=$1

# Create project directory
echo "📁 Creating project directory..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Initialize Git repository
echo "🔧 Initializing Git repository..."
git init

# Create project structure
echo "📂 Creating project structure..."
mkdir -p css js assets/images assets/icons data

# Create README.md
echo "📝 Creating README.md..."
cat > README.md << 'EOF'
# TNF 2025 Kargo Partnership Dashboard

A premium, interactive proposal presentation dashboard showcasing Kargo's partnership with Amazon Prime Video for Thursday Night Football streaming. This desktop-optimized experience positions Kargo as the preferred high-impact adtech partner for Amazon and Comfluence (Omnicom)'s 2025 TNF season.

## 🏈 Live Demo
[View Dashboard](https://<username>.github.io/tnf-2025-kargo-dashboard/)

## 🎯 Strategic Overview

**Partnership Structure:**
- **Proposing Partner:** Kargo (Preferred High-Impact Adtech Partner)
- **Agency Of Record:** Comfluence (Omnicom)
- **Client:** Amazon Prime Video
- **Product:** Thursday Night Football streaming exclusivity

## 💡 Key Features

- **Interactive Budget Allocation System** with 3-tier investment options
- **$1M Recommended Tier** with golden premium treatment
- **16-Week Campaign Flighting** with mathematical validation
- **Premium Ad Format Showcase** (HRBTO, Enhanced CTV, Runway, Spotlight)
- **4 Interactive Dashboard Views** with seamless transitions
- **Desktop-Optimized Design** for presentation environments

## 🚀 Technology Stack

- Vanilla JavaScript ES6+ with modular architecture
- Advanced CSS Grid and Flexbox layouts
- GSAP animations for premium interactions
- Chart.js for data visualizations
- Mathematical validation engine
- GitHub Pages deployment

## 📊 Investment Tiers

### 🏆 $1M Tier - RECOMMENDED
- HRBTO: $395K
- Enhanced CTV: $305K
- Runway: $300K

### 🥈 $600K Tier - Balanced
- CTV: $200K
- Spotlight: $200K
- Runway: $200K

### 🥉 $300K Tier - Foundation
- Runway: $150K
- Spotlight: $150K

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/<username>/tnf-2025-kargo-dashboard.git

# Navigate to project
cd tnf-2025-kargo-dashboard

# Open in browser
open index.html
```

## 📱 Browser Support

- Chrome 120+ (Primary)
- Safari 17+
- Edge 120+

## 🎨 Design System

- **Primary:** Deep Royal Blue (#0033A0)
- **Secondary:** Prime Blue (#00A8E1)
- **Accent:** NFL Silver (#C0C0C0)
- **Highlight:** Radiant Gold (#FFB612)
- **Background:** Rich Black (#0F1111)

## 📈 Performance Metrics

- Lighthouse Score: 95+
- Load Time: <2 seconds
- 60fps animations
- 4K display support

---

Built with ❤️ for Kargo's TNF 2025 Partnership Proposal
EOF

# Create .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
# OS Files
.DS_Store
Thumbs.db

# Editor Files
.vscode/
.idea/
*.swp
*.swo

# Dependencies
node_modules/

# Build Files
dist/
build/

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
EOF

# Create initial files placeholder
echo "📄 Creating initial project files..."
touch index.html
touch css/style.css
touch css/animations.css
touch css/responsive.css
touch js/app.js
touch js/data.js
touch js/charts.js
touch js/animations.js
touch js/validation.js

# Git initial commit
echo "📤 Creating initial commit..."
git add .
git commit -m "Initial commit: TNF 2025 Kargo Partnership Dashboard structure"

# Create GitHub repository (requires GitHub CLI)
echo "🌐 Creating GitHub repository..."
if command -v gh &> /dev/null; then
    gh repo create $REPO_NAME --public --source=. --remote=origin --push
else
    echo "⚠️  GitHub CLI not found. Please create repository manually:"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository named: $REPO_NAME"
    echo "3. Run these commands:"
    echo "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

# Setup GitHub Pages
echo "📋 Setting up GitHub Pages..."
git checkout -b gh-pages
git push origin gh-pages
git checkout main

echo ""
echo "✅ Repository setup complete!"
echo ""
echo "📍 Next Steps:"
echo "1. Complete the dashboard implementation"
echo "2. Push changes to main branch"
echo "3. Enable GitHub Pages in repository settings (Settings > Pages > Source: gh-pages)"
echo "4. Access your dashboard at: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "🏈 Let's build an amazing TNF partnership dashboard!"