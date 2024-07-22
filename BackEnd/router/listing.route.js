import express from 'express'
import { verifyToken } from '../util/verifyTokens';
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controller/listing.controller';

const router = express.Router();


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

