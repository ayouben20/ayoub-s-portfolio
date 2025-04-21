import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const projectsPath = path.join(process.cwd(), 'public', 'data', 'projects.json');

  // Ensure the file exists with valid initial content
  if (!fs.existsSync(projectsPath)) {
    fs.writeFileSync(projectsPath, JSON.stringify({ projects: [] }, null, 2), 'utf8');
  }

  // GET method - Return all projects
  if (req.method === 'GET') {
    try {
      const fileContent = fs.readFileSync(projectsPath, 'utf8');
      const projectsData = JSON.parse(fileContent);
      return res.status(200).json(projectsData);
    } catch (error) {
      console.error('Error reading projects:', error);
      return res.status(500).json({ message: 'Failed to fetch projects' });
    }
  }

  // POST method - Add new project
  if (req.method === 'POST') {
    try {
      // Read existing projects
      let projectsData;
      try {
        const fileContent = fs.readFileSync(projectsPath, 'utf8');
        projectsData = JSON.parse(fileContent);
        if (!projectsData.projects) {
          projectsData.projects = [];
        }
      } catch (error) {
        projectsData = { projects: [] };
      }

      // Validate incoming data
      const { id, type, title, description, technologies, liveDemo, codeLink, imagePreview } = req.body;
      
      if (!title || !description || !technologies) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create new project object
      const newProject = {
        id: id || Date.now().toString(),
        type: type || 'web',
        title,
        description,
        technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(tech => tech.trim()),
        liveDemo: liveDemo || '#',
        codeLink: codeLink || '#',
        imagePath: imagePreview || '/images/projects/default.jpg',
        createdAt: new Date().toISOString()
      };

      // Add new project
      projectsData.projects.push(newProject);

      // Write back to file
      await fs.promises.writeFile(
        projectsPath, 
        JSON.stringify(projectsData, null, 2),
        'utf8'
      );

      return res.status(200).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
      console.error('Error adding project:', error);
      return res.status(500).json({ message: 'Failed to add project: ' + error.message });
    }
  }

  // Handle any other HTTP method
  return res.status(405).json({ message: 'Method not allowed' });
} 