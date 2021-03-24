import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import bookRoute from './routes/book';

const NAMESPACE = 'Server';
const router = express();

/** logging the request */

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}]- URL: [${req.url}] -IP : [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD: [${req.method}]-URL:[${req.url}] -IP: 
          [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });
    next();
});

/** Parser the body of the request */

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** ruels of ourAPI  */

router.use((req, res, next) => {
    res.header(`Access-control-Allow-Origin`, '*');
    res.header(`Access-control-Allow-Headers`, `Origin,X-Requested-With,Content-Type,Accept,Authorization`);

    if (req.method == `OPTIONS`) {
        res.header(`Access-Control-Allow-Methods`, `GET, PATCH, DELETE, POST ,PUT`);
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/person', bookRoute);

/** error handaling */

router.use((req, res, next) => {
    const error = new Error('not found');

    res.status(404).json({
        message: error.message
    });
});
/** Create the server */

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
