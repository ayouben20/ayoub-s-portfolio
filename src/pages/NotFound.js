import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from '../components/Footer';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Blob = styled(motion.div)`
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
  }

  &.blob2 {
    width: 350px;
    height: 350px;
    bottom: 15%;
    right: 10%;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 255, 0.18), rgba(162, 89, 255, 0.18))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  max-width: 600px;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled(motion.h2)`
  font-size: 2rem;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <NotFoundContainer>
        <Blob 
          className="blob1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <Blob 
          className="blob2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        <Content>
          <ErrorCode
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            404
          </ErrorCode>
          
          <ErrorMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Page Not Found
          </ErrorMessage>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back to safety.
          </Description>
          
          <BackButton
            onClick={() => navigate('/')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Home
          </BackButton>
        </Content>
      </NotFoundContainer>
      <Footer />
    </>
  );
};

export default NotFound; 