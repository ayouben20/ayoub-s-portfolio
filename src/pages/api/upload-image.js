import { saveImage } from '../../api/projectsHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const imagePath = await saveImage(req.files.image);
    res.status(200).json({ imagePath });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
} 