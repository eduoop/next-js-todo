"use client"
import { TodoContext } from '@/contexts/todo/TodoContext'
import React, { useContext } from 'react'
import CardTodo from './CardTodo'

export default function TaskList() {
  const todoContext = useContext(TodoContext)

  return (
    <div className='flex flex-col w-full gap-4'>
      {todoContext.todos.reverse().map((todo, index) => (
        <CardTodo key={todo.id} todo={todo} indexTodo={index + 1} />
      ))}
    </div>
  )
}
