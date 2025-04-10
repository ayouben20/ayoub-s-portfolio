import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
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

const WebDevContainer = styled.div`
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
      staggerChildren: 0.15,
      delayChildren: 0.3,
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
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeInOut"
    }
  })
};

// Floating animation for icons
const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};


const WebDevelopment = () => {
  // Use the scroll to top hook
  useScrollToTop();

  const [activeCategory, setActiveCategory] = useState('All');
  const [displayedProjects, setDisplayedProjects] = useState(6);

  const webSkills = [
    { name: "Frontend Development", icon: "💻", description: "Building responsive and interactive user interfaces using React, Next.js, and modern CSS." },
    { name: "Backend Development", icon: "🔧", description: "Creating robust server-side applications and APIs with Node.js, Express, and databases like MongoDB and PostgreSQL." },
    { name: "Full-Stack Expertise", icon: "🌐", description: "Seamless integration of frontend and backend technologies for complete web solutions." },
    { name: "API Integration", icon: "🔗", description: "Connecting web applications with third-party services and APIs for extended functionality." },
    { name: "Database Management", icon: "💾", description: "Designing and managing efficient databases using SQL and NoSQL technologies." },
    { name: "Cloud Deployment", icon: "☁️", description: "Deploying and managing web applications on platforms like Vercel, Netlify, and AWS." }
  ];

  const webProjects = [
    { title: "E-Commerce Platform", description: "Full-featured online store with user auth, product filtering, and Stripe integration.", category: "E-commerce", image: "/images/project1.jpg", tech: ["React", "Node.js", "MongoDB", "Stripe"], liveLink: "#", codeLink: "#" },
    { title: "Portfolio Website", description: "Personal portfolio showcasing projects with smooth animations and theme switching.", category: "Portfolio", image: "/images/project3.jpg", tech: ["React", "Framer Motion", "Styled Components"], liveLink: "#", codeLink: "#" },
    { title: "Social Media App", description: "A platform for users to share updates, follow others, and engage with posts.", category: "Social", image: "/images/web-social.jpg", tech: ["React", "Firebase", "Redux"], liveLink: "#", codeLink: "#" },
    { title: "Task Management Tool", description: "A collaborative tool for teams to manage tasks, projects, and deadlines effectively.", category: "Productivity", image: "/images/web-task.jpg", tech: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"], liveLink: "#", codeLink: "#" },
    { title: "Online Learning Platform", description: "An educational platform offering video courses, quizzes, and progress tracking.", category: "Education", image: "/images/web-lms.jpg", tech: ["React", "Express", "MongoDB", "Cloudinary"], liveLink: "#", codeLink: "#" },
    { title: "Recipe Sharing Website", description: "A community-driven site for users to share, discover, and rate recipes.", category: "Community", image: "/images/web-recipe.jpg", tech: ["React", "Node.js", "MySQL"], liveLink: "#", codeLink: "#" },
    { title: "Blog Platform", description: "A customizable blogging platform with rich text editing and user management.", category: "CMS", image: "/images/web-blog.jpg", tech: ["Next.js", "Sanity.io", "Tailwind CSS"], liveLink: "#", codeLink: "#" },
    { title: "Real Estate Listing Site", description: "A platform for browsing property listings with advanced search and map integration.", category: "Marketplace", image: "/images/web-realestate.jpg", tech: ["React", "Node.js", "MongoDB", "Mapbox API"], liveLink: "#", codeLink: "#" }
  ];

  const categories = ['All', 'E-commerce', 'Portfolio', 'Social', 'Productivity', 'Education', 'Community', 'CMS', 'Marketplace'];

  const filteredProjects = activeCategory === 'All' 
    ? webProjects 
    : webProjects.filter(p => p.category === activeCategory);

  const loadMoreProjects = () => {
    setDisplayedProjects(prev => prev + 6);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Send event to parent to show navbar - ALWAYS SHOW
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

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Animated Background Blobs */}
      <AnimatedBlob className="blob1" />
      <AnimatedBlob className="blob2" />
      
      <WebDevContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>
            Web Development
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Building dynamic, responsive, and high-performance web solutions for diverse needs
          </SectionSubtitle>
        </motion.div>
        
        <SkillsSection>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SkillsGrid>
              {webSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 
                  }}
                  whileHover={{ 
                    y: -15, 
                    boxShadow: "0 15px 30px rgba(74, 144, 226, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <SkillIcon>
                    <motion.div animate={floatAnimation}>
                      {skill.icon}
                    </motion.div>
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillCard>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsSection>
        
        <ProjectsSection>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <SectionTitle 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Web Projects
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A selection of web applications and sites I've developed
            </SectionSubtitle>
          </motion.div>
          
          <CategoryFilter>
            {categories.map(category => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </FilterButton>
            ))}
          </CategoryFilter>
          
          <motion.div 
            layout
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectsGrid>
              {filteredProjects.slice(0, displayedProjects).map((project, index) => (
                <ProjectCard
                  key={project.title + activeCategory} // Add activeCategory to key for re-animation
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechStack>
                      {project.tech.map((t, i) => (
                        <TechTag key={i}>{t}</TechTag>
                      ))}
                    </TechStack>
                    <ProjectLinks>
                      <ProjectLink 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </ProjectLink>
                      <ProjectLink 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        as={motion.a}
                        whileHover={{ x: 5 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        View Code
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </motion.div>
          
          {displayedProjects < filteredProjects.length && (
            <LoadMoreButton
              onClick={loadMoreProjects}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(74, 144, 226, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Projects
            </LoadMoreButton>
          )}
        </ProjectsSection>
      </WebDevContainer>
      
      <Footer />
    </motion.div>
  );
};

export default WebDevelopment;