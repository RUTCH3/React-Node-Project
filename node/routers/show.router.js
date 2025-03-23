import { Router } from 'express';
import show from '../controllers/show.controller';

const router = Router();

router.get('/show', show);
router.get('/show/:id', show);
router.post('/show/:name', show);
router.put('/show/:update', show);
router.delete('/show/:id', show);

export default router;