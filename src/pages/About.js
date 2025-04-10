import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  padding: 8rem 2rem 4rem;
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const Skill = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #4A90E2;
`;

const SkillName = styled.p`
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: #4A90E2;
  border-radius: 3px;
`;

const About = () => {
  const skills = [
    { name: "JavaScript", level: 90, icon: "💻" },
    { name: "React", level: 85, icon: "⚛️" },
    { name: "Node.js", level: 80, icon: "🔧" },
    { name: "HTML5", level: 95, icon: "🌐" },
    { name: "CSS3", level: 90, icon: "🎨" },
    { name: "Unity", level: 75, icon: "🎮" },
    { name: "C#", level: 85, icon: "📱" },
    { name: "Game Design", level: 80, icon: "🎯" },
    { name: "3D Modeling", level: 65, icon: "🧊" },
    { name: "UI/UX Design", level: 85, icon: "✏️" }
  ];

  return (
    <AboutContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </SectionTitle>
      
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Get to know more about my background, experience, and what drives me as a developer.
      </SectionSubtitle>
      
      <AboutContent>
        <AboutText>
          <Paragraph
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm Ayoub Benammour, a passionate developer with a focus on creating exceptional digital experiences through both web and game development. With several years of experience in the field, I've had the opportunity to work on a diverse range of projects, from responsive websites to immersive games.
          </Paragraph>
          <Paragraph
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My journey into development began with a curiosity about how digital products are built and a desire to create meaningful user experiences. This curiosity evolved into a deep passion for coding, design, and problem-solving. I'm constantly exploring new technologies and methodologies to enhance my skill set and deliver better results.
          </Paragraph>
          <Paragraph
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I believe in a user-centered approach to development, where understanding the end user's needs and experiences drives the creation of intuitive, accessible, and engaging solutions. This philosophy guides my work across both web and game development projects.
          </Paragraph>
          <Paragraph
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            When I'm not coding, I enjoy exploring new game mechanics, reading about UX design, and contributing to open source projects. I'm always open to new challenges and collaborations, so feel free to reach out if you have a project in mind.
          </Paragraph>
        </AboutText>
        
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
      
      <StatsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <StatItem
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StatNumber>5+</StatNumber>
          <StatTitle>Years Experience</StatTitle>
        </StatItem>
        <StatItem
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StatNumber>50+</StatNumber>
          <StatTitle>Projects Completed</StatTitle>
        </StatItem>
        <StatItem
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StatNumber>20+</StatNumber>
          <StatTitle>Happy Clients</StatTitle>
        </StatItem>
        <StatItem
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StatNumber>10+</StatNumber>
          <StatTitle>Games Created</StatTitle>
        </StatItem>
      </StatsContainer>
      
      <SkillsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <SkillsTitle>My Skills</SkillsTitle>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <Skill
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <SkillIcon>{skill.icon}</SkillIcon>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>
                <SkillProgress
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                />
              </SkillLevel>
            </Skill>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </AboutContainer>
  );
};

export default About; 