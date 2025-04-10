import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ButtonWrapper = styled(motion.button)`
  position: fixed;
  bottom: 30px; // Adjusted position slightly
  right: 30px;  // Adjusted position slightly
  width: 55px; // Slightly larger button
  height: 55px; // Slightly larger button
  background-color: ${props => props.theme.primary};
  color: white; // Icon color
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: none;
  z-index: 1000; // Ensure it's above most content
  transition: all 0.3s ease;
  // font-size removed, control size via svg style

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.theme.primaryHover};
  }

  svg {
    font-size: 36px; // Even larger icon size
    stroke-width: 3.5; // Even bolder
    color: white; // Ensure icon color is white
  }
`;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <ButtonWrapper
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FiArrowUp />
        </ButtonWrapper>
      )}
    </>
  );
};

export default ScrollToTopButton; 