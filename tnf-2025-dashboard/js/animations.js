class TNFAnimationManager {
    constructor() {
        this.isAnimating = false;
        this.timeline = null;
        this.defaultDuration = 0.6;
        this.defaultEase = "power2.out";
        
        this.initializeGSAP();
        this.registerAnimations();
    }

    initializeGSAP() {
        if (typeof gsap === 'undefined') {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        
        gsap.set('.tnf-view', { opacity: 0, y: 30 });
        gsap.set('.tier-card', { opacity: 0, scale: 0.95 });
        gsap.set('.week-card', { opacity: 0, x: -20 });
        gsap.set('.format-card', { opacity: 0, y: 20 });
        gsap.set('.chart-container', { opacity: 0, scale: 0.98 });
    }

    registerAnimations() {
        this.animations = {
            fadeIn: this.fadeIn.bind(this),
            slideIn: this.slideIn.bind(this),
            scaleIn: this.scaleIn.bind(this),
            staggerIn: this.staggerIn.bind(this),
            chartReveal: this.chartReveal.bind(this),
            tierCardEntrance: this.tierCardEntrance.bind(this),
            weeklyFlightingReveal: this.weeklyFlightingReveal.bind(this),
            viewTransition: this.viewTransition.bind(this),
            pulseEffect: this.pulseEffect.bind(this),
            glowEffect: this.glowEffect.bind(this),
            countUp: this.countUp.bind(this),
            progressBar: this.progressBar.bind(this)
        };
    }

    fadeIn(element, options = {}) {
        const {
            duration = this.defaultDuration,
            ease = this.defaultEase,
            delay = 0,
            onComplete = null
        } = options;

        return gsap.to(element, {
            opacity: 1,
            duration,
            ease,
            delay,
            onComplete
        });
    }

    slideIn(element, options = {}) {
        const {
            duration = this.defaultDuration,
            ease = this.defaultEase,
            delay = 0,
            direction = 'up',
            distance = 30,
            onComplete = null
        } = options;

        const fromProps = { opacity: 0 };
        const toProps = { opacity: 1, duration, ease, delay, onComplete };

        switch (direction) {
            case 'up':
                fromProps.y = distance;
                toProps.y = 0;
                break;
            case 'down':
                fromProps.y = -distance;
                toProps.y = 0;
                break;
            case 'left':
                fromProps.x = distance;
                toProps.x = 0;
                break;
            case 'right':
                fromProps.x = -distance;
                toProps.x = 0;
                break;
        }

        gsap.set(element, fromProps);
        return gsap.to(element, toProps);
    }

    scaleIn(element, options = {}) {
        const {
            duration = this.defaultDuration,
            ease = this.defaultEase,
            delay = 0,
            scale = 0.95,
            onComplete = null
        } = options;

        gsap.set(element, { opacity: 0, scale });
        return gsap.to(element, {
            opacity: 1,
            scale: 1,
            duration,
            ease,
            delay,
            onComplete
        });
    }

    staggerIn(elements, options = {}) {
        const {
            duration = this.defaultDuration,
            ease = this.defaultEase,
            stagger = 0.1,
            direction = 'up',
            distance = 20,
            onComplete = null
        } = options;

        const fromProps = { opacity: 0 };
        const toProps = { opacity: 1, duration, ease, onComplete };

        switch (direction) {
            case 'up':
                fromProps.y = distance;
                toProps.y = 0;
                break;
            case 'down':
                fromProps.y = -distance;
                toProps.y = 0;
                break;
            case 'left':
                fromProps.x = distance;
                toProps.x = 0;
                break;
            case 'right':
                fromProps.x = -distance;
                toProps.x = 0;
                break;
        }

        gsap.set(elements, fromProps);
        return gsap.to(elements, {
            ...toProps,
            stagger: {
                amount: stagger,
                from: "start"
            }
        });
    }

    chartReveal(element, options = {}) {
        const {
            duration = 0.8,
            ease = "back.out(1.7)",
            delay = 0.2,
            onComplete = null
        } = options;

        gsap.set(element, { opacity: 0, scale: 0.8, rotationY: 15 });
        return gsap.to(element, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration,
            ease,
            delay,
            onComplete
        });
    }

    tierCardEntrance(cards, options = {}) {
        const {
            duration = 0.7,
            ease = "power3.out",
            stagger = 0.15,
            onComplete = null
        } = options;

        const tl = gsap.timeline({ onComplete });

        cards.forEach((card, index) => {
            const tier = card.dataset.tier;
            const isRecommended = card.classList.contains('recommended');
            
            const delay = index * stagger;
            const scale = isRecommended ? 1.02 : 1;
            
            gsap.set(card, { opacity: 0, scale: 0.9, y: 40 });
            
            tl.to(card, {
                opacity: 1,
                scale: scale,
                y: 0,
                duration,
                ease,
                delay
            }, 0);

            if (isRecommended) {
                tl.to(card, {
                    boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
                    duration: 0.3,
                    ease: "power2.out"
                }, delay + 0.4);
            }
        });

        return tl;
    }

    weeklyFlightingReveal(weekCards, options = {}) {
        const {
            duration = 0.5,
            ease = this.defaultEase,
            stagger = 0.05,
            onComplete = null
        } = options;

        gsap.set(weekCards, { opacity: 0, x: -30, scale: 0.95 });
        
        return gsap.to(weekCards, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration,
            ease,
            stagger: {
                amount: stagger * weekCards.length,
                from: "start"
            },
            onComplete
        });
    }

    viewTransition(fromView, toView, options = {}) {
        const {
            duration = 0.4,
            ease = "power2.inOut",
            onComplete = null
        } = options;

        this.isAnimating = true;
        
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                if (onComplete) onComplete();
            }
        });

        if (fromView) {
            tl.to(fromView, {
                opacity: 0,
                y: -20,
                duration: duration * 0.6,
                ease
            });
        }

        tl.set(toView, { display: 'block' });
        
        tl.fromTo(toView, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: duration * 0.8,
            ease
        }, fromView ? "-=0.2" : 0);

        return tl;
    }

    pulseEffect(element, options = {}) {
        const {
            scale = 1.05,
            duration = 0.6,
            repeat = -1,
            yoyo = true,
            ease = "power2.inOut"
        } = options;

        return gsap.to(element, {
            scale,
            duration,
            repeat,
            yoyo,
            ease
        });
    }

    glowEffect(element, options = {}) {
        const {
            color = "rgba(255, 215, 0, 0.4)",
            intensity = "0 0 20px",
            duration = 1.5,
            repeat = -1,
            yoyo = true
        } = options;

        return gsap.to(element, {
            boxShadow: `${intensity} ${color}`,
            duration,
            repeat,
            yoyo,
            ease: "power2.inOut"
        });
    }

    countUp(element, options = {}) {
        const {
            start = 0,
            end = 100,
            duration = 1.5,
            ease = "power2.out",
            format = (value) => Math.round(value),
            onComplete = null
        } = options;

        const obj = { value: start };
        
        return gsap.to(obj, {
            value: end,
            duration,
            ease,
            onUpdate: () => {
                element.textContent = format(obj.value);
            },
            onComplete
        });
    }

    progressBar(element, options = {}) {
        const {
            width = 100,
            duration = 1.2,
            ease = "power3.out",
            delay = 0,
            onComplete = null
        } = options;

        gsap.set(element, { width: '0%' });
        
        return gsap.to(element, {
            width: `${width}%`,
            duration,
            ease,
            delay,
            onComplete
        });
    }

    animateMetrics(container, options = {}) {
        const metrics = container.querySelectorAll('[data-metric]');
        const {
            stagger = 0.2,
            duration = 1.5,
            onComplete = null
        } = options;

        const tl = gsap.timeline({ onComplete });

        metrics.forEach((metric, index) => {
            const value = parseFloat(metric.dataset.metric);
            const format = metric.dataset.format || 'number';
            
            let formatFunction;
            switch (format) {
                case 'currency':
                    formatFunction = (val) => '$' + Math.round(val).toLocaleString();
                    break;
                case 'percentage':
                    formatFunction = (val) => Math.round(val * 10) / 10 + '%';
                    break;
                case 'millions':
                    formatFunction = (val) => Math.round(val) + 'M+';
                    break;
                default:
                    formatFunction = (val) => Math.round(val).toLocaleString();
            }

            tl.add(this.countUp(metric, {
                start: 0,
                end: value,
                duration,
                format: formatFunction
            }), index * stagger);
        });

        return tl;
    }

    navAnimation(activeButton, buttons, options = {}) {
        const {
            duration = 0.3,
            ease = "power2.out"
        } = options;

        const tl = gsap.timeline();

        buttons.forEach(button => {
            if (button === activeButton) {
                tl.to(button, {
                    scale: 1.05,
                    backgroundColor: "#1f2937",
                    color: "#ffffff",
                    duration,
                    ease
                }, 0);
            } else {
                tl.to(button, {
                    scale: 1,
                    backgroundColor: "transparent",
                    color: "#6b7280",
                    duration,
                    ease
                }, 0);
            }
        });

        return tl;
    }

    hoverEnhancement(element, options = {}) {
        const {
            scale = 1.02,
            lift = -2,
            shadow = "0 10px 25px rgba(0,0,0,0.15)",
            duration = 0.3,
            ease = "power2.out"
        } = options;

        const hoverIn = gsap.to(element, {
            scale,
            y: lift,
            boxShadow: shadow,
            duration,
            ease,
            paused: true
        });

        const hoverOut = gsap.to(element, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration,
            ease,
            paused: true
        });

        element.addEventListener('mouseenter', () => hoverIn.play());
        element.addEventListener('mouseleave', () => hoverOut.play());

        return { hoverIn, hoverOut };
    }

    initializeScrollAnimations() {
        if (typeof ScrollTrigger === 'undefined') return;

        const sections = document.querySelectorAll('.tnf-section');
        
        sections.forEach(section => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    enhanceInteractivity() {
        const interactiveElements = document.querySelectorAll(
            '.tier-card, .week-card, .format-card, .nav-button'
        );

        interactiveElements.forEach(element => {
            this.hoverEnhancement(element);
        });
    }

    playSequence(animations, options = {}) {
        const {
            onComplete = null,
            onStart = null
        } = options;

        const tl = gsap.timeline({ onComplete, onStart });

        animations.forEach((anim, index) => {
            const { target, animation, options: animOptions = {}, delay = 0 } = anim;
            
            if (this.animations[animation]) {
                tl.add(this.animations[animation](target, animOptions), delay);
            }
        });

        return tl;
    }

    reset() {
        if (this.timeline) {
            this.timeline.kill();
        }
        
        gsap.killTweensOf("*");
        this.isAnimating = false;
    }
}

const animationManager = new TNFAnimationManager();

document.addEventListener('DOMContentLoaded', () => {
    animationManager.initializeScrollAnimations();
    animationManager.enhanceInteractivity();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TNFAnimationManager, animationManager };
}