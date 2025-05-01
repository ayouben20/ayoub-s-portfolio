import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1f1f1f;
  color: #fff;
  width: 100%;
  margin-top: auto;
  padding: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  padding: 4rem 2rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 30px;
    height: 2px;
    background-color: ${props => props.theme.primary};
  }
`;

const FooterText = styled.p`
  color: #888;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;

  a {
    color: #888;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.primary};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin: 4rem auto 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Ayoub Benammour</FooterTitle>
          <FooterText>
          Crafting exceptional digital experiences through web development. Let’s bring your vision to life with clean code, creative design, and user-focused solutions.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="mailto:contact@ayoubben.com">
              <FaEnvelope />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/ayoubbenammour22" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/ayoub-benammour/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://github.com/ayouben20" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/">Home</Link></FooterLink>
            <FooterLink><Link to="/about">About</Link></FooterLink>
            <FooterLink><Link to="/services">Services</Link></FooterLink>
            <FooterLink><Link to="/projects">Projects</Link></FooterLink>
            <FooterLink><Link to="/contact">Contact</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Services</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/services">Web Development</Link></FooterLink>
            <FooterLink><Link to="/services">Game Development</Link></FooterLink>
            <FooterLink><Link to="/services">Responsive Design</Link></FooterLink>
            <FooterLink><Link to="/services">Custom Solutions</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Ayoub Benammour. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 