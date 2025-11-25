import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { User } from "../models/User";
import logger from '../utils/logger';

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email(),
  profilePicture: z.string().url().optional(),
});

const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  profilePicture: z.string().url().optional(),
});

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching all users');
    const users = await User.find();
    logger.info(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    logger.error('Error fetching users', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Fetching user by ID', { userId: id });
    
    const user = await User.findById(id);
    
    if (!user) {
      logger.warn('User not found', { userId: id });
      return res.status(404).json({ message: 'User not found' });
    }
    
    logger.info('User found', { userId: id });
    res.json(user);
  } catch (error) {
    logger.error('Error fetching user', { 
      userId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Creating new user', { firstName: req.body.firstName, email: req.body.email });
    const validatedData = userSchema.parse(req.body);
    
    const existingUser = await User.findOne({ email: validatedData.email });
    
    if (existingUser) {
      logger.warn('User already exists', { email: validatedData.email });
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    const user = new User(validatedData);
    await user.save();
    
    logger.info('User created successfully', { userId: user._id });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error creating user', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error creating user', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Updating user', { userId: id });
    
    const validatedData = updateUserSchema.parse(req.body);
    
    const user = await User.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      logger.warn('User not found for update', { userId: id });
      return res.status(404).json({ message: 'User not found' });
    }
    
    logger.info('User updated successfully', { userId: id });
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation error updating user', { error });
      return res.status(400).json({ message: 'Validation error', error });
    }
    logger.error('Error updating user', { 
      userId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    logger.info('Deleting user', { userId: id });
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      logger.warn('User not found for deletion', { userId: id });
      return res.status(404).json({ message: 'User not found' });
    }
    
    logger.info('User deleted successfully', { userId: id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Error deleting user', { 
      userId: req.params.id,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    logger.info('Fetching user by email', { email });
    
    const user = await User.findOne({ email });
    
    if (!user) {
      logger.warn('User not found', { email });
      return res.status(404).json({ message: 'User not found' });
    }
    
    logger.info('User found', { email });
    res.json(user);
  } catch (error) {
    logger.error('Error fetching user by email', { 
      email: req.params.email,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    next(error);
  }
};

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      logger.warn('Invalid search query');
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    logger.info('Searching users', { query });
    
    const searchRegex = new RegExp(query, 'i');
    const users = await User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex }
      ]
    });
    
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