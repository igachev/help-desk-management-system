
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TicketsView from './features/ticket/TicketsView/TicketsView'
import TicketView from './features/ticket/TicketView/TicketView'
import LoginView from './features/user/LoginView/LoginView'



function App() {
  
  return (
   <div>
    <header>Header</header>
    <main>
      <Routes>
        <Route path='/' element={<TicketsView />} />
        <Route path='tickets/:ticketId' element={<TicketView />} />
        <Route path='login' element={<LoginView />} />
      </Routes>
    </main>
    <footer>Footer</footer>
   </div>
  )

}

export default App
