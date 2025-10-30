import { Request, Response } from 'express';
import { User } from '../models/User';
import { Game } from '../models/Game';

export const globalSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ message: 'Search query required' });
    }
    
    const searchRegex = new RegExp(q, 'i');
    
    const users = await User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex }
      ]
    }).limit(10);
    
    const games = await Game.find({
      name: searchRegex
    }).limit(10);
    
    res.json({
      users,
      games
    });
  } catch (error) {
    res.status(500).json({ message: 'Error performing search', error });
  }
};