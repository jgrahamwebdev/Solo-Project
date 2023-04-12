
import express from "express";
// import asyncHandler from 'express-async-handler';
// import Entry from "../models/entryModel.js";
const router = express.Router()
import { getEntries, getEntryById, getMyEntries, deleteEntry, createEntry, updateEntry } from '../controllers/entryController.js';
import { protect } from "../middleware/authMiddleware.js";

//API Route for ALL entries
router.route('/').get(getEntries)

//API Route for CREATE new entry
router.route('/').post(protect, createEntry)

//For getting ALL logged in user entry(s)
router.route('/myentries').get(protect, getMyEntries)

//API Route for ONE entry
router.route('/:id').get(getEntryById)

//DELETE a entry
router.route('/:id').delete(protect, deleteEntry)

//API Route for UPDATE an entry
router.route('/:id').put(protect, updateEntry)

export default router