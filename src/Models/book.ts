import client from '../database'

export type Book= {
  id: number,
  name: string,
  pages: number,
  summary: string
}

export class BookStore{
  async index() {
    try {
      const connection = await client.connect()
      const query = "SELECT * FROM book;"
      const result = await connection.query(query)
      connection.release()
      return result.rows
    } catch(err) {
      throw new Error(`Couldn't view table entries, Error: ${err}`)
    }
  }
}