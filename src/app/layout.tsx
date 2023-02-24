import { Menu } from '@/components/Menu'
import { TodoProvider } from '@/contexts/todo/TodoProvider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Menu />
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  )
}
