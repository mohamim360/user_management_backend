"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.unblockUsers = exports.blockUsers = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().sort({ lastLoginTime: -1 });
        res.send(users);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});
exports.getUsers = getUsers;
const blockUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds } = req.body;
    try {
        yield User_1.default.updateMany({ _id: { $in: userIds } }, { status: 'blocked' });
        res.send({ message: 'Users blocked successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to block users' });
    }
});
exports.blockUsers = blockUsers;
const unblockUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds } = req.body;
    try {
        yield User_1.default.updateMany({ _id: { $in: userIds } }, { status: 'active' });
        res.send({ message: 'Users unblocked successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to unblock users' });
    }
});
exports.unblockUsers = unblockUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds } = req.body;
    try {
        yield User_1.default.deleteMany({ _id: { $in: userIds } });
        res.send({ message: 'Users deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to delete users' });
    }
});
exports.deleteUsers = deleteUsers;
