import { updateProjects } from '../../api/projectsHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await updateProjects(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ message: 'Error updating projects' });
  }
} 