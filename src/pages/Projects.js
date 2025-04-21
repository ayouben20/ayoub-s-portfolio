import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { pageTransition, pageVariants } from '../utils/animations';
import ReadyToStart from '../components/ReadyToStart';
import Footer from '../components/Footer';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const ProjectsContainer = styled.div`
  padding: 120px 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.mode === 'light'
    ? 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)'
    : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(17, 25, 40, 0.75)'};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.mode === 'light'
    ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
    : '0 4px 6px rgba(0, 0, 0, 0.2)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.mode === 'light'
    ? 'rgba(255, 255, 255, 0.5)'
    : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.mode === 'light'
      ? '0 20px 40px rgba(0, 0, 0, 0.12)'
      : '0 20px 40px rgba(0, 0, 0, 0.3)'};
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
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
      transparent 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover & {
    &:before {
      opacity: 1;
    }

    img {
      transform: scale(1.1);
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1.8rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  margin-bottom: 1.2rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.mode === 'light'
    ? 'rgba(37, 99, 235, 0.1)'
    : 'rgba(59, 130, 246, 0.2)'};
  color: ${({ theme }) => theme.mode === 'light' ? '#2563eb' : '#60a5fa'};
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border: 1px solid ${({ theme }) => theme.mode === 'light'
    ? 'rgba(37, 99, 235, 0.2)'
    : 'rgba(59, 130, 246, 0.3)'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.mode === 'light'
      ? 'rgba(37, 99, 235, 0.15)'
      : 'rgba(59, 130, 246, 0.25)'};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  background: ${({ theme }) => theme.mode === 'light'
    ? 'rgba(37, 99, 235, 0.1)'
    : 'rgba(59, 130, 246, 0.1)'};

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
    background: ${({ theme }) => theme.mode === 'light'
      ? 'rgba(37, 99, 235, 0.15)'
      : 'rgba(59, 130, 246, 0.15)'};
  }

  svg {
    font-size: 1.1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  background: ${({ active, theme }) => active 
    ? theme.mode === 'light'
      ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
      : 'linear-gradient(135deg, #3b82f6, #2563eb)'
    : theme.mode === 'light'
      ? 'rgba(226, 232, 240, 0.8)'
      : 'rgba(30, 41, 59, 0.8)'};
  color: ${({ active, theme }) => active 
    ? 'white' 
    : theme.mode === 'light'
      ? '#475569'
      : '#94a3b8'};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.5px;
  border: 1px solid ${({ active, theme }) => active
    ? 'transparent'
    : theme.mode === 'light'
      ? 'rgba(226, 232, 240, 0.8)'
      : 'rgba(51, 65, 85, 0.8)'};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ active, theme }) => active
      ? theme.mode === 'light'
        ? 'linear-gradient(135deg, #1d4ed8, #1e40af)'
        : 'linear-gradient(135deg, #2563eb, #1d4ed8)'
      : theme.mode === 'light'
        ? 'rgba(226, 232, 240, 0.9)'
        : 'rgba(30, 41, 59, 0.9)'};
    box-shadow: ${({ active, theme }) => active
      ? '0 10px 20px rgba(37, 99, 235, 0.2)'
      : '0 10px 20px rgba(0, 0, 0, 0.1)'};
  }
`;

// Modal components for expanded project view
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'light'
    ? 'rgba(255, 255, 255, 0.95)'
    : 'rgba(17, 25, 40, 0.95)'};
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${({ theme }) => theme.mode === 'light'
    ? 'rgba(226, 232, 240, 0.8)'
    : 'rgba(51, 65, 85, 0.8)'};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.mode === 'light'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)'};
    transform: rotate(90deg);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.type === filter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <PageWrapper>
        <ProjectsContainer>
          <Header>
            <Title>My Projects</Title>
            <Description>
              A showcase of my work, including web applications, design projects, and more.
              Each project represents a unique challenge and solution.
            </Description>
          </Header>

          <FilterContainer>
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              active={filter === 'web'} 
              onClick={() => setFilter('web')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Web Development
            </FilterButton>
            <FilterButton 
              active={filter === 'game'} 
              onClick={() => setFilter('game')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Game Development
            </FilterButton>
          </FilterContainer>

          <ProjectsGrid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -8 }}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.technologies.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  <ProjectLinks>
                    {project.github && (
                      <ProjectLink 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> View Code
                      </ProjectLink>
                    )}
                    {project.live && (
                      <ProjectLink 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </ProjectsContainer>

        <ReadyToStart />
        <Footer />

        <AnimatePresence>
          {selectedProject && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <ModalContent
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton onClick={() => setSelectedProject(null)}>
                  <FaTimes />
                </CloseButton>
                <ModalImage src={selectedProject.image} alt={selectedProject.title} />
                <ProjectTitle>{selectedProject.title}</ProjectTitle>
                <ProjectDescription>{selectedProject.description}</ProjectDescription>
                <TechStack>
                  {selectedProject.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  {selectedProject.github && (
                    <ProjectLink 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> View Code
                    </ProjectLink>
                  )}
                  {selectedProject.live && (
                    <ProjectLink 
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </PageWrapper>
    </motion.div>
  );
};

export default Projects; 