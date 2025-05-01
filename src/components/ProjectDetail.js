import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Footer from './Footer';

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

const ProjectBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(162,89,255,0.18), rgba(106,130,251,0.18))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))'
  };
  filter: blur(50px);
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: ${props => props.theme.background === '#f4f3ef' ? 1 : 0.8};

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
      ? 'linear-gradient(135deg, rgba(255, 107, 255, 0.18), rgba(162, 89, 255, 0.18))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }
`;

const ProjectDetailContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  margin-bottom: 6rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.mode === 'light'
    ? '#F5F3FF'
    : 'rgba(139, 92, 246, 0.15)'};
  color: ${({ theme }) => theme.mode === 'light' ? '#6D28D9' : '#A78BFA'};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: ${({ theme }) => theme.mode === 'light' ? '1px solid #E9D5FF' : 'none'};

  &:hover {
    background: ${({ theme }) => theme.mode === 'light'
      ? '#EDE9FE'
      : 'rgba(139, 92, 246, 0.25)'};
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.primary ? (props.theme.background === '#f4f3ef' ? 'linear-gradient(90deg, #a259ff 0%, #6a82fb 100%)' : props.theme.primary) : 'transparent'};
  color: ${props => props.primary ? '#fff' : props.theme.text};
  border: 2px solid ${props => props.primary ? 'transparent' : props.theme.primary};
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(.4,2,.6,1);
  position: relative;
  z-index: 2;
  &:hover {
    transform: translateY(-2px) scale(1.04);
    background: ${props => props.primary ? (props.theme.background === '#f4f3ef' ? 'linear-gradient(90deg, #a259ff 0%, #6a82fb 100%)' : props.theme.primary) : 'rgba(66, 153, 225, 0.1)'};
    color: ${props => props.primary ? '#fff' : props.theme.text};
  }
`;

const ProjectImage = styled.div`
  flex: 1;
  position: relative;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    min-height: 400px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: auto;
  
  img {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }
`;

const MobileImageContainer = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 200px;
  z-index: 2;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 1200px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    width: 140px;
    right: 2%;
    bottom: 2%;
  }
`;

const MoreProjectsSection = styled.div`
  margin-top: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.text};
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'light' ? '#ffffff' : theme.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.mode === 'light' 
    ? '0 4px 6px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.05)'
    : '0 5px 15px rgba(0, 0, 0, 0.2)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.mode === 'light' ? '1px solid #edf2f7' : 'none'};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.mode === 'light'
      ? '0 20px 40px rgba(0, 0, 0, 0.05)'
      : '0 18px 35px rgba(0, 0, 0, 0.25)'};
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.mode === 'light' ? '#f8fafc' : '#2a2a2a'};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.5s ease;
    display: block;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.mode === 'light' ? '#2d3748' : theme.text};
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.mode === 'light' ? '#4a5568' : theme.textSecondary};
  margin-bottom: 1.2rem;
  line-height: 1.6;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 100px;
  left: 2rem;
  background: ${props => props.theme.cardBackground};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text};
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-2px);
    color: white;
    background: ${props => props.theme.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 2rem;
  }
`;

const ProjectDetail = () => {
  const { projectTitle } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [moreProjects, setMoreProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        
        // Find the current project by title (converted to URL-friendly format)
        const currentProject = data.projects.find(p => 
          p.title.toLowerCase().replace(/\s+/g, '-') === projectTitle
        );
        
        if (!currentProject) {
          navigate('/projects');
          return;
        }

        setProject(currentProject);
        
        // Get 3 random projects excluding the current one
        const otherProjects = data.projects
          .filter(p => p.title !== currentProject.title)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        setMoreProjects(otherProjects);
      } catch (error) {
        console.error('Error fetching project data:', error);
        navigate('/projects');
      }
    };

    fetchData();
  }, [projectTitle, navigate]);

  if (!project) {
    return null;
  }

  return (
    <>
      <ProjectDetailContainer>
        <ProjectBlob 
          className="blob1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <ProjectBlob 
          className="blob2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        <BackButton
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/projects')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Projects
        </BackButton>

        <HeroSection
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProjectInfo
            as={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.technologies.map((tech, index) => (
                <TechTag 
                  key={index}
                  as={motion.span}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {tech}
                </TechTag>
              ))}
            </TechStack>
            <ProjectLinks
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.live && (
                <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer" primary>
                  <FaExternalLinkAlt /> Live Demo
                </ProjectLink>
              )}
              {project.github && (
                <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View Code
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectInfo>
          <ProjectImage
            as={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ImageContainer>
              <motion.img 
                src={project.images.desktop} 
                alt={`${project.title} desktop view`}
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </ImageContainer>
            {project.images.mobile && project.images.mobile !== "fezf" && (
              <MobileImageContainer
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.img 
                  src={project.images.mobile} 
                  alt={`${project.title} mobile view`}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </MobileImageContainer>
            )}
          </ProjectImage>
        </HeroSection>

        {moreProjects.length > 0 && (
          <MoreProjectsSection
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>More Projects</SectionTitle>
            <ProjectsGrid>
              {moreProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  onClick={() => navigate(`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <CardImage>
                    <img src={project.images.screen} alt={project.title} />
                  </CardImage>
                  <CardContent>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                    <TechStack>
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <TechTag key={index}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  </CardContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </MoreProjectsSection>
        )}
      </ProjectDetailContainer>
      <Footer />
    </>
  );
};

export default ProjectDetail; 