class TNFDashboard {
    constructor() {
        this.currentView = 'overview';
        this.selectedTier = 1;
        this.selectedWeek = null;
        this.selectedFormat = null;
        this.animationEnabled = true;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.validateDependencies();
        this.setupDOM();
        this.createDashboard();
        this.bindEvents();
        this.initializeView();
        this.hideLoadingScreen();
        this.isInitialized = true;
    }

    validateDependencies() {
        const dependencies = ['tnfData', 'chartManager', 'animationManager'];
        const missing = dependencies.filter(dep => typeof window[dep] === 'undefined');
        
        if (missing.length > 0) {
            console.error('Missing dependencies:', missing);
        }
    }

    setupDOM() {
        this.root = document.getElementById('root');
        if (!this.root) {
            console.error('Root element not found');
            return;
        }
        this.root.innerHTML = this.getInitialHTML();
    }

    getInitialHTML() {
        return `
            <div class="loading-screen" id="loadingScreen">
                <div class="loading-content">
                    <div class="loading-logo">
                        <div class="loading-ring"></div>
                        <div class="loading-icon">🏈</div>
                    </div>
                    <h2>TNF 2025 Dashboard</h2>
                    <p>Loading Premium Partnership Experience...</p>
                </div>
            </div>

            <nav class="navigation">
                <div class="container">
                    <div class="nav-content">
                        <div class="nav-logo">
                            <span class="nav-logo-icon">🏈</span>
                            <span class="nav-logo-text">TNF 2025</span>
                        </div>
                        <ul class="nav-tabs">
                            <li><button class="nav-tab active" data-view="overview">Campaign Overview</button></li>
                            <li><button class="nav-tab" data-view="weekly-flighting">Weekly Flighting</button></li>
                            <li><button class="nav-tab" data-view="format-portfolio">Format Portfolio</button></li>
                            <li><button class="nav-tab" data-view="messaging-strategy">Messaging Strategy</button></li>
                            <li><button class="nav-tab" data-view="investment-tiers">Investment Tiers</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="main-content">
                <div class="container">
                    <div id="viewContainer" class="view-container">
                        ${this.getViewHTML('overview')}
                    </div>
                </div>
            </main>

            <footer class="dashboard-footer">
                <div class="container">
                    <div class="footer-content">
                        <p>&copy; 2025 Kargo Partnership Dashboard - Amazon Prime Video TNF</p>
                        <div class="footer-metrics">
                            <span data-metric="45" data-format="millions">45M+</span> Reach | 
                            <span data-metric="450" data-format="millions">450M+</span> Impressions | 
                            <span data-metric="98" data-format="percentage">98%+</span> Viewability
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    getViewHTML(viewName) {
        const views = {
            'overview': this.getOverviewHTML(),
            'weekly-flighting': this.getWeeklyFlightingHTML(),
            'format-portfolio': this.getFormatPortfolioHTML(),
            'messaging-strategy': this.getMessagingStrategyHTML(),
            'investment-tiers': this.getInvestmentTiersHTML()
        };

        return `<div class="tnf-view" data-view="${viewName}">${views[viewName] || ''}</div>`;
    }

    getOverviewHTML() {
        return `
            <div class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Thursday Night Football 2025</h1>
                    <p class="hero-subtitle">Kargo × Amazon Prime Video Strategic Partnership</p>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number" data-metric="16">16</span>
                            <span class="stat-label">Premium Weeks</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-metric="45" data-format="millions">45M+</span>
                            <span class="stat-label">Unique Viewers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-metric="450" data-format="millions">450M+</span>
                            <span class="stat-label">Premium Impressions</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" data-metric="98" data-format="percentage">98%+</span>
                            <span class="stat-label">Viewability</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="overview-grid">
                <div class="overview-card strategic-position">
                    <h3>Strategic Positioning</h3>
                    <p>Position Kargo as Amazon's preferred high-impact partner for TNF advertising campaigns with exclusive streaming rights and premium inventory access.</p>
                    <ul class="advantage-list">
                        <li>Exclusive TNF streaming rights create premium opportunity</li>
                        <li>Multi-format approach maximizes reach and engagement</li>
                        <li>Strategic flighting captures peak viewership moments</li>
                        <li>Proven performance with Amazon Prime Video campaigns</li>
                    </ul>
                </div>

                <div class="overview-card campaign-metrics">
                    <h3>Campaign Metrics</h3>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <span class="metric-value" data-metric="16">16</span>
                            <span class="metric-label">Total Weeks</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-value">Sep 11 - Dec 25</span>
                            <span class="metric-label">Campaign Period</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-value" data-metric="98" data-format="percentage">98%+</span>
                            <span class="metric-label">Avg Viewability</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-value" data-metric="95" data-format="percentage">95%+</span>
                            <span class="metric-label">Completion Rate</span>
                        </div>
                    </div>
                </div>

                <div class="overview-card format-preview">
                    <h3>Premium Format Portfolio</h3>
                    <div class="format-icons">
                        <div class="format-icon hrbto" title="High-Reach Brand Takeover">
                            <span>HRBTO</span>
                            <small>Premium Impact</small>
                        </div>
                        <div class="format-icon ctv" title="Connected TV">
                            <span>CTV</span>
                            <small>Large Screen</small>
                        </div>
                        <div class="format-icon runway" title="Runway Display">
                            <span>Runway</span>
                            <small>High Viewability</small>
                        </div>
                        <div class="format-icon spotlight" title="Spotlight Video">
                            <span>Spotlight</span>
                            <small>Video Excellence</small>
                        </div>
                    </div>
                </div>

                <div class="overview-card tier-preview">
                    <h3>Investment Tiers</h3>
                    <div class="tier-preview-cards">
                        <div class="tier-preview-card recommended">
                            <div class="tier-badge">RECOMMENDED</div>
                            <h4>$1M Tier</h4>
                            <p>HRBTO-focused premium strategy</p>
                        </div>
                        <div class="tier-preview-card">
                            <h4>$600K Tier</h4>
                            <p>Balanced multi-format approach</p>
                        </div>
                        <div class="tier-preview-card">
                            <h4>$300K Tier</h4>
                            <p>Foundation level entry</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chart-section">
                <h3>Investment vs Impact Analysis</h3>
                <div class="chart-container">
                    <canvas id="reachImpactChart"></canvas>
                </div>
            </div>
        `;
    }

    getWeeklyFlightingHTML() {
        return `
            <div class="section-header">
                <h2>Interactive Weekly Flighting System</h2>
                <p>Strategic budget allocation across 16 premium TNF weeks with dynamic tier comparison</p>
                
                <div class="tier-selector">
                    <button class="tier-btn active" data-tier="1">$1M Tier (RECOMMENDED)</button>
                    <button class="tier-btn" data-tier="2">$600K Tier</button>
                    <button class="tier-btn" data-tier="3">$300K Tier</button>
                </div>
            </div>

            <div class="flighting-dashboard">
                <div class="flighting-overview">
                    <div id="tierSummary" class="tier-summary">
                        ${this.getTierSummaryHTML(1)}
                    </div>
                </div>

                <div class="weekly-grid" id="weeklyGrid">
                    ${this.getWeeklyGridHTML(1)}
                </div>

                <div class="chart-section">
                    <div class="chart-container">
                        <canvas id="weeklyFlightingChart"></canvas>
                    </div>
                </div>

                <div class="chart-section">
                    <div class="chart-container">
                        <canvas id="priorityHeatmapChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    getFormatPortfolioHTML() {
        return `
            <div class="section-header">
                <h2>Premium Format Portfolio</h2>
                <p>Showcase of Kargo's high-impact advertising formats with HRBTO emphasis</p>
            </div>

            <div class="formats-grid">
                ${Object.entries(TNFCampaignData.FORMATS).map(([key, format]) => `
                    <div class="format-card ${key.toLowerCase()}" data-format="${key}">
                        <div class="format-header">
                            <h3>${format.name}</h3>
                            <div class="format-badge">${format.shortName}</div>
                        </div>
                        <div class="format-content">
                            <p class="format-description">${format.description}</p>
                            <div class="format-metrics">
                                <div class="metric">
                                    <span class="metric-value">${format.viewability}</span>
                                    <span class="metric-label">Viewability</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">${format.engagement}</span>
                                    <span class="metric-label">Engagement</span>
                                </div>
                            </div>
                            <div class="format-features">
                                <h4>Key Features</h4>
                                <ul>
                                    ${format.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="format-best-for">
                                <h4>Best For</h4>
                                <div class="best-for-tags">
                                    ${format.bestFor.map(use => `<span class="tag">${use}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="chart-section">
                <h3>Format Performance Comparison</h3>
                <div class="chart-container">
                    <canvas id="formatPerformanceChart"></canvas>
                </div>
            </div>
        `;
    }

    getMessagingStrategyHTML() {
        const messaging = TNFCampaignData.MESSAGING_STRATEGY;
        return `
            <div class="section-header">
                <h2>Messaging Strategy Timeline</h2>
                <p>Dynamic messaging approach with game awareness and real-time optimization</p>
            </div>

            <div class="messaging-timeline">
                ${Object.entries(messaging).map(([phase, data]) => `
                    <div class="timeline-phase ${phase.toLowerCase()}" data-phase="${phase}">
                        <div class="phase-header">
                            <h3>${data.timing}</h3>
                            <div class="phase-intensity ${data.intensity}">${data.intensity.toUpperCase()}</div>
                            <div class="phase-time">${data.timeRange}</div>
                        </div>
                        <div class="phase-content">
                            <div class="messages">
                                <h4>Key Messages</h4>
                                <ul>
                                    ${data.messages.map(message => `<li>${message}</li>`).join('')}
                                </ul>
                            </div>
                            ${data.cta ? `<div class="cta-section">
                                <strong>Call to Action:</strong> ${data.cta}
                            </div>` : ''}
                            ${data.note ? `<div class="phase-note">
                                <strong>Note:</strong> ${data.note}
                            </div>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="messaging-insights">
                <div class="insight-card">
                    <h3>Real-Time Integration</h3>
                    <p>All messaging integrates real-time game data and automatically adjusts based on game status and viewing patterns.</p>
                </div>
                <div class="insight-card">
                    <h3>Smart Cutoff</h3>
                    <p>Media delivery stops immediately when games conclude to maximize efficiency and avoid waste.</p>
                </div>
                <div class="insight-card">
                    <h3>Event Awareness</h3>
                    <p>Special messaging for critical events like Season Kickoff, Black Friday, and Christmas Day games.</p>
                </div>
            </div>
        `;
    }

    getInvestmentTiersHTML() {
        return `
            <div class="section-header">
                <h2>Investment Tier Comparison</h2>
                <p>Sophisticated 3-tier investment system with $1M tier recommended for maximum impact</p>
            </div>

            <div class="tier-comparison">
                ${Object.values(TNFCampaignData.INVESTMENT_TIERS).map(tier => `
                    <div class="tier-card ${tier.id} ${tier.badge ? 'recommended' : ''}" data-tier="${tier.id}">
                        ${tier.badge ? `<div class="tier-badge">${tier.badge}</div>` : ''}
                        <div class="tier-header">
                            <h3>${tier.name}</h3>
                            <p class="tier-description">${tier.description}</p>
                            <div class="tier-total">$${tier.total.toLocaleString()}</div>
                        </div>
                        
                        <div class="tier-formats">
                            <h4>Format Allocation</h4>
                            ${Object.entries(tier.formats).map(([format, data]) => `
                                <div class="format-allocation">
                                    <div class="format-info">
                                        <span class="format-name">${format}</span>
                                        <span class="format-percentage">${data.percentage}%</span>
                                    </div>
                                    <div class="format-amount">$${data.amount.toLocaleString()}</div>
                                    <div class="format-bar">
                                        <div class="format-fill" style="width: ${data.percentage}%; background-color: ${TNFCampaignData.getFormatColor(format)}"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="tier-advantages">
                            <h4>Strategic Advantages</h4>
                            <ul>
                                ${tier.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="tier-kpis">
                            <h4>Projected KPIs</h4>
                            <div class="kpi-grid">
                                <div class="kpi-item">
                                    <span class="kpi-value">${tier.kpis.reach}</span>
                                    <span class="kpi-label">Reach</span>
                                </div>
                                <div class="kpi-item">
                                    <span class="kpi-value">${tier.kpis.impressions}</span>
                                    <span class="kpi-label">Impressions</span>
                                </div>
                                <div class="kpi-item">
                                    <span class="kpi-value">${tier.kpis.viewability}</span>
                                    <span class="kpi-label">Viewability</span>
                                </div>
                                <div class="kpi-item">
                                    <span class="kpi-value">${tier.kpis.completionRate}</span>
                                    <span class="kpi-label">Completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="chart-section">
                <h3>Tier Comparison Analysis</h3>
                <div class="charts-grid">
                    <div class="chart-container">
                        <canvas id="tierComparisonChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <canvas id="formatBreakdownChart"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

    getTierSummaryHTML(tier) {
        const tierData = TNFCampaignData.INVESTMENT_TIERS[`tier${tier}`];
        const weeklyAverage = Math.round(tierData.total / 16);
        
        return `
            <div class="summary-card">
                <h3>${tierData.name}</h3>
                <div class="summary-metrics">
                    <div class="summary-metric">
                        <span class="metric-value">$${tierData.total.toLocaleString()}</span>
                        <span class="metric-label">Total Investment</span>
                    </div>
                    <div class="summary-metric">
                        <span class="metric-value">$${weeklyAverage.toLocaleString()}</span>
                        <span class="metric-label">Weekly Average</span>
                    </div>
                    <div class="summary-metric">
                        <span class="metric-value">${Object.keys(tierData.formats).length}</span>
                        <span class="metric-label">Premium Formats</span>
                    </div>
                </div>
            </div>
        `;
    }

    getWeeklyGridHTML(tier) {
        const weeklyData = tnfData.getAllWeeklyAllocations(tier);
        const weeks = Object.keys(weeklyData).map(w => parseInt(w)).sort((a, b) => a - b);
        
        return weeks.map(week => {
            const data = weeklyData[week];
            const priorityClass = data.priority.toLowerCase().replace(' ', '-');
            
            return `
                <div class="week-card ${priorityClass}" data-week="${week}">
                    <div class="week-header">
                        <div class="week-number">Week ${week}</div>
                        <div class="week-date">${data.date}</div>
                        ${data.event ? `<div class="week-event">${data.event}</div>` : ''}
                    </div>
                    <div class="week-priority ${priorityClass}">${data.priority}</div>
                    <div class="week-budget">$${data.totalBudget.toLocaleString()}</div>
                    <div class="week-formats">
                        ${Object.entries(data.formats).map(([format, formatData]) => `
                            <div class="format-allocation">
                                <span class="format-name">${format}</span>
                                <span class="format-amount">$${formatData.amount.toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    bindEvents() {
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('change', this.handleChange.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleClick(event) {
        const target = event.target;

        if (target.classList.contains('nav-tab')) {
            event.preventDefault();
            this.switchView(target.dataset.view);
        }

        if (target.classList.contains('tier-btn')) {
            this.switchTier(parseInt(target.dataset.tier));
        }

        if (target.closest('.week-card')) {
            this.selectWeek(parseInt(target.closest('.week-card').dataset.week));
        }

        if (target.closest('.format-card')) {
            this.selectFormat(target.closest('.format-card').dataset.format);
        }

        if (target.closest('.tier-card')) {
            this.selectTierCard(target.closest('.tier-card').dataset.tier);
        }
    }

    handleChange(event) {
        // Handle any form changes if needed
    }

    handleResize() {
        if (chartManager) {
            chartManager.resizeCharts();
        }
    }

    switchView(viewName) {
        if (this.currentView === viewName || animationManager.isAnimating) return;

        const currentViewElement = document.querySelector(`.tnf-view[data-view="${this.currentView}"]`);
        const newViewHTML = this.getViewHTML(viewName);
        
        const viewContainer = document.getElementById('viewContainer');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newViewHTML;
        const newViewElement = tempDiv.firstElementChild;

        this.updateNavigation(viewName);

        if (animationManager) {
            animationManager.viewTransition(currentViewElement, newViewElement, {
                onComplete: () => {
                    viewContainer.innerHTML = newViewHTML;
                    this.currentView = viewName;
                    this.initializeCurrentView();
                }
            });
        } else {
            viewContainer.innerHTML = newViewHTML;
            this.currentView = viewName;
            this.initializeCurrentView();
        }
    }

    switchTier(tier) {
        if (this.selectedTier === tier) return;
        
        this.selectedTier = tier;
        this.updateTierSelector(tier);
        
        if (this.currentView === 'weekly-flighting') {
            this.updateWeeklyFlighting(tier);
        }
    }

    selectWeek(week) {
        this.selectedWeek = week;
        document.querySelectorAll('.week-card').forEach(card => {
            card.classList.toggle('selected', parseInt(card.dataset.week) === week);
        });
    }

    selectFormat(format) {
        this.selectedFormat = format;
        document.querySelectorAll('.format-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.format === format);
        });
    }

    selectTierCard(tierId) {
        document.querySelectorAll('.tier-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.tier === tierId);
        });
    }

    updateNavigation(activeView) {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === activeView);
        });

        if (animationManager) {
            const activeButton = document.querySelector('.nav-tab.active');
            const allButtons = document.querySelectorAll('.nav-tab');
            animationManager.navAnimation(activeButton, allButtons);
        }
    }

    updateTierSelector(activeTier) {
        document.querySelectorAll('.tier-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.tier) === activeTier);
        });
    }

    updateWeeklyFlighting(tier) {
        const tierSummary = document.getElementById('tierSummary');
        const weeklyGrid = document.getElementById('weeklyGrid');
        
        if (tierSummary) {
            tierSummary.innerHTML = this.getTierSummaryHTML(tier);
        }
        
        if (weeklyGrid) {
            weeklyGrid.innerHTML = this.getWeeklyGridHTML(tier);
            
            if (animationManager) {
                const weekCards = weeklyGrid.querySelectorAll('.week-card');
                animationManager.weeklyFlightingReveal(weekCards);
            }
        }

        this.updateWeeklyCharts(tier);
    }

    updateWeeklyCharts(tier) {
        if (chartManager) {
            chartManager.createWeeklyFlightingChart('weeklyFlightingChart', tier);
        }
    }

    initializeCurrentView() {
        switch (this.currentView) {
            case 'overview':
                this.initializeOverview();
                break;
            case 'weekly-flighting':
                this.initializeWeeklyFlighting();
                break;
            case 'format-portfolio':
                this.initializeFormatPortfolio();
                break;
            case 'messaging-strategy':
                this.initializeMessagingStrategy();
                break;
            case 'investment-tiers':
                this.initializeInvestmentTiers();
                break;
        }

        if (animationManager) {
            this.animateViewElements();
        }
    }

    initializeOverview() {
        if (chartManager) {
            setTimeout(() => {
                chartManager.createReachImpactChart('reachImpactChart');
            }, 100);
        }
    }

    initializeWeeklyFlighting() {
        if (chartManager) {
            setTimeout(() => {
                chartManager.createWeeklyFlightingChart('weeklyFlightingChart', this.selectedTier);
                chartManager.createPriorityHeatmapChart('priorityHeatmapChart');
            }, 100);
        }
    }

    initializeFormatPortfolio() {
        if (chartManager) {
            setTimeout(() => {
                chartManager.createFormatPerformanceChart('formatPerformanceChart');
            }, 100);
        }
    }

    initializeMessagingStrategy() {
        // Initialize messaging strategy specific features
    }

    initializeInvestmentTiers() {
        if (chartManager) {
            setTimeout(() => {
                chartManager.createTierComparisonChart('tierComparisonChart');
                chartManager.createFormatBreakdownChart('formatBreakdownChart', this.selectedTier);
            }, 100);
        }
    }

    animateViewElements() {
        if (!animationManager) return;

        const elements = document.querySelectorAll('.tnf-view > *');
        animationManager.staggerIn(elements, {
            stagger: 0.1,
            direction: 'up',
            distance: 30
        });

        const metrics = document.querySelector('.hero-stats, .metrics-grid');
        if (metrics) {
            animationManager.animateMetrics(metrics);
        }
    }

    initializeView() {
        this.switchView('overview');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            if (animationManager) {
                animationManager.fadeIn(loadingScreen, {
                    duration: 0.5,
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                    }
                });
            } else {
                loadingScreen.style.display = 'none';
            }
        }
    }

    createDashboard() {
        // Dashboard creation is handled in getInitialHTML and view switching
    }

    validateCalculations() {
        if (tnfData) {
            return tnfData.validateData();
        }
        return false;
    }

    exportData() {
        const exportData = {
            currentView: this.currentView,
            selectedTier: this.selectedTier,
            selectedWeek: this.selectedWeek,
            selectedFormat: this.selectedFormat,
            tierData: TNFCampaignData.INVESTMENT_TIERS,
            weeklyAllocations: TNFCampaignData.WEEKLY_ALLOCATION,
            formats: TNFCampaignData.FORMATS,
            messaging: TNFCampaignData.MESSAGING_STRATEGY,
            metrics: TNFCampaignData.CAMPAIGN_METRICS
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tnf-2025-dashboard-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.tnfDashboard = new TNFDashboard();
});