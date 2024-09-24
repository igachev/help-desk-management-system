
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { useEffect, useState } from "react"
import { fetchTickets } from "../ticketSlice"
import { Link } from "react-router-dom"


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
    <section>
        <h2>List of Tickets</h2>
        {tickets.loading && <div>Loading</div>}

        {!tickets.loading && tickets.error 
        ? <div>Error:{tickets.error}</div> 
        : null}

        {!tickets.loading &&
         tickets.data.content.length > 0 &&
         tickets.data.content.map((ticket) => (
            <article key={ticket.id}>
                <h3>Title:{ticket.ticketTitle}</h3>
                <Link to={`/tickets/${ticket.id}`}>Details</Link>
            </article>
         ))
         }

         {!tickets.loading && 
          tickets.data.content.length > 0 && (
            <div>
              <button onClick={onPreviousPage}>Previous Page</button>
              <button onClick={onNextPage}>Next Page</button>
            </div>
          )}

    </section>
  )
}

export default TicketsView