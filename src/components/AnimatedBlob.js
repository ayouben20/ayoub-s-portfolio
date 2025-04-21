import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Blob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: ${({ theme }) => theme.mode === 'light' ? '0.15' : '0.25'};
  pointer-events: none;
  mix-blend-mode: ${({ theme }) => theme.mode === 'light' ? 'multiply' : 'screen'};
`;

const LeftBlob = styled(Blob)`
  width: 500px;
  height: 500px;
  left: -100px;
  top: 40%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.mode === 'light'
    ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(59, 130, 246, 0.1))'
    : `linear-gradient(135deg, ${({ theme }) => theme.primary}30, transparent)`};
`;

const RightBlob = styled(Blob)`
  width: 400px;
  height: 400px;
  right: -50px;
  top: 60%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.mode === 'light'
    ? 'linear-gradient(225deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.1))'
    : 'linear-gradient(225deg, #4A90E230, transparent)'};
`;

const AnimatedBlob = ({ className }) => {
  const isLeftBlob = className === 'blob1';
  const BlobComponent = isLeftBlob ? LeftBlob : RightBlob;

  return (
    <BlobComponent
      animate={{
        scale: [1, isLeftBlob ? 1.15 : 1.1, 1],
        x: [0, isLeftBlob ? 30 : -20, 0],
        y: [isLeftBlob ? -30 : 0, isLeftBlob ? 0 : -30, isLeftBlob ? -30 : 0],
      }}
      transition={{
        duration: isLeftBlob ? 18 : 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
};

export { AnimatedBlob }; 
 