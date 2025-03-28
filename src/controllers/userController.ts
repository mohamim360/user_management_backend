import { Request, Response } from 'express';
import User from '../models/User';

// getUsers function to fetch all users and error handling
export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
			const users = await User.find().sort({ lastLoginTime: -1 });
			res.send(users);
	} catch (error) {
			res.status(500).send({ error: 'Failed to fetch users' });
	}
};

// blockUsers function to block multiple users and error handling
export const blockUsers = async (req: Request, res: Response) => {
    const { userIds } = req.body;

    try {
        await User.updateMany({ _id: { $in: userIds } }, { status: 'blocked' });
        res.send({ message: 'Users blocked successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to block users' });
    }
};

// unblockUsers function to unblock multiple users and error handling
export const unblockUsers = async (req: Request, res: Response) => {
    const { userIds } = req.body;

    try {
        await User.updateMany({ _id: { $in: userIds } }, { status: 'active' });
        res.send({ message: 'Users unblocked successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to unblock users' });
    }
};

// deleteUsers function to delete multiple users and error handling
export const deleteUsers = async (req: Request, res: Response) => {
    const { userIds } = req.body;

    try {
        await User.deleteMany({ _id: { $in: userIds } });
        res.send({ message: 'Users deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete users' });
    }
};