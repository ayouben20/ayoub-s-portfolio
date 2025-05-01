import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../utils/scrollUtils';
import Footer from '../components/Footer';
import { FaReact, FaLaravel, FaNode, FaDatabase, FaGithub, FaCode, FaServer, FaGamepad, FaTools, FaChevronRight, FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaPhp, FaUnity, FaWordpress, FaFigma, FaMicrosoft, FaCode as FaCodeEditor } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiPython, SiXampp, SiAdobe } from 'react-icons/si';
import { BsArrowDownCircle, BsKanban } from 'react-icons/bs';

// Keyframes for blob animation
const moveBlob1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -30px) scale(1.05); }
  50% { transform: translate(-10px, 15px) scale(0.95); }
  75% { transform: translate(15px, 5px) scale(1.02); }
`;

const moveBlob2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-15px, 25px) scale(0.98); }
  50% { transform: translate(10px, -10px) scale(1.03); }
  75% { transform: translate(-5px, -15px) scale(1); }
`;

const moveBlob3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(25px, 10px) rotate(5deg) scale(1.05); }
  66% { transform: translate(-15px, -20px) rotate(-5deg) scale(0.95); }
`;

// Add these new keyframes and styled components after the existing ones
const glowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(74, 144, 226, 0.6)); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const rotateGlow = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const glowAnimation = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.3));
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 15px rgba(74, 144, 226, 0.6));
    transform: scale(1.05);
  }
`;

// Styled component for HERO background blobs
const HeroAnimatedBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.70), rgba(108, 99, 255, 0.65))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))'
  };
  filter: ${props => props.theme.background === '#f4f3ef' 
    ? 'blur(35px)'
    : 'blur(40px)'
  };
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: ${props => props.theme.background === '#f4f3ef' ? 'soft-light' : 'screen'}; 
  opacity: 1.0;

  &.blob1 {
    width: 350px;
    height: 350px;
    top: 10%;
    left: 5%;
    animation: ${moveBlob1} 18s infinite alternate ease-in-out;
    animation-delay: -2s;
  }

  &.blob2 {
    width: 280px;
    height: 280px;
    bottom: 15%;
    right: 10%;
    animation: ${moveBlob2} 20s infinite alternate ease-in-out;
    animation-delay: -7s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.70), rgba(255, 146, 43, 0.65))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }

  @media (max-width: 768px) {
    opacity: ${props => props.theme.background === '#f4f3ef' ? 0.9 : 0.7}; 
  }
`;

// Styled component for OTHER SECTION background blobs
const SectionAnimatedBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.70), rgba(108, 99, 255, 0.65))' // Much higher opacity
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))' // Keep dark mode subtle
  };
  filter: ${props => props.theme.background === '#f4f3ef' 
    ? 'blur(35px)' // Much less blur
    : 'blur(40px)' // Keep dark mode blur
  };
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: ${props => props.theme.background === '#f4f3ef' ? 'soft-light' : 'screen'}; 
  opacity: 1.0;

  &.blob1 {
    width: 350px;
    height: 350px;
    top: 10%;
    left: 5%;
    animation: ${moveBlob1} 18s infinite alternate ease-in-out;
    animation-delay: -2s;
  }

  &.blob2 {
    width: 280px;
    height: 280px;
    bottom: 15%;
    right: 10%;
    animation: ${moveBlob2} 20s infinite alternate ease-in-out;
    animation-delay: -7s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.70), rgba(255, 146, 43, 0.65))' // Much higher opacity
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))' // Keep dark mode subtle
    };
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FullScreenSection = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  transition: background-color 0.3s ease;
  padding: 0 2rem;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const ProfileFloatingEffect = styled(motion.div)`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const ProfilePictureWrapper = styled(motion.div)`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(74, 144, 226, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 5px solid ${props => props.theme.cardBackground};
    border-radius: 50%;
    z-index: 2;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }

  @media (max-width: 480px) {
    width: 110px;
    height: 110px;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url('/images/profile.JPG');
  background-size: cover;
  background-position: center;
  transition: border-color 0.3s ease;
`;

