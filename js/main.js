// CONFIGURAÇÃO
const PROJECTS_PER_PAGE = 7;

// VARIÁVEIS GLOBAIS
let currentProjects = MY_PROJECTS;
let currentFilter = 'all';
let currentPage = 1;

// ============================================
// FORMULÁRIO DE CONTATO - CORRIGIDO
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
        
        // Enviar para SEU Flask
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        console.log('📥 Resposta API:', result);
        
        // Mostrar mensagem
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
        
        // Auto-esconder mensagem
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
        // Restaurar botão
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
        e.preventDefault(); // IMPEDE o comportamento padrão
        
        // Coletar dados
        const formData = {
            name: this.querySelector('[name="name"]').value.trim(),
            email: this.querySelector('[name="email"]').value.trim(),
            message: this.querySelector('[name="message"]').value.trim()
        };
        
        console.log('📝 Dados do formulário:', formData);
        
        // Validar
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Enviar
        sendContactForm(formData);
    });
}

// ============================================
// RESTANTE DO CÓDIGO (mantenha igual)
// ============================================

// INICIALIZAR QUANDO PÁGINA CARREGAR
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
    // GitHub
    const githubProfile = document.getElementById('githubProfile');
    if (githubProfile) {
        githubProfile.style.cursor = 'pointer';
        githubProfile.onclick = () => window.open('https://github.com/ProfissionalJV/Portifolio-MCom', '_blank');
    }
    
    // LinkedIn
    const linkedinProfile = document.getElementById('linkedinProfile');
    if (linkedinProfile) {
        linkedinProfile.style.cursor = 'pointer';
        linkedinProfile.onclick = () => window.open('https://www.linkedin.com/in/vltech/', '_blank');
    }
    
    // Email
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        contactEmail.style.cursor = 'pointer';
        contactEmail.onclick = () => window.location.href = 'mailto:victorarsego1@gmail.com';
    }
    
    // 3. Formulário de contato
    setupContactForm();
    
    // 4. Renderizar projetos
    renderProjects();
    
    // 5. Atualizar footer stats
    updateFooterStats();
});

// FUNÇÕES EXISTENTES (mantenha igual)
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

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    // Calcular quais projetos mostrar
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const projectsToShow = currentProjects.slice(startIndex, endIndex);
    
    // Se não houver projetos
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
    
    // Gerar HTML dos projetos
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
            
            <div style="margin: 15px 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; border-left: 3px solid var(--primary-color);">
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <i class="fas fa-bullseye" style="color: var(--primary-color); margin-right: 8px;"></i>
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">${project.details.objective}</span>
                </div>
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
    
    // Adicionar event listeners para botões de detalhes
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            showProjectDetails(projectId);
        });
    });
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

function showProjectDetails(projectId) {
    const project = MY_PROJECTS.find(p => p.id === projectId);
    if (!project) return;
    
    // Criar modal
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
    
    // Fechar modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}
