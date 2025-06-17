class TNFCampaignData {
    constructor() {
        this.validateData();
    }

    static WEEKLY_ALLOCATION = {
        2: { date: 'Sep 11', percentage: 3.4, priority: 'High', event: 'Season Kickoff' },
        3: { date: 'Sep 18', percentage: 3.4, priority: 'Standard', event: null },
        4: { date: 'Sep 25', percentage: 3.4, priority: 'Standard', event: null },
        5: { date: 'Oct 2', percentage: 7.5, priority: 'High', event: null },
        6: { date: 'Oct 9', percentage: 7.5, priority: 'High', event: null },
        7: { date: 'Oct 16', percentage: 6.1, priority: 'Medium', event: null },
        8: { date: 'Oct 23', percentage: 6.8, priority: 'Medium', event: null },
        9: { date: 'Oct 30', percentage: 6.8, priority: 'Medium', event: null },
        10: { date: 'Nov 6', percentage: 5.4, priority: 'Medium', event: null },
        11: { date: 'Nov 13', percentage: 8.2, priority: 'High', event: null },
        12: { date: 'Nov 20', percentage: 8.8, priority: 'High', event: null },
        13: { date: 'Nov 28', percentage: 8.2, priority: 'Critical', event: 'Black Friday' },
        14: { date: 'Dec 4', percentage: 6.1, priority: 'Medium', event: null },
        15: { date: 'Dec 11', percentage: 6.8, priority: 'Medium', event: null },
        16: { date: 'Dec 18', percentage: 8.2, priority: 'High', event: null },
        17: { date: 'Dec 25', percentage: 3.4, priority: 'Critical', event: 'Christmas Day' }
    };

    static INVESTMENT_TIERS = {
        tier1: {
            id: 'tier1',
            name: '$1M TIER',
            total: 1000000,
            badge: 'RECOMMENDED',
            description: 'HRBTO-focused premium strategy',
            visual: { accent: 'gold', size: 'large' },
            formats: {
                HRBTO: { amount: 395000, percentage: 39.5 },
                CTV: { amount: 305000, percentage: 30.5 },
                Runway: { amount: 300000, percentage: 30.0 }
            },
            advantages: [
                '50%+ higher engagement rates vs standard programmatic',
                'Commanding share of voice during peak TNF moments',
                'Premium large-screen streaming environment presence',
                'Positions Kargo as Amazon\'s preferred strategic partner'
            ],
            kpis: {
                reach: '45M+ unique viewers',
                impressions: '450M+ premium impressions',
                viewability: '98%+ across all formats',
                completionRate: '95%+ video completion'
            }
        },
        tier2: {
            id: 'tier2',
            name: '$600K TIER',
            total: 600000,
            badge: null,
            description: 'Balanced multi-format approach',
            visual: { accent: 'silver', size: 'medium' },
            formats: {
                CTV: { amount: 200000, percentage: 33.3 },
                Spotlight: { amount: 200000, percentage: 33.3 },
                Runway: { amount: 200000, percentage: 33.4 }
            },
            advantages: [
                'Balanced reach across premium formats',
                'Strong CTV presence for streaming audience',
                'Cost-effective multi-touchpoint strategy'
            ],
            kpis: {
                reach: '30M+ unique viewers',
                impressions: '300M+ premium impressions',
                viewability: '96%+ across all formats',
                completionRate: '92%+ video completion'
            }
        },
        tier3: {
            id: 'tier3',
            name: '$300K TIER',
            total: 300000,
            badge: null,
            description: 'Foundation level entry',
            visual: { accent: 'bronze', size: 'small' },
            formats: {
                Runway: { amount: 150000, percentage: 50.0 },
                Spotlight: { amount: 150000, percentage: 50.0 }
            },
            advantages: [
                'Entry-level TNF presence',
                'Foundation for future growth',
                'Cost-efficient premium visibility'
            ],
            kpis: {
                reach: '18M+ unique viewers',
                impressions: '180M+ premium impressions',
                viewability: '94%+ across all formats',
                completionRate: '90%+ video completion'
            }
        }
    };

    static FORMATS = {
        HRBTO: {
            name: 'High-Reach Brand Takeover',
            shortName: 'HRBTO',
            description: 'Premium high-impact format with commanding share of voice',
            viewability: '98%+',
            engagement: '15%+ higher than industry standard',
            features: ['Full-screen takeover', 'Sound-on autoplay', 'Interactive elements', 'Brand safety guaranteed'],
            bestFor: ['Brand awareness', 'Product launches', 'High-impact moments'],
            color: '#FFD700'
        },
        CTV: {
            name: 'Connected TV',
            shortName: 'CTV',
            description: 'Premium large-screen streaming environment presence',
            viewability: '98%+',
            engagement: 'TV-like completion rates',
            features: ['Large-screen experience', 'Non-skippable placements', 'Living room environment', 'Premium content alignment'],
            bestFor: ['Brand storytelling', 'Product demonstrations', 'Emotional connection'],
            color: '#4169E1'
        },
        Runway: {
            name: 'Runway Display',
            shortName: 'Runway',
            description: 'High-impact display with exceptional viewability',
            viewability: '92%+',
            engagement: 'Premium click-through rates',
            features: ['Above-the-fold placement', 'Responsive design', 'Rich media support', 'Cross-device targeting'],
            bestFor: ['Direct response', 'Traffic driving', 'Retargeting campaigns'],
            color: '#32CD32'
        },
        Spotlight: {
            name: 'Spotlight Video',
            shortName: 'Spotlight',
            description: 'Premium video with exceptional completion rates',
            viewability: '95%+',
            engagement: '95%+ completion rates',
            features: ['In-stream placement', 'Skip-resistant creative', 'Mobile-optimized', 'Contextual targeting'],
            bestFor: ['Video storytelling', 'Engagement campaigns', 'Mobile-first strategies'],
            color: '#FF6347'
        }
    };

    static MESSAGING_STRATEGY = {
        preGame: {
            timing: 'Tuesday-Wednesday',
            timeRange: '12:00 AM - 11:59 PM',
            messages: [
                'Thursday Night Football - Tonight on Prime Video',
                'Team preview and rivalry content',
                'Reminder setting CTAs',
                'Exclusive Prime Video streaming rights'
            ],
            intensity: 'medium',
            cta: 'Set Reminder'
        },
        gameDay: {
            timing: 'Thursday 12AM-4PM',
            timeRange: '12:00 AM - 4:00 PM',
            messages: [
                'Tonight - [Teams] streaming on Prime Video',
                'Live countdown and anticipation building',
                'Last-chance tune-in messaging',
                'Exclusive streaming experience'
            ],
            intensity: 'high',
            cta: 'Watch Live'
        },
        livePeriod: {
            timing: 'Thursday 4PM-Game End',
            timeRange: '4:00 PM - Game Conclusion',
            messages: [
                'Live Now - [Teams] on Prime Video',
                'Real-time score integration',
                'Join the action messaging',
                'Interactive viewing features'
            ],
            intensity: 'critical',
            cta: 'Join Live',
            note: 'All media stops immediately when game concludes'
        },
        postGame: {
            timing: 'Post-Game',
            timeRange: 'Game End - 11:59 PM',
            messages: ['No active media delivery'],
            intensity: 'none',
            cta: null,
            note: 'Clear visualization of media cutoff'
        }
    };

    static CAMPAIGN_METRICS = {
        totalWeeks: 16,
        seasonStart: 'September 11, 2025',
        seasonEnd: 'December 25, 2025',
        totalReach: '45M+ unique viewers',
        totalImpressions: '450M+ premium impressions',
        avgViewability: '98%+ across all formats',
        completionRate: '95%+ video completion',
        targetDemographic: 'Adults 18-54, Sports Enthusiasts, Prime Video Subscribers',
        geo: 'United States - All Markets',
        devices: ['Mobile', 'Desktop', 'Tablet', 'Connected TV', 'Streaming Devices']
    };

    getWeeklyBudgetAllocation(tier, week) {
        const tierData = TNFCampaignData.INVESTMENT_TIERS[`tier${tier}`];
        const weekData = TNFCampaignData.WEEKLY_ALLOCATION[week];
        
        if (!tierData || !weekData) return null;

        const weeklyBudget = tierData.total * (weekData.percentage / 100);
        const formatAllocations = {};

        Object.entries(tierData.formats).forEach(([format, data]) => {
            formatAllocations[format] = {
                amount: Math.round(weeklyBudget * (data.percentage / 100)),
                percentage: data.percentage
            };
        });

        return {
            week,
            date: weekData.date,
            totalBudget: Math.round(weeklyBudget),
            priority: weekData.priority,
            event: weekData.event,
            formats: formatAllocations
        };
    }

    getAllWeeklyAllocations(tier) {
        const allocations = {};
        Object.keys(TNFCampaignData.WEEKLY_ALLOCATION).forEach(week => {
            allocations[week] = this.getWeeklyBudgetAllocation(tier, parseInt(week));
        });
        return allocations;
    }

    getTierComparison() {
        return Object.values(TNFCampaignData.INVESTMENT_TIERS).map(tier => ({
            ...tier,
            weeklyAverage: Math.round(tier.total / 16),
            costPer1000Impressions: this.calculateCPM(tier),
            totalFormatBreakdown: this.getFormatTotals(tier)
        }));
    }

    calculateCPM(tier) {
        const baseImpressions = {
            tier1: 450000000,
            tier2: 300000000,
            tier3: 180000000
        };
        return Math.round((tier.total / baseImpressions[tier.id]) * 1000 * 100) / 100;
    }

    getFormatTotals(tier) {
        const totals = {};
        Object.entries(tier.formats).forEach(([format, data]) => {
            totals[format] = {
                total: data.amount,
                weeklyAverage: Math.round(data.amount / 16),
                percentage: data.percentage
            };
        });
        return totals;
    }

    validateData() {
        const weeklyTotal = Object.values(TNFCampaignData.WEEKLY_ALLOCATION)
            .reduce((sum, week) => sum + week.percentage, 0);
        
        if (Math.abs(weeklyTotal - 100) > 0.1) {
        }

        Object.values(TNFCampaignData.INVESTMENT_TIERS).forEach(tier => {
            const formatTotal = Object.values(tier.formats)
                .reduce((sum, format) => sum + format.amount, 0);
            
            if (formatTotal !== tier.total) {
            }
        });

        return true;
    }

    static getPriorityColor(priority) {
        const colors = {
            'Standard': '#6B7280',
            'Medium': '#F59E0B',
            'High': '#EF4444',
            'Critical': '#DC2626'
        };
        return colors[priority] || '#6B7280';
    }

    static getFormatColor(format) {
        return TNFCampaignData.FORMATS[format]?.color || '#6B7280';
    }
}

const tnfData = new TNFCampaignData();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TNFCampaignData, tnfData };
}