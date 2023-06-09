
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//Authenticate the user & get token
//@route: POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body
    // res.send({ email, password })

    //Looks for user by email
    const user = await User.findOne({ email })
    //Checking to see if user and password match
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


//Register a new user
//@route: POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    //Categories that will need to be filled in to register
    const { name, email, password} = req.body
    //Looks to see if user registering already exists (by email)
    const userExists = await User.findOne({ email })
    
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Creates new user if user registering does NOT already exist
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//Takes logged in user to their profile
//@route: GET /users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    //Looks for user by id
    const user = await User.findById(req.user._id)
    // res.send('Success!')

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//Allow user to update their profile 
//@route: PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    //Looks for user by id
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})




export { authUser, registerUser, getUserProfile, updateUserProfile, }