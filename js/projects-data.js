// SEU PERFIL
const YOUR_INFO = {
    name: "Victor A. Lêla",
    email: "victorarsego1@gmail.com",
    phone: "+55 (61) 99968-2366",
    location: "Brasília, Brasil",
    github: "github.com/ProfissionalJV",
    linkedin: "linkedin.com/in/vltech",
    bio: `👨‍💻 Desenvolvedor focado em automação, análise de dados e soluções web
🎓 Engenharia da Computação (5º semestre) & Gestão Pública (5º semestre)
💡 Especialista em otimizar processos e resolver problemas com tecnologia`
};

// MEUS PROJETOS REAIS
const MY_PROJECTS = [
    {
        id: 1,
        name: "Automatização de Planilhas Excel",
        description: "📊 Automatização de Planilhas em Excel (VBA) - Consolidar dados de diferentes anos em uma base única",
        fullDescription: "Sistema VBA que automatiza a interligação e preenchimento de planilhas de diferentes anos, somando valores e gerando relatórios automatizados de retiradas de lotes empresariais.",
        technologies: ["Excel", "VBA", "Tabelas Dinâmicas"],
        githubUrl: "https://github.com/ProfissionalJV/excel-automation.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Workflow Automation",
        year: 2024,
        status: "Concluído",
        featured: true,
        topics: ["dynamic-tables", "data-consolidation", "reports"],
        details: {
            objective: "Automatizar a interligação e preenchimento de dados em planilhas de diferentes anos",
            problem: "Processamento manual de múltiplas planilhas empresariais",
            solution: "Sistema VBA que consolida dados automaticamente",
            impact: "Criação de base consolidada + relatórios automatizados + redução de erros manuais",
            tools: "Excel, VBA (Visual Basic for Applications)"
        }
    },
    {
        id: 2,
        name: "Site de Apresentação de Dados",
        description: "🌐 Apresentação de Dados (Google Sites) - Sistema para consulta de entregas do Programa Computadores para Inclusão",
        fullDescription: "Site desenvolvido no Google Sites para apresentar de forma prática e visual todas as entregas do programa em eventos de prefeitos, com integração ao Google Sheets.",
        technologies: ["Google Sites", "Google Sheets", "Web Presentation", "Data Visualization"],
        githubUrl: "https://github.com/ProfissionalJV/google-sites-presentation.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Web Interfaces",
        year: 2024,
        status: "Concluído",
        featured: true,
        topics: ["data-presentation", "public-policy", "transparency"],
        details: {
            objective: "Apresentar de forma prática e visual todas as entregas do programa Computadores para Inclusão",
            problem: "Falta de transparência e dificuldade de consulta em eventos públicos",
            solution: "Site simples para consulta de entregas e formações por estado",
            impact: "Transparência nos resultados + facilidade de consulta + visualização amigável",
            tools: "Google Sites, Google Sheets"
        }
    },
    {
        id: 3,
        name: "SECPI - Sistema de Extração de Certificados",
        description: "🏅 Sistema de Extração de Certificados (Python) - Extrai informações de certificados e consolida em base de dados",
        fullDescription: "Sistema Python com interface Streamlit que extrai automaticamente informações de certificados (PDF) e retorna tabela estruturada com nome, curso, carga horária e data.",
        technologies: ["Python", "Streamlit", "Pandas", "HTML/CSS"],
        githubUrl: "https://github.com/ProfissionalJV/certificates-extraction.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Data Extraction",
        year: 2025,
        status: "Ativo",
        featured: true,
        topics: ["certificates", "pdf-extraction", "data-processing"],
        details: {
            objective: "Extrair informações de diferentes modelos de certificados e consolidá-las em base de dados",
            problem: "Processamento manual e propenso a erros de certificados digitais",
            solution: "Sistema web que processa PDFs e extrai dados automaticamente",
            impact: "Processamento em segundos + zero erros de digitação + otimização de tempo",
            tools: "Python, HTML + CSS, Pandas/Streamlit"
        }
    },
    {
        id: 4,
        name: "Sistema de Busca de Documentos",
        description: "📂 Busca Rápida de Documentos (AppsScript) - Localiza termos de doação em PDFs rapidamente",
        fullDescription: "Sistema em Google AppsScript que facilita a busca e comprovação de entregas localizando termos de doação por nome, estado, centro doador, ano ou município.",
        technologies: ["Google AppsScript", "Google Sheets", "Google Drive"],
        githubUrl: "https://github.com/ProfissionalJV/document-search.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Document Systems",
        year: 2025,
        status: "Ativo",
        featured: true,
        topics: ["document-search", "googlescripts", "pdf-search"],
        details: {
            objective: "Facilitar a busca e comprovação de entregas por meio de sistema de localização rápida",
            problem: "Busca manual demorada em grandes volumes de documentos PDF",
            solution: "Sistema integrado que busca termos em segundos",
            impact: "Documentos encontrados em segundos + redução de tempo em auditorias + organização centralizada",
            tools: "Google Sheets, Google Drive, Google AppsScript"
        }
    },
    {
        id: 5,
        name: "Automação de Email",
        description: "📧 Automatização de Envio de Emails (AppsScript) - Dispara formulários de satisfação automaticamente",
        fullDescription: "Script Google AppsScript que automatiza o disparo de formulários de satisfação para pontos de inclusão digital, com personalização por nome, quantidade e data.",
        technologies: ["Google AppsScript", "Google Sheets", "Google Forms"],
        githubUrl: "https://github.com/ProfissionalJV/email-automation.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Workflow Automation",
        year: 2024,
        status: "Concluído",
        featured: true,
        topics: ["email-automation", "googlescripts", "forms"],
        details: {
            objective: "Automatizar o disparo de formulários de satisfação para pontos de inclusão digital",
            problem: "Envio manual de dezenas de emails personalizados",
            solution: "Script que lê base de dados e dispara emails automaticamente",
            impact: "Envio automático de dezenas de emails + personalização completa + economia de horas",
            tools: "Google Sheets, Google AppsScript"
        }
    },
    {
        id: 6,
        name: "Automação PowerPoint",
        description: "🎥 Automatização de Apresentações PowerPoint (VBA) - Integra dados de tabelas dinâmicas em PPT",
        fullDescription: "Sistema VBA que integra dados de tabelas dinâmicas do Excel em apresentações PowerPoint, atualizando mapas e gráficos automaticamente com um clique.",
        technologies: ["Excel", "PowerPoint", "VBA"],
        githubUrl: "https://github.com/ProfissionalJV/ppt-automation.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Workflow Automation",
        year: 2024,
        status: "Concluído",
        featured: true,
        topics: ["data-integration", "reports", "vba"],
        details: {
            objective: "Integrar dados de tabelas dinâmicas em apresentações PPT para atualização automática",
            problem: "Atualização manual e propensa a erros em apresentações recorrentes",
            solution: "Sistema que capta dados e alimenta apresentações automaticamente",
            impact: "Apresentações 100% atualizadas em segundos + agilidade para relatórios + redução de retrabalho",
            tools: "Excel, Tabelas Dinâmicas, VBA (Visual Basic for Applications)"
        }
    },
    {
        id: 7,
        name: "Desafio Sumaúma Digital",
        description: "🌳 Quiz educativo (HTML/CSS) + residômetro de REEE (Power Bi) - para conscientização ambiental da semana nacional de ciência e tecnologia com multirão pré COP30",
        fullDescription: "Solução educativa e analítica desenvolvida para o Ministério das Comunicações no contexto de preparação para a COP30. O projeto integra um quiz interativo sobre sustentabilidade e descarte correto de resíduos eletrônicos (REEE) e um residômetro em Power BI para visualização da arrecadação de REEE, apresentado durante a Semana Nacional de Ciência e Tecnologia 2025",
        technologies: ["HTML/CSS", "JavaScript", "Power BI"],
        githubUrl: "https://github.com/ProfissionalJV/Desafio-Sumauma-Digital.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Web Interfaces",
        year: 2025,
        status: "Concluído",
        featured: true,
        topics: ["cop30", "interactive-quiz", "residuometro", "power-bi"],
        details: {
            objective: "Promover educação ambiental e acompanhar visualmente a arrecadação de resíduos eletrônicos no Desafio Sumaúma Digital",
            problem: "Falta de conscientização sobre descarte correto de REEE e necessidade de monitoramento da arrecadação",
            solution: "Quiz interativo para educação e residômetro em Power BI para visualização de dados",
            impact: "Engajamento do público em evento científico nacional + apoio à comunicação institucional + visualização clara de dados ambientais",
            tools: "HTML, CSS, JavaScript (quiz interativo) e Power BI (residômetro e análise de dados)"
        }
    },
    {
        id: 8,
        name: "Calendário MCom",
        description: "📅 Sistema de Gestão de Viagens e Eventos - Alinhamento de agenda com resumos individualizados automáticos",
        fullDescription: "Sistema web desenvolvido para gerenciar a agenda de viagens e eventos do Ministério das Comunicações. Permite cadastrar compromissos, controlar presenças e gera automaticamente resumos individualizados para cada participante, com dados salvos via API em banco próprio.",
        technologies: ["HTML", "CSS", "JavaScript", "API REST"],
        githubUrl: "https://github.com/ProfissionalJV/calendario_mcom.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Web Interfaces",
        year: 2026,
        status: "Ativo",
        featured: true,
        topics: ["calendar", "event-management", "team-sync", "automation"],
        details: {
            objective: "Centralizar e automatizar a gestão de viagens e eventos da equipe do ministério",
            problem: "Agenda descentralizada e falta de controle de presença em eventos da coordenação",
            solution: "Sistema web com cadastro de eventos, controle de participantes e robô gerador de resumos individuais",
            impact: "Agenda unificada + resumos automáticos + controle de presença + economia de tempo da equipe",
            tools: "HTML, CSS, JavaScript, API REST, banco de dados via GitHub"
        }
    },
    {
        id: 9,
        name: "CPIQuest - Jogo Educativo",
        description: "🎮 Jogo gameficado com 3 mundos, 30 fases e ranking - Estagiários aprendem sobre TI e o ministério de forma interativa",
        fullDescription: "Jogo educativo desenvolvido em Python com interface web para os estagiários do Ministério das Comunicações. Possui 3 mundos temáticos (Informática Básica, Ministério, Coordenação), 30 fases progressivas e 1 fase bônus com pegadinhas como embaralhamento de questões e distratores que piscam aleatoriamente. Inclui sistema de ranking com premiação para os 3 melhores colocados.",
        technologies: ["Python", "HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/ProfissionalJV/CPIQUEST.git",
        demoUrl: null,
        stars: 0,
        forks: 0,
        category: "Web Interfaces",
        year: 2026,
        status: "Ativo",
        featured: true,
        topics: ["game", "education", "quiz", "ranking", "gamification"],
        details: {
            objective: "Ensinar informática básica e conhecimentos institucionais de forma gameficada para estagiários",
            problem: "Treinamento tradicional pouco engajador e baixa retenção de conhecimento entre os estagiários",
            solution: "Jogo com 3 mundos temáticos, 30 fases, fase bônus com pegadinhas e ranking competitivo",
            impact: "Engajamento dos estagiários + aprendizado lúdico + retenção de conhecimento + premiação top 3",
            tools: "Python, HTML, CSS, JavaScript, sistema de ranking em tempo real"
        }
    }

];

// ==================== PROJETOS EDUCACIONAIS ====================
const EDUCATIONAL_PROJECTS = [
    {
        id: "edu-1",
        name: "Apresentação Pessoal",
        description: "Esta página foi desenvolvida como uma apresentação pessoal para que o professor pudesse conhecer melhor cada aluno, seus objetivos e expectativas para a disciplina.",
        technologies: ["HTML", "CSS"],
        fileUrl: "/faculdade/apresentacao.html",
        githubUrl: "https://github.com/FaculdadeJV/ApresentacaoPessoal.git",
        icon: "fa-user-astronaut",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-2",
        name: "Listas, Tabelas e Forms",
        description: "Construção da interface digital da academia de alto rendimento Athlete Factory, destinada exclusivamente a atletas de elite. As vagas sao limitadas e direcionadas apenas aos melhores candidatos.",
        technologies: ["HTML", "CSS"],
        fileUrl: "/faculdade/listas.html",
        githubUrl: "https://github.com/FaculdadeJV/Athlete_Factory.git",
        icon: "fa-table-list",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-3",
        name: "Menu, Classes e Mídia",
        description: "Uma página web informativa desenvolvida para apresentar os 10 conceitos fundamentais da Física de forma clara, visual e interativa.",
        technologies: ["HTML", "CSS", "Flexbox", "Grid"],
        fileUrl: "/faculdade/menu.html",
        githubUrl: "https://github.com/FaculdadeJV/Academia-de-Ciencias-Fisicas_Web.git",
        icon: "fa-image",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-4",
        name: "Cards, Áudio e Fundo",
        description: "Página oficial simulada com cards musicais contendo título da música, trecho do refrão, player de áudio e data de publicação. Menu de navegação fixo e imagem de fundo personalizada (foto própria).",
        technologies: ["HTML", "CSS", "Glassmorphism"],
        fileUrl: "/faculdade/cards.html",
        githubUrl: "https://github.com/FaculdadeJV/Landing_Page.git",
        icon: "fa-music",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-5",
        name: "Botões, Alertas e Login",
        description: "Uma interface de login moderna e interativa, desenvolvida para demonstrar conceitos de validação de formulários, efeitos visuais com glassmorphism e animações líquidas em CSS.",
        technologies: ["HTML", "CSS", "JavaScript"],
        fileUrl: "/faculdade/login.html",
        githubUrl: "https://github.com/FaculdadeJV/Tela-de-Login.git",
        icon: "fa-right-to-bracket",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-6",
        name: "Landing Page E-commerce",
        description: "Uma landing page premium para uma loja gamer, desenvolvida com visual neon futurista (vermelho e azul), vídeo de fundo no YouTube, cards de produtos com efeitos de destaque e seções organizadas para promover três itens estratégicos: o jogo ARK 2 (lançamento), a Cadeira Snake Lancaster (baixa procura) e o Suporte Gaming BG500 (alto estoque).",
        technologies: ["HTML", "CSS", "Responsivo"],
        fileUrl: "/faculdade/e-comerce.html",
        githubUrl: "https://github.com/FaculdadeJV/Landing_e-comerce.git",
        icon: "fa-store",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-7",
        name: "Bootstrap 5",
        description: "Uma tabela periódica interativa e totalmente funcional, desenvolvida com Bootstrap 5 e estendida para suportar 18 colunas – algo que o grid nativo do framework não oferece. Cada elemento químico é apresentado com sua sigla e nome completo, além de uma classificação por cores baseada em um critério lúdico: o “risco de lamber”.", 
        technologies: ["HTML", "CSS", "Bootstrap"],
        fileUrl: "/faculdade/bootstrap.html",
        githubUrl: "https://github.com/FaculdadeJV/Tabela_Periodica.git",
        icon: "fa-bootstrap",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-8",
        name: "Ensaio Fotográfico",
        description: "Um site de portfólio moderno e responsivo desenvolvido para o fotógrafo Douglas Matos, especializado em ensaios de 15 anos, crianças, gravidez e noivas. O projeto utiliza glassmorphism, galerias horizontais com rolagem por arrasto, zoom interativo, menu responsivo com sidebar de atalhos e um formulário de contato inovador no estilo mad‑libs. Foi criado como atividade acadêmica para a disciplina de Desenvolvimento Web, demonstrando o uso de CSS avançado, JavaScript puro e integração modular com Bootstrap 5.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        fileUrl: "/faculdade/fotografia.html",
        githubUrl: "https://github.com/FaculdadeJV/Fotografia_Portfolio.git",
        icon: "fa-camera",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-9",
        name: "World Cup 2026",
        description: "Site oficial da tabela da Copa do Mundo 2026 da PANINI, desenvolvido com HTML5, CSS3 e Bootstrap 5.3. Apresenta os 12 grupos da competição, classificação das 48 seleções, chaveamento completo da fase eliminatória e um sistema de navegação com Scrollspy que destaca automaticamente a seleção visível durante a rolagem.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        fileUrl: "/faculdade/worldcup.html",
        githubUrl: "https://github.com/FaculdadeJV/World_Cup.git",
        icon: "fa-futbol",
        category: "educacional",
        semester: "1º sem/2026"
    },
    {
        id: "edu-10",
        name: "Dindins Dona Socorro",
        description: "Landing page desenvolvida para a Dindins Dona Socorro, uma empresa tradicional no segmento de gelados artesanais que atua desde 1994. O site foi projetado para ampliar a divulgação da marca, fortalecer sua presença digital e atrair novos franqueados e parceiros comerciais.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        fileUrl: "/faculdade/dindins.html",
        githubUrl: "https://github.com/FaculdadeJV/Dindins_DonaSocorro.git",
        icon: "fa-utensils",
        category: "educacional",
        semester: "1º sem/2026"
    }
];

// ==================== RELATÓRIOS (PDFs) ====================
const REPORTS = [
    {
        id: "report-1",
        name: "Relatório - Listas, Tabelas e Forms",
        description: "Documentação do projeto de listas, tabelas e formulários",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio1.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-2",
        name: "Relatório - Menu, Classes e Mídia",
        description: "Documentação do projeto de menu, classes e mídia",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio2.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-3",
        name: "Relatório - Cards, Áudio e Fundo",
        description: "Documentação do projeto de cards, áudio e fundo",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio3.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-4",
        name: "Relatório - Botões, Alertas e Login",
        description: "Documentação do projeto de botões, alertas e login",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio4.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-5",
        name: "Relatório - Landing E-commerce",
        description: "Documentação do projeto de landing page e-commerce",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio5.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-6",
        name: "Relatório - Bootstrap",
        description: "Documentação do projeto Bootstrap 5",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio6.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-7",
        name: "Relatório - Ensaio Fotográfico",
        description: "Documentação do projeto de ensaio fotográfico",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio7.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-8",
        name: "Relatório - World Cup 2026",
        description: "Documentação do projeto World Cup 2026",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio8.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    },
    {
        id: "report-9",
        name: "Relatório - Dindins Dona Socorro",
        description: "Documentação do projeto Dindins Dona Socorro",
        technologies: ["PDF"],
        fileUrl: "/faculdade/pdfs/relatorio9.pdf",
        icon: "fa-file-alt",
        category: "relatorio"
    }
];

// ==================== FUNÇÕES DE RENDERIZAÇÃO ====================
function renderEducationalProjects(projects) {
    const container = document.getElementById('eduProjectsContainer');
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="project-card glass" data-category="${project.category}">
            <div class="project-header">
                <div class="project-icon">
                    <i class="fas ${project.icon}"></i>
                </div>
                <div class="project-stats">
                    <span class="stat-badge">
                        <i class="fas fa-calendar-week"></i> ${project.semester}
                    </span>
                </div>
            </div>
            
            <h3>${project.name}</h3>
            <p style="margin-bottom: 15px; color: var(--text-color); font-weight: 500;">
                ${project.description}
            </p>
            
            <div class="project-tags">
                ${project.technologies.map(tech => `
                    <span class="tag">${tech}</span>
                `).join('')}
            </div>
            
            <div class="project-objective">
                <i class="fas fa-bullseye"></i>
                <span>Projeto acadêmico desenvolvido no 1º semestre de 2026</span>
            </div>
            
            <div class="project-links">
                <a href="${project.fileUrl}" target="_blank" class="project-link view-project">
                    <i class="fas fa-eye"></i> Ver Projeto
                </a>
                <a href="${project.githubUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <button class="project-link view-details-btn" data-edu-id="${project.id}" style="margin-left: auto;">
                    <i class="fas fa-info-circle"></i> Detalhes
                </button>
            </div>
        </div>
    `).join('');
    
    // Adicionar eventos aos botões de detalhes
    document.querySelectorAll('.view-details-btn[data-edu-id]').forEach(btn => {
        btn.addEventListener('click', function() {
            const eduId = this.getAttribute('data-edu-id');
            const project = EDUCATIONAL_PROJECTS.find(p => p.id === eduId);
            if (project) {
                showEducationalDetails(project);
            }
        });
    });
}

function showEducationalDetails(project) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass" style="max-width: 800px; margin: 50px auto; padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); -webkit-background-clip: text; background-clip: text; color: transparent;">
                    <i class="fas ${project.icon}"></i> ${project.name}
                </h2>
                <button class="close-modal" style="background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                <p style="margin: 0; font-size: 1.1rem;">${project.description}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 20px;">
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: 10px;">
                        <i class="fas fa-bullseye"></i> Objetivo
                    </h4>
                    <p>Desenvolver habilidades práticas em ${project.technologies.join(', ')} através de projeto hands-on.</p>
                    
                    <h4 style="color: var(--primary-color); margin-top: 20px; margin-bottom: 10px;">
                        <i class="fas fa-tools"></i> Ferramentas Utilizadas
                    </h4>
                    <p>${project.technologies.join(', ')}</p>
                    
                    <h4 style="color: var(--primary-color); margin-top: 20px; margin-bottom: 10px;">
                        <i class="fas fa-chart-line"></i> Aprendizado
                    </h4>
                    <p>Consolidação de fundamentos de desenvolvimento web através de projeto prático da disciplina.</p>
                </div>
                
                <div>
                    <h4 style="color: var(--accent-color); margin-bottom: 10px;">
                        <i class="fas fa-lightbulb"></i> Descrição
                    </h4>
                    <p>${project.description}</p>
                    
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
                            <span><i class="fas fa-calendar"></i> ${project.semester}</span>
                            <span><i class="fas fa-tag"></i> Acadêmico</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span><i class="fas fa-code"></i> ${project.technologies.length} tecnologias</span>
                            <span><i class="fas fa-graduation-cap"></i> Faculdade</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
                <a href="${project.fileUrl}" target="_blank" class="cta-button">
                    <i class="fas fa-eye"></i> Ver Projeto
                </a>
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

function renderReports(reports) {
    const container = document.getElementById('reportsContainer');
    if (!container) return;
    
    container.innerHTML = reports.map(report => `
        <div class="project-card glass report-card" data-category="${report.category}">
            <div class="project-header">
                <i class="fas ${report.icon} project-icon" style="color: var(--accent-color); -webkit-text-fill-color: var(--accent-color);"></i>
                <span class="report-badge">PDF</span>
            </div>
            <h3>${report.name}</h3>
            <p>${report.description}</p>
            <div class="project-objective">
                <i class="fas fa-file-pdf"></i>
                <span>Documentação completa do projeto em PDF</span>
            </div>
            <div class="project-links">
                <a href="${report.fileUrl}" target="_blank" class="project-link view-pdf">
                    <i class="fas fa-file-pdf"></i> Abrir PDF
                </a>
            </div>
        </div>
    `).join('');
}

function setupEducationalTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            
            if (targetTab === 'professional') {
                document.getElementById('tab-professional').classList.add('active');
            } else if (targetTab === 'educational') {
                document.getElementById('tab-educational').classList.add('active');
            }
        });
    });
    
    const eduSearchInput = document.getElementById('eduSearchInput');
    if (eduSearchInput) {
        eduSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filtered = EDUCATIONAL_PROJECTS.filter(project => 
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
            );
            renderEducationalProjects(filtered);
        });
    }

    // NOVO: Filtros por categoria
    const eduFilterButtons = document.getElementById('eduFilterButtons');
    if (eduFilterButtons) {
        eduFilterButtons.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('#eduFilterButtons .filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-filter');
                
                if (filter === 'all') {
                    renderEducationalProjects(EDUCATIONAL_PROJECTS);
                } else if (filter === 'html-css') {
                    renderEducationalProjects(EDUCATIONAL_PROJECTS.filter(p => 
                        p.technologies.includes('HTML') && !p.technologies.includes('Bootstrap')
                    ));
                } else if (filter === 'javascript') {
                    renderEducationalProjects(EDUCATIONAL_PROJECTS.filter(p => 
                        p.technologies.includes('JavaScript')
                    ));
                } else if (filter === 'bootstrap') {
                    renderEducationalProjects(EDUCATIONAL_PROJECTS.filter(p => 
                        p.technologies.includes('Bootstrap')
                    ));
                }
            }
        });
    }
}

// ==================== INICIALIZAÇÃO DOS PROJETOS EDUCACIONAIS ====================
function initEducationalSection() {
    renderEducationalProjects(EDUCATIONAL_PROJECTS);
    renderReports(REPORTS);
    setupEducationalTabs();
}