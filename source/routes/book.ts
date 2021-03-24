import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/insert/data1', controller.createInfo);
router.get('/get/data', controller.getAllData);
router.get('/get/data/:id', controller.getUserById);
router.patch('/patch/data', controller.updateUser);
router.delete('/delete/data/:id', controller.deleteUser);

export = router;
