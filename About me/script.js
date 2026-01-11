// DOM Elements
const terminalLoader = document.getElementById('terminalLoader');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const typewriterElement = document.getElementById('typewriter');
const contactForm = document.getElementById('contactForm');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const viewDetailButtons = document.querySelectorAll('.view-details');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const personaButtons = document.querySelectorAll('.persona-btn');
const personaContents = document.querySelectorAll('.persona-content');

// Typewriter Text
const typewriterTexts = [
    "Security Architect",
    "Ethical Hacker",
    "Privacy Engineer",
    "VPN Infrastructure Expert",
    "Black100eyes"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Project Data
const projects = {
    vpn: {
        title: "Digital VPN Network",
        category: "VPN Infrastructure",
        status: "Active",
        description: "Enterprise-grade VPN infrastructure deployed across 50+ global locations with zero-log policy, military-grade encryption, and advanced traffic obfuscation for complete digital privacy.",
        technologies: ["WireGuard", "AES-256", "Docker", "Kubernetes", "BGP Routing", "OpenVPN"],
        features: [
            "Zero-log policy enforced at kernel level",
            "Global server network with intelligent routing",
            "Military-grade encryption (AES-256-GCM)",
            "Traffic obfuscation and protocol camouflage",
            "DDoS protection and mitigation",
            "24/7 monitoring and incident response"
        ],
        stats: {
            servers: "50+",
            users: "10,000+",
            uptime: "99.99%",
            locations: "25 countries"
        },
        links: {
            caseStudy: "#",
            documentation: "#"
        }
    },
    eyenet: {
        title: "EyeNet Surveillance Monitor",
        category: "Security Tool",
        status: "Active",
        description: "Advanced network monitoring system that detects surveillance attempts, unauthorized tracking, and data collection activities with real-time alerts and detailed security reporting.",
        technologies: ["Python", "Machine Learning", "Real-time Analysis", "Scapy", "WebSocket"],
        features: [
            "Real-time network traffic analysis",
            "Machine learning-based threat detection",
            "Surveillance pattern recognition",
            "Automated alert system",
            "Detailed security reports",
            "API for integration with other security tools"
        ],
        links: {
            github: "#",
            documentation: "#"
        }
    },
    gateway: {
        title: "Multi-Layer Privacy Gateway",
        category: "Privacy Solution",
        status: "Active",
        description: "Network-level privacy solution that routes traffic through multiple encrypted layers with traffic shape modification and protocol obfuscation for enhanced anonymity.",
        technologies: ["Go", "iptables", "SOCKS5", "TLS 1.3", "WireGuard"],
        features: [
            "Multi-layer encryption with different protocols",
            "Traffic shape modification to prevent fingerprinting",
            "Protocol obfuscation to bypass deep packet inspection",
            "Automatic failover between different routing methods",
            "Low-latency performance optimization"
        ],
        links: {
            github: "#"
        }
    },
    thailand: {
        title: "Thailand Government Security Audit",
        category: "Security Assessment",
        status: "Completed",
        description: "Comprehensive security assessment and penetration test of government infrastructure that uncovered critical vulnerabilities and led to nationwide security improvements.",
        findings: [
            "15+ critical vulnerabilities identified across 3 departments",
            "SQL injection vulnerabilities in citizen database portal",
            "Cross-site scripting (XSS) in public-facing web applications",
            "Remote code execution (RCE) vulnerabilities in legacy systems",
            "Insecure direct object references exposing sensitive data",
            "Lack of proper input validation and sanitization"
        ],
        impact: "Led to immediate patching of all critical vulnerabilities, establishment of new security protocols, and implementation of continuous monitoring systems across government infrastructure.",
        recognition: "Officially recognized by Cyber Security Thailand for responsible disclosure and collaboration. Invited as security consultant for critical national infrastructure projects."
    }
};

// Initialize Terminal Loader
function initTerminalLoader() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });

    setTimeout(() => {
        terminalLoader.style.opacity = '0';
        terminalLoader.style.visibility = 'hidden';
        setTimeout(() => {
            terminalLoader.style.display = 'none';
        }, 500);
    }, 3500);
}

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
}

