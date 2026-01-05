// CONFIGURAÇÃO
const PROJECTS_PER_PAGE = 7;

// VARIÁVEIS GLOBAIS
let currentProjects = MY_PROJECTS;
let currentFilter = 'all';
let currentPage = 1;

// INICIALIZAR QUANDO PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio inicializando...');
    
    // 1. Inicializar partículas
    initParticles();
    
    // 2. Configurar links clicáveis
    setupClickableLinks();
    
    // 3. Configurar eventos
    setupEventListeners();

    // 4. Renderizar categorias dinamicamente
    generateCategoryFilters();
    
    // 5. Renderizar projetos
    renderProjects();
    
    // 6. Atualizar footer stats
    updateFooterStats();

    // 7. Configurar telefone protegido
    setupProtectedPhone();
});

// INICIALIZAR PARTÍCULAS
function initParticles() {
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
}

// CONFIGURAR LINKS CLICÁVEIS
function setupClickableLinks() {
    // GitHub
    const githubProfile = document.getElementById('githubProfile');
    if (githubProfile) {
        githubProfile.style.cursor = 'pointer';
        githubProfile.onclick = () => window.open('https://github.com/ProfissionalJV/Portifolio-MCom', '_blank');
    }
    
    // LinkedIn - CORRIGIDO
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

     // Telefone (WhatsApp)
    const contactPhone = document.getElementById('contact-phone');
    if (contactPhone) {
        contactPhone.style.cursor = 'pointer';
        contactPhone.onclick = () => window.open('https://wa.me/5561999682366', '_blank');
    }
}

// ATUALIZAR FOOTER STATS
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

function generateCategoryFilters() {
    const filterContainer = document.getElementById('filterButtons');
    if (!filterContainer) return;

    // Coletar categorias únicas
    const categories = [...new Set(MY_PROJECTS.map(p => p.category))];

    // Remover botões antigos (menos all e featured)
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter !== 'all' && filter !== 'featured') {
            btn.remove();
        }
    });

    // Criar botões dinamicamente
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', category);
        btn.textContent = category;
        filterContainer.appendChild(btn);
    });
}

// RENDERIZAR PROJETOS
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

// FUNÇÃO PARA OBTER ÍCONE DO PROJETO
function getProjectIcon(category) {
   const icons = {
    'Workflow Automation': 'fas fa-briefcase',
    'Web Interfaces': 'fas fa-globe',
    'Document Systems': 'fas fa-folder-open',
    'Data Extraction': 'fas fa-database'
    };
    return icons[category] || 'fas fa-code';
}

// MOSTRAR DETALHES DO PROJETO
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

// APLICAR FILTRO
function applyFilter(filter) {
    currentFilter = filter;
    currentPage = 1;
    
    if (filter === 'all') {
        currentProjects = MY_PROJECTS;
    } else if (filter === 'featured') {
        currentProjects = MY_PROJECTS.filter(p => p.featured);
    } else if (filter === 'Python') {
        currentProjects = MY_PROJECTS.filter(p => p.technologies.includes('Python'));
    } else {
        currentProjects = MY_PROJECTS.filter(p => p.category === filter);
    }
    
    // Aplicar busca se houver
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

// CONFIGURAR EVENT LISTENERS
function setupEventListeners() {
    // Filtros
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        filterContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Atualizar botão ativo
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Aplicar filtro
                const filter = e.target.getAttribute('data-filter');
                applyFilter(filter);
            }
        });
    }
    
    // Busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilter(currentFilter);
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Atualizar navegação ativa
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
   // ============================================
// FORMULÁRIO DE CONTATO - FLASK PERSONALIZADO
// ============================================

