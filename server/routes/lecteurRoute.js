import express from 'express'
import { getLecteurs, addLecteur, updateLecteur, deleteLecteur, getLecteur} from '../controllers/lecteurController.js';

const router = express.Router()

router.get('/', getLecteurs)
router.get('/:id',getLecteur)
router.post('/', addLecteur)
router.put('/:id', updateLecteur)
router.delete('/:id', deleteLecteur)

export default router;