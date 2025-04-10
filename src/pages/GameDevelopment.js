import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GameDevContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${props => props.theme.text};
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
    background: #6C63FF;
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

const IntroSection = styled.div`
  margin-bottom: 6rem;
`;

const IntroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const IntroText = styled.div`
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const IntroImage = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectsSection = styled.div`
  margin-bottom: 6rem;
`;

const ProjectCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 6rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  &:nth-child(even) {
    direction: rtl;
    
    @media (max-width: 768px) {
      direction: ltr;
    }
  }
`;

const ProjectContent = styled.div`
  direction: ltr;
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const ProjectDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textSecondary};
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  direction: ltr;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%);
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? '#6C63FF' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#6C63FF'};
  border: ${props => props.primary ? 'none' : '1px solid #6C63FF'};
  border-radius: 30px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
    background: ${props => props.primary ? '#5A52D5' : 'rgba(108, 99, 255, 0.1)'};
  }
`;

const SkillsSection = styled.div`
  margin-bottom: 6rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  
  h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.75rem;
      color: #6C63FF;
    }
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.7;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background: ${props => props.theme.background};
  border-radius: 4px;
  margin-top: auto;
  
  div {
    height: 100%;
    width: ${props => props.progress}%;
    background: #6C63FF;
    border-radius: 4px;
  }
`;

const DemoSection = styled.div`
  margin-bottom: 6rem;
`;

const DemosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DemoCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const DemoImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const DemoContent = styled.div`
  padding: 1.5rem;
  
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: ${props => props.theme.text};
  }
  
  p {
    font-size: 0.9rem;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
`;

const PlayButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.25rem;
  background: #6C63FF;
  color: white;
  border-radius: 30px;
  font-weight: 500;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    background: #5A52D5;
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
  }
`;

const InspirationSection = styled.div`
  margin-bottom: 4rem;
`;

const InspirationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InspirationText = styled.div`
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.textSecondary};
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 1rem;
      font-size: 1.05rem;
      color: ${props => props.theme.textSecondary};
      
      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: #6C63FF;
      }
    }
  }
