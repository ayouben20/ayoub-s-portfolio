import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import GlobalStyle from './components/GlobalStyle';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import GameDevelopment from './pages/GameDevelopment';
import WebDevelopment from './pages/WebDevelopment';
import Contact from './pages/Contact';
import AddProject from './pages/AddProject';
import { Link } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import ProjectDetail from './components/ProjectDetail';

// Themes
const lightTheme = {
  background: '#f8f9fa',
  text: '#333333',
  primary: '#4A90E2',
  primaryHover: '#2a70c2',
  secondary: '#555555',
  accent: '#F0652F',
  cardBackground: '#ffffff',
  navBackground: 'rgba(248, 249, 250, 0.85)',
  mobileMenuBackground: 'rgba(248, 249, 250, 0.98)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  inputBackground: '#ffffff',
  buttonText: '#ffffff',
  toggleBackground: '#f0f0f0',
  toggleBorder: '#e0e0e0',
  toggleColor: '#333333',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  primary: '#4A90E2',
  primaryHover: '#6aa9ef',
  secondary: '#6c757d',
  accent: '#F0652F',
  cardBackground: '#1e1e1e',
  navBackground: 'rgba(18, 18, 18, 0.85)',
  mobileMenuBackground: 'rgba(18, 18, 18, 0.98)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  inputBackground: '#2d2d2d',
  buttonText: '#ffffff',
  toggleBackground: '#333333',
  toggleBorder: '#444444',
  toggleColor: '#f0f0f0',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`;

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<WebDevelopment />} />
        {/* Game Development route - Coming in v2.0 */}
        {/* <Route path="/game-development" element={<GameDevelopment />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

// Component to conditionally render ScrollToTopButton
const ConditionalScrollToTop = () => {
  const location = useLocation();
  // Don't show the button on the contact page
  if (location.pathname === '/contact') {
    return null;
  }
  return <ScrollToTopButton />;
};

function App() {
  // Theme state
  const [theme, setTheme] = useState('light');
  const [savedTheme, setSavedTheme] = useState('light'); 
  const [forceGameDevDarkMode, setForceGameDevDarkMode] = useState(false);
  const currentTheme = forceGameDevDarkMode ? darkTheme : (theme === 'light' ? lightTheme : darkTheme);
  
  // Check for saved theme preference
  useEffect(() => {
    const savedThemeValue = localStorage.getItem('theme');
    if (savedThemeValue) {
      setTheme(savedThemeValue);
      setSavedTheme(savedThemeValue);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      setSavedTheme('dark');
    }

    // Listen for custom theme change events from GameDevelopment.js
    const handleSetTheme = (event) => {
      // Save current theme before changing to dark
      setSavedTheme(theme);
      setForceGameDevDarkMode(true);
    };

    const handleRestoreTheme = () => {
      // Restore the previous theme when leaving GameDevelopment
      setForceGameDevDarkMode(false);
    };

    window.addEventListener('set-theme', handleSetTheme);
    window.addEventListener('restore-theme', handleRestoreTheme);

    return () => {
      window.removeEventListener('set-theme', handleSetTheme);
      window.removeEventListener('restore-theme', handleRestoreTheme);
    };
  }, [theme, savedTheme]);
  
  // Theme toggler function
  const themeToggler = () => {
    if (forceGameDevDarkMode) {
      // In Game Development page, don't allow theme change
      return;
    }
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setSavedTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <GlobalStyle />
      <Router>
        <Navbar themeToggler={themeToggler} theme={forceGameDevDarkMode ? 'dark' : theme}>
          <Link to="/add-project">Add Project</Link>
        </Navbar>
        <AppContainer>
          <AnimatedRoutes />
        </AppContainer>
        <ConditionalScrollToTop />
      </Router>
    </ThemeProvider>
  );
}

export default App;
