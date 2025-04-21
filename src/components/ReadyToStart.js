import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '../utils/scrollUtils';
import { AnimatedBlob } from './AnimatedBlob';

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

// Animation variants for content items
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

const ReadySection = styled(motion.section)`
  background: ${({ theme }) => theme.mode === 'light' ? '#f8fafc' : theme.background};
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: visible;
  margin: 0;
  min-height: auto;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const GlowingTitle = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;

  h2 {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.mode === 'light' ? '#1e293b' : theme.text};
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    position: relative;
    z-index: 1;
    text-shadow: ${({ theme }) => theme.mode === 'light' 
      ? '0 0 30px rgba(37, 99, 235, 0.1)'
      : '0 0 30px rgba(74, 144, 226, 0.2)'};
  }

  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.mode === 'light' ? '#2563eb' : theme.primary};
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }
  }
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.mode === 'light' ? '#475569' : theme.textSecondary};
  max-width: 800px;
  margin: 0 auto 3.5rem;
  line-height: 1.8;
  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
  perspective: 1000px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Button = styled(motion(Link))`
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: inline-block;
  letter-spacing: 0.5px;
  
  &.primary {
    background: ${({ theme }) => theme.mode === 'light' 
      ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
      : 'linear-gradient(135deg, #4A90E2, #357ABD)'};
    color: white;
    border: none;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: 0.5s;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.mode === 'light'
        ? '0 20px 40px rgba(37, 99, 235, 0.25), 0 0 20px rgba(37, 99, 235, 0.1)'
        : '0 20px 40px rgba(74, 144, 226, 0.3), 0 0 20px rgba(74, 144, 226, 0.15)'};
      
      &:before {
        left: 100%;
      }
    }
  }
  
  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.mode === 'light' ? '#2563eb' : theme.text};
    border: 2px solid ${({ theme }) => theme.mode === 'light' ? '#2563eb' : theme.primary};
    backdrop-filter: blur(5px);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.mode === 'light'
        ? '0 10px 20px rgba(37, 99, 235, 0.15)'
        : '0 10px 20px rgba(0, 0, 0, 0.1)'};
      background: ${({ theme }) => theme.mode === 'light'
        ? 'rgba(37, 99, 235, 0.1)'
        : `${theme.primary}20`};
    }
  }

  @media (max-width: 576px) {
    width: 100%;
    max-width: 300px;
    text-align: center;
    padding: 1rem 2rem;
  }
`;

const ReadyToStart = () => {
  return (
    <ReadySection
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container>
        <GlowingTitle
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={itemVariants}
        >
          <motion.h2>
            Ready to Start Your Project?
          </motion.h2>
        </GlowingTitle>
        <Description
          as={motion.p}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={itemVariants}
        >
          Whether you're looking for a stunning website, an engaging game, or a custom digital solution, I'm here to help bring your vision to life. Let's collaborate to create something amazing together.
        </Description>
        <ButtonContainer
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={itemVariants}
        >
          <Button to="/services" className="primary">
            View Services
          </Button>
          <Button to="/contact" className="secondary">
            Get in Touch
          </Button>
        </ButtonContainer>
      </Container>
    </ReadySection>
  );
};

export default ReadyToStart; 