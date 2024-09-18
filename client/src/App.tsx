
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TicketsView from './features/ticket/TicketsView'



function App() {
  
  return (
   <div>
    <header>Header</header>
    <main>
      <Routes>
        <Route path='/' element={<TicketsView />} />
      </Routes>
    </main>
    <footer>Footer</footer>
   </div>
  )

}

export default App
