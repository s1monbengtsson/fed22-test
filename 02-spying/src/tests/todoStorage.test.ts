import { afterEach, describe, expect, it } from 'vitest'
import { getTodos, saveTodos } from '../utils/todoStorage'
import mockLocalStorage from '../mocks/mockedLocalStorage'
import { Todo } from '../types/Todo'



global.localStorage = mockLocalStorage()

const TODO: Todo =  {
    id: 1,
    title: "my first todo",
    completed: false
}

describe('get todos', () => {
    it('returns empty list of todos', () => {
        const todos = getTodos()

        expect(todos.length).toBe(0)
    })
})

describe('save todos', () => {
    afterEach(() => {
        global.localStorage.clear()
    })

   it('can save a todo', () => {
        const result = saveTodos([TODO])

        expect(result.success).toBe(true)
   })

    it('can save a todo and then get it', () => {
        const result = saveTodos([TODO])
        expect(result.success).toBe(true)

        const todos = getTodos()
        expect(todos.length).toBe(1)
        expect(todos).toContainEqual(TODO)

    })
})

