"use client"

import React, { useState, useEffect } from 'react';
import { Todo } from '@/models/todo.model'
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const todosStorage = localStorage.getItem("todos")
        if (todos.length) {
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            if (todosStorage) {
                setTodos(JSON.parse(todosStorage))
            }
        }
    }, [todos])

    return (
        <TodoContext.Provider value={{ setTodos, todos }}>
            {children}
        </TodoContext.Provider>
    )
}
