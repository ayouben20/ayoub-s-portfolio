import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '../utils/scrollUtils';
import Footer from '../components/Footer';

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

// Styled component for HERO background blobs
const HeroAnimatedBlob = styled(motion.div)`
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

  &.blob1 {
    width: 350px;
    height: 350px;
    top: 10%;
    left: 15%;
    animation: ${moveBlob1} 16s infinite alternate ease-in-out;
  }

  &.blob2 {
    width: 300px;
    height: 300px;
    bottom: 10%;
    right: 10%;
    animation: ${moveBlob2} 19s infinite alternate ease-in-out;
    animation-delay: -6s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.70), rgba(255, 146, 43, 0.65))' // Much higher opacity
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))' // Keep dark mode subtle
    };
  }
  
  &.blob3 {
    width: 220px;
    height: 220px;
    top: 60%; 
    left: 30%; 
    transform: translate(-50%, -50%);
    animation: ${moveBlob3} 22s infinite alternate ease-in-out;
    animation-delay: -9s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(99, 202, 183, 0.70), rgba(108, 170, 255, 0.70))' // Much higher opacity
      : 'linear-gradient(135deg, rgba(99, 202, 183, 0.08), rgba(108, 170, 255, 0.08))' // Keep dark mode subtle
    };
    opacity: 1.0;
  }
  
  @media (max-width: 768px) {
    opacity: ${props => props.theme.background === '#f4f3ef' ? 0.9 : 0.7}; 
    &.blob3 {
      display: none;
    }
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
`;

const ProfileFloatingEffect = styled(motion.div)`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Name = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-weight: 400;
  transition: color 0.3s ease;
  text-align: center;
`;

const BioText = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  background: ${props => props.primary 
    ? props.theme.text 
    : 'transparent'};
  color: ${props => props.primary 
    ? props.theme.cardBackground 
    : props.theme.text};
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

  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
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
    svg {
      transform: rotate(10deg);
    }
  }
`;

const SectionContainer = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 4rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  background-color: ${props => props.theme.background};
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProjectType = styled.span`
  display: inline-block;
  padding: 0.3rem 1rem;
  background: ${props => props.type === 'web' ? '#4A90E2' : '#6C63FF'};
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const SkillsSection = styled.div`
  background-color: ${props => props.theme.background === '#f4f3ef' ? '#f9f8f6' : '#1a1a1a'};
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  
  ${SectionTitle}, ${SectionSubtitle} {
    color: ${props => props.theme.background === '#f4f3ef' ? '#333' : '#fff'};
  }
  
  ${SectionSubtitle} {
    color: ${props => props.theme.background === '#f4f3ef' ? '#555' : '#e0e0e0'};
  }
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled(motion.div)`
  font-size: 2.8rem;
  margin-bottom: 1.2rem;
  color: ${props => props.color};
  transition: transform 0.3s ease;

  ${SkillCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const CTASection = styled.div`
  padding: 6rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
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
    align-items: center;
  }
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  color: #4A90E2;
  font-weight: 500;
  margin-top: 1rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Re-add the HeroSection styled component definition
const HeroSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  transition: background-color 0.3s ease;
  padding: 0 2rem;
  margin-top: 1cm;
  position: relative;
  overflow: hidden;
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

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  // Use the scroll to top hook
  useScrollToTop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Send event to parent to show/hide navbar - ALWAYS SHOW
      const event = new CustomEvent('navbar-visibility', { 
        detail: { visible: true }
      });
      window.dispatchEvent(event);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with user authentication, product filtering, and payment integration.",
      image: "/images/project1.jpg",
      type: "web"
    },
    {
      title: "Dimensional Drift",
      description: "A puzzle-platformer game where players navigate between dimensions to solve complex environmental puzzles.",
      image: "/images/game1.jpg",
      type: "game"
    },
    {
      title: "Portfolio Website",
      description: "A custom-designed portfolio website showcasing projects and skills with smooth animations.",
      image: "/images/project3.jpg",
      type: "web"
    }
  ];
  
  const skills = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Creating responsive, user-friendly websites and web applications with modern technologies.",
      color: "#4A90E2"
    },
    {
      icon: "🎮",
      title: "Game Development",
      description: "Building engaging gaming experiences using Unity, C#, and advanced game design principles.",
      color: "#6C63FF"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Designing intuitive interfaces and seamless user experiences for web and games.",
      color: "#FF6B6B"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Ensuring websites and applications work flawlessly across all devices and screen sizes.",
      color: "#FF922B"
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section - Add the blobs here */} 
      <HeroSection>
        <HeroAnimatedBlob className="blob1" />
        <HeroAnimatedBlob className="blob2" />
        <HeroAnimatedBlob className="blob3" />
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
          <Name 
            variants={textItemVariants}
          >
             Ayoub Benammour
          </Name>
          <Title 
            variants={textItemVariants}
          >
            Web & Game Developer
          </Title>
          <BioText 
             variants={textItemVariants}
          >
            A versatile developer with expertise in both web and game development. 
            Delivering polished, user-centered experiences with a focus on clean code and 
            engaging interfaces. Committed to creating memorable digital solutions that 
            combine technical excellence with creative design.
          </BioText>
        </motion.div>
        <ButtonContainer>
          <Button
            href="/contact"
            primary={true}
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
            href="/about"
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
      <SectionContainer>
        {/* Add Section Blobs */}
        <SectionAnimatedBlob className="blob1" style={{ top: '5%', left: '70%', width: '250px', height: '250px' }} /> 
        <SectionAnimatedBlob className="blob2" style={{ bottom: '10%', left: '10%', width: '300px', height: '300px' }} />
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A selection of my recent work in web and game development
        </SectionSubtitle>
        
        <ProjectsGrid>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
              <ProjectContent>
                <ProjectType type={project.type}>
                  {project.type === 'web' ? 'Web Development' : 'Game Development'}
                </ProjectType>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        <ViewAllLink to="/projects">View All Projects →</ViewAllLink>
      </SectionContainer>
      
      {/* Skills Section */}
      <SkillsSection>
        {/* Add Section Blobs */}
        <SectionAnimatedBlob className="blob1" style={{ top: '20%', left: '10%', width: '300px', height: '300px' }} />
        <SectionAnimatedBlob className="blob2" style={{ bottom: '5%', right: '5%', width: '350px', height: '350px' }} />
        <SkillsContainer>
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
            The core skills and services I bring to your projects
          </SectionSubtitle>
          
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover={{ y: -10 }}
              >
                <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillDescription>{skill.description}</SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
        </SkillsContainer>
      </SkillsSection>
      
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
          Whether you're looking for a stunning website, an engaging game, or a custom digital solution,
          I'm here to help bring your vision to life. Let's collaborate to create something amazing together.
        </CTAText>
        <CTAButtonsContainer>
          <Button
            href="/services"
            primary={true}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View Services
          </Button>
          <Button
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get in Touch
          </Button>
        </CTAButtonsContainer>
      </CTASection>
      
      {/* Footer JSX removed, replaced by <Footer /> component import */}
      <Footer />
    </motion.div>
  );
};

export default Home; 