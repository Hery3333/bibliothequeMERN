import express from 'express'
import { addPret, getPrets, newPret } from '../controllers/pretController.js';

const router = express.Router()

router.get('/', getPrets)
router.post('/', addPret)

export default router;