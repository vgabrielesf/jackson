import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt, title }) => {
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

    if (!isOpen || !imageSrc) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative max-w-2xl max-h-[60vh] mx-4 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                    aria-label="Fechar modal"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
                
                {/* Título da imagem */}
                {title && (
                    <div className="absolute -top-12 left-0 text-white text-lg font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                        {title}
                    </div>
                )}
                
                {/* Imagem ampliada */}
                <img 
                    src={imageSrc}
                    alt={imageAlt}
                    className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-2xl cursor-pointer"
                    onClick={onClose}
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default ImageModal;
