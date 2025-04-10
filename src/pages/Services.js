import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
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

const ServiceButton = styled.a`
  background: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.buttonText};
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

const Services = () => {
  const services = [
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
      title: "UI/UX Design",
      description: "Intuitive and attractive interfaces that enhance user experience and engagement.",
      icon: "🎨",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design"
      ]
    }
  ];

  const processSteps = [
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
  ];

  return (
    <ServicesContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Services
      </SectionTitle>
      <SectionSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Professional development services tailored to bring your ideas to life with quality and precision.
      </SectionSubtitle>
      
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceFeatures>
              {service.features.map((feature, featureIndex) => (
                <ServiceFeature key={featureIndex}>{feature}</ServiceFeature>
              ))}
            </ServiceFeatures>
            <ServiceButton href="#">Learn More</ServiceButton>
          </ServiceCard>
        ))}
      </ServicesGrid>
      
      <ProcessSection>
        <ProcessTitle>My Work Process</ProcessTitle>
        <ProcessSteps>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </ProcessStep>
          ))}
        </ProcessSteps>
      </ProcessSection>
    </ServicesContainer>
  );
};

export default Services; 