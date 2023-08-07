import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import middleware from '../middleware/authMiddleware.js'

const router = new Router()
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/users', middleware, userController.getUsers)
router.delete('/users', middleware, userController.deleteUsers)
router.put('/users', middleware, userController.changeStatus)

export default router
