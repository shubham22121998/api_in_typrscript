"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var book_1 = __importDefault(require("./routes/book"));
var NAMESPACE = 'Server';
var router = express_1.default();
/** logging the request */
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "]- URL: [" + req.url + "] -IP : [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "]-URL:[" + req.url + "] -IP: \n          [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
/** Parser the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
/** ruels of ourAPI  */
router.use(function (req, res, next) {
    res.header("Access-control-Allow-Origin", '*');
    res.header("Access-control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PATCH, DELETE, POST ,PUT");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
router.use('/person', book_1.default);
/** error handaling */
router.use(function (req, res, next) {
    var error = new Error('not found');
    res.status(404).json({
        message: error.message
    });
});
/** Create the server */
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
