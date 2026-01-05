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
        stars: 5,
        forks: 2,
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
        stars: 3,
        forks: 1,
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
        stars: 4,
        forks: 1,
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
        stars: 7,
        forks: 2,
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
        stars: 6,
        forks: 3,
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
        stars: 4,
        forks: 1,
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
        stars: 8,
        forks: 4,
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
    }   





































];