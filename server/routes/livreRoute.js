import express from 'express'
import { getLivres, addLivre, updateLivre, getLivre } from '../controllers/livreController.js';

const router = express.Router()

router.get("/", getLivres)
router.get("/:id", getLivre)
router.post('/', addLivre)
router.put("/:id", updateLivre)

export default router;