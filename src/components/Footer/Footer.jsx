import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [copied, setCopied] = useState(false);

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: 'https://www.linkedin.com/in/vitoria-gabriele-s-figueiredo-860bba296',
            color: 'hover:text-blue-400',
            onClick: null
        },
        {
            name: 'GitHub',
            icon: FaGithub,
            url: 'https://github.com/vgabrielesf/',
            color: 'hover:text-gray-400',
            onClick: null
        },
        {
            name: 'Email',
            icon: FaEnvelope,
            url: null, // Não usa mais mailto
            color: 'hover:text-green-400',
            onClick: (e) => {
                e.preventDefault();
                navigator.clipboard.writeText('vgabrielesf@gmail.com');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 dark:from-black dark:via-gray-900 dark:to-gray-900 text-white shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Personal Info */}
                    <div className="space-y-4 flex flex-col justify-start items-start md:justify-start md:items-start">
                        <h4 className="text-xl  text-blue-400 mb-2 tracking-wide">Vitória Gabriele</h4>
                        <div className="text-gray-400 text-sm space-y-1 mt-2">
                            <p>vgabrielesf@gmail.com</p>
                            <p>Fortaleza, CE - Brasil</p>
                            <p>https://www.linkedin.com/in/vitoria-gabriele-s-figueiredo-860bba296/</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 flex flex-col justify-center items-start">
                        <h4 className="text-lg font-semibold text-pink-400 mb-2">Links Rápidos</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="space-y-2">
                                <a href="#home" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Início
                                </a>
                                <a href="#about" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Sobre Mim
                                </a>
                                <a href="#skills" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Habilidades
                                </a>
                            </div>
                            <div className="space-y-2">
                                <a href="#certificates" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Certificados
                                </a>
                                <a href="#portfolio" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Projetos
                                </a>
                                <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                                    Contato
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4 flex flex-col justify-center items-start">
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Conecte-se Comigo</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, idx) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url || '#'}
                                        target={social.url ? '_blank' : undefined}
                                        rel={social.url ? 'noopener noreferrer' : undefined}
                                        className={`p-3 bg-gray-900 border-2 border-gray-700 rounded-lg ${social.color} transition-all duration-300 transform hover:scale-125 hover:bg-blue-900 focus:ring-2 focus:ring-blue-400 animate-bounce`}
                                        aria-label={social.name}
                                        style={{animationDelay: `${idx * 0.1}s`}}
                                        onClick={social.onClick}
                                    >
                                        <IconComponent size={22} />
                                    </a>
                                );
                            })}
                        </div>
                        {copied && (
                            <span className="text-green-400 text-sm mt-2 block animate-fadeIn">E-mail copiado!</span>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Vitória Gabriele. Todos os direitos reservados.
                    </p>
                    <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
                        Feito por Vitória Gabriele
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;