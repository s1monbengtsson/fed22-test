import { describe, it, expect } from 'vitest'
import * as TodoAPI from '../services/TodoAPI'
import { CreateTodoData } from '../types/Todo'

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

    it.todo('should create and then get the todo')

    it.todo('should create and then find the todo amoung all todos')
    
    it.todo('should create and then update the todo')

    it.todo('should create and then delete the todo')

})