// Initialize Mobile Menu
function initMobileMenu() {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Persona Toggle
function initPersonaToggle() {
    personaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const persona = button.getAttribute('data-persona');
            
            // Update active button
            personaButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding content
            personaContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${persona}-content`) {
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 10);
                }
            });
        });
    });
}

// Typewriter Effect
function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        typewriterElement.textContent += currentText.charAt(charIndex);
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Animate Numbers
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Nav Link on Scroll
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    function onScroll() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', onScroll);
    onScroll(); // Initialize
}

// Back to Top
function initBackToTop() {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Filtering
function initProjectFilters() {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Modal
function initProjectModal() {
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                let modalContent = `
                    <div class="modal-project">
                        <div class="modal-header">
                            <h3>${project.title}</h3>
                            <span class="modal-category">${project.category}</span>
                        </div>
                        <div class="modal-status">
                            <span class="status ${project.status.toLowerCase()}">${project.status}</span>
                        </div>
                        <div class="modal-description">
                            <p>${project.description}</p>
                        </div>
                `;
                
                if (project.technologies) {
                    modalContent += `
                        <div class="modal-tech">
                            <h4><i class="ri-tools-line"></i> Technologies Used</h4>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }
                
                if (project.features) {
                    modalContent += `
                        <div class="modal-features">
                            <h4><i class="ri-list-check"></i> Key Features</h4>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                if (project.stats) {
                    modalContent += `
                        <div class="modal-stats">
                            <h4><i class="ri-bar-chart-line"></i> Project Statistics</h4>
                            <div class="stats-grid">
                                ${Object.entries(project.stats).map(([key, value]) => `
                                    <div class="stat-item">
                                        <span class="stat-value">${value}</span>
                                        <span class="stat-label">${key.replace(/_/g, ' ')}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                if (project.findings) {
                    modalContent += `
                        <div class="modal-findings">
                            <h4><i class="ri-bug-line"></i> Key Findings</h4>
                            <ul>
                                ${project.findings.map(finding => `<li>${finding}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                if (project.impact) {
                    modalContent += `
                        <div class="modal-impact">
                            <h4><i class="ri-target-line"></i> Impact & Outcome</h4>
                            <p>${project.impact}</p>
                        </div>
                    `;
                }
                
                if (project.recognition) {
                    modalContent += `
                        <div class="modal-recognition">
                            <h4><i class="ri-award-line"></i> Recognition</h4>
                            <p>${project.recognition}</p>
                        </div>
                    `;
                }
                
                if (project.links) {
                    modalContent += `
                        <div class="modal-links">
                            <h4><i class="ri-external-link-line"></i> Links & Resources</h4>
                            <div class="link-buttons">
                                ${Object.entries(project.links).map(([key, value]) => `
                                    <a href="${value}" class="btn btn-small" target="_blank">
                                        <i class="ri-${key === 'github' ? 'github-line' : 'book-line'}"></i> ${key === 'github' ? 'Source Code' : key === 'caseStudy' ? 'Case Study' : key === 'documentation' ? 'Documentation' : key}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                modalContent += '</div>';
                modalBody.innerHTML = modalContent;
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact Form
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending process
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
            submitBtn.style.background = 'var(--success)';
            
            // Reset form
            this.reset();
            
            // Show notification
            showNotification('Message sent successfully! I will respond within 24 hours.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line';
    const color = type === 'success' ? 'var(--success)' : 'var(--danger)';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        border-left: 4px solid ${color};
        max-width: 400px;
    `;
    
    notification.querySelector('i').style.color = color;
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width') + '%';
                progressBar.style.width = width;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.cssText = `
                position: fixed;
                top: ${rect.top - 40}px;
                left: ${rect.left + rect.width / 2}px;
                transform: translateX(-50%);
                background: var(--bg-tertiary);
                color: var(--text-primary);
                padding: 6px 12px;
                border-radius: var(--radius-sm);
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                animation: fadeIn 0.2s ease forwards;
            `;
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                element._tooltip.remove();
                delete element._tooltip;
            }
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initTerminalLoader();
    initTheme();
    initMobileMenu();
    initPersonaToggle();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initTooltips();
    
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Animate numbers
    setTimeout(animateNumbers, 1500);
    
    // Animate skill bars
    setTimeout(animateSkillBars, 2000);
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Modal styles */
        .modal-project {
            color: var(--text-primary);
        }
        
        .modal-project .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .modal-project .modal-header h3 {
            margin: 0;
            flex: 1;
            min-width: 300px;
        }
        
        .modal-category {
            background: var(--primary);
            color: white;
            padding: 6px 16px;
            border-radius: var(--radius-full);
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }
        
        .modal-status {
            margin-bottom: 2rem;
        }
        
        .modal-status .status {
            padding: 8px 20px;
            border-radius: var(--radius-full);
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
        }
        
        .modal-status .status.active {
            background: var(--success);
            color: white;
        }
        
        .modal-status .status.completed {
            background: var(--primary);
            color: white;
        }
        
        .modal-description {
            margin-bottom: 2rem;
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        .modal-tech,
        .modal-features,
        .modal-stats,
        .modal-findings,
        .modal-impact,
        .modal-recognition,
        .modal-links {
            margin-bottom: 2.5rem;
        }
        
        .modal-tech h4,
        .modal-features h4,
        .modal-stats h4,
        .modal-findings h4,
        .modal-impact h4,
        .modal-recognition h4,
        .modal-links h4 {
            margin-bottom: 1rem;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .modal-features ul,
        .modal-findings ul {
            list-style: none;
            padding-left: 0;
        }
        
        .modal-features li,
        .modal-findings li {
            margin-bottom: 0.75rem;
            padding-left: 1.5rem;
            position: relative;
            line-height: 1.6;
        }
        
        .modal-features li::before,
        .modal-findings li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
        }
        
        .stat-item {
            background: var(--bg-tertiary);
            padding: 1.5rem 1rem;
            border-radius: var(--radius-md);
            text-align: center;
            transition: transform var(--transition);
        }
        
        .stat-item:hover {
            transform: translateY(-5px);
        }
        
        .stat-value {
            display: block;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            font-family: var(--font-mono);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            display: block;
            font-size: 0.9rem;
            color: var(--text-tertiary);
            text-transform: capitalize;
        }
        
        .modal-impact p,
        .modal-recognition p {
            line-height: 1.8;
            font-size: 1.1rem;
            background: var(--bg-tertiary);
            padding: 1.5rem;
            border-radius: var(--radius-md);
            border-left: 3px solid var(--primary);
        }
        
        .link-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .modal-links .btn {
            margin-top: 0.5rem;
        }
    `;
    document.head.appendChild(animationStyles);
});