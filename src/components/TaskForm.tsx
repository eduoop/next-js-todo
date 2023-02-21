import React from 'react'

export const TaskForm = () => {
  return (
    <form className='flex flex-col w-full items-center justify-center pb-3'>
        <h1 className='text-2xl'>Adicionar tarefas</h1>
        <div className='flex gap-7 mt-3 w-full flex items-center justify-center'>
            <input type="text" placeholder='Digite a sua tarefa aqui...' className='outline-none bg-white text-neutral-800 rounded-lg shadow-md p-3 text-xl w-3/5'/>
            <button>Adicionar</button>
        </div>
    </form>
  )
}
