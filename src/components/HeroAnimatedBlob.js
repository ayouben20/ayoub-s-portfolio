import styled, { keyframes } from 'styled-components';

const move = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(10px, -20px) rotate(3deg) scale(1.05); }
  50% { transform: translate(-5px, 15px) rotate(-5deg) scale(0.95); }
  75% { transform: translate(15px, 10px) rotate(3deg) scale(1.02); }
  100% { transform: translate(0, 0) rotate(0deg) scale(1); }
`;

const HeroAnimatedBlob = styled.div`
  position: absolute;
  width: ${props => props.size || '600px'};
  height: ${props => props.size || '600px'};
  filter: blur(60px);
  border-radius: 50%;
  z-index: 0;
  animation: ${move} ${props => props.duration || '25s'} infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: ${props => props.opacity || '0.5'};
  mix-blend-mode: ${props => props.theme.background === '#f4f3ef' ? 'multiply' : 'screen'};

  background: ${props => 
    props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(108, 99, 255, 0.1))'
      : 'linear-gradient(135deg, rgba(74, 144, 226, 0.3), rgba(108, 99, 255, 0.2))'
  };

  &.left {
    left: -300px;
    top: 20%;
  }

  &.right {
    right: -300px;
    top: 40%;
  }

  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '300px'};
    height: ${props => props.mobileSize || '300px'};
  }
`;

export default HeroAnimatedBlob; 