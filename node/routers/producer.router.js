import { Router } from 'express';
import { producer } from '../controllers/producer.controller'
const router = Router();

router.get('/show/:id', producer);
router.post('/show/:name', producer);
router.put('/show/:update', producer);


export default router;