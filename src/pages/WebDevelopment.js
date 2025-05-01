import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useInView } from 'framer-motion';
import { useScrollToTop } from '../utils/scrollUtils';
import Footer from '../components/Footer';
import ReadyToStart from '../components/ReadyToStart';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  position: fixed;
  border-radius: 50%;
  background: ${props => props.theme.mode === 'light' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(108, 99, 255, 0.15))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(108, 99, 255, 0.1))'};
  filter: blur(${props => props.theme.mode === 'light' ? '30px' : '50px'});
  z-index: -1;
  pointer-events: none;

  &.blob1 {
    width: 500px;
    height: 500px;
    top: 5%;
    left: 0;
    animation: ${moveBlob1} 25s infinite alternate ease-in-out;
    opacity: ${props => props.theme.mode === 'light' ? '0.5' : '0.7'};
  }

  &.blob2 {
    width: 400px;
    height: 400px;
    bottom: 10%;
    right: 0;
    animation: ${moveBlob2} 30s infinite alternate ease-in-out;
    animation-delay: -5s;
    opacity: ${props => props.theme.mode === 'light' ? '0.5' : '0.7'};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const WebDevContainer = styled.div`
  padding: 8rem 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
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

const SkillsSection = styled.div`
  margin-bottom: 6rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #4A90E2;
`;

const SkillName = styled.h4`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const SkillDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const ProjectsSection = styled.div`
  margin-bottom: 4rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.5rem;
  background: ${props => props.active 
    ? '#4A90E2' 
    : props.theme.cardBackground};
  color: ${props => props.active 
    ? 'white' 
    : props.theme.text};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.active 
      ? '0 10px 20px rgba(74, 144, 226, 0.3)' 
      : '0 10px 20px rgba(0, 0, 0, 0.1)'};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.mode === 'light' ? '#ffffff' : props.theme.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.mode === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.05)'
    : '0 5px 15px rgba(0, 0, 0, 0.2)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  border: ${props => props.theme.mode === 'light' ? '1px solid #edf2f7' : 'none'};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.mode === 'light'
      ? '0 20px 40px rgba(0, 0, 0, 0.05)'
      : '0 18px 35px rgba(0, 0, 0, 0.25)'};
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: ${props => props.theme.mode === 'light' ? '#f8fafc' : '#2a2a2a'};
  display: flex;
  align-items: center;
  justify-content: center;

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
      ${props => props.theme.mode === 'light' 
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.6)'} 100%
    );
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
    &:before {
      opacity: 1;
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.mode === 'light' ? '#2d3748' : props.theme.text};
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.mode === 'light' ? '#4a5568' : props.theme.textSecondary};
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
  background: ${props => props.theme.mode === 'light'
    ? '#F5F3FF'
    : 'rgba(139, 92, 246, 0.15)'};
  color: ${props => props.theme.mode === 'light' ? '#6D28D9' : '#A78BFA'};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: ${props => props.theme.mode === 'light' ? '1px solid #E9D5FF' : 'none'};

  &:hover {
    background: ${props => props.theme.mode === 'light'
      ? '#EDE9FE'
      : 'rgba(139, 92, 246, 0.25)'};
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 140px;
  
  background: ${props => props.theme.mode === 'light' ? '#ffffff' : 'transparent'};
  color: ${props => props.theme.mode === 'light' ? '#3182ce' : props.theme.text};
  border: 1px solid ${props => props.theme.mode === 'light' ? '#3182ce' : props.theme.primary};
  box-shadow: ${props => props.theme.mode === 'light' ? '0 2px 4px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.mode === 'light' ? '#ebf8ff' : `${props.theme.primary}10`};
    box-shadow: ${props => props.theme.mode === 'light'
      ? '0 4px 12px rgba(49, 130, 206, 0.15)'
      : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  svg {
    font-size: 1.1rem;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(-1px);
  }
`;

const LoadMoreButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 3rem auto 0;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  background: ${props => props.theme.primary}10;
  border: 2px solid ${props => props.theme.primary}30;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px ${props => props.theme.primary}30;
  }
`;

const ProcessSection = styled.div`
  margin-top: 5rem;
`;

const ProcessTitle = styled.h3`
  font-size: 1.75rem;
  color: ${props => props.theme.text};
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
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

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProcessStep = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4A90E2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h4`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
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
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WebDevelopment = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use the scroll to top hook
  useScrollToTop();

  // Add an additional useEffect for immediate scroll reset
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []); // Empty dependency array means this runs once when component mounts

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // Filter only web development projects
        const webProjects = data.projects.filter(project => project.type === 'web');
        setProjects(webProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const loadMore = () => {
    setVisibleProjects(prev => {
      const newValue = prev + 3;
      // Smooth scroll to the newly loaded content
      setTimeout(() => {
        const lastProject = document.querySelector('.project-card:last-child');
        if (lastProject) {
          lastProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return newValue;
    });
  };

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {/* Animated Background Blobs */}
      <AnimatedBlob className="blob1" />
      <AnimatedBlob className="blob2" />
      
      <WebDevContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <SectionTitle variants={itemVariants}>
            My Projects
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            A collection of my development projects showcasing various technologies and solutions.
          </SectionSubtitle>
        </motion.div>
        
        <ProjectsSection>
          <ProjectsGrid>
            {projects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="project-card"
              >
                <ProjectCard onClick={() => handleProjectClick(project)}>
                  <ProjectImage>
                    {loading ? (
                      <div className="placeholder" />
                    ) : project.images.screen ? (
                      <img 
                        src={project.images.screen} 
                        alt={project.title}
                      />
                    ) : (
                      <div className="error-icon">🖼️</div>
                    )}
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechStack>
                      {project.technologies.map((tech, i) => (
                        <TechTag key={i}>{tech}</TechTag>
                      ))}
                    </TechStack>
                    <ProjectLinks>
                      <ProjectLink 
                        as="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <FaInfoCircle /> View Info
                      </ProjectLink>
                      {project.live && project.live !== "" && (
                        <ProjectLink 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ background: '#4A90E2', color: '#fff', borderColor: '#4A90E2' }}
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              </motion.div>
            ))}
          </ProjectsGrid>
          {projects.length > 3 && visibleProjects < projects.length && (
            <LoadMoreButton 
              onClick={loadMore}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              Load More Projects
              <FaExternalLinkAlt />
            </LoadMoreButton>
          )}
        </ProjectsSection>
      </WebDevContainer>
      <ReadyToStart />
      <Footer />
    </motion.div>
  );
};

export default WebDevelopment;