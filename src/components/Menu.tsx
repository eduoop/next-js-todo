import Link from 'next/link'
import React from 'react'

export const Menu = () => {
  return (
    <nav className='w-screen px-3 py-3 bg-blue-600 flex gap-4 font-display mb-4'>
        <Link className='font-medium text-gray-200' href="/tasks">Tarefas</Link>
        <Link className='font-medium text-gray-200' href="/schedule">Agenda</Link>
    </nav>
  )
}
