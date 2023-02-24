"use client"
import Link from 'next/link'
import React from 'react'

export const Menu = () => {

  const normalLink = "font-medium text-gray-100 text-lg"
  const activeLink = "font-medium text-white text-lg"

  return (
    <nav className='w-screen px-3 py-3 bg-blue-600 flex gap-4 font-display mb-4'>
      <Link className={normalLink} href="/tasks">Tarefas</Link>
      <Link className={normalLink} href="/schedule">Agenda</Link>
    </nav>
  )
}
