import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Float } from '@react-three/drei';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import Header from '../components/Header/Header';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import Modal from '../components/Modal/Modal';
import ImageModal from '../components/ImageModal/ImageModal';
import Footer from '../components/Footer/Footer';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import { portfolioData, skills, education, certifications, projects, contact, renderingImages } from '../data/services';

const Typewriter = ({ text, speed = 120, pause = 1200 }) => {
    const [displayed, setDisplayed] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed(text.slice(0, index + 1));
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            const resetTimeout = setTimeout(() => {
                setDisplayed('');
                setIndex(0);
            }, pause);
            return () => clearTimeout(resetTimeout);
        }
    }, [index, text, speed, pause]);

    return (
        <span style={{fontFamily: 'Poppins, sans-serif'}}>{displayed}<span className="typewriter-cursor">|</span></span>
    );
};

// Componente para exibir o modelo 3D
function Model3D({ url, scale = 1.2, initialRotation = [0, 0, 0] }) {
    const { scene } = useGLTF(url);
    const meshRef = useRef();

    // Define rotação inicial apenas uma vez
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x = initialRotation[0];
            meshRef.current.rotation.y = initialRotation[1];
            meshRef.current.rotation.z = initialRotation[2];
        }
    }, [initialRotation]);

    return <primitive ref={meshRef} object={scene} scale={scale} />;
}

