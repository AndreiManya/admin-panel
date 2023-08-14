import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require'
})
// const pool = new Pool({
//   user: 'postgres',
//   password: '123',
//   host: 'localhost',
//   port: 5432,
//   database: 'adminpanel'
// })

export default pool
