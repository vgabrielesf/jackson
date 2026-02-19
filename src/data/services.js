import { FaCode, FaMobile, FaGraduationCap, FaCertificate, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

// Dados do portfólio pessoal
export const portfolioData = {
  personalInfo: {
    name: 'Vitória Gabriele',
    title: 'Desenvolvedora Full Stack',
    bio: 'Desenvolvedora apaixonada por tecnologia com experiência em React, Node.js e desenvolvimento web moderno. Sempre em busca de novos desafios e oportunidades de aprendizado.',
    location: 'Brasil',
    email: 'vitoria@exemplo.com',
    linkedin: 'https://linkedin.com/in/vitoria-gabriele',
    github: 'https://github.com/vitoriagabriele'
  }
};

export const skills = [
  {
    id: 1,
    icon: FaCode,
    title: 'Frontend Development',
    description: 'Criação de interfaces modernas e responsivas.',
    details: 'Especializada em React, Next.js, TypeScript, Tailwind CSS e outras tecnologias modernas de frontend. Foco em criar experiências de usuário excepcionais com código limpo e performático.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5', 'CSS3']
  },
  {
    id: 2,
    icon: FaMobile,
    title: 'Backend Development',
    description: 'Desenvolvimento de APIs robustas e escaláveis.',
    details: 'Experiência em Node.js, Express, banco de dados relacionais e não-relacionais, criação de APIs RESTful e implementação de arquiteturas escaláveis.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'API REST', 'JWT', 'Mongoose']
  }
];

export const education = [
  {
    id: 1,
    icon: FaGraduationCap,
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Faculdade de Tecnologia',
    period: '2022 - 2024',
    description: 'Formação técnica em desenvolvimento de software.',
    details: 'Curso técnico focado em desenvolvimento de sistemas, programação orientada a objetos, banco de dados, engenharia de software e metodologias ágeis.',
    subjects: ['Programação Web', 'Banco de Dados', 'Engenharia de Software', 'Metodologias Ágeis']
  }
];

export const certifications = [
  {
    id: 1,
    icon: FaCertificate,
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: '2024',
    description: 'Certificação oficial em desenvolvimento React.',
    details: 'Certificação que comprova conhecimento avançado em React, incluindo hooks, context API, performance optimization e melhores práticas de desenvolvimento.',
    skills: ['React Hooks', 'Context API', 'Performance', 'Testing']
  },
  {
    id: 2,
    icon: FaCertificate,
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    description: 'Certificação em algoritmos e estruturas de dados.',
    details: 'Curso abrangente sobre algoritmos fundamentais, estruturas de dados e resolução de problemas com JavaScript.',
    skills: ['Algoritmos', 'Estruturas de Dados', 'Problem Solving', 'ES6+']
  }
];

export const projects = [
  {
    id: 1,
    icon: FaProjectDiagram,
    title: 'EngTools Suite - Versão Beta',
    description: 'Aplicativo de ferramentas para engenharia, versão beta com múltiplos módulos de automação.',
    details: 'EngTools Suite Versão Beta - 07.25 desenvolvido por Vitória Gabriele. Versão exclusiva para Android com funcionalidades completas para engenheiros: cálculo de peso e preço total de peças metálicas, conversão de unidades de medida (mm, cm, m e pol.), consulta de tubos Schedule e criação e gerenciamento de anotações técnicas.',
    technologies: ['Flutter', 'Dart'],
    github: '',
    demo: '',
    image: process.env.PUBLIC_URL + '/assets/EngTools Suite - Versão Beta .jpg',
    category: 'aplicativos'
  },
  {
    id: 2,
    icon: FaProjectDiagram,
    title: 'Meu Caixa - Versão Beta',
    description: 'Sistema de controle financeiro e gestão de caixa para pequenas empresas e negócios.',
    details: 'Sistema completo de gestão com cadastro de produtos (nome, estoque e preço), cadastro de clientes (nome, telefone, endereço e anotações), registro de vendas com seleção de cliente, produtos, quantidade e forma de pagamento. Inclui geração de relatórios de vendas com filtro por período e exportação em PDF, além de suporte a tema claro e escuro.',
    technologies: ['Flutter', 'Dart'],
    github: '',
    demo: '',
    image: process.env.PUBLIC_URL + '/assets/Meu Caixa - Versão Beta .jpg',
    category: 'aplicativos'
  },
  {
    id: 3,
    icon: FaProjectDiagram,
    title: 'V-nest',
    description: 'Aplicativo para otimização de corte e aproveitamento de materiais industriais feito em python.',
    details: 'Aplicativo especializado em otimização de corte para maximizar o aproveitamento de materiais, reduzindo desperdícios e custos em processos industriais. Utiliza algoritmos avançados para calcular os melhores padrões de corte.',
    technologies: ['Python'],
    github: '',
    demo: '',
    image: process.env.PUBLIC_URL + '/assets/V-nest.jpg',
    category: 'aplicativos'
  }
];

