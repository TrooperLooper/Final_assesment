import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodTypeAny } from 'zod';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation failed',
          errors: error.issues,
        });
        return;
      }
      next(error);
    }
  };
};

export const createSessionSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    gameId: z.string().min(1, 'Game ID is required'),
    playedSeconds: z.number().min(0, 'Played seconds must be positive'),
  }),
});

export const updateSessionSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Session ID is required'),
  }),
});

export const getSessionSchema = z.object({
  params: z.object({
    userId: z.string().min(1, 'User ID is required'),
  }),
});