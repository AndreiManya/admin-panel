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
        const resTypes = ['User with this email or username already exist', 'This user blocked']
        return res
          .status(400)
          .json({ message: userExist.rows[0].status === 'blocked' ? resTypes[1] : resTypes[0] })
      }
      const date = new Date().toLocaleDateString('ru-RU')
      const hashPassowrd = bcrypt.hashSync(password, 7)
      const newUser = await db.query(
        'INSERT INTO users (name, password, email, date, lastLogin, status) values ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, hashPassowrd, email, date, date, 'none']
      )
      res.status(200).json({ message: 'Users was registered' })
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
      if (userExist.rows[0].status === 'blocked') {
        return res.status(400).json({ message: 'This user blocked' })
      }
      const hashPassowrd = bcrypt.compareSync(password, userExist.rows[0].password)
      if (!hashPassowrd) {
        return res.status(400).json({ message: 'Password is not correct' })
      }
      const token = generateToken(userExist.rows[0].id, name)
      res.json({ token, name })
    } catch (error) {
      res.status(400).json({ message: 'Login error' })
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
    const { users } = req.body
    users?.forEach((e) => {
      ;(async () => await db.query('DELETE FROM users WHERE id = $1 ', [e.id]))()
    })
    res.status(400).json({ message: 'Users was deleted' })
  }
  async changeStatus(req, res) {
    const { users, status } = req.body
    users?.forEach((e) => {
      ;(async () =>
        await db.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', [status, e.id]))()
    })
    res.status(400).json({ message: 'Users status was changed' })
  }
}
export default new UserController()
