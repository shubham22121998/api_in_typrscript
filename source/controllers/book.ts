import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Person Information';

const createInfo = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'create a data');

    let { name, location } = req.body;

    let query = `INSERT INTO crud (name,location) VALUES("${name}","${location}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'recored inserted', result);
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.meassage, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.meassage, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllData = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'getting all data');

    let query = `select * from crud`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.meassage, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.meassage, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUserById = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'create a data');

    let id = req.params.id;

    let query = `select name,location from crud where id=${id}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'recored inserted', result);
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.meassage, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.meassage, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const updateUser = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'create a data');

    let { id, name, location } = req.body;

    let query = `UPDATE crud SET name=${name},location=${location} where id=${id}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'recored inserted', results);
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.meassage, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.meassage, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const deleteUser = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'create a data');

    let id = req.params.id;

    let query = `DELETE from crud where id=${id}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'recored inserted', result);
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.meassage, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.meassage, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { getAllData, createInfo, getUserById, updateUser, deleteUser };
