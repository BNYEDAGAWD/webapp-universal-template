// Universal Web App Template - JavaScript for WSL Development
class WebApp {
    constructor() {
        this.version = '1.0.0';
        this.appsScriptUrl = null; // Set this when you deploy your Apps Script
        this.init();
    }
    
    init() {
        console.log('🚀 Web App Initialized - Version:', this.version);
        console.log('🖥️  Running in WSL-compatible mode');
        this.setupEventListeners();
        this.loadConfiguration();
        this.checkAIStatus();
        this.addFadeInAnimations();
    }
    
    setupEventListeners() {
        // Add your event listeners here
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Handle responsive menu toggles
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
    }
    
    loadConfiguration() {
        // Load app configuration from localStorage or environment
        this.config = {
            apiTimeout: 10000,
            retryAttempts: 3,
            debugMode: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        };
        
        if (this.config.debugMode) {
            console.log('🔧 Debug mode enabled');
            document.body.classList.add('debug-mode');
        }
    }
    
    handleClick(event) {
        // Global click handler for analytics and interactions
        const target = event.target.closest('[data-action]');
        if (target) {
            const action = target.dataset.action;
            this.handleAction(action, target);
        }
    }
    
    handleAction(action, element) {
        console.log('🎯 Action triggered:', action);
        
        switch(action) {
            case 'test-ai':
                this.testAIConnection();
                break;
            case 'demo-feature':
                this.demoFeature();
                break;
            default:
                console.warn('Unknown action:', action);
        }
    }
    
    toggleMobileMenu() {
        // Handle mobile menu toggle animations
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar) {
            navbar.classList.toggle('show');
        }
    }
    
    addFadeInAnimations() {
        // Add fade-in animations to elements
        const elements = document.querySelectorAll('.card, .alert, .badge');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    // Google Apps Script integration
    async callAppsScript(functionName, parameters = {}) {
        if (!this.appsScriptUrl) {
            console.warn('📝 Apps Script URL not configured');
            return { error: 'Apps Script URL not configured' };
        }
        
        try {
            this.showLoading(true);
            
            const formData = new FormData();
            formData.append('action', functionName);
            formData.append('data', JSON.stringify(parameters));
            
            const response = await fetch(this.appsScriptUrl, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            this.showLoading(false);
            
            return result;
            
        } catch (error) {
            console.error('📝 Apps Script Error:', error);
            this.showLoading(false);
            return { error: error.message };
        }
    }
    
    // Gemini AI integration helper
    async queryAI(prompt, context = {}) {
        try {
            console.log('🤖 Querying AI:', prompt.substring(0, 50) + '...');
            
            const result = await this.callAppsScript('callGemini', {
                prompt,
                context: {
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    ...context
                }
            });
            
            if (result.success) {
                console.log('✅ AI Response received');
                return result.response;
            } else {
                throw new Error(result.error || 'AI query failed');
            }
            
        } catch (error) {
            console.error('🤖 AI Query Error:', error);
            this.showNotification('AI service temporarily unavailable', 'warning');
            return null;
        }
    }
    
    // Utility functions
    showLoading(show = true) {
        const spinner = document.querySelector('.spinner');
        if (show) {
            document.body.classList.add('loading');
            if (spinner) spinner.style.display = 'inline-block';
        } else {
            document.body.classList.remove('loading');
            if (spinner) spinner.style.display = 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    async checkAIStatus() {
        // Check if AI services are available
        try {
            const status = await this.callAppsScript('healthCheck');
            const statusIndicator = document.querySelector('.ai-status');
            
            if (statusIndicator) {
                if (status.success) {
                    statusIndicator.className = 'ai-status connected';
                    statusIndicator.innerHTML = '<i class="fas fa-check-circle me-1"></i>AI Connected';
                } else {
                    statusIndicator.className = 'ai-status disconnected';
                    statusIndicator.innerHTML = '<i class="fas fa-exclamation-circle me-1"></i>AI Offline';
                }
            }
        } catch (error) {
            console.log('ℹ️  AI status check skipped (normal for new projects)');
        }
    }
    
    async testAIConnection() {
        const response = await this.queryAI('Hello, can you confirm the AI integration is working?');
        if (response) {
            this.showNotification('✅ AI Integration Working!', 'success');
        }
    }
    
    demoFeature() {
        this.showNotification('🎉 Demo feature activated!', 'info');
    }
    
    // Development helpers
    getDebugInfo() {
        return {
            version: this.version,
            config: this.config,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WebApp();
    
    // Make app globally available for debugging
    if (window.app.config.debugMode) {
        console.log('🔧 App instance available as window.app');
        console.log('🔧 Debug info:', window.app.getDebugInfo());
    }
});

// Handle page visibility for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 Page hidden - pausing non-critical operations');
    } else {
        console.log('📱 Page visible - resuming operations');
    }
});
