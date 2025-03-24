// src/routes/userRoutes.ts
import express from 'express';
import { authenticate } from '../utils/authUtils';
import { getUsers, blockUsers, unblockUsers, deleteUsers } from '../controllers/userController';

const router = express.Router();
// User routes
router.use(authenticate);

router.get('/users', getUsers);
router.post('/users/block', blockUsers);
router.post('/users/unblock', unblockUsers);
router.post('/users/delete', deleteUsers);

export default router;