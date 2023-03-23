import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import * as TodoAPI from '../services/TodoAPI'
import { CreateTodoData } from '../types/Todo'
import { server } from '../mocks/server'

// 🏎 Boot API mocking
beforeAll(() => {
    server.listen()
})

// 🧨 Reset handlers
afterEach(() => {
    server.resetHandlers()
})

// 🧹 Clean up after ourselves
afterAll(() => {
    server.close()
})

const newTodo: CreateTodoData = {
    title: "Test todo",
    completed: false,
}

describe('TodoAPI', () => {

    it('should return a list', async () => {
        const todos = await TodoAPI.getTodos()

        expect(Array.isArray(todos)).toBe(true)
    })

    
    it('should create a new todo', async () => {
        const result = await TodoAPI.createTodo(newTodo)

        expect(result).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed
        })
    })

    

    it('should create and then get the todo', async () => {
        const result = await TodoAPI.createTodo(newTodo)
        const todo = await TodoAPI.getTodo(result.id)

        /*
        expect(todo).toMatchObject({
            id: result.id,
            title: todo.title,
            completed: todo.completed
        })
        */

        expect(todo).toStrictEqual(result)
    })

    it('should create and then find the todo among all todos', async () => {
        const result = await TodoAPI.createTodo(newTodo)
        const todos = await TodoAPI.getTodos()

        expect(todos).toContainEqual(result)
    })

    

    it('should create and then update the todo', async () => {
        const result = await TodoAPI.createTodo(newTodo)
        const updatedTodo = await TodoAPI.updateTodo(result.id, {
            completed: !result.completed
        })
        expect(updatedTodo.completed).toBe(!result.completed)

        expect(updatedTodo).toMatchObject({
            id: result.id,
            title: result.title,
            completed: !result.completed
        })
    })

    
    it('should create and then delete the todo', async () => {
        const result = await TodoAPI.createTodo(newTodo)
        await TodoAPI.deleteTodo(result.id)
        const todos = await TodoAPI.getTodos()

        expect(todos).not.toContainEqual(result)
    })
    
})