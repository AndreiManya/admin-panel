import jwt from 'jsonwebtoken'
const middleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(400).json({ message: 'User not authorized' })
    }
    const decode = jwt.verify(token, 'SECRET_TOKEN')
    req.user = decode
    next()
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'User not authorized' })
  }
}

export default middleware
