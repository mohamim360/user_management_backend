// src/utils/authUtils.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend the Request type to include the `user` property
declare module 'express' {
    interface Request {
        user?: any; // You can replace `any` with a more specific type if needed
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send({ error: 'Authentication required' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const user = await User.findOne({ _id: decoded._id, status: 'active' });

        if (!user) {
            res.status(401).send({ error: 'User not found or blocked' });
            return;
        }

        req.user = user; // Now TypeScript will recognize `req.user`
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(401).send({ error: 'Invalid token' });
        } else {
            res.status(401).send({ error: 'An unknown error occurred' });
        }
    }
};