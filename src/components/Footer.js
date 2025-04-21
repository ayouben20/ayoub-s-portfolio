import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.text === '#333' ? '#222' : '#333'};
  color: #fff;
  padding: 3rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #aaa;
  margin-bottom: 1rem;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #4A90E2;
    transform: translateY(-3px);
    svg {
      transform: rotate(15deg);
    }
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
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
    background-color: #4A90E2;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;

  a {
    color: #aaa;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    position: relative;
    padding-bottom: 3px;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      display: block;
      margin-top: 2px;
      right: 0;
      background: #fff;
      transition: width 0.3s ease;
      -webkit-transition: width 0.3s ease;
    }

    &:hover {
      color: #fff;
      &::after {
        width: 100%;
        left: 0;
        background: #fff;
      }
    }
  }
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 1rem;
  color: #aaa;
  
  svg {
    margin-top: 5px;
    flex-shrink: 0;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>Ayoub Benammour</FooterLogo>
          <FooterText>
            Crafting exceptional digital experiences through web and game development. 
            Let's bring your ideas to life with clean code and creative design.
          </FooterText>
          <FooterSocial>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </SocialIcon>
          </FooterSocial>
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
            <FooterLink><Link to="/web-development">Web Development</Link></FooterLink>
            <FooterLink><Link to="/game-development">Game Development</Link></FooterLink>
            <FooterLink><Link to="/services">UI/UX Design</Link></FooterLink>
            <FooterLink><Link to="/services">Responsive Design</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact Info</FooterTitle>
          <FooterContactItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+1 234 567 890</span>
          </FooterContactItem>
          <FooterContactItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>your.email@example.com</span>
          </FooterContactItem>
          <FooterContactItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Your City, Country</span>
          </FooterContactItem>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        &copy; {new Date().getFullYear()} Ayoub Benammour. All rights reserved.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 