"use client"
import React, { useState, useRef } from 'react';
import { AiOutlinePlus } from "react-icons/ai"
import { Todo } from "@/models/todo.model"
import { useContext } from 'react'
import { TodoContext } from '@/contexts/todo/TodoContext';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import styled from 'styled-components'
import DatePicker, { DateObject } from "react-multi-date-picker"
import Button from "react-multi-date-picker/components/button"
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export const FormContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const DatesEndAddContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 1.75rem;

  @media (max-width: 700px) {
    width: 100%;
  }
`

export const StyledCalendar = styled(DatePicker)`
.rmdp-day.rmdp-selected span:not(.highlight) {
  background-color: #1e3a8a !important;
  transition: .3s !important;
  color: white !important;
}

.sd {
  transition: .3s !important;
}

.sd:hover {
  background-color: ##1e3a8ad9 !important;
}

.rmdp-day.rmdp-today span {
  background-color: transparent !important;
  color: black !important;
}

.rmdp-day.rmdp-today span:hover {
  background-color: #1e3a8ad9 !important;
  color: white !important;
}

.rmdp-day,
.rmdp-week-day {
  width: 45px !important;
  height: 40px !important;
  border: 1px solid #F2F2F2 !important;
}

.rmdp-day span {
  bottom: auto !important;
  top: 6px !important;
  left: auto !important;
  right: 6px !important;
  min-width: 26px !important;
  min-height: 26px !important;
}

.rmdp-day,
.rmdp-week-day {
  color: #333333;
}

.rmdp-week-day {
  color: #333333 !important;
}

.rmdp-calendar {
  padding: 0 !important;
}

.rmdp-day-picker {
  padding: 0 !important;
}

.rmdp-ym .rmdp-day {
  flex: none !important;
}

.rmdp-header {
  margin-top: 0 !important;
}

.rmdp-arrow {
  border-color: black !important;
}


.rmdp-arrow-container {
  transition: .3s !important;
}

.rmdp-arrow-container:hover {
  background: #33333331 !important;
}

.rmdp-arrow {
  width: 12px !important;
  height: 12px !important;
  border-radius: 2px !important;
}

.rmdp-arrow-container {
  width: 22px !important;
  height: 22px !important;
}

.rmdp-border {
  border: 2px solid black !important;
}

.rmdp-calendar span {
  font-family: 'Roboto';
}

.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
  padding: 0.5em !important;
  font-size: 1.2em !important;
  font-family: 'Roboto' !important;
}

.css-1t1j96h-MuiPaper-root-MuiDialog-paper {
  width: fit-content !important;
  max-width: fit-content !important;
}

 .rmdp-disabled {
  span {
    color: #00000052;
  }
 }
`

export const StyledButtonDate = styled(Button)`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  height: 100%;
  width: 180px;
  font-size: 1.25rem;

  @media (max-width: 700px) {
    width: 100%;
  }
`

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("")
  const todoContext = useContext(TodoContext)
  const taskNameRef = useRef<HTMLInputElement>(null)
  const [day, setDay] = useState<DateObject | DateObject[] | null>(new DateObject())

  const formatDateToDb = () => {
    if (day) {
      const dateFull = day.toString().split(" ")[0]
      const finalDate = `${dateFull.split("/")[0]}-${dateFull.split("/")[1]}-${dateFull.split("/")[2]}`
      console.log(finalDate)
      const hour = day.toString().split(" ")[1]

      return `${finalDate}T${hour}`
    } else {
      return "123"
    }
  }

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskName.trim()) {
      const fullDate = new Date()
      const date = moment(fullDate).format("DD-MM-YYYYTHH:mm:ss")

      await todoContext.setTodos(oldTodos => [...oldTodos, {
        complete: false,
        date: formatDateToDb(),
        id: faker.datatype.uuid(),
        name: taskName,
      }])

      taskNameRef.current?.focus()
      setTaskName("")
    }
  }

  return (
    <form onSubmit={(e) => { addTask(e) }} className='flex flex-col w-full items-center justify-center pb-3'>
      <h1 className='text-3xl text-white font-bold'>Adicionar tarefas</h1>
      <FormContainer>
        <input ref={taskNameRef} value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" placeholder='Digite a sua tarefa aqui...' className='outline-none bg-white text-neutral-800 rounded-lg shadow-md p-3 text-xl w-full' />

        <DatesEndAddContainer>
          <StyledCalendar
            value={day}
            format="DD/MM/YYYY HH:mm"
            onChange={(day) => {
              setDay(day)
            }}
            render={(value: any, openCalendar: any,) => {
              return (
                <StyledButtonDate placeholder={moment(new Date()).format("DD/MM/YYYY")} onClick={openCalendar}>
                  {value}
                </StyledButtonDate>
              )
            }}
            plugins={[
              <TimePicker position="top" hideSeconds />
            ]}
            minDate={new Date()}
            disableYearPicker={true}
            disableMonthPicker={true}
            shadow={false}
            showOtherDays
            months={months}
            fullYear={false}
            weekDays={weekDays}
          />

          <button type='submit' className='h-full bg-white rounded-full px-3 text-xl duration-300 text-neutral-800 hover:text-sky-500 shadow-md'>
            <AiOutlinePlus fontSize={30} />
          </button>
        </DatesEndAddContainer>

      </FormContainer>
    </form>
  )
}
