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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homepage = exports.loginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_helpers_1 = require("../database-helpers");
const _db = new database_helpers_1.DatabaseHelper();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = (0, uuid_1.v4)();
            const { Name, Email, Password } = req.body;
            const { error } = utils_1.RegistrationSchema.validate(req.body);
            if (error) {
                return res.status(422).json(error.details[0].message);
            }
            const hashedPassword = yield bcrypt_1.default.hash(Password, 10);
            ///check if email exist
            yield _db.exec("RegisterUser", {
                name: Name,
                email: Email,
                password: hashedPassword,
            });
            return res.status(201).json({ message: "User registered" });
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.RegisterUser = RegisterUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            const { error } = utils_1.LoginSchema.validate(req.body);
            if (error) {
                return res.status(422).json(error.details[0].message);
            }
            const user = yield (yield _db.exec("getUserByEmail", { email: Email })).recordset;
            if (!user[0]) {
                return res.status(404).json({ error: "User Not found" });
            }
            const valid = yield bcrypt_1.default.compare(Password, user[0].Password);
            if (!valid) {
                return res.status(404).json({ error: "User Not found" });
            }
            const payload = user.map((item) => {
                const { Password } = item, rest = __rest(item, ["Password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRETKEY, {
                expiresIn: "3600s",
            });
            return res.status(200).json({ message: "User Loggedin!!!", token });
        }
        catch (error) {
            res.status(500).json(error);
        }
    });
}
exports.loginUser = loginUser;
function Homepage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.info) {
                return res.status(200).json(`Welcome ${req.info.Name}`);
            }
        }
        catch (error) { }
    });
}
exports.Homepage = Homepage;
