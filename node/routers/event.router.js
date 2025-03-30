import { Router } from 'express';
import event from '../controllers/event.controller.js';

const router = Router();

router.get('/', event);
router.get('/:id', event);
router.post('/:name', event);
router.put('/:update', event);
router.delete('/:id', event);

export default router;