const ProfileAnimationCircle = styled(motion.div)`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 1px dashed rgba(74, 144, 226, 0.4);
  border-radius: 50%;
  opacity: 0.7;
`;

const ProfileDecorativeCircle = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(74, 144, 226, 0.15);
  
  &:nth-child(1) {
    top: 0;
    left: 20%;
  }
  
  &:nth-child(2) {
    bottom: 10%;
    right: 0;
  }
  
  &:nth-child(3) {
    bottom: 30%;
    left: 0;
  }
`;

const ProfilePictureHighlight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(74, 144, 226, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 1;
`;

// Add custom typewriter hook
const useTypewriter = (texts, typingSpeed = 75, deletingSpeed = 50, pauseDuration = 1500) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (displayText.length < texts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setCurrentIndex((current) => (current + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

// Update the TypewriterName component
const TypewriterName = styled.div`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
  text-align: center;
  min-height: 4rem;
  position: relative;

  &::after {
    content: '|';
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-weight: 400;
  transition: color 0.3s ease;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const BioText = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    padding: 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
    gap: 0.8rem;
  }
`;

const Button = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.primary ? props.theme.text : 'transparent'};
  color: ${props => props.primary ? props.theme.cardBackground : props.theme.text};
  border: 1px solid ${props => props.theme.text};
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  min-width: 160px;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }

  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;

    @media (max-width: 480px) {
      width: 14px;
      height: 14px;
    }
  }

  ${props => props.primary && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.4s ease;
    }

    &:hover::before {
      left: 100%;
    }
  `}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    @media (hover: none) {
      transform: none;
      box-shadow: none;
    }

    svg {
      transform: rotate(10deg);
    }
  }
`;

const SectionContainer = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme.background === '#f4f3ef' ? '#f8f9fa' : 'transparent'};
  position: relative;
  border-radius: ${props => props.theme.background === '#f4f3ef' ? '30px' : '0'};
  box-shadow: ${props => props.theme.background === '#f4f3ef' ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none'};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #4A90E2;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto 2rem;
    gap: 0.75rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  max-width: 330px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 25px rgba(74, 144, 226, 0.3);
    z-index: 1;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  transition: transform 0.5s ease;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => theme.mode === 'light' 
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.6)'} 100%
    );
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProjectCard}:hover & {
    transform: scale(1.05);
    &:before {
      opacity: 1;
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1rem;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${props => props.theme.primary};
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const TechTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 15px;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    transform: translateY(-2px);
  }
`;

const ExpertiseSection = styled.div`
  padding: 6rem 1rem;
  background: ${props => props.theme.background === '#f4f3ef' ? '#f9f8f6' : '#1a1a1a'};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${SectionTitle}, ${SectionSubtitle} {
    color: #ffffff;
    position: relative;
    z-index: 1;
  }

  ${SectionTitle}:after {
    background: #ffffff;
  }

  @media (max-width: 1024px) {
    padding: 5rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 0.5rem;
  }
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  
  &:last-child {
    justify-content: center;
  }

  @media (min-width: 768px) {
    &::after {
      content: '';
      flex: auto;
    }
  }
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(30, 30, 30, 0.9)'};
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  border: 1px solid ${props => props.theme.background === '#f4f3ef'
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SkillIcon = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  color: #FF922B;
  filter: drop-shadow(0 0 5px rgba(74, 144, 226, 0.3));
  transition: all 0.3s ease;

  ${SkillCard}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.5));
  }
`;

const SkillName = styled.h4`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const SkillDescription = styled.p`
  font-size: 0.95rem;
  color: #ffffff;
  line-height: 1.6;
`;

const ExpertiseBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.4), rgba(108, 99, 255, 0.35))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))'
  };
  filter: blur(50px);
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: ${props => props.theme.background === '#f4f3ef' ? 'soft-light' : 'screen'}; 
  opacity: 0.8;

  &.blob1 {
    width: 500px;
    height: 500px;
    top: 10%;
    left: 5%;
    animation: ${moveBlob1} 25s infinite alternate ease-in-out;
  }

  &.blob2 {
    width: 400px;
    height: 400px;
    bottom: 15%;
    right: 10%;
    animation: ${moveBlob2} 30s infinite alternate ease-in-out;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.4), rgba(255, 146, 43, 0.35))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }

  @media (max-width: 768px) {
    &.blob1 {
      width: 300px;
      height: 300px;
    }

    &.blob2 {
      width: 250px;
      height: 250px;
    }
  }

  @media (max-width: 480px) {
    &.blob1 {
      width: 200px;
      height: 200px;
    }

    &.blob2 {
      width: 180px;
      height: 180px;
    }
  }
`;

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeInOut"
    }
  })
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const HeroSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  transition: background-color 0.3s ease;
  padding: 2rem;
  margin-top: 1cm;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0.5cm;
    text-align: center;
  }
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  color: ${props => props.theme.primary};
  font-weight: 500;
  margin-top: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const CTASection = styled.div`
  padding: 6rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const CTATitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const CTAText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.8;
`;

const CTAButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

// Add these styled components before the Home component
const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  background: ${props => props.theme.background};
  position: relative;
  overflow: hidden;
`;

const ProjectsContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

// Add these styled components for the project section blobs
const ProjectBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(108, 99, 255, 0.15))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))'
  };
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.8;

  &.blob1 {
    width: 400px;
    height: 400px;
    top: 10%;
    left: 5%;
    animation: ${moveBlob1} 25s infinite alternate ease-in-out;
  }

  &.blob2 {
    width: 350px;
    height: 350px;
    bottom: 15%;
    right: 10%;
    animation: ${moveBlob2} 30s infinite alternate ease-in-out;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 146, 43, 0.15))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }
