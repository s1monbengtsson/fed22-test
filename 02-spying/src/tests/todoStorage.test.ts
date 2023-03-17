/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTodos, saveTodos } from '../utils/todoStorage'
// import mockLocalStorage from '../mocks/mockedLocalStorage'
import { Todo } from '../types/Todo'

// global.localStorage = mockLocalStorage()

const TODO: Todo =  {
    id: 1,
    title: "my first todo",
    completed: false
}

describe('get todos', () => {
    it('returns empty list of todos', () => {
        const getItemSpy = vi.spyOn(global.localStorage, 'getItem')
        const todos = getTodos()

        expect(getItemSpy).toHaveBeenCalledOnce()
        expect(todos.length).toBe(0)
    })
})

describe('save todos', () => {
    afterEach(() => {
        global.localStorage.clear()
    })

   it('can save a todo', () => {
        const setItemSpy = vi.spyOn(global.localStorage, 'setItem')
        const result = saveTodos([TODO])

        expect(setItemSpy).toHaveBeenCalledOnce()
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