// Imagens de rendering/modelagem 3D - ORGANIZADAS PARA LAYOUT: GRANDE + 4 PEQUENAS
export const renderingImages = [
    // 1º Grupo - Imagem Grande: Render Carrinho + 4 pequenas
    {
        src: process.env.PUBLIC_URL + "/assets/Render Carrinho - Logo - Vista 1.png",
        alt: "Carrinho de Ferramentas - Vista 1",
        isLarge: true
    },
    {
        src: process.env.PUBLIC_URL + "/assets/Render Carrinho - Logo - Vista 2.png",
        alt: "Carrinho de Ferramentas - Vista 2",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/Render Carrinho - Logo - Vista 3.png",
        alt: "Carrinho de Ferramentas - Vista 3",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/CARRO1.jpg", 
        alt: "Carro para transporte de GNs",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/CARROCANTONEIRA.jpg",
        alt: "Carro Cantoneira",
        isLarge: false
    },
    
    // 2º Grupo - Imagem Grande: Projeto Naval Boat + 4 pequenas
    {
        src: process.env.PUBLIC_URL + "/assets/boat.png",
        alt: "Boat",
        isLarge: true
    },
    {
        src: process.env.PUBLIC_URL + "/assets/95 - CARRO P. TRANSPORTE DE BANDEJAS.jpg",
        alt: "Carro para Transporte de Bandejas",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/MÓDULO - 07.jpg",
        alt: "Módulo 2",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/BASE.jpg",
        alt: "Base para GNs",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/BANCADA COMCUBA.jpg",
        alt: "Bancada com Cuba",
        isLarge: false
    },
    
    // 3º Grupo - Imagem Grande: Esteira + 4 pequenas
    {
        src: process.env.PUBLIC_URL + "/assets/esteira.png",
        alt: "Esteira",
        isLarge: true
    },
    {
        src: process.env.PUBLIC_URL + "/assets/ESTANTE.jpg",
        alt: "Estante",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/GRELHAPARADRINK.jpg",
        alt: "Grelha para Drink",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/ARMARIOCOMTRES.jpg",
        alt: "Armário com Três Compartimentos",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/escada.png",
        alt: "Escada com Rodízios",
        isLarge: false
    },
    
    // 4º Grupo - Imagem Grande: Módulo 1 Vista 1 + restantes (2 imagens)
    {
        src: process.env.PUBLIC_URL + "/assets/Módulo 1 - Posição 1 - Logo.png",
        alt: "Módulo 1 - Vista 1",
        isLarge: true
    },
    {
        src: process.env.PUBLIC_URL + "/assets/Módulo 1 - Posição 2 - Logo.png",
        alt: "Módulo 1 - Vista 2",
        isLarge: false
    },
    {
        src: process.env.PUBLIC_URL + "/assets/Módulo 1 - Posição 3 - Logo.png",
        alt: "Módulo 1 - Vista 3",
        isLarge: false
    }
];

export const contact = [
  {
    id: 1,
    icon: FaEnvelope,
    title: 'Email',
    value: 'vitoria@exemplo.com',
    link: 'mailto:vitoria@exemplo.com',
    description: 'Entre em contato por email para oportunidades profissionais.'
  }
];