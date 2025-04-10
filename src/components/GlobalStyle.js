import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
    font-weight: 400;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
  }

  h1 {
    font-size: 3.5rem;
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.8rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2.2rem;
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  p {
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, .button {
    cursor: pointer;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonText};
    font-family: inherit;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => theme.primaryHover};
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
    }
  }

  section {
    padding: 5rem 0;
    
    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
  }

  .card {
    background: ${({ theme }) => theme.cardBackground};
    border-radius: 8px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadow};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.shadow.replace('0.08', '0.12')};
    }
  }

  /* Animation classes */
  .page-transition-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.4s, transform 0.4s;
  }

  .page-transition-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .page-transition-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.4s, transform 0.4s;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

export default GlobalStyle; 