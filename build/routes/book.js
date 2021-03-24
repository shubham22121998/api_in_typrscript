"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var book_1 = __importDefault(require("../controllers/book"));
var router = express_1.default.Router();
router.post('/insert/data1', book_1.default.createInfo);
router.get('/get/data', book_1.default.getAllData);
router.get('/get/data/:id', book_1.default.getUserById);
router.patch('/patch/data', book_1.default.updateUser);
router.delete('/delete/data/:id', book_1.default.deleteUser);
module.exports = router;
