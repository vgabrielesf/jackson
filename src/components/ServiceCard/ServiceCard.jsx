import React from 'react';

const ServiceCard = ({ service, onLearnMore, onImageClick }) => {
    const IconComponent = service.icon;
    const hasImage = service.image;
    
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="p-6">
                {/* Imagem do aplicativo (se existir) */}
                {hasImage ? (
                    <div className="flex items-center justify-center mb-4">
                        <img 
                            src={service.image}
                            alt={service.title}
                            className="rounded-lg shadow-md object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                            style={{ background: '#fff' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onImageClick && onImageClick(service.image, service.title);
                            }}
                        />
                    </div>
                ) : (
                    /* Ícone (se não houver imagem) */
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300">
                            <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                )}
                
                {/* Título */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                    {service.title}
                </h3>
                {/* Descrição */}
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 line-clamp-3">
                    {service.description}
                </p>
                {/* Botão */}
                <button 
                    onClick={() => onLearnMore(service)}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    Saiba Mais
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;