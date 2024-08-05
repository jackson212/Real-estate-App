import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controller/listing.controller.js';
import { verifyToken } from '../util/verifyTokens.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',verifyToken, getListing);
router.get('/get',verifyToken, getListings);

export default router;