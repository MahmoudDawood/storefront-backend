import { Book, BookStore }from '../Models/book'
import dotenv from 'dotenv'
dotenv.config()

const store = new BookStore

describe("Testing Book Model", () => {
  it("Should be working with test database", () => {
    expect(process.env.ENV).toBe('test')
  })
  it("Should have and index method", () => {
    // expect(store.index).toBe(process.env.ENV)
    expect(store.index).toBeDefined()
  })
  it("Should get all books", async() => {
    const result = await store.index()
    expect(result).toEqual([])
  })
})