import express from 'express'
import { addPret, deletePret, getPrets, updatePret } from '../controllers/pretController.js';

const router = express.Router()

router.get('/', getPrets)
router.post('/', addPret)
router.put('/:id', updatePret)
router.delete('./:id', deletePret)

export default router;