import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Verifica se há preferência salva no localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        
        // Define tema escuro como padrão
        return 'dark';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        // Define tema escuro como classe inicial
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.add('dark');
        }
    }, [theme]);

    // Inicializa o tema escuro no primeiro carregamento
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default useTheme;