import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useScrollToTop } from '../utils/scrollUtils';
import Footer from '../components/Footer';
import { FaJs, FaReact, FaNode, FaHtml5, FaCss3Alt, FaUnity, FaCode, FaGamepad, FaTools, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiPython, SiMongodb, SiXampp, SiAdobe } from 'react-icons/si';
import { FaBootstrap, FaPhp, FaLaravel, FaDatabase, FaGithub, FaMicrosoft, FaWordpress } from 'react-icons/fa';
import { BsKanban } from 'react-icons/bs';
import { VscCode } from 'react-icons/vsc';

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

// Styled component for background blobs
const AnimatedBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(108, 99, 255, 0.1));
  filter: blur(50px); // Soft blur effect
  z-index: 0; // Behind content
  pointer-events: none; // Make it non-interactive

  &.blob1 {
    width: 350px;
    height: 350px;
    top: 10%;
    left: 5%;
    animation: ${moveBlob1} 15s infinite alternate ease-in-out;
  }

  &.blob2 {
    width: 280px;
    height: 280px;
    bottom: 15%;
    right: 10%;
    animation: ${moveBlob2} 18s infinite alternate ease-in-out;
    animation-delay: -5s; // Offset animation start
  }
  
  // Hide blobs on smaller screens where they might be too distracting
  @media (max-width: 768px) {
    display: none;
  }
`;

const AboutContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
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
  text-align: center;
  color: ${props => props.theme.textSecondary};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 2rem auto 4rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${props => props.theme.text};
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    background: ${props => props.theme.primary};
    border-radius: 50%;
  }
`;

// Enhanced profile picture with animations
const ProfileColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfilePictureWrapper = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 6px solid ${props => props.theme.background === '#f4f3ef' ? '#fff' : '#333'};
    border-radius: 50%;
    z-index: 2;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #4A90E2;
    border-radius: 50%;
    z-index: 3;
    opacity: 0.7;
  }
`;

const ProfilePicture = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url('/images/profile.JPG');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const ProfileAnimationCircle = styled(motion.div)`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px dashed #4A90E2;
  border-radius: 50%;
  opacity: 0.5;
`;

const ProfilePictureHighlight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 1;
`;

const ProfileFloatingEffect = styled(motion.div)`
  position: relative;
  width: 310px;
  height: 310px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileDecorativeCircle = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(74, 144, 226, 0.2);
  
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

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #4A90E2;
`;

const StatTitle = styled.p`
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 4rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.8rem;
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: #4A90E2;
    border-radius: 4px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.5rem;
  margin: 8rem 0;
  padding: 0 1rem;
  margin-bottom: 8rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SkillIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
    color: ${({ theme }) => theme.primary};
  }
`;

const SkillName = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between child animations
      delayChildren: 0.3, // Initial delay before starting
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1, // Stagger animation based on index
      duration: 0.6,
      ease: "easeInOut"
    }
  })
};

const About = () => {
  const [particles, setParticles] = useState([]);
  useScrollToTop();

  const skills = [
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
    { name: "C#", icon: <FaCode /> },
    { name: "MySQL", icon: <FaDatabase /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Unity", icon: <FaUnity /> },
    { name: "Git", icon: <FaGithub /> },
    { name: "Visual Studio", icon: <FaMicrosoft /> },
    { name: "VS Code", icon: <VscCode /> },
    { name: "WordPress", icon: <FaWordpress /> },
    { name: "Figma", icon: <FaFigma /> },
    { name: "Scrum", icon: <BsKanban /> },
    { name: "XAMPP", icon: <SiXampp /> },
    { name: "Adobe", icon: <SiAdobe /> }
  ];

  // Add particle generation effect
  useEffect(() => {
    const generateParticles = () => {
      const particleTypes = ['primary', 'secondary', 'accent', 'highlight', 'special'];
      const newParticles = Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * Math.max(document.documentElement.scrollHeight, window.innerHeight * 3),
        size: Math.random() * 6 + 4,
        duration: Math.random() * 20 + 15,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        delay: Math.random() * 8,
        rotationSpeed: Math.random() * 360,
        moveDistance: Math.random() * 300 + 100
      }));
      setParticles(newParticles);
    };

    generateParticles();
    
    // Add scroll event listener to update particles
    const handleScroll = () => {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight * 3);
      if (window.scrollY > scrollHeight * 0.7) {
        generateParticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', generateParticles);

    // Regenerate particles more frequently
    const regenerateInterval = setInterval(generateParticles, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', generateParticles);
      clearInterval(regenerateInterval);
    };
  }, []);

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
      <AnimatedBlob className="blob1" />
      <AnimatedBlob className="blob2" />
      
      <AboutContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>
            About Me
          </SectionTitle>
          
          <SectionSubtitle variants={itemVariants}>
            Get to know more about my background, experience, and what drives me as a developer.
          </SectionSubtitle>
        </motion.div>
        
        <AboutContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <AboutText>
              <Paragraph variants={itemVariants}>
                I'm Ayoub Benammour, a passionate developer with a focus on creating exceptional digital experiences through both web and game development. With several years of experience in the field, I've had the opportunity to work on a diverse range of projects, from responsive websites to immersive games.
              </Paragraph>
              <Paragraph variants={itemVariants}>
                My journey into development began with a curiosity about how digital products are built and a desire to create meaningful user experiences. This curiosity evolved into a deep passion for coding, design, and problem-solving. I'm constantly exploring new technologies and methodologies to enhance my skill set and deliver better results.
              </Paragraph>
             
            </AboutText>
          </motion.div>
          
          <ProfileColumnContainer>
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
                <ProfilePicture 
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
          </ProfileColumnContainer>
        </AboutContent>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <SkillsContainer>
            <SkillsTitle>My Skills</SkillsTitle>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <SkillIcon>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </motion.div>
      </AboutContainer>
      
      <Footer />
    </motion.div>
  );
};

export default About; 