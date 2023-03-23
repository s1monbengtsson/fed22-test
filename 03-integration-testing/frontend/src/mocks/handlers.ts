import { rest } from 'msw'
import { Todo, CreateTodoData, UpdateTodoData } from '../types/Todo'

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
    rest.get(`${BASE_URL}/todos/:todoId`, (req, res, ctx) => {
        const todoId = Number(req.params.todoId)

        // find the todo among the todos
        const todo = dummyTodos.find(todo => todo.id === todoId)

        // if todo did not exist, respond with 404
        if (!todo) {
            return res(
                ctx.status(404),
                ctx.json({})
            )
        }

        // respond with todo
        return res(
            ctx.status(200),
            ctx.json(todo)
        )
    }),
    

    // Mock create a todo
    // POST http://localhost:3001/todos/
    rest.post(`${BASE_URL}/todos`, async (req, res, ctx) => {
        const payload = await req.json<CreateTodoData>()

        // find next id
        const id = Math.max(0, ...dummyTodos.map(todo => todo.id)) + 1
        
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
    // PATCH http://localhost:3001/todos/:todoId
    rest.patch(`${BASE_URL}/todos/:todoId`, async (req, res, ctx) => {
        const todoId = Number(req.params.todoId)
        const payload = await req.json<Partial<UpdateTodoData>>()

        // find the todo among all todos
        const todo = dummyTodos.find(todo => todo.id === todoId)

        if (!todo) {
            return res(
                ctx.status(404),
                ctx.json({})
            )
        }

        // update todo with payload
        todo.title = payload.title ?? todo.title,
        todo.completed = payload.completed ?? todo.completed

        return res(
            ctx.status(200),
            ctx.json(todo)
        )
    }),

    // Mock delete a todo
    // DELETE http://localhost:3001/todos/:todoId
     rest.delete(`${BASE_URL}/todos/:todoId`, (req, res, ctx) => {
        const todoId = Number(req.params.todoId)

        // find the todo among dummy todos
        const todo = dummyTodos.find(todo => todo.id === todoId)

        if (!todo) {
            return res(
                ctx.status(404),
                ctx.json({})
            )
        }

        // remove todo from the dummy todos array
        dummyTodos.splice(dummyTodos.indexOf(todo), 1)

        // 💀 delete
        return res(
            ctx.status(200),
            ctx.json({})
        )
     }),
]