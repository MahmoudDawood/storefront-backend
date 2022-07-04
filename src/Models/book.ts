import Client from '../database'

export type Book= {
  id: number,
  name: string,
  pages: number,
  summary: string
}

export class BookStore{
  async index(): Promise<Book[]> {
    try {
      const connection = await Client.connect()
      const sql = "SELECT * FROM Books"
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch(err) {
      throw new Error(`Couldn't get books. Error: ${err}`)
    }
  }
  async show(id: number): Promise<Book> {
    try {
      const connection = await Client.connect()
      const sql = "SELECT * FROM Books WHERE id=($1);"
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch(err) {
      throw new Error(`Couldn't get book. Error: ${err}`)
    }
  }
  async create(book: Book): Promise<Book> {
    try {
      const connection = await Client.connect()
      const sql = "INSERT INTO Books (name, pages, summary) VALUES ($1, $2, $3) RETURNING *;"
      const result = await connection.query(sql, [book.name, book.pages, book.summary])
      connection.release()
      return result.rows[0]
    } catch(err) {
      throw new Error(`Couldn't create book. Error: ${err}`)
    }
  }
  async edit(id: number, book: Book): Promise<Book> {
    try {
      const connection = await Client.connect()
      const sql = "UPDATE Books SET name=$1, pages=$2, summary=$3 WHERE id=$4 RETURNING *;"
      const result = await connection.query(sql, [book.name, book.pages, book.summary, id])
      connection.release()
      return result.rows[0]
    } catch(err) {
      throw new Error(`Couldn't update book. Error: ${err}`)
    }
  }
  async delete(id: number): Promise<Book> {  // They use id as string
    try {
      const connection = await Client.connect()
      const sql = "DELETE FROM Books WHERE id=$1;" // They don't use semicolons here
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch(err) {
      throw new Error(`Couldn't delete book. Error: ${err}`)
    }
  }
}