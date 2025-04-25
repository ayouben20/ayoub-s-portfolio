import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Footer from './Footer';

const ProjectDetailContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
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
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.mode === 'light' ? '#f0f4f8' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme.mode === 'light' ? '#2d3748' : '#e2e8f0'};
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.mode === 'light' ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)'};
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
  background: ${props => props.primary ? props.theme.primary : 'transparent'};
  color: ${props => props.primary ? '#ffffff' : props.theme.text};
  border: 2px solid ${props => props.primary ? 'transparent' : props.theme.primary};
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.primary ? props.theme.primaryHover : 'rgba(66, 153, 225, 0.1)'};
  }
`;

const DevicePreview = styled.div`
  flex: 1;
  position: relative;
  min-height: 500px;
`;

const LaptopMockup = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const PhoneMockup = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 200px;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    right: 0;
    bottom: -40px;
    width: 150px;
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
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.textSecondary};
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 2rem;
  }
`;

const ProjectDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [moreProjects, setMoreProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current project from location state
        const currentProject = location.state?.project;
        
        if (!currentProject) {
          navigate('/web-development');
          return;
        }

        setProject(currentProject);

        // Fetch all projects to get more projects
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        
        // Filter out the current project and get 3 random projects
        const otherProjects = data.projects
          .filter(p => p.id !== currentProject.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        setMoreProjects(otherProjects);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, navigate]);

  if (loading) {
    return (
      <ProjectDetailContainer>
        <LoadingSpinner>Loading project details...</LoadingSpinner>
      </ProjectDetailContainer>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <>
      <ProjectDetailContainer>
        <BackButton
          onClick={() => navigate('/web-development')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Projects
        </BackButton>

        <HeroSection>
          <ProjectInfo>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.technologies.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
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
          <DevicePreview>
            <LaptopMockup>
              <img src={project.image} alt={`${project.title} on laptop`} />
            </LaptopMockup>
            <PhoneMockup>
              <img src={project.mobileImage || project.image} alt={`${project.title} on mobile`} />
            </PhoneMockup>
          </DevicePreview>
        </HeroSection>

        {moreProjects.length > 0 && (
          <MoreProjectsSection>
            <SectionTitle>More Projects</SectionTitle>
            <ProjectsGrid>
              {moreProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
                >
                  <CardImage src={project.image} alt={project.title} />
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