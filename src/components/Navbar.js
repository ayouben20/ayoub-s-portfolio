import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.navBackground || props.theme.background};
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: translateY(${({ visible }) => (visible ? '0' : '-100%')});

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  text-decoration: none;
  display: inline-block;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 0.2rem 0;

  span {
    color: ${props => props.theme.primary};
    font-weight: 700;
    margin-right: 0.25em;
  }
  
  &:hover {
    transform: scale(1.03);
    color: ${props => props.theme.text};
    span {
      color: ${props => props.theme.primaryHover};
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.mobileMenuBackground || props.theme.background};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
    padding: 2rem;
    gap: 2rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  cursor: pointer;
  z-index: 100;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 1rem;
  padding: 0.5rem 0.25rem;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${props => props.active ? '100%' : '0%'};
    height: 2px;
    background: ${props => props.theme.primary || '#4A90E2'};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  text-align: center;
  width: 100%;
  
  &:after {
    bottom: -5px;
    height: 3px;
  }
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme.toggleBackground || 'transparent'};
  border: 2px solid ${props => props.theme.toggleBorder || props.theme.border || 'rgba(0,0,0,0.1)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.primary || '#4A90E2'};
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.theme.toggleHoverBackground || 'rgba(0,0,0,0.05)'};
  }
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.theme.primary || '#4A90E2'};
  }
`;

const navVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 }
};

const menuVariants = {
  open: { 
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  closed: { 
    opacity: 0,
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

const Navbar = ({ themeToggler, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const lastScrollY = useRef(0);
  
  // Determine if we're on the Game Development page
  const isGameDevPage = location.pathname.includes('/game-development');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Always keep navbar visible (fixed) when scrolling
      setVisible(true);
      
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  // For game development page keep navbar visible
  useEffect(() => {
    setVisible(true);
  }, [isGameDevPage, scrollY]);

  return (
    <>
      <Nav 
        visible={visible}
        variants={navVariants}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        style={{
          backgroundColor: isGameDevPage ? 'transparent' : '',
          boxShadow: isGameDevPage ? 'none' : ''
        }}
      >
        <Logo to="/">
          <span>Ayoub</span>Benammour
        </Logo>
        
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Home
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
            About
          </NavLink>
          <NavLink to="/web-development" active={location.pathname === '/web-development' ? 1 : 0}>
            Web Dev
          </NavLink>
          <NavLink to="/game-development" active={location.pathname === '/game-development' ? 1 : 0}>
            Game Dev
          </NavLink>
          <NavLink to="/services" active={location.pathname === '/services' ? 1 : 0}>
            Services
          </NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
            Contact
          </NavLink>
          <ThemeToggle onClick={themeToggler} aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ThemeToggle>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>
      
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileNavLink to="/" active={location.pathname === '/' ? 1 : 0}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
              About
            </MobileNavLink>
            <MobileNavLink to="/web-development" active={location.pathname === '/web-development' ? 1 : 0}>
              Web Development
            </MobileNavLink>
            <MobileNavLink to="/game-development" active={location.pathname === '/game-development' ? 1 : 0}>
              Game Development
            </MobileNavLink>
            <MobileNavLink to="/services" active={location.pathname === '/services' ? 1 : 0}>
              Services
            </MobileNavLink>
            <MobileNavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
              Contact
            </MobileNavLink>
            <ThemeToggle onClick={() => {themeToggler(); closeMenu();}} aria-label="Toggle theme">
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </ThemeToggle>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 