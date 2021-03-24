"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
var MYSQL_DATBASE = process.env.MYSQL_DATABSE || 'js_db';
var MYSQL_USER = process.env.MYSQL_USER || 'root';
var MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'root';
var MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATBASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.SERVER_PORT || 8080;
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
