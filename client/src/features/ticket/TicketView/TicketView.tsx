import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RootState } from "../../../app/store"
import { useEffect, useState } from "react"
import { deleteTicket, fetchTicket, resolveTicket } from "../ticketSlice"
import { getCookie } from "../../../cookie"
import "./TicketView.css"

const TicketView = () => {

const {ticketId} = useParams()
const navigation = useNavigate()
const ticket = useSelector((state: RootState) => state.ticket)
const user = useSelector((state: RootState) => state.user)
const dispatch = useDispatch()
const userId = user.data.userId
const userEmail = getCookie("userEmail")
const decodedUserEmail = decodeURIComponent(userEmail || '')
let isAdmin = decodedUserEmail === 'admin@abv.bg' ? true : false
const [resolved,setResolved] = useState<boolean>(ticket.data.ticket?.resolved) 

useEffect(() => {
    dispatch(fetchTicket({ticketId}))
},[resolved])

function onDeleteTicket() {
    dispatch(deleteTicket({userId,ticketId,navigation}))
}

function onResolveTicket() {
    dispatch(resolveTicket({userId,ticketId,setResolved}))
}

  return (
    <article className="ticket-article">
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
            <div className="ticket-container">
            <h2>Ticket Title: {ticket.data.ticket.ticketTitle}</h2>
            <hr />
            <h3>Created At: {ticket.data.ticket.createdAt?.toString().split('T')[0]}</h3>
            <hr />
            <p>Ticket Description: {ticket.data.ticket.ticketDescription}</p>
            <hr />
            <p>Problem Fixed: {ticket.data.ticket.resolved ? "true" : "false"}</p>
            </div>
        )}

            {user.data.userId && (
                <div className="user-buttons-container">
                    <Link to={`/tickets/${ticketId}/edit`}>Edit</Link>
                    <button onClick={onDeleteTicket}>Delete</button>
                </div>
            )}

            {isAdmin && (
                <div className="admin-buttons-container">
                    <button onClick={onResolveTicket}>Resolve Ticket</button>
                </div>
            )}

    </article>
  )
}

export default TicketView