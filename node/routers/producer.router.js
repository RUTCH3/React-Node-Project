import { Router } from 'express';
import producer from '../controllers/producer.controller.js'
const router = Router();

router.get('/', producer);
router.get('/:id', producer);
router.post('/:name', producer);
router.put('/:update', producer);

export default router;