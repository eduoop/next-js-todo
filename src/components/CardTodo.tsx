"use client"
import { TodoContext } from '@/contexts/todo/TodoContext';
import { FilterDate } from '@/helpers/filterDate';
import { Todo } from '@/models/todo.model'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { SlClose } from "react-icons/sl"


type Props = {
    todo: Todo;
    indexTodo: number;
}

export default function CardTodo({ todo, indexTodo }: Props) {

    const [isEditing, setIsEditing] = useState(false)
    const todoContext = useContext(TodoContext)

    //   todo dates

    const [todoName, setTodoName] = useState(todo.name)
    const todoNameRef = useRef<HTMLInputElement>(null)

    const unsetFocus = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        todoNameRef.current?.blur()
    }

    const updateTask = async () => {
        if (todo.name !== todoName) {
            const currentTodo = await todoContext.todos.filter(todoFiltered => todoFiltered.id === todo.id)[0]
            todoContext.setTodos(todoContext.todos.filter(todoFiltered => todoFiltered.id !== currentTodo.id))
            todoContext.setTodos(oldTodos => [{
                name: todoName,
                complete: currentTodo.complete,
                date: currentTodo.date,
                id: currentTodo.id
            }, ...oldTodos])
        }
    }

    const deleteTask = () => {
        if (todoContext.todos.length === 1) {
            localStorage.removeItem("todos")
            todoContext.setTodos(todoContext.todos.filter(todoFiltered => todoFiltered.id !== todo.id))
        } else {
            todoContext.setTodos(todoContext.todos.filter(todoFiltered => todoFiltered.id !== todo.id))
        }
    }

    return (
        <div className=' overflow-hidden bg-white shadow-md rounded-lg h-20 relative flex items-center pr-4'>
            <span className='absolute -tracking-[10px] opacity-50 left-1 select-none -bottom-10 text-slate-300 font-bold text-[100px]'>{indexTodo}</span>
            <form onSubmit={(e) => unsetFocus(e)} className='flex pl-16 flex-col h-full justify-center w-full'>
                <input onBlur={() => updateTask()} ref={todoNameRef} className='w-2/3 z-50 focus:font-semibold text-neutral-800 bg-transparent outline-none h-3/5 px-2 text-xl rounded-lg' type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
                <small className='pl-2 z-50 font-semibold text-neutral-800'>{FilterDate(todo.date)}</small>
            </form>
            <div className='flex items-center gap-1'>
                <SlClose onClick={() => deleteTask()} fontSize={35} className="duration-200 text-neutral-800 hover:text-red-500 cursor-pointer" />
            </div>
        </div>
    )
}
