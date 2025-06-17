#!/bin/bash

# Create standalone TNF 2025 Dashboard Repository
echo "🏈 Creating TNF 2025 Dashboard Repository..."

# Create new directory structure
mkdir -p ../tnf-2025-dashboard-standalone
cd ../tnf-2025-dashboard-standalone

# Initialize git repository
git init
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore

# Copy TNF dashboard files
cp -r ../webapp-universal-template/tnf-2025-dashboard/* .

# Create package.json for the standalone repo
cat > package.json << 'EOF'
{
  "name": "tnf-2025-dashboard",
  "version": "1.0.0",
  "description": "Interactive TNF 2025 Partnership Proposal Dashboard for Kargo × Amazon Prime Video",
  "main": "index.html",
  "scripts": {
    "dev": "python3 -m http.server 8000",
    "build": "echo 'Static site - no build needed'",
    "deploy": "echo 'Deploy to GitHub Pages via Actions'"
  },
  "keywords": [
    "TNF",
    "Thursday Night Football",
    "Amazon Prime Video",
    "Kargo",
    "Interactive Dashboard",
    "Advertising",
    "Proposal"
  ],
  "author": "Kargo Sales Team",
  "license": "MIT"
}
EOF

# Create README.md
cat > README.md << 'EOF'
# TNF 2025 Partnership Proposal Dashboard

🏈 **Interactive proposal dashboard for Thursday Night Football 2025 season partnership between Kargo and Amazon Prime Video**

## 🚀 Live Demo

**[View Live Dashboard](https://YOUR_USERNAME.github.io/tnf-2025-dashboard/)**

## 📊 Dashboard Features

### Interactive Sections
- **Campaign Overview**: Strategic positioning and key metrics
- **Creative Suite**: Dynamic creative strategy with live integration demos
- **Ad Formats**: Premium Kargo format showcase (Venti, Runway, Hover, Outstream, CTV)
- **Campaign Timeline**: 16-week game schedule with special events
- **Audience Targeting**: Precise viewer segmentation and insights
- **Investment Tiers**: Flexible partnership options ($500K - $2M+)

### Technical Highlights
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Charts**: Real-time data visualizations
- **Premium Animations**: Smooth transitions and loading effects
- **Live Creative Demos**: Pre-game, live, and post-game creative examples
- **Professional Branding**: Amazon Prime Video × Kargo color scheme

## 🎯 Campaign Strategy

### Key Positioning
- **Exclusive Partnership**: Only place to watch TNF
- **Premium Inventory**: Direct partnership, not RTB
- **Multi-Platform**: Mobile, Desktop, CTV, Tablet
- **Live Integration**: Real-time score and stat updates
- **High-Impact Formats**: Industry-leading creative executions

### Target Audiences
- **TNF Avid Fans**: 2.3M highly engaged viewers
- **TNF Enthusiasts**: 4.1M regular watchers  
- **Prime Video Sports**: 8.7M sports streamers
- **Fantasy Players**: 6.2M active participants
- **Team Loyalists**: 12.4M passionate fans

## 🛠️ Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/tnf-2025-dashboard.git
cd tnf-2025-dashboard

# Start local server
python3 -m http.server 8000

# Open browser
open http://localhost:8000
```

## 📈 Investment Tiers

### Touchdown ($500K)
- 3 Premium Formats
- 8 Game Coverage
- Standard Targeting

### Field Goal ($1M)
- 5 Premium Formats
- Full Season Coverage
- Advanced Targeting
- Custom Creative

### Championship ($2M+)
- All Formats
- Exclusive Placements
- First-Party Data
- Dedicated Team
- Real-time Optimization

## 🎨 Creative Strategy

### Phase-Based Approach
1. **Pre-Game Build-Up** (Tue-Wed): Player spotlights, team stats
2. **Game Day Hype** (Thu AM): Live countdown, key matchups
3. **Live Experience** (Thu PM): Real-time scores, highlights

### Format Integration
- **Venti Video**: Full-screen premium video experience
- **Runway**: High-impact display with cinematic transitions
- **Hover**: User-initiated rich media expansion
- **Outstream**: Native video within editorial content
- **Connected TV**: Premium large-screen experience

## 📱 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for data visualization
- **Animations**: GSAP for premium transitions
- **Responsive**: CSS Grid & Flexbox
- **Deployment**: GitHub Pages with Actions

## 🚀 Deployment

This dashboard automatically deploys to GitHub Pages via GitHub Actions on every push to the main branch.

## 📞 Contact

**Kargo Sales Team**
- Ready to discuss your TNF 2025 partnership
- Custom proposals available
- Dedicated account management

---

*Built with ❤️ for the 2025 Thursday Night Football season*
EOF

# Create GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy TNF Dashboard to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# Initial commit
git add .
git commit -m "feat: initial TNF 2025 interactive partnership proposal dashboard

🏈 Premium interactive dashboard for Thursday Night Football 2025 season
📊 Complete proposal presentation with 6 interactive sections
🎯 Strategic positioning for Kargo × Amazon Prime Video partnership
💰 Investment tiers from $500K to $2M+ with detailed breakdowns
📱 Responsive design optimized for client presentations
🎨 Professional animations and data visualizations
⚡ Live creative demos and real-time integration examples

Ready for GitHub Pages deployment and client presentations.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "✅ TNF 2025 Dashboard Repository Created Successfully!"
echo ""
echo "📁 Location: ../tnf-2025-dashboard-standalone/"
echo ""
echo "🔗 Next Steps:"
echo "1. cd ../tnf-2025-dashboard-standalone"
echo "2. Create GitHub repository: https://github.com/new"
echo "3. git remote add origin https://github.com/YOUR_USERNAME/tnf-2025-dashboard.git"
echo "4. git branch -M main"
echo "5. git push -u origin main"
echo "6. Enable GitHub Pages in repository settings"
echo ""
echo "🚀 Your dashboard will be live at:"
echo "https://YOUR_USERNAME.github.io/tnf-2025-dashboard/"
echo ""
echo "🎯 Features Ready:"
echo "• Interactive campaign overview with animated metrics"
echo "• Creative suite with live demo integration"
echo "• Premium ad format showcase"
echo "• 16-week campaign timeline"
echo "• Audience targeting visualization"
echo "• Investment tier comparison"
echo "• Responsive design for all devices"
echo "• Professional animations and charts"