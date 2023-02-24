"use client"
import { Todo } from "@/models/todo.model"
import { createContext } from "react"

export type TodoContextType = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoContext = createContext<TodoContextType>(null!)