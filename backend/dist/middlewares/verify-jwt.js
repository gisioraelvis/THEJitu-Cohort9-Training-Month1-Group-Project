"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: __dirname + "/../../.env" });
function VerifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ error: "Forbidden" });
        }
        const Payloadata = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.info = Payloadata;
    }
    catch (error) {
        res.status(403).json(error.message);
    }
    next();
}
exports.VerifyToken = VerifyToken;
