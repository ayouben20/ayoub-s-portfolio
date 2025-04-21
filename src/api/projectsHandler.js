import fs from 'fs';
import path from 'path';

const PROJECTS_FILE = path.join(process.cwd(), 'public/data/projects.json');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/projects');

// Ensure directories exist
if (!fs.existsSync(path.dirname(PROJECTS_FILE))) {
  fs.mkdirSync(path.dirname(PROJECTS_FILE), { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Initialize projects.json if it doesn't exist
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify({ projects: [] }, null, 2));
}

export const saveImage = async (imageFile) => {
  const extension = path.extname(imageFile.name);
  const fileName = `${Date.now()}${extension}`;
  const filePath = path.join(IMAGES_DIR, fileName);

  // Create a readable stream from the buffer
  const buffer = await imageFile.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));

  return `/images/projects/${fileName}`;
};

export const updateProjects = async (newProject) => {
  try {
    // Read existing projects
    const projectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    
    // Add new project
    projectsData.projects.push(newProject);
    
    // Write updated data back to file
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsData, null, 2));
    
    return { success: true, project: newProject };
  } catch (error) {
    console.error('Error updating projects:', error);
    throw error;
  }
};

export const getProjects = () => {
  try {
    const projectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    return projectsData.projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}; 