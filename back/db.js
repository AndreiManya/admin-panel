import Pg from 'pg'
const Pool = Pg.Pool
const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'adminpanel'
})

export default pool
