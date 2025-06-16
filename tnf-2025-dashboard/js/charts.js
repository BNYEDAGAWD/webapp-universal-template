class TNFChartManager {
    constructor() {
        this.charts = {};
        this.colors = {
            HRBTO: '#FFD700',
            CTV: '#4169E1',
            Runway: '#32CD32',
            Spotlight: '#FF6347',
            priority: {
                'Standard': '#6B7280',
                'Medium': '#F59E0B',
                'High': '#EF4444',
                'Critical': '#DC2626'
            },
            tier: {
                'tier1': '#FFD700',
                'tier2': '#C0C0C0',
                'tier3': '#CD7F32'
            }
        };
    }

    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }

    createWeeklyFlightingChart(canvasId, tier) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const weeklyData = tnfData.getAllWeeklyAllocations(tier);
        const weeks = Object.keys(weeklyData).map(w => parseInt(w)).sort((a, b) => a - b);
        
        const datasets = [];
        const tierInfo = TNFCampaignData.INVESTMENT_TIERS[`tier${tier}`];
        
        Object.keys(tierInfo.formats).forEach(format => {
            datasets.push({
                label: format,
                data: weeks.map(week => weeklyData[week].formats[format].amount),
                backgroundColor: this.colors[format] + '80',
                borderColor: this.colors[format],
                borderWidth: 2,
                tension: 0.4
            });
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks.map(week => `Week ${week}`),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Weekly Budget Allocation - ${tierInfo.name}`,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const weekNum = weeks[context.dataIndex];
                                const weekData = weeklyData[weekNum];
                                const priority = weekData.priority;
                                const event = weekData.event ? ` (${weekData.event})` : '';
                                
                                return [
                                    `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
                                    `Priority: ${priority}`,
                                    `Date: ${weekData.date}${event}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Campaign Weeks'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Weekly Budget ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    createFormatBreakdownChart(canvasId, tier) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const tierInfo = TNFCampaignData.INVESTMENT_TIERS[`tier${tier}`];
        const formats = Object.keys(tierInfo.formats);
        const amounts = formats.map(format => tierInfo.formats[format].amount);
        const colors = formats.map(format => this.colors[format]);

        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: formats,
                datasets: [{
                    data: amounts,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color + 'FF'),
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Format Allocation - ${tierInfo.name}`,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const percentage = tierInfo.formats[label].percentage;
                                    return {
                                        text: `${label}: $${value.toLocaleString()} (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].borderColor[i],
                                        lineWidth: 2,
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const format = context.label;
                                const value = context.parsed;
                                const percentage = tierInfo.formats[format].percentage;
                                const formatInfo = TNFCampaignData.FORMATS[format];
                                
                                return [
                                    `${format}: $${value.toLocaleString()}`,
                                    `${percentage}% of total budget`,
                                    `Viewability: ${formatInfo.viewability}`,
                                    `${formatInfo.description}`
                                ];
                            }
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    createTierComparisonChart(canvasId) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const tiers = Object.values(TNFCampaignData.INVESTMENT_TIERS);
        const tierNames = tiers.map(tier => tier.name);
        const tierTotals = tiers.map(tier => tier.total);
        const tierColors = tiers.map(tier => this.colors.tier[tier.id]);

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tierNames,
                datasets: [{
                    label: 'Total Investment',
                    data: tierTotals,
                    backgroundColor: tierColors.map(color => color + '80'),
                    borderColor: tierColors,
                    borderWidth: 3,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Investment Tier Comparison',
                        font: { size: 18, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const tierIndex = context.dataIndex;
                                const tier = tiers[tierIndex];
                                const cpm = tnfData.calculateCPM(tier);
                                
                                return [
                                    `Total Investment: $${context.parsed.y.toLocaleString()}`,
                                    `CPM: $${cpm}`,
                                    `Weekly Average: $${Math.round(tier.total / 16).toLocaleString()}`,
                                    `${tier.description}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Investment Tiers'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Investment ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    createPriorityHeatmapChart(canvasId) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const weeks = Object.keys(TNFCampaignData.WEEKLY_ALLOCATION).map(w => parseInt(w)).sort((a, b) => a - b);
        const priorities = weeks.map(week => TNFCampaignData.WEEKLY_ALLOCATION[week].priority);
        const percentages = weeks.map(week => TNFCampaignData.WEEKLY_ALLOCATION[week].percentage);
        
        const priorityColors = priorities.map(priority => this.colors.priority[priority]);

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeks.map(week => `Week ${week}`),
                datasets: [{
                    label: 'Budget Allocation',
                    data: percentages,
                    backgroundColor: priorityColors.map(color => color + '80'),
                    borderColor: priorityColors,
                    borderWidth: 2,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weekly Priority & Budget Distribution',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const weekNum = weeks[context.dataIndex];
                                const weekData = TNFCampaignData.WEEKLY_ALLOCATION[weekNum];
                                const event = weekData.event ? ` - ${weekData.event}` : '';
                                
                                return [
                                    `Week ${weekNum} (${weekData.date})`,
                                    `Budget: ${context.parsed.y}%`,
                                    `Priority: ${weekData.priority}${event}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Campaign Weeks'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Budget Allocation (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        max: 10
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    createFormatPerformanceChart(canvasId) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const formats = Object.keys(TNFCampaignData.FORMATS);
        const viewabilityData = formats.map(format => {
            const viewability = TNFCampaignData.FORMATS[format].viewability;
            return parseFloat(viewability.replace('%+', ''));
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: formats,
                datasets: [{
                    label: 'Viewability Performance',
                    data: viewabilityData,
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: formats.map(format => this.colors[format]),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Format Performance Comparison',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const format = context.label;
                                const formatInfo = TNFCampaignData.FORMATS[format];
                                
                                return [
                                    `${formatInfo.name}`,
                                    `Viewability: ${formatInfo.viewability}`,
                                    `Engagement: ${formatInfo.engagement}`,
                                    `${formatInfo.description}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 85,
                        suggestedMax: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    createReachImpactChart(canvasId) {
        this.destroyChart(canvasId);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const tiers = Object.values(TNFCampaignData.INVESTMENT_TIERS);
        const reachData = tiers.map(tier => {
            const reach = tier.kpis.reach;
            return parseInt(reach.replace('M+ unique viewers', ''));
        });

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: tiers.map((tier, index) => ({
                    label: tier.name,
                    data: [{
                        x: tier.total / 1000,
                        y: reachData[index],
                        r: 15 + (index * 5)
                    }],
                    backgroundColor: this.colors.tier[tier.id] + '80',
                    borderColor: this.colors.tier[tier.id],
                    borderWidth: 3
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Investment vs Reach Impact',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const tier = tiers[context.datasetIndex];
                                const cpm = tnfData.calculateCPM(tier);
                                
                                return [
                                    `${tier.name}`,
                                    `Investment: $${context.parsed.x}K`,
                                    `Reach: ${context.parsed.y}M+ viewers`,
                                    `CPM: $${cpm}`,
                                    `${tier.description}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Total Investment ($K)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Unique Reach (Millions)'
                        }
                    }
                }
            }
        });

        return this.charts[canvasId];
    }

    updateChart(chartId, newData) {
        if (this.charts[chartId]) {
            this.charts[chartId].data = newData;
            this.charts[chartId].update();
        }
    }

    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            chart.resize();
        });
    }

    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartId => {
            this.destroyChart(chartId);
        });
    }
}

const chartManager = new TNFChartManager();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TNFChartManager, chartManager };
}