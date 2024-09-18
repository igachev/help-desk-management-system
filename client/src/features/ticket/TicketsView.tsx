
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useEffect, useState } from "react"
import { fetchTickets } from "./ticketSlice"


const TicketsView = () => {
    const tickets = useSelector((state: RootState) => state.ticket)
    const dispatch = useDispatch()
    const [pageNo,setPageNo] = useState<number>(0)
    const [pageSize,setPageSize] = useState<number>(4)

    useEffect(() => {
        dispatch(fetchTickets({pageNo,pageSize}))
    },[])

    console.log(tickets)

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
                <p>Description:{ticket.ticketDescription}</p>
                <p>CreatedAt:{ticket.createdAt.toString()}</p>
            </article>
         ))
         }
    </section>
  )
}

export default TicketsView