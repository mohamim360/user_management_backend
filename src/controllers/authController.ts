import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

//register function to register a new user with the provided name, email, and password and error handling
export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
        res.status(201).send({ user, token });
    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            res.status(400).send({ error: 'Email already exists' });
        } else {
            res.status(400).send({ error: 'Registration failed' });
        }
    }
};

//login function to authenticate a user with the provided email and password and error handling
export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
			const user = await User.findOne({ email });
			if (!user || !(await bcrypt.compare(password, user.password))) {
					res.status(400).send({ error: 'Invalid credentials' });
					return;
			}

			// Update the lastLoginTime field
			user.lastLoginTime = new Date();
			await user.save();

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
			res.send({ user, token });
	} catch (error) {
			res.status(400).send({ error: 'Login failed' });
	}
};