const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    // Modelos 3D disponíveis
    const modelList = [
        process.env.PUBLIC_URL + '/assets/model7.glb',
        process.env.PUBLIC_URL + '/assets/empurrador.glb',
        process.env.PUBLIC_URL + '/assets/motor.glb',
    ];
    const [modelIndex, setModelIndex] = useState(0);
    const modelUrl = modelList[modelIndex];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEducationType, setSelectedEducationType] = useState('superior');
    const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
    const [selectedExperienceType, setSelectedExperienceType] = useState('inace');
    const [selectedCategory, setSelectedCategory] = useState('aplicativos');
    const [selectedSection, setSelectedSection] = useState('formacao'); // 'formacao' ou 'experiencia'
    const [selectedRenderingImage, setSelectedRenderingImage] = useState(null);
    const [isRenderingModalOpen, setIsRenderingModalOpen] = useState(false);
    
    // Estados para o modal de imagem ampliada
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState('');
    const [selectedImageTitle, setSelectedImageTitle] = useState('');

    const certificates = [
        {
            id: 1,
            title: "Banco de Dados",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/Banco de Dados.jpg",
            issuer: "Santander"
        },
        {
            id: 2,
            title: "Python 3",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/Curso Python 3.jpg",
            issuer: "Udemy"
        },
        {
            id: 3,
            title: "FullStack Developer",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/FullStack Developer.jpg",
            issuer: "Uniamérica"
        },
        {
            id: 4,
            title: "NoSQL com MongoDB",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/NoSQL com MongoDB_Página_1.jpg",
            issuer: "IFES"
        },
        {
            id: 5,
            title: "Full Cycle Developer",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/Full Cycle Developer.jpg",
            issuer: "Full Cycle"
        },
        {
            id: 6,
            title: "GitHub Copilot",
            description: "",
            image: process.env.PUBLIC_URL + "/assets/Github Copilot.jpg",
            issuer: "GitHub"
        },
    ];

    const nextCertificates = () => {
        setCurrentCertificateIndex(prev => 
            prev + 1 >= certificates.length ? 0 : prev + 1
        );
    };

    const prevCertificates = () => {
        setCurrentCertificateIndex(prev => 
            prev - 1 < 0 ? certificates.length - 1 : prev - 1
        );
    };

    const visibleCertificates = certificates.slice(currentCertificateIndex, currentCertificateIndex + 3);

    const handleCertificateClick = (certificate) => {
        setSelectedCertificate(certificate);
        setIsCertificateModalOpen(true);
    };

    const closeCertificateModal = () => {
        setIsCertificateModalOpen(false);
        setSelectedCertificate(null);
    };

    const handleRenderingImageClick = (image) => {
        setSelectedRenderingImage(image);
        setIsRenderingModalOpen(true);
    };

    const closeRenderingModal = () => {
        setIsRenderingModalOpen(false);
        setSelectedRenderingImage(null);
    };

    // Funções para o modal de imagem ampliada
    const handleImageClick = (imageSrc, imageTitle) => {
        setSelectedImageSrc(imageSrc);
        setSelectedImageTitle(imageTitle);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImageSrc('');
        setSelectedImageTitle('');
    };

    // Effect para fechar modal com ESC
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (isCertificateModalOpen) {
                    closeCertificateModal();
                }
                if (isRenderingModalOpen) {
                    closeRenderingModal();
                }
                if (isImageModalOpen) {
                    closeImageModal();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isCertificateModalOpen, isRenderingModalOpen, isImageModalOpen]);

    const handleLearnMore = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    // Funções para trocar de modelo
    const nextModel = () => setModelIndex((prev) => (prev + 1) % modelList.length);
    const prevModel = () => setModelIndex((prev) => (prev - 1 + modelList.length) % modelList.length);

    const modelNames = ['Boat', 'Rebocador', 'Motor'];

    // Ref para OrbitControls
    const orbitRef = useRef();

    useEffect(() => {
        // Resetar zoom e posição ao trocar de modelo
        if (orbitRef.current) {
            orbitRef.current.reset();
        }
    }, [modelUrl]);

    const [emailCopied, setEmailCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [selectedPortfolioTab, setSelectedPortfolioTab] = useState('rendering');

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('Jackson_n_r@hotmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            
            {/* Hero Section */}
            <section id="home" className="pt-16 bg-gradient-to-r from-blue-900 via-blue-950 to-blue-950 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                        {/* Lado esquerdo - Texto */}
                        <div className="flex-1 text-left">
                            <h1 className="text-xl md:text-3xl mb-4 animate-slide-up" style={{fontFamily: 'Poppins, sans-serif'}}>
                                Olá, sou o
                            </h1>
                            <h2 className="text-3xl md:text-5xl mb-4 animate-slide-up text-orange-400" style={{fontFamily: 'Poppins, sans-serif'}}>
                                <Typewriter text="Jackson N. Rocha" speed={120} pause={1200} />
                            </h2>
                            <h3 className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up" style={{fontFamily: 'Poppins, sans-serif'}}>
                                Desenhista | Developer
                            </h3>
                            <div className="flex flex-row gap-4 animate-slide-up justify-start">
                                {/* Botões responsivos: Currículo no mobile, extra no desktop */}
                                <a 
                                    href="#portfolio"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-blue-500 to-blue-700 text-white px-7 py-3 rounded-xl font-semibold text-base border-2 border-white shadow-2xl shadow-blue-950 transition-all duration-200 transform hover:-translate-y-1 hover:scale-110 hover:from-orange-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M5 5v14" /></svg>
                                    Ver Meu Trabalho
                                </a>
                                {/* Mobile: Currículo substitui contato */}
                                <a 
                                    href="/assets/Jackson Rocha - Curriculo.pdf"
                                    download="Jackson_Rocha_Curriculo.pdf"
                                    className="inline-flex items-center gap-2 border-2 border-blue-950 text-orange-500 bg-white dark:bg-gray-900 hover:bg-orange-500 hover:text-white px-7 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 block md:hidden"
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                    Currículo
                                </a>
                                {/* Desktop: Contato e Currículo lado a lado */}
                                <a 
                                    href="https://www.linkedin.com/in/vitoria-gabriele-s-figueiredo-860bba296"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border-2 border-blue-400 text-blue-500 bg-white dark:bg-gray-900 hover:bg-blue-600 hover:text-white px-7 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden md:inline-flex"
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.599 2.001 3.599 4.604v5.592z"/></svg>
                                    LinkedIn
                                </a>
                                <a 
                                    href="/assets/Jackson Rocha - Curriculo.pdf"
                                    download="Jackson_Rocha_Curriculo.pdf"
                                    className="inline-flex items-center gap-2 border-2 border-blue-400 text-blue-500 bg-white dark:bg-gray-900 hover:bg-blue-600 hover:text-white px-7 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden md:inline-flex"
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                    Currículo
                                </a>
                            </div>
                        </div>

                        {/* Lado direito - Avatar */}
                        <div className="hidden lg:flex flex-shrink-0 lg:ml-12">
                            <div className="w-40 h-40 lg:w-48 lg:h-48 bg-transparent rounded-full flex items-center justify-center animate-slide-up border-4 border-yellow-500">
                                <span className="text-5xl lg:text-6xl text-yellow-500" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>JR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-3 text-center" style={{fontFamily: 'Poppins, sans-serif'}}>
                            Sobre Mim
                        </h2>
                        <p className="text-[18px] md:text-[18px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2 text-justify lg:text-center">
                            Desenhista naval e estrutural, com atuação em modelagem 3D e documentação técnica para fabricação, principalmente no contexto industrial e naval. Experiência no desenvolvimento de projetos em Rhinoceros 3D, acompanhando o processo desde a concepção até a geração de desenhos técnicos e suporte à montagem. Tenho como diferencial a automação de processos dentro do ambiente de projeto, utilizando Python para reduzir tarefas manuais, padronizar modelos, extrair dados e minimizar erros recorrentes na documentação.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                        <div className="flex-1 w-full lg:w-1/2 flex flex-col items-center">
                            <h3 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-6 text-center" style={{fontFamily: 'Poppins, sans-serif'}}>
                                Minha Jornada
                            </h3>
                            <p className="text-[18px] md:text-[18px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2 text-justify lg:text-center">
                                Atualmente atuo na indústria naval e curso Engenharia de Software, buscando aplicar programação como ferramenta prática para resolver problemas reais de projeto.
                            </p>
                        </div>
                                                
                        {/* Lado direito - Formação e Experiências */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center">
                            <div className="flex gap-4 mb-6 items-center">
                                <button 
                                    onClick={() => setSelectedSection('formacao')}
                                    className={`text-2xl md:text-3xl transition-all duration-300 px-4 py-2 ${
                                        selectedSection === 'formacao'
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300'
                                    }`} 
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    Formação
                                </button>
                                <span className="text-2xl md:text-3xl text-gray-400 dark:text-gray-500">|</span>
                                <button 
                                    onClick={() => setSelectedSection('experiencia')}
                                    className={`text-2xl md:text-3xl transition-all duration-300 px-4 py-2 ${
                                        selectedSection === 'experiencia'
                                            ? 'text-yellow-600 dark:text-yellow-400'
                                            : 'text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-300'
                                    }`} 
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    Experiências
                                </button>
                            </div>
                            
                            {/* Conteúdo de Formação */}
                            {selectedSection === 'formacao' && (
                                <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch fade-in">
                                    {/* Botões: horizontal em telas pequenas, vertical em md+ */}
                                    <div className="flex flex-row md:flex-col gap-4 w-full md:w-40">
                                        <button 
                                            onClick={() => setSelectedEducationType('superior')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedEducationType === 'superior'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            Graduação
                                        </button>
                                        <button 
                                            onClick={() => setSelectedEducationType('tecnico')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedEducationType === 'tecnico'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                           Nível Técnico
                                        </button>
                                    </div>

                                    {/* Conteúdo ao lado direito em md+, abaixo em telas pequenas */}
                                    <div className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-0 md:border-l-4 border-blue-600">
                                        {selectedEducationType === 'superior' && (
                                             <div className="fade-in">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">
                                                    Engenharia de Software
                                                </h4>
                                                <p className="text-[18px] md:text-[18px] text-blue-700 dark:text-blue-300 mt-1">
                                                    Estácio | 2024-2029
                                                </p>
                                            </div>
                                        )}
                                        {selectedEducationType === 'tecnico' && (
                                            <div className="fade-in">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">
                                                    Técnico em Construção Naval
                                                </h4>
                                                <p className="text-[18px] md:text-[18px] text-blue-700 dark:text-blue-300 mt-1">
                                                    IFCE | 2013-2015
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Conteúdo de Experiências */}
                            {selectedSection === 'experiencia' && (
                                <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch fade-in">
                                    {/* Botões: horizontal em telas pequenas, vertical em md+ */}
                                    <div className="flex flex-row md:flex-col gap-4 w-full md:w-40">
                                        <button 
                                            onClick={() => setSelectedExperienceType('inace')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedExperienceType === 'inace'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            Inace
                                        </button>
                                        <button 
                                            onClick={() => setSelectedExperienceType('nz')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedExperienceType === 'nz'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            NZ
                                        </button>
                                        <button 
                                            onClick={() => setSelectedExperienceType('python')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedExperienceType === 'python'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            Autônomo
                                        </button>
                                        <button 
                                            onClick={() => setSelectedExperienceType('inace2')}
                                            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                                                selectedExperienceType === 'inace2'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            Inace
                                        </button>
                                    </div>

                                    {/* Conteúdo ao lado direito em md+, abaixo em telas pequenas */}
                                    <div className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-0 md:border-l-4 border-yellow-500">
                                        {selectedExperienceType === 'inace' && (
                                            <div className="fade-in flex flex-col items-start gap-2">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">Desenhista</h4>
                                                <p className="text-[18px] md:text-[18px] text-yellow-700 dark:text-yellow-500 mt-1">
            
                                                    Inace Superyachts | set de 2022 - o momento
                                                </p>
                                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                                    <li>• Rhinoceros</li>
                                                    <li>• AutoCAD</li>
                                                    <li>• Modelagem 3D</li>
                                                </ul>
                                            </div>
                                        )}
                                        {selectedExperienceType === 'nz' && (
                                            <div className="fade-in flex flex-col items-start gap-2">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">Desenhista</h4>
                                                <p className="text-[18px] md:text-[18px] text-yellow-700 dark:text-yellow-500 mt-1">
                                                    NZ Empreendimentos e Investimentos LTDA | jan de 2019 - fev de 2020
                                                </p>
                                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                                    <li>• Rhinoceros</li>
                                                    <li>• AutoCAD</li>
                                                    <li>• Modelagem 3D</li>
                                                </ul>
                                            </div>
                                        )}
                                        {selectedExperienceType === 'python' && (
                                            <div className="fade-in flex flex-col items-start gap-2">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">Desenvolvedor Python</h4>
                                                <p className="text-[18px] md:text-[18px] text-yellow-700 dark:text-yellow-500 mt-1">
                                                    Autônomo | mar de 2020 - ago de 2022
                                                </p>
                                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                                    <li>• Automação de processos</li>
                                                    <li>• Desenvolvimento de scripts</li>
                                                </ul>
                                            </div>
                                        )}
                                        {selectedExperienceType === 'inace2' && (
                                            <div className="fade-in flex flex-col items-start gap-2">
                                                <h4 className="text-lg text-gray-900 dark:text-white mb-2">Desenhista</h4>
                                                <p className="text-[18px] md:text-[18px] text-yellow-700 dark:text-yellow-500 mt-1">
                                                    Inace Superyachts | jul de 2016 - jan de 2019
                                                </p>
                                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                                    <li>• Rhinoceros</li>
                                                    <li>• AutoCAD</li>
                                                    <li>• Modelagem 3D</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                            Habilidades
                        </h2>

                    </div>

                    {/* Skills Grid */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-x-1 gap-y-8 w-full max-w-6xl place-items-center">
                            {/* JavaScript */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" alt="JavaScript" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JavaScript</span>
                            </div>

                            {/* TypeScript */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg" alt="TypeScript" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript</span>
                            </div>

                            {/* Node.js */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg" alt="Node.js" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Node.js</span>
                            </div>

                            {/* HTML5 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg" alt="HTML5" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML5</span>
                            </div>

                            {/* CSS3 */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg" alt="CSS3" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CSS3</span>
                            </div>

                            {/* Python */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-plain.svg" alt="Python" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Python</span>
                            </div>

                            {/* Dart */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-plain.svg" alt="Dart" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dart</span>
                            </div>

                            {/* Flutter */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-plain.svg" alt="Flutter" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Flutter</span>
                            </div>

                            {/* Java */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg" alt="Java" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Java</span>
                            </div>

                            {/* PostgreSQL */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" alt="PostgreSQL" className="w-12 h-12" style={{filter: 'brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(1769%) hue-rotate(215deg) brightness(93%) contrast(101%)'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PostgreSQL</span>
                            </div>

                            {/* AutoCAD */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src={process.env.PUBLIC_URL + "/assets/autocad.png"} alt="AutoCAD" className="w-14 h-14" style={{transform: 'none'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AutoCAD</span>
                            </div>

                            {/* Inventor */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src={process.env.PUBLIC_URL + "/assets/inventor.png"} alt="Inventor" className="w-11 h-11" style={{transform: 'none'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inventor</span>
                            </div>

                            {/* Rhinoceros */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src={process.env.PUBLIC_URL + "/assets/Rhinoceros.png"} alt="Rhinoceros" className="w-14 h-14" style={{transform: 'none'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rhinoceros</span>
                            </div>

                            {/* Keyshot */}
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 animate-skill-float group-hover:animate-pulse">
                                    <img src={process.env.PUBLIC_URL + "/assets/Keyshot.png"} alt="Keyshot" className="w-12 h-12" style={{transform: 'none'}} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Keyshot</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                            Meus Projetos
                        </h2>
                        <p className="text-[18px] md:text-[18px] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                            Conheça alguns dos projetos que desenvolvi ou que ainda estou desenvolvendo.
                        </p>
                        <div className="flex justify-center gap-8 mb-8">
                            <div className="flex flex-col items-center">
                                <button 
                                    onClick={() => setSelectedPortfolioTab('rendering')}
                                    className={`text-lg md:text-xl  transition-all duration-300 ${selectedPortfolioTab === 'rendering' ? 'text-blue-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-blue-300'}`}
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    Engenharia e Design
                                </button>
                                {selectedPortfolioTab === 'rendering' && (
                                    <div className="w-full h-1 bg-yellow-600 dark:bg-yellow-400 rounded mt-1"></div>
                                )}
                            </div>
                            <div className="flex flex-col items-center">
                                <button 
                                    onClick={() => setSelectedPortfolioTab('otimizado')}
                                    className={`text-lg md:text-xl transition-all duration-300 ${selectedPortfolioTab === 'otimizado' ? 'text-blue-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-blue-300'}`}
                                    style={{fontFamily: 'Poppins, sans-serif'}}
                                >
                                    Desenho Otimizado
                                </button>
                                {selectedPortfolioTab === 'otimizado' && (
                                    <div className="w-full h-1 bg-yellow-600 dark:bg-yellow-400 rounded mt-1"></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        {selectedPortfolioTab === 'rendering' && (
                            <div className="mb-8 flex flex-col md:flex-row flex-wrap justify-center gap-6">
                                <iframe 
                                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7429037336774225920"
                                    height="760"
                                    width="504"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Publicação incorporada 1"
                                    className="rounded-lg shadow-lg border border-blue-200 dark:border-blue-800"
                                    style={{maxWidth: '100%', minWidth: '320px'}}
                                ></iframe>
                                <iframe 
                                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7397169432952897536"
                                    height="760"
                                    width="504"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Publicação incorporada 2"
                                    className="rounded-lg shadow-lg border border-blue-200 dark:border-blue-800"
                                    style={{maxWidth: '100%', minWidth: '320px'}}
                                ></iframe>
                                <iframe 
                                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7346748623684042752"
                                    height="760"
                                    width="504"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Publicação incorporada 3"
                                    className="rounded-lg shadow-lg border border-blue-200 dark:border-blue-800"
                                    style={{maxWidth: '100%', minWidth: '320px'}}
                                ></iframe>
                                <iframe 
                                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7232256464688451584"
                                    height="760"
                                    width="504"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Publicação incorporada 4"
                                    className="rounded-lg shadow-lg border border-blue-200 dark:border-blue-800"
                                    style={{maxWidth: '100%', minWidth: '320px'}}
                                ></iframe>
                            </div>
                        )}
                        {selectedPortfolioTab === 'otimizado' && (
                            <div className="mb-8 flex flex-col md:flex-row flex-wrap justify-center gap-6">
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7232834059930935296" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7185955237566795777" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7170401391633510400" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7134989565827690496" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7132408004129271808" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7130242474588917760" height="820" width="504" frameBorder="0" allowFullScreen title="Publicação incorporada"></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </section>


                    {/* Seção do modelo 3D do motor */}
                    <section id="motor3d" className="py-20 bg-white dark:bg-gray-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
            Visualizador 3D de Modelos
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
            Interaja com diferentes modelos 3D abaixo.
        </p>
        <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex flex-row items-center gap-3 text-sm bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-2 mb-2">
                {/* Arraste para girar */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 4.636" />
                </svg>
                <span className="text-blue-700 dark:text-blue-700">Arraste para girar</span>
                {/* Role para dar zoom */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="7" x2="11" y2="15" />
                    <line x1="7" y1="11" x2="15" y2="11" />
                </svg>
                <span className="text-blue-700 dark:text-blue-700">Role para dar zoom</span>
                {/* Segure shift para mover */}
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
                </svg>
                <span className="text-blue-700 dark:text-blue-700">Segure shift para mover</span>
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                    onClick={prevModel}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    Anterior
                </button>
                <span className="text-base font-medium text-blue-700 dark:text-blue-300 mx-2" style={{fontFamily: 'Poppins, sans-serif'}}>{modelNames[modelIndex]}</span>
                <button
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                    onClick={nextModel}
                >
                    Próximo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
        <div className="w-full rounded-lg shadow-lg flex items-center justify-center" style={{height: '50vw', maxHeight: '600px', minHeight: '350px', background: 'transparent'}}>
            <Suspense fallback={<span className="text-gray-500">Carregando modelo 3D...</span>}>
                <Canvas camera={{ position: [3, 2, 7], fov: 40 }} shadows>
                    <ambientLight intensity={0.6} color={0xffffff} />
                    <hemisphereLight skyColor={0xffffff} groundColor={0xbbbbbb} intensity={0.8} position={[0, 50, 0]} />
                    <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow={false} />
                    <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                    <directionalLight position={[0, 5, -10]} intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={0.6} distance={50} />
                    <pointLight position={[-10, 10, -10]} intensity={0.6} distance={50} />
                    <group position={[0, -0.2, 0]}>
                        <Model3D 
    url={modelUrl} 
    scale={modelUrl.includes('model7.glb') ? 0.5 : modelUrl.includes('empurrador.glb') ? 0.75 : 2.0}
    initialRotation={modelUrl.includes('model7.glb') || modelUrl.includes('empurrador.glb') ? [0.18, -0.5, 0] : [0, 0, 0]}
                        />
                        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
                            <planeGeometry args={[8, 8]} />
                            <shadowMaterial opacity={0.3} />
                        </mesh>
                    </group>
                    <OrbitControls 
                        ref={orbitRef}
                        enablePan={true}
                        enableZoom={true}
                        minDistance={2}
                        maxDistance={10}
                        maxPolarAngle={Math.PI / 1.7}
                        minPolarAngle={Math.PI / 3.5}
                        makeDefault
                    />
                </Canvas>
            </Suspense>
        </div>
    </div>
</section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
                        Vamos Trabalhar Juntos?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        Estou sempre aberta a novas oportunidades. 
                        Entre em contato e vamos conversar!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                        <button
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-2 w-40 justify-center p-3 bg-gray-800 rounded-lg hover:text-green-400 transition-all duration-300 transform hover:scale-110 hover:bg-blue-900 focus:ring-2 focus:ring-blue-400 text-white font-medium shadow-lg"
                            style={{fontFamily: 'Poppins, sans-serif'}}
                        >
                            <FaEnvelope size={22} />
                            Email
                        </button>
                        <a 
                            href="https://www.linkedin.com/in/jackson-n-rocha-44b574157/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 w-40 justify-center p-3 bg-gray-800 rounded-lg hover:text-blue-400 transition-all duration-300 transform hover:scale-110 hover:bg-blue-900 focus:ring-2 focus:ring-blue-400 text-white font-medium shadow-lg"
                            style={{fontFamily: 'Poppins, sans-serif'}}
                        >
                            <FaLinkedin size={22} />
                            LinkedIn
                        </a>
                        <a 
                            href="https://github.com/jacksonnr2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 w-40 justify-center p-3 bg-gray-800 rounded-lg hover:text-gray-400 transition-all duration-300 transform hover:scale-110 hover:bg-blue-900 focus:ring-2 focus:ring-blue-400 text-white font-medium shadow-lg"
                            style={{fontFamily: 'Poppins, sans-serif'}}
                        >
                            <FaGithub size={22} />
                            GitHub
                        </a>
                    </div>
                    {emailCopied && (
                        <span className="text-green-400 text-sm mt-2 block animate-fadeIn">E-mail copiado!</span>
                    )}
                </div>
            </section>

            {/* Rendering Image Modal */}
            {isRenderingModalOpen && selectedRenderingImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={closeRenderingModal}
                >
                    <div 
                        className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform animate-slideUp shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeRenderingModal}
                            className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Rendering Image */}
                        <div className="relative">
                            <img 
                                src={selectedRenderingImage.src} 
                                alt={selectedRenderingImage.alt}
                                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain"
                            />
                        </div>
                        
                        {/* Image Info */}
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <h3 className="text-2xl text-gray-900 dark:text-white mb-3">
                                {selectedRenderingImage.alt}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Rendering 3D
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Certificate Modal */}
            {isCertificateModalOpen && selectedCertificate && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={closeCertificateModal}
                >
                    <div 
                        className="relative max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform animate-slideUp shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeCertificateModal}
                            className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Certificate Image */}
                        <div className="relative">
                            <img 
                                src={selectedCertificate.image} 
                                alt={`Certificado ${selectedCertificate.title}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </div>
                        
                        {/* Certificate Info */}
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <h3 className="text-2xl text-gray-900 dark:text-white mb-3">
                                {selectedCertificate.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {selectedCertificate.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal}
                service={selectedItem}
            />

            {/* Modal de Imagem Ampliada */}
            <ImageModal 
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
                imageSrc={selectedImageSrc}
                imageAlt={selectedImageTitle}
                title={selectedImageTitle}
            />

            <Footer />
        </div>
    );
};

export default Home;