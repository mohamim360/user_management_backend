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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    }
    catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 11000) {
            res.status(400).send({ error: 'Email already exists' });
        }
        else {
            res.status(400).send({ error: 'Registration failed' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(400).send({ error: 'Invalid credentials' });
            return;
        }
        // Update the lastLoginTime field
        user.lastLoginTime = new Date();
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    }
    catch (error) {
        res.status(400).send({ error: 'Login failed' });
    }
});
exports.login = login;
