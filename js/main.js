// CONFIGURAÇÃO
const PROJECTS_PER_PAGE = 7;

// VARIÁVEIS GLOBAIS
let currentProjects = MY_PROJECTS;
let currentFilter = 'all';
let currentPage = 1;

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function isMobile() {
    return window.innerWidth <= 768;
}

function getProjectIcon(category) {
    const icons = {
        'Workflow Automation': 'fas fa-briefcase',
        'Web Interfaces': 'fas fa-globe',
        'Document Systems': 'fas fa-folder-open',
        'Data Extraction': 'fas fa-database'
    };
    return icons[category] || 'fas fa-code';
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

async function sendContactForm(formData) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Feedback visual
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        if (formMessage) formMessage.style.display = 'none';
        
        console.log('📤 Enviando para API:', formData);
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        console.log('📥 Resposta API:', result);
        
        if (formMessage) {
            formMessage.innerHTML = result.message;
            formMessage.style.display = 'block';
            
            if (result.success) {
                formMessage.style.background = 'rgba(16, 185, 129, 0.15)';
                formMessage.style.border = '2px solid #10B981';
                formMessage.style.color = '#10B981';
                document.getElementById('contactForm').reset();
            } else {
                formMessage.style.background = 'rgba(239, 68, 68, 0.15)';
                formMessage.style.border = '2px solid #EF4444';
                formMessage.style.color = '#EF4444';
            }
        }
        
        setTimeout(() => {
            if (formMessage) formMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('❌ Erro:', error);
        
        if (formMessage) {
            formMessage.innerHTML = '⚠️ Erro de conexão. Use o email direto abaixo.';
            formMessage.style.background = 'rgba(245, 158, 11, 0.15)';
            formMessage.style.border = '2px solid #F59E0B';
            formMessage.style.color = '#F59E0B';
            formMessage.style.display = 'block';
        }
        
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('❌ Formulário não encontrado!');
        return;
    }
    
    console.log('✅ Formulário configurado');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('[name="name"]').value.trim(),
            email: this.querySelector('[name="email"]').value.trim(),
            message: this.querySelector('[name="message"]').value.trim()
        };
        
        console.log('📝 Dados do formulário:', formData);
        
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        sendContactForm(formData);
    });
}

// ============================================
// PROJETOS - FILTROS E PAGINAÇÃO
// ============================================

function generateCategoryFilters() {
    const filterContainer = document.getElementById('filterButtons');
    if (!filterContainer) return;

    const categories = [...new Set(MY_PROJECTS.map(p => p.category))];
    
    // Limpar filtros existentes (exceto "Todos" e "Destaques")
    const existingButtons = filterContainer.querySelectorAll('.filter-btn');
    existingButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter !== 'all' && filter !== 'featured') {
            btn.remove();
        }
    });

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', category);
        btn.textContent = category;
        
        const lastBtn = filterContainer.querySelector('.filter-btn[data-filter="featured"]');
        if (lastBtn) {
            filterContainer.insertBefore(btn, lastBtn);
        } else {
            filterContainer.appendChild(btn);
        }
    });

    filterContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            applyFilter(filter);
        }
    });
}

function applyFilter(filter) {
    currentFilter = filter;
    currentPage = 1;
    
    if (filter === 'all') {
        currentProjects = MY_PROJECTS;
    } else if (filter === 'featured') {
        currentProjects = MY_PROJECTS.filter(p => p.featured);
    } else {
        currentProjects = MY_PROJECTS.filter(p => p.category === filter);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        currentProjects = currentProjects.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.technologies.some(t => t.toLowerCase().includes(searchTerm)) ||
            p.topics.some(t => t.toLowerCase().includes(searchTerm))
        );
    }
    
    renderProjects();
}

// ============================================
// RENDERIZAÇÃO DE PROJETOS
// ============================================

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    // Ajustar grid para mobile
    if (isMobile()) {
        container.style.gridTemplateColumns = '1fr';
    }
    
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const projectsToShow = currentProjects.slice(startIndex, endIndex);
    
    if (projectsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results glass">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>Nenhum projeto encontrado</h3>
                <p>Tente usar outro filtro ou termo de busca.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = projectsToShow.map(project => `
        <div class="project-card glass">
            <div class="project-header">
                <div class="project-icon">
                    <i class="${getProjectIcon(project.category)}"></i>
                </div>
                <div class="project-stats">
                    <div class="stat-badge" title="Estrelas">
                        <i class="fas fa-star"></i>
                        <span>${project.stars}</span>
                    </div>
                    <div class="stat-badge" title="Forks">
                        <i class="fas fa-code-branch"></i>
                        <span>${project.forks}</span>
                    </div>
                </div>
            </div>
            
            <h3>${project.name}</h3>
            <p style="margin-bottom: 15px; color: var(--text-color); font-weight: 500;">
                ${project.description}
            </p>
            
            <div class="project-tags">
                ${project.technologies.slice(0, 4).map(tech => `
                    <span class="tag">${tech}</span>
                `).join('')}
                ${project.topics.slice(0, 2).map(topic => `
                    <span class="tag" style="background: rgba(139, 0, 0, 0.2);">${topic}</span>
                `).join('')}
            </div>
            
            <div class="project-objective">
                <i class="fas fa-bullseye"></i>
                <span>${project.details.objective}</span>
            </div>
            
            <div class="project-links">
                <a href="${project.githubUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> Ver Código
                </a>
                ${project.demoUrl ? `
                    <a href="${project.demoUrl}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                ` : ''}
                <button class="project-link view-details-btn" data-project-id="${project.id}" style="margin-left: auto;">
                    <i class="fas fa-info-circle"></i> Detalhes
                </button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            showProjectDetails(projectId);
        });
    });
}

