import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../../../app/store"
import { useEffect } from "react"
import { fetchTicket } from "../ticketSlice"


const TicketView = () => {

const {ticketId} = useParams()
const ticket = useSelector((state: RootState) => state.ticket)
const user = useSelector((state: RootState) => state.user)
const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchTicket({ticketId}))
},[])

  return (
    <article>
        <h1>Ticket Details</h1>
        {ticket.loading && <div>Loading...</div>}

        {!ticket.loading && ticket.error 
        ? (
            <div>
                Error: {ticket.error}
            </div>
        )
        : null
        }

        {!ticket.loading && !ticket.error && 
        ticket.data.ticket?.id && (
            <div>
            <h2>Ticket Title: {ticket.data.ticket.ticketTitle}</h2>
            <h3>Created At: {ticket.data.ticket.createdAt?.toString()}</h3>
            <p>Ticket Description: {ticket.data.ticket.ticketDescription}</p>
            </div>
        )}

            {user.data.userId && (
                <div>
                    <Link to={`/tickets/${ticketId}/edit`}>Edit</Link>
                </div>
            )}

    </article>
  )
}

export default TicketView