import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GameDevContainer = styled.div`
  padding: 8rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  color: #64ffda;
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SkillTile = styled(motion.div)`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.1);
  }
`;

const SkillTitle = styled.h3`
  color: #e6f1ff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: #64ffda;
  border-radius: 4px;
`;

const SkillDescription = styled.p`
  color: #8892b0;
  font-size: 1rem;
  line-height: 1.6;
`;

const GameDev = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    {
      title: 'Unity Development',
      progress: 85,
      description: 'Experience in creating 2D and 3D games using Unity engine, implementing game mechanics, and optimizing performance.'
    },
    {
      title: 'Game Design',
      progress: 80,
      description: 'Strong understanding of game mechanics, level design, and player experience optimization.'
    },
    {
      title: 'C# Programming',
      progress: 90,
      description: 'Proficient in C# for game development, including object-oriented programming and design patterns.'
    },
    {
      title: '3D Modeling',
      progress: 70,
      description: 'Basic skills in 3D modeling and animation using Blender and other 3D software.'
    },
    {
      title: 'Game Physics',
      progress: 75,
      description: 'Understanding of physics systems in games, including collision detection and rigid body dynamics.'
    },
    {
      title: 'UI/UX for Games',
      progress: 85,
      description: 'Creating intuitive and engaging user interfaces for games, focusing on player experience.'
    }
  ];

  return (
    <GameDevContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Game Development Skills
      </SectionTitle>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillTile
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedSkill(skill)}
          >
            <SkillTitle>{skill.title}</SkillTitle>
            <ProgressBar>
              <Progress
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </ProgressBar>
            <SkillDescription>{skill.description}</SkillDescription>
          </SkillTile>
        ))}
      </SkillsGrid>
    </GameDevContainer>
  );
};

export default GameDev; 