import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaCheckCircle, FaTimesCircle, FaTimes, FaBehance, FaDribbble, FaFacebookF, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.background};
  overflow-x: hidden;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  
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

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 2.5rem;
  }
`;

const ContactForm = styled(motion.form)`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
  border: none;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const SubmitButton = styled(motion.button)`
  align-self: center;
  padding: 1rem 3rem;
  background: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.background};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  right: 0;
  bottom: -1.5rem;
  color: ${props => props.theme.textSecondary};
  font-size: 0.8rem;
`;

const ErrorText = styled.span`
  color: ${props => props.theme.error};
  font-size: 0.8rem;
  position: absolute;
  bottom: -1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 4rem;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 50%;
  background: ${props => props.theme.text === '#333' ? '#1f1f1f' : 'rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.primary};
    color: #fff;
  }
`;

const NotificationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const NotificationPopup = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  position: relative;
  text-align: center;
`;

const NotificationIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.success ? '#48BB78' : '#F56565'};
`;

const NotificationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const NotificationMessage = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.text};
    transform: scale(1.1);
  }
`;

const NotificationButton = styled(motion.button)`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.primary}40;
  }
`;

const Blob = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: ${props => props.theme.primary}10;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
`;

const TopBlob = styled(Blob)`
  top: -300px;
  right: -300px;
`;

const BottomBlob = styled(Blob)`
  bottom: -300px;
  left: -300px;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState({ show: false, success: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation rules
  const restrictedEmails = [
    'contact@ayoubben.com',
    'ayoubbenammour23@gmail.com'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (restrictedEmails.includes(formData.email.toLowerCase())) {
      newErrors.email = 'This email address cannot be used';
    }

    // Message validation
    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    if (formData.message.length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const closeNotification = () => {
    setNotification({ show: false, success: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setNotification({
        show: true,
        success: false,
        message: 'Please correct the errors in the form'
      });
      return;
    }

    setLoading(true);

    // Get current date and time
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    try {
      // Get location information
      const location = await getLocation();

      await emailjs.send(
        'service_x228t9f',
        'template_kgpo7mg',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: 'Contact Form Submission',
          message: formData.message,
          to_email: 'contact@ayoubben.com',
          time: time,
          date: date,
          location: `${location.city}, ${location.country}`,
          ip_address: location.ip
        },
        '9mU0sStU0JdR3T5nA'
      );

      setNotification({
        show: true,
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        show: true,
        success: false,
        message: 'There was an error sending your message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        ip: data.ip || 'Unknown'
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return {
        city: 'Unknown',
        country: 'Unknown',
        ip: 'Unknown'
      };
    }
  };

  return (
    <PageContainer>
      <TopBlob />
      <BottomBlob />
      <MainContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </Title>
        <Subtitle>
          Let's connect! Feel free to reach out for collaborations or just a friendly chat.
        </Subtitle>

        <ContactForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <InputRow>
            <FormGroup>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="NAME *"
                style={errors.name ? { borderColor: props => props.theme.error } : {}}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="EMAIL *"
                style={errors.email ? { borderColor: props => props.theme.error } : {}}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>
          </InputRow>

          <FormGroup>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={1000}
              placeholder="MESSAGE *"
              style={errors.message ? { borderColor: props => props.theme.error } : {}}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}
            <CharacterCount>
              {formData.message.length}/1000
            </CharacterCount>
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>

        <SocialLinks>
          <SocialLink 
            href="mailto:contact@ayoubben.com"
            whileHover={{ y: -5 }}
          >
            <FaEnvelope />
          </SocialLink>
          <SocialLink 
            href="https://www.instagram.com/ayoubbenammour22"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <FaInstagram />
          </SocialLink>
          <SocialLink 
            href="https://www.linkedin.com/in/ayoub-benammour/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink 
            href="https://github.com/ayouben20"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
          >
            <FaGithub />
          </SocialLink>
        </SocialLinks>
      </MainContent>

      <Footer />

      <AnimatePresence>
        {notification.show && (
          <NotificationOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNotification}
          >
            <NotificationPopup
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={closeNotification}>
                <FaTimes />
              </CloseButton>
              <NotificationIcon success={notification.success}>
                {notification.success ? <FaCheckCircle /> : <FaTimesCircle />}
              </NotificationIcon>
              <NotificationTitle>
                {notification.success ? 'Message Sent!' : 'Error'}
              </NotificationTitle>
              <NotificationMessage>
                {notification.message}
              </NotificationMessage>
              <NotificationButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeNotification}
              >
                {notification.success ? 'Great!' : 'Try Again'}
              </NotificationButton>
            </NotificationPopup>
          </NotificationOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Contact; 