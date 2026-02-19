import React, { useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, service }) => {
    // Fechar modal com ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Prevenir scroll do body quando modal está aberto
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !service) return null;

    const IconComponent = service.icon;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {service.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Fechar modal"
                    >
                        <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Descrição detalhada */}
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        {service.details}
                    </p>

                    {/* Features/Technologies/Skills */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            {service.technologies ? 'Tecnologias:' : 
                             service.skills ? 'Habilidades:' : 
                             service.subjects ? 'Disciplinas:' : 
                             'Principais Características:'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(service.technologies || service.skills || service.subjects || service.features || []).map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <FaCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    {service.institution && (
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Instituição:</strong> {service.institution}
                            </p>
                            {service.period && (
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Período:</strong> {service.period}
                                </p>
                            )}
                        </div>
                    )}

                    {service.issuer && (
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Emitido por:</strong> {service.issuer}
                            </p>
                            {service.date && (
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Data:</strong> {service.date}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Project Links */}
                    {(service.github || service.demo) && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                Links do Projeto:
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {service.github && (
                                    <a 
                                        href={service.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        🐙 GitHub
                                    </a>
                                )}
                                {service.demo && (
                                    <a 
                                        href={service.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        🚀 Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {service.github && (
                            <a 
                                href={service.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 text-center"
                            >
                                Ver no GitHub
                            </a>
                        )}
                        <button 
                            onClick={onClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;