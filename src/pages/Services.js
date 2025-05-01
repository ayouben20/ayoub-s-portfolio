import React, { useEffect, useState } from 'react';
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

const ServicesContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${props => props.theme.primary};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid ${props => props.theme.borderColor};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.background === '#f8f9fa' ? '#f0f0f0' : props.theme.borderColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: ${props => props.theme.primary};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const ServiceFeature = styled.li`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProcessSection = styled.div`
  margin-top: 6rem;
`;

const ProcessTitle = styled.h3`
  font-size: 1.75rem;
  color: ${props => props.theme.text};
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 500;
`;

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 50px;
    right: 50px;
    height: 2px;
    background-color: ${props => props.theme.borderColor};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
    
    &::before {
      display: none;
    }
  }
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 25%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
  box-shadow: ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.borderColor};
`;

const StepTitle = styled.h4`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 500;
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

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 10
};

const Services = () => {
  const [particles, setParticles] = useState([]);
  const [services] = useState([
    {
      title: "Web Development",
      description: "Custom websites and web applications tailored to your specific needs and goals.",
      icon: "🌐",
      features: [
        "Responsive Design",
        "Frontend & Backend Development",
        "CMS Integration",
        "E-commerce Solutions"
      ]
    },
    {
      title: "Game Development",
      description: "Engaging and interactive games for various platforms, from concept to completion.",
      icon: "🎮",
      features: [
        "2D & 3D Game Design",
        "Unity Development",
        "Game Mechanics",
        "Character & Level Design"
      ]
    },
    {
      title: " Custom Solutions",
      description: "Delivering tailored software solutions to meet specific business needs, whether it's web applications, game mechanics, or backend systems.",
      icon: "🔨",
      features: [
        "Application & Web Development",
        "Integration with Third-Party Services",
        "Scalability"
      ]
    }
  ]);

  const [processSteps] = useState([
    {
      number: 1,
      title: "Discovery",
      description: "Understanding your goals, requirements, and vision through in-depth consultation."
    },
    {
      number: 2,
      title: "Planning",
      description: "Creating a detailed roadmap with timelines, deliverables, and technical specifications."
    },
    {
      number: 3,
      title: "Development",
      description: "Building your solution with regular updates and opportunities for feedback."
    },
    {
      number: 4,
      title: "Delivery",
      description: "Finalizing, testing, and launching your project with ongoing support and maintenance."
    }
  ]);

  // Use the scroll to top hook
  useScrollToTop();

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
      
      <ServicesContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>
            Services
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Professional development services tailored to bring your ideas to life with quality and precision.
          </SectionSubtitle>
        </motion.div>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
              }}
            >
              <ServiceIcon>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {service.icon}
                </motion.div>
              </ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <ServiceFeature 
                    key={featureIndex}
                    as={motion.li}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (0.1 * featureIndex) }}
                  >
                    {feature}
                  </ServiceFeature>
                ))}
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>
        
        <ProcessSection>
          <ProcessTitle
            as={motion.h3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={itemVariants}
          >
            My Work Process
          </ProcessTitle>
          <ProcessSteps>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                as={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={cardVariants}
                custom={index}
              >
                <StepNumber>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.5
                    }}
                  >
                    {step.number}
                  </motion.div>
                </StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessSection>
      </ServicesContainer>
      
      <Footer />
    </motion.div>
  );
};

export default Services; 