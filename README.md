# Vitória Gabriele - Portfólio Pessoal

Este é um portfólio pessoal desenvolvido em React, apresentando minhas habilidades, formação, certificações e projetos como desenvolvedora Full Stack. O projeto possui design moderno, layout responsivo e suporte ao modo escuro.

## Funcionalidades

- **Header**: Contém meu nome e menu de navegação responsivo com ícone hamburger para dispositivos móveis.
- **Seção Hero**: Apresentação pessoal com foto de perfil e links para portfólio e contato.
- **Sobre Mim**: Informações sobre minha jornada e estatísticas profissionais.
- **Portfólio**: Seções organizadas com abas para:
  - **Habilidades**: Frontend e Backend development
  - **Formação**: Educação formal e cursos
  - **Certificações**: Certificados profissionais
  - **Projetos**: Projetos desenvolvidos com links para GitHub e demo
- **Modal**: Componente que exibe informações detalhadas sobre cada item do portfólio.
- **Suporte ao Modo Escuro**: Alternância entre temas claro e escuro.
- **Footer**: Links para redes sociais (LinkedIn, GitHub, Email).

## Tecnologias Utilizadas

- React
- Tailwind CSS
- Custom Hooks
- CSS Animations
- React Icons

## Instruções de Configuração

1. **Clone o repositório**:
   ```
   git clone <repository-url>
   ```

2. **Navegue até o diretório do projeto**:
   ```
   cd vitoria-gabriele-portfolio
   ```

3. **Instale as dependências**:
   ```
   npm install
   ```

4. **Execute a aplicação**:
   ```
   npm start
   ```

5. **Abra seu navegador** e acesse `http://localhost:3000` para visualizar o portfólio.

## Estrutura do Projeto

```
vitoria-gabriele-portfolio
├── src
│   ├── components
│   │   ├── Header
│   │   ├── ServiceCard
│   │   ├── Modal
│   │   ├── Footer
│   │   └── ThemeToggle
│   ├── pages
│   │   └── Home.jsx
│   ├── hooks
│   │   └── useTheme.js
│   ├── data
│   │   └── services.js
│   ├── styles
│   │   └── animations.css
│   ├── App.jsx
│   └── index.js
├── public
│   └── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see in the project.