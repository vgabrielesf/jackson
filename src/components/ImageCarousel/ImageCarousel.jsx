import React, { useState } from 'react';

const ImageCarousel = ({ images, onImageClick }) => {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (groupIndex, imgIndex) => {
        setLoadedImages(prev => ({
            ...prev,
            [`${groupIndex}-${imgIndex}`]: true
        }));
    };
    // Função para agrupar imagens em conjuntos (1 grande + 4 pequenas, ou menos)
    const groupImages = (images) => {
        const groups = [];
        let currentGroup = [];
        
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            
            if (img.isLarge && currentGroup.length > 0) {
                // Se encontrarmos uma imagem grande e já temos um grupo, finalize o grupo atual
                groups.push(currentGroup);
                currentGroup = [img];
            } else {
                currentGroup.push(img);
            }
            
            // Se o grupo atual tem 5 imagens (1 grande + 4 pequenas), finalize-o
            if (currentGroup.length === 5) {
                groups.push(currentGroup);
                currentGroup = [];
            }
        }
        
        // Adicione o último grupo se houver imagens restantes
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }
        
        return groups;
    };
    
    const imageGroups = groupImages(images);
    
    return (
        <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
            {imageGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {group.map((img, imgIndex) => {
                        const imageKey = `${groupIndex}-${imgIndex}`;
                        const isLoaded = loadedImages[imageKey];
                        const isFirst = imgIndex === 0;
                        // Aplica skeleton e blur para todas as imagens
                        return (
                            <div
                                key={imageKey}
                                className={img.isLarge
                                    ? "col-span-2 row-span-2 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg cursor-pointer group"
                                    : "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg cursor-pointer group"}
                                onClick={() => onImageClick && onImageClick(img)}
                            >
                                <div className={img.isLarge ? "aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative" : "aspect-square bg-gray-100 dark:bg-gray-700 relative"}>
                                    {/* Skeleton loading + blur */}
                                    {!isLoaded && (
                                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
                                            <div className="text-gray-400 dark:text-gray-500">
                                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 blur-sm'}`}
                                        onLoad={() => handleImageLoad(groupIndex, imgIndex)}
                                        loading={isFirst ? "eager" : "lazy"}
                                    />
                                </div>
                                <div className={img.isLarge ? "p-3" : "p-3"}>
                                    <h3 className={img.isLarge ? "text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300" : "text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300"} style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {img.alt}
                                    </h3>
                                    <p className={img.isLarge ? "text-sm text-gray-600 dark:text-gray-400" : "text-xs text-gray-600 dark:text-gray-400"} style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Rendering 3D
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ImageCarousel;
