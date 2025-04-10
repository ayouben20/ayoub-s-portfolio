import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WebDevContainer = styled.div`
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
  margin-bottom: 6rem;
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.background};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${ProjectCard}:hover &:after {
    opacity: 1;
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

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSecondary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  color: #4A90E2;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 0.25rem;
  }
`;

const LoadMoreButton = styled(motion.button)`
  background: transparent;
  color: #4A90E2;
  border: 1px solid #4A90E2;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
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

const WebDevelopment = () => {
  const [category, setCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  
  const skills = [
    {
      name: "Frontend Development",
      description: "Creating responsive and interactive user interfaces using modern frameworks and libraries like React, Vue, and Angular.",
      icon: "💻"
    },
    {
      name: "Backend Development",
      description: "Building robust and scalable server-side applications with Node.js, Express, and database integration.",
      icon: "🔧"
    },
    {
      name: "Responsive Design",
      description: "Ensuring websites look and function beautifully across all devices and screen sizes.",
      icon: "📱"
    },
    {
      name: "Performance Optimization",
      description: "Optimizing loading speeds and overall performance for the best user experience.",
      icon: "⚡"
    },
    {
      name: "API Development",
      description: "Creating RESTful and GraphQL APIs to connect frontend and backend services efficiently.",
      icon: "🔄"
    },
    {
      name: "Database Design",
      description: "Designing and implementing efficient database schemas with SQL and NoSQL solutions.",
      icon: "💾"
    },
    {
      name: "UI/UX Design",
      description: "Designing intuitive and attractive user interfaces that enhance user experience.",
      icon: "🎨"
    },
    {
      name: "Testing & Debugging",
      description: "Implementing testing strategies and debugging techniques to ensure high-quality code.",
      icon: "🔍"
    }
  ];

  const allProjects = [
    {
      title: "E-Commerce Platform",
      description: "A fully responsive e-commerce platform with user authentication, product filtering, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/project1.jpg",
      category: "fullstack"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Firebase", "Redux", "Material UI"],
      image: "/images/project2.jpg",
      category: "frontend"
    },
    {
      title: "Portfolio Website",
      description: "A custom-designed portfolio website showcasing projects and skills with smooth animations and responsive design.",
      tech: ["React", "Styled Components", "Framer Motion"],
      image: "/images/project3.jpg",
      category: "frontend"
    },
    {
      title: "Restaurant Booking System",
      description: "An online reservation system for restaurants with real-time availability checking and email notifications.",
      tech: ["Node.js", "Express", "MongoDB", "SendGrid"],
      image: "/images/project4.jpg",
      category: "backend"
    },
    {
      title: "Real Estate Listing Platform",
      description: "A platform for listing and browsing real estate properties with advanced filtering options and map integration.",
      tech: ["React", "Node.js", "PostgreSQL", "Google Maps API"],
      image: "/images/project5.jpg",
      category: "fullstack"
    },
    {
      title: "Weather Dashboard",
      description: "A weather application showing current conditions and forecasts with data visualization and location detection.",
      tech: ["JavaScript", "Chart.js", "Weather API", "Geolocation API"],
      image: "/images/project6.jpg",
      category: "frontend"
    },
    {
      title: "Social Media Dashboard",
      description: "An analytics dashboard for tracking social media engagement across multiple platforms.",
      tech: ["React", "D3.js", "Social Media APIs", "Redux"],
      image: "/images/project7.jpg",
      category: "frontend"
    },
    {
      title: "Fitness Tracking App",
      description: "A mobile-responsive application for tracking workouts, nutrition, and fitness progress over time.",
      tech: ["React Native", "Firebase", "Chart.js", "Expo"],
      image: "/images/project8.jpg",
      category: "mobile"
    },
    {
      title: "Content Management System",
      description: "A custom CMS with role-based access control, content scheduling, and media management.",
      tech: ["Node.js", "Express", "MongoDB", "React"],
      image: "/images/project9.jpg",
      category: "fullstack"
    },
    {
      title: "API Gateway Service",
      description: "A microservice gateway handling authentication, rate limiting, and request routing for a larger application.",
      tech: ["Node.js", "Express", "Redis", "JWT"],
      image: "/images/project10.jpg",
      category: "backend"
    }
  ];
  
  const filteredProjects = category === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === category);
  
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };
  
  const processSteps = [
    {
      number: 1,
      title: "Requirement Analysis",
      description: "Understanding your specific needs and goals to define clear requirements for the web development project."
    },
    {
      number: 2,
      title: "Planning & Architecture",
      description: "Creating a solid plan and technical architecture to ensure the project is built on a strong foundation."
    },
    {
      number: 3,
      title: "Design & Prototyping",
      description: "Designing intuitive user interfaces and creating interactive prototypes for feedback before implementation."
    },
    {
      number: 4,
      title: "Development",
      description: "Coding the application with modern web technologies, following best practices and industry standards."
    },
    {
      number: 5,
      title: "Testing & Refinement",
      description: "Thorough testing across devices and browsers to ensure quality, followed by refinements for optimal performance."
    },
    {
      number: 6,
      title: "Deployment & Support",
      description: "Launching the application and providing ongoing support and maintenance to ensure continued success."
    }
  ];

  return (
    <WebDevContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Web Development
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Creating responsive, user-friendly websites and web applications with modern technologies and best practices.
      </SectionSubtitle>
      
      <SkillsSection>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <SkillIcon>{skill.icon}</SkillIcon>
              <SkillName>{skill.name}</SkillName>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsSection>
      
      <ProjectsSection>
        <ProcessTitle>Web Projects</ProcessTitle>
        
        <CategoryFilter>
          <FilterButton 
            active={category === 'all'} 
            onClick={() => setCategory('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton 
            active={category === 'frontend'} 
            onClick={() => setCategory('frontend')}
          >
            Frontend
          </FilterButton>
          <FilterButton 
            active={category === 'backend'} 
            onClick={() => setCategory('backend')}
          >
            Backend
          </FilterButton>
          <FilterButton 
            active={category === 'fullstack'} 
            onClick={() => setCategory('fullstack')}
          >
            Full Stack
          </FilterButton>
          <FilterButton 
            active={category === 'mobile'} 
            onClick={() => setCategory('mobile')}
          >
            Mobile
          </FilterButton>
        </CategoryFilter>
        
        <ProjectsGrid>
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <ProjectLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14L21 3"></path>
                    </svg>
                    View Project
                  </ProjectLink>
                  <ProjectLink href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                    </svg>
                    Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        {visibleProjects < filteredProjects.length && (
          <LoadMoreButton 
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Projects
          </LoadMoreButton>
        )}
      </ProjectsSection>
      
      <ProcessSection>
        <ProcessTitle>My Web Development Process</ProcessTitle>
        <ProcessSteps>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </ProcessStep>
          ))}
        </ProcessSteps>
      </ProcessSection>
    </WebDevContainer>
  );
};

export default WebDevelopment; 