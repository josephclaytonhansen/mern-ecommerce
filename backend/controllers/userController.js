import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc auth user & get token
 // @route POST /api/users/login
 // @access Public
 const authUser = asyncHandler(async (req, res) => {
    res.send("auth user as user")
 })

 // @desc register user
 // @route POST /api/users/
 // @access Public
 const registerUser = asyncHandler(async (req, res) => {
    res.send("register user as user")
 })

  // @desc Logout user / clear cookie
 // @route POST /api/users/logout
 // @access Private
 const logoutUser = asyncHandler(async (req, res) => {
    res.send("logout user as user")
 })

  // @desc get user profile
 // @route GET /api/users/profile
 // @access Private
 const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile as user")
 })

// @desc update user profile
 // @route PUT /api/users/profile
 // @access Private
 const updateUserProfile = asyncHandler(async (req, res) => {
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