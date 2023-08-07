import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (id, name) => {
  const payload = {
    id,
    name
  }
  return jwt.sign(payload, 'SECRET_TOKEN', { expiresIn: '2h' })
}

class UserController {
  async createUser(req, res) {
    try {
      const { name, password, email } = req.body
      const userExist = await db.query('SELECT email FROM users WHERE email = $1 OR name = $2', [
        email,
        name
      ])
      if (userExist.rowCount > 0) {
        return res.status(400).json({ message: 'User with this email or username already exist' })
      }
      const date = new Date().toLocaleDateString('ru-RU')
      const hashPassowrd = bcrypt.hashSync(password, 7)
      const newUser = await db.query(
        'INSERT INTO users (name, password, email, date, lastLogin, status) values ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, hashPassowrd, email, date, date, 'new']
      )
      res.json(newUser.rows[0])
    } catch (error) {
      res.status(400).json({ message: 'Registration error' })
    }
  }
  async login(req, res) {
    try {
      const { name, password } = req.body
      const userExist = await db.query('SELECT * FROM users WHERE name = $1', [name])
      if (userExist.rowCount === 0) {
        return res.status(400).json({ message: 'User are not exist' })
      }
      const hashPassowrd = bcrypt.compareSync(password, userExist.rows[0].password)
      if (!hashPassowrd) {
        return res.status(400).json({ message: 'Password is not correct' })
      }
      const token = generateToken(userExist.rows[0].id, name)
      res.json({ token, name })
    } catch (error) {
      res.status(400).json({ message: 'Registration error' })
    }
  }
  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM users')
      res.json(users.rows)
    } catch (error) {
      res.status(400).json({ message: 'Get users error' })
    }
  }
  async deleteUsers(req, res) {
    const { id } = req.body
    const user = await db.query('DELETE FROM users WHERE id = $1 ', [id])
    res.json(user.rows[0])
  }
  async changeStatus(req, res) {
    const { id, status } = req.body
    const user = await db.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', [
      status,
      id
    ])
    res.json(user.rows)
  }
}
export default new UserController()
