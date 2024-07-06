import express from 'express';
import { test } from '../controller/User.controller.js';
import { verifyToken } from '../util/verifyTokens.js';
import { updateUser } from '../controller/User.controller.js';
import { deleteUser } from '../controller/User.controller.js';

const router=express.Router()

router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;