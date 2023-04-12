
import asyncHandler from 'express-async-handler';
import Entry from '../models/entryModel.js'

//API Route for ALL entries
//@route: GET /entries
//@access Public
const getEntries = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {}
    const entries = await Entry.find({ ...keyword })
    // const entries = await Entry.find({})

    res.json(entries)
})

//API Route for ONE entry
//@route: GET /entries/:id
//@access Public
const getEntryById = asyncHandler(async (req, res) => {
    const entry = await Entry.findById(req.params.id)

    if (entry) {
        res.json(entry)
    } else {
        res.status(404)
        throw new Error('Post not found')
    }
})

//Get logged in user entry(s)
//@route: GET /entries/myentries
//@access Private
const getMyEntries = asyncHandler(async (req, res) => {
    const entries = await Entry.find({ user: req.user._id })
    res.json(entries)
})

//DELETE an entry
//@route: DELETE /entries/:id
//@access Private
const deleteEntry = asyncHandler(async (req, res) => {
    const entry = await Entry.findById(req.params.id)

    if (entry) {
        await entry.deleteOne()
        res.json({ message: 'Post Removed' })
    } else {
        res.status(404)
        throw new Error('Post not found')
    }
})

//CREATE a post
//@route: POST /entry
//@access Private/Admin
const createEntry = asyncHandler(async (req, res) => {
    const entry = new Entry({
        title: 'Sample title',
        author: 'Sample Author',
        user: req.user._id,
        image: 'Paste image URL here or upload image below:',
        date: 'January 1, 2023',
        description: 'Sample Description'
    })

    const createdEntry = await entry.save()
    res.status(201).json(createdEntry)
})


//UPDATE a post
//@route: PUT /entries/:id
//@access Private
const updateEntry = asyncHandler(async (req, res) => {
    const {
        title, author, image, date, description
    } = req.body

    const entry = await Entry.findById(req.params.id)

    if(entry) {
        entry.title = title
        entry.author = author
        entry.description = description
        entry.image = image
        entry.date = date

        const updatedEntry = await entry.save()
        res.json(updatedEntry)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})




export { getEntries, getEntryById, getMyEntries, deleteEntry, createEntry, updateEntry }