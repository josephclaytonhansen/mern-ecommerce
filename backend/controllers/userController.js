import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc auth user & get token
 // @route POST /api/users/login
 // @access Public
 const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: {$eq: email}})
    if (user && (await user.matchPassword(password))){

      generateToken(res, user._id)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
    
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }

 })

 // @desc register user
 // @route POST /api/users/
 // @access Public
 const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({email: {$eq: email}})
    if (userExists) {
      res.status(400)
      throw new Error('Email address already in use')
    } else {
      const user = await User.create({
         name,
         email,
         password
      })
      if (user){
         generateToken(res, user._id)
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
         })
      } else {
         res.status(400)
         throw new Error('Invalid user data')
      }
    }
 })

  // @desc Logout user / clear cookie
 // @route POST /api/users/logout
 // @access Private
 const logoutUser = asyncHandler(async (req, res) => {
   res.cookie('jwt', '', {httpOnly:true,expires: new Date(0)})
   res.status(200).json({message: "Logged out"})
    res.send("logout user as user")
 })

  // @desc get user profile
 // @route GET /api/users/profile
 // @access Private
 const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user){
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
 })

// @desc update user profile
 // @route PUT /api/users/profile
 // @access Private
 const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if (user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password){
         user.password = req.body.password
      }
      const updatedUser = await user.save()

      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
    res.send("update user profile as user")
 })

 // @desc get user profiles
 // @route GET /api/users/
 // @access Private / admin
 const getUsers = asyncHandler(async (req, res) => {
    res.send("get users as admin")
 })

  // @desc get user profiles
 // @route GET /api/users/:id
 // @access Private / admin
 const getUsersByID = asyncHandler(async (req, res) => {
    res.send("get user by ID as admin")
 })

  // @desc Delete user profile (admin)
 // @route DELETE /api/users/:id
 // @access Private / admin
 const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete user as admin")
 })

   // @desc Update user profile (admin)
 // @route PUT /api/users/:id
 // @access Private / admin
 const updateUser = asyncHandler(async (req, res) => {
    res.send("update user as admin")
 })

 export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersByID,
    deleteUser,
    updateUser
 }