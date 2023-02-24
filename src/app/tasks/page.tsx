import { TaskForm } from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import React from 'react'

export default function tasks() {
  return (
    <div className='w-screen flex justify-center'>
      <div className='w-4/5 flex flex-col items-center gap-5'>
        <TaskForm />
        <TaskList/>
      </div>
    </div>
  )
}