`;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use the scroll to top hook
  useScrollToTop();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects.slice(0, 3));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Update the document title when the component mounts
    document.title = "Ayoub Benammour";
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Professional portfolio of Ayoub Benammour, a versatile developer specializing in web and game development. View projects and expertise.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, []);

  // Memoize expertiseData to prevent unnecessary re-renders
  const expertiseData = useMemo(() => [
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Bootstrap", icon: <FaBootstrap /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React.js", icon: <FaReact /> },
    { name: "Next.js", icon: <FaCode /> },
    { name: "PHP", icon: <FaPhp /> },
    { name: "Laravel", icon: <FaLaravel /> },
    { name: "Node.js", icon: <FaNode /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Python", icon: <SiPython /> },
    { name: "MySQL", icon: <FaDatabase /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "C# (Unity)", icon: <FaCode /> },
    { name: "Unity", icon: <FaUnity /> },
    { name: "Git", icon: <FaGithub /> },
    { name: "Visual Studio", icon: <FaMicrosoft /> },
    { name: "VS Code", icon: <FaCodeEditor /> },
    { name: "WordPress", icon: <FaWordpress /> },
    { name: "Figma", icon: <FaFigma /> },
    { name: "Scrum", icon: <BsKanban /> },
    { name: "XAMPP", icon: <SiXampp /> },
    { name: "Adobe", icon: <SiAdobe /> },
  ], []);

  const typewriterText = useTypewriter([
    'Ayoub Benammour',
    'Full Stack Web Developer',
  ], 75, 50, 1500);

  const webSkills = [
    { name: "Frontend Development", icon: "🖥️", description: "Building responsive and interactive user interfaces using React and Next.js." },
    { name: "Backend Development", icon: "🛠️", description: "Creating robust server-side applications and APIs with Node.js, Express, and MongoDB." },
    { name: "Full-Stack Expertise", icon: "🌍", description: "Seamless integration of frontend and backend technologies to deliver complete web solutions that are scalable and efficient." },
    { name: "Database Management", icon: "🗄️", description: "Designing and managing efficient databases using SQL and NoSQL technologies." },
    { name: "Version Control", icon: "🔄", description: "Efficiently using Git and GitHub for version control, enabling smooth collaboration and code management in team projects." },
    { name: "Cloud Deployment", icon: "☁️", description: "Deploying and managing web applications on platforms like Vercel, Netlify, and AWS." },
    { name: "Performance Optimization", icon: "⚡", description: "Optimizing the performance of web applications, focusing on load times, smooth transitions, and user experience to ensure faster." }
];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Animated Background Blobs */}
      <HeroAnimatedBlob className="blob1" style={{ top: '5%', left: '70%', width: '250px', height: '250px' }} />
      <HeroAnimatedBlob className="blob2" style={{ bottom: '10%', left: '10%', width: '300px', height: '300px' }} />
      
      {/* Hero Section */}
      <HeroSection>
        <ProfileImageContainer>
          <ProfileFloatingEffect
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ProfileDecorativeCircle 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <ProfileDecorativeCircle 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
            <ProfileDecorativeCircle 
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            />
            
            <ProfilePictureWrapper
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <ProfileAnimationCircle
                animate={{ 
                  rotate: 360
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <ProfileImage 
                animate={{ 
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <ProfilePictureHighlight 
                animate={{ 
                  opacity: [0.5, 0.7, 0.5], 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
            </ProfilePictureWrapper>
          </ProfileFloatingEffect>
        </ProfileImageContainer>
        
        <motion.div
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <TypewriterName>
            {typewriterText}
          </TypewriterName>
          <Title 
            variants={textItemVariants}
          >
            Welcome to my Portfolio
          </Title>
          <BioText 
             variants={textItemVariants}
          >
          I’m a passionate web developer specializing in creating dynamic and responsive web applications. I focus on delivering efficient, scalable, and user-friendly solutions that solve real-world problems.
          </BioText>
        </motion.div>
        <ButtonContainer>
          <Button
            to="/contact"
            primary="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact Me
          </Button>
          <Button
            to="/about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            About Me
          </Button>
        </ButtonContainer>
      </HeroSection>
      
      {/* Featured Projects Section */}
      <ProjectsSection>
        <ProjectBlob className="blob1" 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <ProjectBlob className="blob2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <ProjectsContainer>
          <SectionHeader>
            <SectionTitle>Featured Projects</SectionTitle>
            <SectionDescription>
              A selection of my recent work in web development
            </SectionDescription>
          </SectionHeader>
          
          <ProjectsGrid>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                onClick={() => navigate(`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <ProjectImage src={project.images.screen} alt={project.title} />
                <ProjectContent>
                  <ProjectCategory>Web Development</ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
          
          <ViewAllLink 
            to="/projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            View All Projects <FaChevronRight style={{ marginLeft: '5px' }} />
          </ViewAllLink>
        </ProjectsContainer>
      </ProjectsSection>
      
      {/* Skills Section */}
      <ExpertiseSection>
        <ExpertiseBlob className="blob1" />
        <ExpertiseBlob className="blob2" />
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Expertise
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Technologies and tools I work with to bring ideas to life
        </SectionSubtitle>
        
        <ExpertiseGrid>
          {webSkills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px rgba(74, 144, 226, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <SkillIcon>
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {skill.icon}
                </motion.div>
              </SkillIcon>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
        </ExpertiseGrid>
      </ExpertiseSection>
      
      {/* Call to Action Section */}
      <CTASection>
        <CTATitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Start Your Project?
        </CTATitle>
        <CTAText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
         Looking for a stunning website, a custom digital solution, or efficient web development? I'm here to turn your ideas into reality. Let's collaborate and create something amazing together.
        </CTAText>
        <CTAButtonsContainer>
          <Button
            to="/services"
            primary="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View Services
          </Button>
          <Button
            to="/contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get in Touch
          </Button>
        </CTAButtonsContainer>
      </CTASection>
      
      {/* Footer - directly rendered */}
      <Footer />
    </motion.div>
  );
};

// Loading spinner component
const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4A90E2;
  animation: spin 1s ease-in-out infinite;
  margin: 2rem auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default React.memo(Home); 