async function sendContactForm(formData) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Feedback visual
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Enviar para SEU Flask
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // SUCESSO - mostrar feedback amigável
            showFormMessage('success', result.message);
            document.getElementById('contactForm').reset();
        } else {
            // ERRO - mostrar email alternativo
            showFormMessage('error', 
                result.message + '<br><br>' +
                '<strong>📧 Envie diretamente para:</strong><br>' +
                '<a href="mailto:victorarsego1@gmail.com" style="color: white; text-decoration: underline;">victorarsego1@gmail.com</a>'
            );
        }
        
    } catch (error) {
        // ERRO DE REDE - email direto
        showFormMessage('error', 
            'Problema de conexão.<br><br>' +
            '<strong>📧 Use o email direto:</strong><br>' +
            '<a href="mailto:victorarsego1@gmail.com" style="color: white; text-decoration: underline;">victorarsego1@gmail.com</a>'
        );
        console.error('Erro:', error);
        
    } finally {
        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showFormMessage(type, message) {
    // Criar ou atualizar div de mensagem
    let messageDiv = document.getElementById('formMessage');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'formMessage';
        messageDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-size: 0.95rem;
        `;
        document.getElementById('contactForm').appendChild(messageDiv);
    }
    
    // Estilo por tipo
    if (type === 'success') {
        messageDiv.style.background = 'rgba(16, 185, 129, 0.2)';
        messageDiv.style.border = '2px solid #10B981';
        messageDiv.style.color = '#10B981';
    } else {
        messageDiv.style.background = 'rgba(239, 68, 68, 0.2)';
        messageDiv.style.border = '2px solid #EF4444';
        messageDiv.style.color = '#EF4444';
    }
    
    // Conteúdo
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        ${message}
    `;
    messageDiv.style.display = 'block';
    
    // Auto-esconder após 8 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 8000);
}

// Inicializar formulário
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const formData = {
                name: this.querySelector('[name="name"]').value.trim(),
                email: this.querySelector('[name="email"]').value.trim(),
                message: this.querySelector('[name="message"]').value.trim()
            };
            
            // Validar
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('error', 'Preencha todos os campos obrigatórios.');
                return;
            }
            
            // Enviar
            sendContactForm(formData);
        });
    }
});
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
    // Atualizar navegação ativa no scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    // Adicione esta função NO FINAL do seu main.js (antes do fechamento)
function setupProtectedPhone() {
    const revealBtn = document.getElementById('whatsappRevealer');
    const phoneContainer = document.getElementById('phoneContainer');
    const realPhoneNumber = document.getElementById('realPhoneNumber');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (!revealBtn) return; // Se não existir, sai
    
    // Número ofuscado em partes - DIFICULTA SCRAPERS
    const phoneData = {
        country: '55',
        ddd: '61',
        part1: '999',
        part2: '68',
        part3: '23',
        part4: '66'
    };
    
    revealBtn.addEventListener('click', function() {
        // Constrói o número completo
        const fullNumber = `+${phoneData.country} (${phoneData.ddd}) ${phoneData.part1}${phoneData.part2}-${phoneData.part3}${phoneData.part4}`;
        const cleanNumber = phoneData.country + phoneData.ddd + phoneData.part1 + phoneData.part2 + phoneData.part3 + phoneData.part4;
        
        // Mostra o número
        realPhoneNumber.textContent = fullNumber;
        phoneContainer.style.display = 'block';
        
        // Configura link do WhatsApp
        whatsappLink.href = `https://wa.me/${cleanNumber}`;
        whatsappLink.target = '_blank';
        
        // Atualiza o botão
        this.innerHTML = '<i class="fas fa-check"></i> Número Revelado';
        this.classList.add('revealed');
        this.disabled = true;
        
        // Log (para você monitorar quem revela)
        console.log('🔒 WhatsApp número revelado por visitante');
        
        // Adiciona evento de clique no número para copiar
        realPhoneNumber.style.cursor = 'pointer';
        realPhoneNumber.title = 'Clique para copiar';
        realPhoneNumber.onclick = function() {
            navigator.clipboard.writeText(fullNumber.replace(/\D/g, '')).then(() => {
                const originalText = this.textContent;
                this.textContent = '✓ Copiado!';
                setTimeout(() => this.textContent = originalText, 2000);
            });
        };
    });
}

}
