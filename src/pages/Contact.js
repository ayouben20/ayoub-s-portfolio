import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowUp, FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
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

const moveBlob3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(25px, 10px) rotate(5deg) scale(1.05); }
  66% { transform: translate(-15px, -20px) rotate(-5deg) scale(0.95); }
`;

// Styled component for background blobs
const AnimatedBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.background === '#f4f3ef' 
    ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.18), rgba(108, 99, 255, 0.15))'
    : 'linear-gradient(135deg, rgba(74, 144, 226, 0.08), rgba(108, 99, 255, 0.08))'
  };
  filter: ${props => props.theme.background === '#f4f3ef' 
    ? 'blur(60px)'
    : 'blur(40px)'
  };
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: ${props => props.theme.background === '#f4f3ef' ? 'multiply' : 'screen'};

  &.blob1 {
    width: 300px;
    height: 300px;
    top: 15%;
    left: 10%;
    animation: ${moveBlob1} 15s infinite alternate ease-in-out;
  }

  &.blob2 {
    width: 250px;
    height: 250px;
    bottom: 20%;
    right: 15%;
    animation: ${moveBlob2} 18s infinite alternate ease-in-out;
    animation-delay: -5s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 146, 43, 0.15))'
      : 'linear-gradient(135deg, rgba(255, 107, 107, 0.08), rgba(255, 146, 43, 0.08))'
    };
  }
  
  &.blob3 {
    width: 200px;
    height: 200px;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    animation: ${moveBlob3} 20s infinite alternate ease-in-out;
    animation-delay: -8s;
    background: ${props => props.theme.background === '#f4f3ef'
      ? 'linear-gradient(135deg, rgba(99, 202, 183, 0.12), rgba(108, 170, 255, 0.12))'
      : 'linear-gradient(135deg, rgba(99, 202, 183, 0.08), rgba(108, 170, 255, 0.08))'
    };
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    opacity: 0.7;
    &.blob3 {
      display: none;
    }
  }
`;

const ContactContainer = styled.div`
  padding: 6rem 2rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
  justify-content: center;
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  flex-shrink: 0;
  transition: all 0.3s ease;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #4A90E2;
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.cardBackground};
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid ${props => props.theme.borderColor};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const InputBase = `
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 6px;
  font-size: 1rem;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.inputBackground || props.theme.background};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
`;

const Input = styled.input`
  ${InputBase}
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.7;
  }
`;

const TextArea = styled.textarea`
  ${InputBase}
  min-height: 130px;
  resize: vertical;
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.buttonText || 'white'};
  border: none;
  padding: 0.8rem 1.7rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${props => props.theme.primaryHover || '#3a80d2'};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
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

// Animation for form fields
const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Use the scroll to top hook
  useScrollToTop();

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
      <AnimatedBlob className="blob3" />
      
      <ContactContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>
            Contact Me
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Have a project in mind or want to discuss collaboration opportunities? Get in touch!
          </SectionSubtitle>
        </motion.div>
        
        <ContactContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ContactInfo>
              <InfoItem variants={itemVariants}>
                <InfoIcon>
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <FiMapPin />
                  </motion.div>
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Location</InfoTitle>
                  <InfoText>Casablanca, Morocco</InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem variants={itemVariants}>
                <InfoIcon>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <FiMail />
                  </motion.div>
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Email</InfoTitle>
                  <InfoText>ayoub.benammour.pro@gmail.com</InfoText>
                </InfoContent>
              </InfoItem>
              
              <InfoItem variants={itemVariants}>
                <InfoIcon>
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <FiPhone />
                  </motion.div>
                </InfoIcon>
                <InfoContent>
                  <InfoTitle>Phone</InfoTitle>
                  <InfoText>+212 6 12 34 56 78</InfoText>
                </InfoContent>
              </InfoItem>
              
              <SocialLinks
                as={motion.div}
                variants={itemVariants}
              >
                <SocialLink href="https://github.com/ayoub-benammour" target="_blank" rel="noopener noreferrer" as={motion.a} whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.2 }}>
                  <FiGithub />
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/ayoub-benammour" target="_blank" rel="noopener noreferrer" as={motion.a} whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.2 }}>
                  <FiLinkedin />
                </SocialLink>
                <SocialLink href="https://twitter.com/ayoub_benammour" target="_blank" rel="noopener noreferrer" as={motion.a} whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.2 }}>
                  <FiTwitter />
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
          </motion.div>
          
          <motion.div>
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your email address"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="What is the subject?"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your message here..."
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                as={motion.button} 
                whileHover={{ /* Handled by CSS */ }}
                whileTap={{ /* Handled by CSS */ }}
              >
                Send Message <FiArrowUp />
              </SubmitButton>
            </ContactForm>
          </motion.div>
        </ContactContent>
      </ContactContainer>
      
      <Footer />
    </motion.div>
  );
};

export default Contact; 