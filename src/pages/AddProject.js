import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const moveBlob1 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(20px, -20px) scale(1.1); }
`;

const moveBlob2 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-20px, 20px) scale(1.1); }
`;

// Form Container
const PageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2rem;
  background: ${props => props.theme.cardBackground};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadow};
`;

// Form Elements
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.text};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const Select = styled(Input).attrs({ as: 'select' })``;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  height: 150px;
  resize: vertical;
`;

const FileInput = styled.div`
  border: 2px dashed ${props => props.theme.borderColor};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.text};
  background: ${props => props.theme.inputBackground};
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 1rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primaryHover};
    transform: translateY(-2px);
  }
`;

// Projects Section Styling
const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
  text-align: center;
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? props.theme.primary : props.theme.cardBackground};
  color: ${props => props.active ? 'white' : props.theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadow};

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.primary}20;
  color: ${props => props.theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const AddProject = () => {
  const [formData, setFormData] = useState({
    type: 'web',
    title: '',
    description: '',
    technologies: '',
    liveDemo: '',
    codeLink: '',
    image: null,
    imagePreview: '',
  });

  const [projects, setProjects] = useState([]);
  const [projectType, setProjectType] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const filteredProjects = projectType === 'all' 
    ? projects 
    : projects.filter(project => project.type === projectType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.technologies) {
        alert('Please fill in all required fields');
        return;
      }

      // Create a new project object
      const projectData = {
        id: uuidv4(),
        type: formData.type || 'web',
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        liveDemo: formData.liveDemo.trim() || '#',
        codeLink: formData.codeLink.trim() || '#',
        imagePreview: formData.imagePreview || '/images/projects/default.jpg'
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add project');
      }

      // Reset form
      setFormData({
        type: 'web',
        title: '',
        description: '',
        technologies: '',
        liveDemo: '',
        codeLink: '',
        image: null,
        imagePreview: ''
      });

      // Refresh projects list
      await fetchProjects();
      
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      alert(error.message || 'Failed to add project. Please try again.');
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Type</Label>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="web">Web</option>
              <option value="game">Game</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Title</Label>
            <Input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Live Demo Link</Label>
            <Input 
              type="url" 
              name="liveDemo" 
              value={formData.liveDemo} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Code Link</Label>
            <Input 
              type="url" 
              name="codeLink" 
              value={formData.codeLink} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          {/* hna andir project image */}
          <FormGroup>
            <Label>Project Image</Label>
            <FileInput onClick={() => document.getElementById('fileInput').click()}>
              {formData.imagePreview ? (
                <img 
                  src={formData.imagePreview} 
                  alt="Preview" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              ) : (
                'Click to upload an image'
              )}
              <HiddenInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </FileInput>
          </FormGroup>
          <FormGroup>
            
            <Label>Technologies (comma-separated)</Label>
            <Input 
              type="text" 
              name="technologies" 
              value={formData.technologies} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
          <Button type="submit">Add Project</Button>
        </Form>
      </FormContainer>

      <ProjectsSection>
        <SectionTitle>Featured Projects</SectionTitle>
        <SectionDescription>A selection of projects I've developed</SectionDescription>
        
        <FilterContainer>
          <FilterButton
            active={projectType === 'all'}
            onClick={() => setProjectType('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton
            active={projectType === 'web'}
            onClick={() => setProjectType('web')}
          >
            Web Projects
          </FilterButton>
          <FilterButton
            active={projectType === 'game'}
            onClick={() => setProjectType('game')}
          >
            Game Projects
          </FilterButton>
        </FilterContainer>

        <ProjectsGrid>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage src={project.imagePath} alt={project.title} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <ProjectLink href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
                  <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> View Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsSection>
    </PageContainer>
  );
};

export default AddProject; 