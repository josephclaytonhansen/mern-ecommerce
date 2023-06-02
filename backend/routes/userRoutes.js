import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersByID,
    deleteUser,
    updateUser
} from '../controllers/userController.js'

router.route('/').get(getUsers).post(registerUser)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').get(getUsersByID).delete(deleteUser).put(updateUser)

export default router