function showProjectDetails(projectId) {
    const project = MY_PROJECTS.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass" style="max-width: 800px; margin: 50px auto; padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); -webkit-background-clip: text; background-clip: text; color: transparent;">
                    ${project.name}
                </h2>
                <button class="close-modal" style="background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                <p style="margin: 0; font-size: 1.1rem;">${project.fullDescription}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 20px;">
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 10px;">
                        <i class="fas fa-bullseye"></i> Objetivo
                    </h4>
                    <p>${project.details.objective}</p>
                    
                    <h4 style="color: var(--primary-color); margin-top: 20px; margin-bottom: 10px;">
                        <i class="fas fa-tools"></i> Ferramentas Utilizadas
                    </h4>
                    <p>${project.details.tools}</p>
                    
                    <h4 style="color: var(--primary-color); margin-top: 20px; margin-bottom: 10px;">
                        <i class="fas fa-chart-line"></i> Resultado Final
                    </h4>
                    <p>${project.details.impact}</p>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-color); margin-bottom: 10px;">
                        <i class="fas fa-lightbulb"></i> Exemplo Prático
                    </h4>
                    <p>${project.details.solution}</p>
                    
                    <h4 style="color: var(--accent-color); margin-top: 20px; margin-bottom: 10px;">
                        <i class="fas fa-cogs"></i> Tecnologias
                    </h4>
                    <div class="project-tags" style="margin-top: 10px;">
                        ${project.technologies.map(tech => `
                            <span class="tag">${tech}</span>
                        `).join('')}
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span><i class="fas fa-calendar"></i> Ano: ${project.year}</span>
                            <span><i class="fas fa-tag"></i> ${project.category}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span><i class="fas fa-star"></i> Estrelas: ${project.stars}</span>
                            <span><i class="fas fa-code-branch"></i> Forks: ${project.forks}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
                <a href="${project.githubUrl}" target="_blank" class="cta-button">
                    <i class="fab fa-github"></i> Ver Código no GitHub
                </a>
                ${project.demoUrl ? `
                    <a href="${project.demoUrl}" target="_blank" class="cta-button" style="background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));">
                        <i class="fas fa-external-link-alt"></i> Ver Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ============================================
// FOOTER STATS
// ============================================

function updateFooterStats() {
    const totalStars = MY_PROJECTS.reduce((sum, p) => sum + p.stars, 0);
    const totalForks = MY_PROJECTS.reduce((sum, p) => sum + p.forks, 0);
    const techSet = new Set();
    MY_PROJECTS.forEach(p => p.technologies.forEach(t => techSet.add(t)));
    
    const footerStats = document.getElementById('githubStats');
    if (!footerStats) return;
    
    footerStats.innerHTML = `
        <div class="github-stat">
            <div class="stat-number">${MY_PROJECTS.length}</div>
            <div class="stat-label">Projetos</div>
        </div>
        <div class="github-stat">
            <div class="stat-number">${totalStars}</div>
            <div class="stat-label">Estrelas</div>
        </div>
        <div class="github-stat">
            <div class="stat-number">${totalForks}</div>
            <div class="stat-label">Forks</div>
        </div>
        <div class="github-stat">
            <div class="stat-number">${techSet.size}</div>
            <div class="stat-label">Tecnologias</div>
        </div>
    `;
}

// ============================================
// RESPONSIVIDADE
// ============================================

function adjustForMobile() {
    if (isMobile() && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 400 } },
                color: { value: ["#3b82f6", "#8b0000", "#dc2626"] },
                shape: { type: "circle" },
                opacity: { value: 0.4, random: true },
                size: { value: 2.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: "#3b82f6",
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = isMobile() ? 60 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio inicializando...');
    
    // 1. Inicializar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#3b82f6", "#8b0000", "#dc2626"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // 2. Configurar links clicáveis
    const socialLinks = {
        'githubProfile': 'https://github.com/ProfissionalJV/Portifolio-MCom',
        'linkedinProfile': 'https://www.linkedin.com/in/vltech/',
        'contact-email': 'mailto:victorarsego1@gmail.com'
    };
    
    Object.keys(socialLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.cursor = 'pointer';
            element.onclick = () => {
                if (id === 'contact-email') {
                    window.location.href = socialLinks[id];
                } else {
                    window.open(socialLinks[id], '_blank');
                }
            };
        }
    });
    
    // 3. Formulário de contato
    setupContactForm();
    
    // 4. Gerar filtros de categorias
    generateCategoryFilters();
    
    // 5. Renderizar projetos
    renderProjects();
    
    // 6. Atualizar footer stats
    updateFooterStats();
    
    // 7. Configurar busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilter(currentFilter);
        });
    }
    
    // 8. Ajustes mobile
    adjustForMobile();
    setupSmoothScroll();
    
    // 9. Reajustar ao redimensionar
    window.addEventListener('resize', function() {
        adjustForMobile();
        renderProjects();
    });
});
