
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import TicketsView from './features/ticket/TicketsView/TicketsView'
import TicketView from './features/ticket/TicketView/TicketView'
import LoginView from './features/user/LoginView/LoginView'
import Header from './components/Header/Header'
import CreateTicketView from './features/CreateTicketView/CreateTicketView'
import EditTicketView from './features/EditTicketView/EditTicketView'



function App() {

  
  return (
   <div>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<TicketsView />} />
        <Route path='tickets/create' element={<CreateTicketView />} />
        <Route path='tickets/:ticketId' element={<TicketView />} />
        <Route path='tickets/:ticketId/edit' element={<EditTicketView />} />
        <Route path='login' element={<LoginView />} />
      </Routes>
    </main>
    <footer>Footer</footer>
   </div>
  )

}


export default App
