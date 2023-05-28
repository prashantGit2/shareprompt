"use client"
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Provider = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      {children}
    </SessionProvider>
  )
}

export default Provider