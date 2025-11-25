import { Request, Response, NextFunction } from "express";
import { Game } from "../models/Game";
import { User } from "../models/User";
import logger from '../utils/logger';

export const globalSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      logger.warn('Invalid search query');
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    logger.info('Performing global search', { query });

    const searchRegex = new RegExp(query, 'i');

    const [games, users] = await Promise.all([
      Game.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { category: searchRegex }
        ]
      }).limit(10),
      User.find({
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex }
        ]
      }).select('firstName lastName email').limit(10)
    ]);

    logger.info('Global search completed', { 
      gamesFound: games.length, 
      usersFound: users.length 
    });

    res.json({
      games,
      users,
      totalResults: games.length + users.length
    });
  } catch (error) {
    logger.error('Error performing global search', { 
      query: req.query.query,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const searchGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, category, difficulty, limit = 20 } = req.query;
    logger.info('Searching games', { query, category, difficulty, limit });

    const searchCriteria: any = {};

    if (query && typeof query === 'string') {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (category) {
      searchCriteria.category = category;
    }

    if (difficulty) {
      searchCriteria.difficulty = difficulty;
    }

    const games = await Game.find(searchCriteria).limit(parseInt(limit as string));
    logger.info(`Found ${games.length} games`);
    res.json(games);
  } catch (error) {
    logger.error('Error searching games', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, limit = 20 } = req.query;
    
    if (!query || typeof query !== 'string') {
      logger.warn('Invalid user search query');
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    logger.info('Searching users', { query, limit });

    const searchRegex = new RegExp(query, 'i');
    const users = await User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex }
      ]
    })
    .select('firstName lastName email createdAt')
    .limit(parseInt(limit as string));

    logger.info(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    logger.error('Error searching users', { 
      query: req.query.query,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const autocomplete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, type = 'all' } = req.query;
    
    if (!query || typeof query !== 'string') {
      logger.warn('Invalid autocomplete query');
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    logger.info('Autocomplete search', { query, type });

    const searchRegex = new RegExp(`^${query}`, 'i');
    const results: any = {};

    if (type === 'all' || type === 'games') {
      const games = await Game.find({ name: searchRegex })
        .select('name')
        .limit(5);
      results.games = games.map(g => g.name);
    }

    if (type === 'all' || type === 'users') {
      const users = await User.find({ 
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex }
        ]
      })
        .select('firstName lastName email')
        .limit(5);
      results.users = users.map(u => ({
        name: `${u.firstName} ${u.lastName || ''}`.trim(),
        email: u.email
      }));
    }

    const totalSuggestions = (results.games?.length || 0) + (results.users?.length || 0);
    logger.info('Autocomplete completed', { suggestionsCount: totalSuggestions });
    res.json(results);
  } catch (error) {
    logger.error('Error in autocomplete', { 
      query: req.query.query,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};