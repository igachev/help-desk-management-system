
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useEffect, useState } from "react"
import { fetchTickets } from "../ticketSlice"
import { Link } from "react-router-dom"
import "./TicketsView.css"

const TicketsView = () => {
    const tickets = useSelector((state: RootState) => state.ticket)
    const dispatch = useDispatch()
    const [pageNo,setPageNo] = useState<number>(0)
    const [pageSize,setPageSize] = useState<number>(4)
    let isLast = tickets.data.last

    useEffect(() => {
        dispatch(fetchTickets({pageNo,pageSize}))
    },[pageNo])

    function onNextPage(): void {
    if(!isLast) {
      setPageNo((pageNo) => pageNo += 1)
    }
        return;
    }

    function onPreviousPage(): void {
      if(pageNo > 0) {
        setPageNo((pageNo) => pageNo -= 1)
      }
      return;
    }


  return (
    <section className="tickets-section">
        <h2>List of Tickets</h2>
        {tickets.loading && <div className="loading">Loading...</div>}

        {!tickets.loading && tickets.error 
        ? <div>Error:{tickets.error}</div> 
        : null}

        {!tickets.loading &&
         tickets.data.content.length > 0 &&
         tickets.data.content.map((ticket) => (
            <article key={ticket.id} className="ticket-article">
                <h3 style={ ticket.resolved ? {color: 'white'} : {color: '#FFBF00'} }>Title:{ticket.ticketTitle}</h3>
                <p style={ ticket.resolved ? {color: 'white'} : {color: '#FFBF00'} }>Problem Fixed: {ticket.resolved ? "true" : "false"} <span dangerouslySetInnerHTML={{__html:ticket.resolved ? "&#9989;" : "&#10060;"}}></span></p>
                <div className="details-container">
                <Link to={`/tickets/${ticket.id}`}>Details</Link>
                </div>
            </article>
         ))
         }

         {!tickets.loading && 
          tickets.data.content.length > 0 && (
            <div className="btn-container">
              <button onClick={onPreviousPage}>Previous Page</button>
              <button onClick={onNextPage}>Next Page</button>
            </div>
          )}

    </section>
  )
}

export default TicketsView