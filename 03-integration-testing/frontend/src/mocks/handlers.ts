import { rest } from 'msw'
import { Todo, CreateTodoData } from '../types/Todo'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const dummyTodos: Todo[] = [
    {
        id: 1,
        title: " My first todo",
        completed: false,
    },
    {
        id: 2,
        title: " My second todo",
        completed: true,
    }
]

export const handlers = [
    // Mock get all todos
    // GET http://localhost:3001/todos
    rest.get(`${BASE_URL}/todos`, (_req, res, ctx) => {
        // console.log("dummyTodos:", dummyTodos)
        return res(
            ctx.status(200),
            ctx.json(dummyTodos)
        )
    }),

    // Mock get a single todo
    // GET http://localhost:3001/todos/:todoId
    

    // Mock create a todo
    // POST http://localhost:3001/todos/
    rest.post(`${BASE_URL}/todos`, async (req, res, ctx) => {
        const payload = await req.json<CreateTodoData>()

        // find next id
        const id = Math.max(...dummyTodos.map(todo => todo.id)) + 1
        
        // create our new dummy todo
        const todo: Todo = {
            id: id,
            title: payload.title,
            completed: payload.completed,
        }

        // add dummy todo to list of dummy todos
        dummyTodos.push(todo)

        // respond with dummy todo
        return res(
            ctx.status(201),
            ctx.json(todo)
        )
    }),

    // Mock update a todo
    // PATCH http://localhost:3001/todos/:id
    // rest.patch(`${BASE_URL}/todos/:todoId`, null),

    // Mock delete a todo
    // DELETE http://localhost:3001/todos/:id
    // rest.delete(`${BASE_URL}/todos/:todoId`, null),
]