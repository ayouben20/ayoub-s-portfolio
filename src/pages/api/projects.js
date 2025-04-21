import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const projectsPath = path.join(process.cwd(), 'public/data/projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    
    const newProject = {
      ...req.body,
      createdAt: new Date().toISOString()
    };

    projectsData.projects.push(newProject);
    fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Failed to add project' });
  }
} 