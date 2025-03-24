"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const authUtils_1 = require("../utils/authUtils");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(authUtils_1.authenticate);
router.get('/users', userController_1.getUsers);
router.post('/users/block', userController_1.blockUsers);
router.post('/users/unblock', userController_1.unblockUsers);
router.post('/users/delete', userController_1.deleteUsers);
exports.default = router;