`;

const InspirationImage = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GameDevelopment = () => {
  // We'll use componentDidMount to dispatch a custom event to set dark theme
  useEffect(() => {
    // Send an event to App.js to set theme to dark
    const event = new CustomEvent('set-theme', { 
      detail: { theme: 'dark' }
    });
    window.dispatchEvent(event);
    
    // Optional: Return a cleanup function to restore theme when leaving
    return () => {
      // Send an event to restore the theme when leaving
      const restoreEvent = new CustomEvent('restore-theme', {});
      window.dispatchEvent(restoreEvent);
    };
  }, []);
  
  const gameProjects = [
    {
      title: "Dimensional Drift",
      description: "A puzzle-platformer game where players navigate between dimensions to solve complex environmental puzzles. Features procedurally generated levels and a unique art style inspired by M.C. Escher's works.",
      image: "/images/game1.jpg",
      technologies: ["Unity", "C#", "Shader Graph", "Procedural Generation"],
      demoLink: "https://dimensionaldrift.demo",
      codeLink: "https://github.com/username/dimensional-drift"
    },
    {
      title: "Nebula Nomad",
      description: "An open-world space exploration game where players discover planets, mine resources, and build their own space stations. Incorporates realistic physics and an advanced ecosystem simulation.",
      image: "/images/game2.jpg",
      technologies: ["Unreal Engine", "C++", "Blueprint", "AI Systems"],
      demoLink: "https://nebulanomad.demo",
      codeLink: "https://github.com/username/nebula-nomad"
    },
    {
      title: "Arcane Legends",
      description: "A turn-based RPG featuring a unique spell-crafting system where players can combine elemental forces to create custom spells. Set in a rich fantasy world with deep lore and branching storylines.",
      image: "/images/game3.jpg",
      technologies: ["Unity", "C#", "Scriptable Objects", "Dialog System"],
      demoLink: "https://arcanelegends.demo",
      codeLink: "https://github.com/username/arcane-legends"
    }
  ];
  
  const gameSkills = [
    {
      name: "Game Engine Development",
      description: "Building and optimizing custom game engines and working with established engines like Unity and Unreal.",
      progress: 85,
      icon: "🛠️"
    },
    {
      name: "3D Modeling & Animation",
      description: "Creating game-ready 3D assets, character rigging, and animation using industry standard software.",
      progress: 75,
      icon: "🎭"
    },
    {
      name: "Game Physics",
      description: "Implementing realistic physics simulations, collision detection, and physics-based gameplay mechanics.",
      progress: 90,
      icon: "⚛️"
    },
    {
      name: "Procedural Generation",
      description: "Developing algorithms for generating game worlds, levels, textures, and other content procedurally.",
      progress: 80,
      icon: "🌐"
    },
    {
      name: "AI Systems",
      description: "Creating intelligent enemy behavior, pathfinding algorithms, and decision-making systems for NPCs.",
      progress: 85,
      icon: "🤖"
    },
    {
      name: "Shader Programming",
      description: "Writing custom shaders for various visual effects, materials, and post-processing techniques.",
      progress: 70,
      icon: "✨"
    }
  ];
  
  const gameDemos = [
    {
      title: "Pixel Platformer",
      description: "A retro-style platformer with pixel art graphics and tight controls. Features multiple levels and boss battles.",
      image: "/images/demo1.jpg",
      playLink: "https://playdemo1.link"
    },
    {
      title: "Space Shooter",
      description: "Defend your ship against waves of alien attackers in this fast-paced space shooter with power-ups and upgrades.",
      image: "/images/demo2.jpg",
      playLink: "https://playdemo2.link"
    },
    {
      title: "Puzzle Quest",
      description: "Challenge your mind with this collection of interconnected puzzles that test logic, memory, and reflexes.",
      image: "/images/demo3.jpg",
      playLink: "https://playdemo3.link"
    }
  ];

  return (
    <GameDevContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Game Development
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Bringing interactive worlds to life through innovative gameplay, immersive storytelling, and technical excellence
      </SectionSubtitle>
      
      <IntroSection>
        <IntroContent>
          <IntroText>
            <h3>Crafting Interactive Experiences</h3>
            <p>
              My journey in game development began with a fascination for creating interactive worlds that blend art, storytelling, and technology. I specialize in designing engaging gameplay systems and implementing them with clean, efficient code.
            </p>
            <p>
              With experience in both 2D and 3D game development, I've worked on projects across various genres including puzzle games, platformers, RPGs, and simulation games. My approach focuses on player experience first, ensuring games are both fun and technically solid.
            </p>
            <p>
              I'm particularly passionate about procedural generation, AI systems, and creating games with emergent gameplay where players can discover unique ways to interact with the game world.
            </p>
          </IntroText>
          <IntroImage
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img src="/images/game-dev-intro.jpg" alt="Game Development Workspace" />
          </IntroImage>
        </IntroContent>
      </IntroSection>
      
      <ProjectsSection>
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
          Explore my most significant game development projects, highlighting different skills and technologies
        </SectionSubtitle>
        
        {gameProjects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
          >
            <ProjectImage>
              <img src={project.image} alt={project.title} />
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>
              <ProjectLinks>
                <ProjectLink href={project.demoLink} target="_blank" rel="noopener noreferrer" primary>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M10 8.5l5 3.5-5 3.5V8.5z"></path>
                  </svg>
                  Play Demo
                </ProjectLink>
                <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Code
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsSection>
      
      <SkillsSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Game Development Skills
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Technical capabilities I've developed through years of creating games and interactive experiences
        </SectionSubtitle>
        
        <SkillsGrid>
          {gameSkills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <h4>
                <span>{skill.icon}</span> {skill.name}
              </h4>
              <p>{skill.description}</p>
              <ProgressBar progress={skill.progress}>
                <div></div>
              </ProgressBar>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsSection>
      
      <DemoSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Playable Demos
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Try out some of my smaller game projects directly in your browser
        </SectionSubtitle>
        
        <DemosGrid>
          {gameDemos.map((demo, index) => (
            <DemoCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <DemoImage>
                <img src={demo.image} alt={demo.title} />
              </DemoImage>
              <DemoContent>
                <h4>{demo.title}</h4>
                <p>{demo.description}</p>
                <PlayButton href={demo.playLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Play Now
                </PlayButton>
              </DemoContent>
            </DemoCard>
          ))}
        </DemosGrid>
      </DemoSection>
      
      <InspirationSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Journey & Inspiration
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The path that led me to game development and what continues to inspire my work
        </SectionSubtitle>
        
        <InspirationContent>
          <InspirationText>
            <h3>My Development Journey</h3>
            <p>
              My passion for game development began with modding existing games, which taught me the fundamentals of game mechanics and level design. Since then, I've continuously expanded my skills through formal education, online courses, and practical experience working on both solo and team projects.
            </p>
            <p>
              Some key influences that continue to inspire my work include:
            </p>
            <ul>
              <li>The emergent gameplay of immersive sims like Deus Ex and Dishonored</li>
              <li>The elegant design philosophy of Nintendo's first-party titles</li>
              <li>The storytelling innovations of indie games like Journey and Undertale</li>
              <li>The technical achievements of studios like Naughty Dog and id Software</li>
            </ul>
            <p>
              I believe games are the most powerful medium for interactive storytelling and creating meaningful experiences that can educate, inspire, and bring people together.
            </p>
          </InspirationText>
          <InspirationImage
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img src="/images/game-inspiration.jpg" alt="Game Development Inspiration" />
          </InspirationImage>
        </InspirationContent>
      </InspirationSection>
    </GameDevContainer>
  );
};

export default GameDevelopment; 