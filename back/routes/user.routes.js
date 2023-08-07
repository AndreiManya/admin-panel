import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import middleware from '../middleware/authMiddleware.js'

const router = new Router()
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/user', middleware, userController.getUsers)
router.delete('/user/', middleware, userController.deleteUsers)
router.put('/user/', middleware, userController.changeStatus)

export default router
